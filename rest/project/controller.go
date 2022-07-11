package project

import (
	"errors"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
	"strconv"
	"tasker/auth"
	"tasker/db"
	"tasker/db/models"
	"tasker/rest/handler"
	"tasker/utils"
)

const path = "api/v1/project"

type Controller struct {
	App *fiber.App
}

func (c Controller) Init() {
	c.create()
	c.update()
	c.get()
	c.getAll()
}

func (c Controller) create() {
	c.App.Post(path, func(ctx *fiber.Ctx) error {
		type ProjectCreate struct {
			Title       string
			Description string
		}

		user := auth.TakeUser(ctx)
		var request ProjectCreate
		if err := ctx.BodyParser(&request); err != nil {
			err := handler.ErrorInvalidRequest
			return ctx.Status(err.Status).JSON(err)
		}

		project := models.Project{
			UserID:      user.ID,
			Title:       request.Title,
			Description: request.Title,
		}

		db.DB.Save(&project)
		return ctx.JSON(project.Dto())
	})
}

func (c Controller) getAll() {
	c.App.Get(path, func(ctx *fiber.Ctx) error {
		user := auth.TakeUser(ctx)

		var entities []models.Project
		err := db.DB.
			Where("user_id = ?", user.ID).
			Preload("Tags").
			Find(&entities).
			Error

		if err != nil {
			e := handler.Error{
				Message: err.Error(),
				Status:  fiber.StatusBadRequest,
			}
			return ctx.Status(e.Status).JSON(e)
		}

		for i, item := range entities {
			prManager := getPrManager(item.ID)
			entities[i].Manager = prManager
		}

		projects := utils.Map(entities, func(project models.Project) models.ProjectDto {
			return project.Dto()
		})

		return ctx.JSON(projects)
	})
}

func (c Controller) get() {
	c.App.Get(path+"/:id", func(ctx *fiber.Ctx) error {
		user := auth.TakeUser(ctx)
		projectID, err := strconv.Atoi(ctx.Params("id"))
		if err != nil {
			err := handler.ErrorInvalidRequest
			return ctx.Status(err.Status).JSON(err)
		}

		var project models.Project
		err = db.DB.
			Where("id = ? AND user_id = ?", projectID, user.ID).
			Preload("Tags").
			First(&project).
			Error

		if errors.Is(err, gorm.ErrRecordNotFound) {
			err := handler.ErrorEntityNotFound
			return ctx.Status(err.Status).JSON(err)
		}

		prManager := getPrManager(project.ID)
		project.Manager = prManager

		return ctx.JSON(project.Dto())
	})
}

func (c Controller) update() {
	c.App.Put(path+"/:id", func(ctx *fiber.Ctx) error {
		user := auth.TakeUser(ctx)
		projectID, err := strconv.Atoi(ctx.Params("id"))
		if err != nil {
			err := handler.ErrorInvalidRequest
			return ctx.Status(err.Status).JSON(err)
		}

		var req models.Project
		if err := ctx.BodyParser(&req); err != nil {
			err := handler.ErrorInvalidRequest
			return ctx.Status(err.Status).JSON(err)
		}

		var entity models.Project
		err = db.DB.
			Where("id = ? AND user_id = ?", projectID, user.ID).
			First(&entity).
			Error

		if err != nil {
			err := handler.ErrorEntityNotFound
			return ctx.Status(err.Status).JSON(err)
		}

		entity.Title = req.Title
		entity.Description = req.Description
		db.DB.Save(&entity)

		return ctx.JSON(entity.Dto())
	})
}

func getPrManager(projectID uint) models.ProjectManager {
	prManager := models.ProjectManager{ProjectID: projectID}
	db.DB.
		Where(prManager).
		FirstOrCreate(&prManager)

	return prManager
}
