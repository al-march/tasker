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
)

const path = "api/v1/project"

type Controller struct {
	App *fiber.App
}

func (c Controller) Init() {
	c.create()
	c.get()
}

func (c Controller) create() {
	c.App.Post(path, func(ctx *fiber.Ctx) error {
		type ProjectCreate struct {
			Title       string
			Description string
		}

		var user = auth.TakeUser(ctx)
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

		return ctx.JSON(project.Dto())
	})
}
