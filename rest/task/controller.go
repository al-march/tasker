package task

import (
	"github.com/gofiber/fiber/v2"
	"tasker/auth"
	"tasker/db"
	"tasker/db/models"
	"tasker/rest/handler"
)

type Controller struct {
	App *fiber.App
}

const path = "api/v1/task"

func (c Controller) Init() {
	c.create()
	c.update()
	c.get()
}

type request struct {
	ProjectID    uint   `json:"projectId"`
	ParentTaskID uint   `json:"prentTaskId"`
	Title        string `json:"title"`
	Description  string `json:"description"`

	Tags []struct {
		ID uint
	} `json:"tags"`
}

func (c Controller) create() {
	c.App.Post(path, func(ctx *fiber.Ctx) error {

		user := auth.TakeUser(ctx)
		var request request

		if err := ctx.BodyParser(&request); err != nil {
			err := handler.ErrorInvalidRequest
			return ctx.Status(err.Status).JSON(err)
		}

		var tags []models.Tag
		for _, tag := range request.Tags {
			var entity models.Tag
			err := db.DB.
				Where("id = ? AND user_id = ?", tag.ID, user.ID).
				First(&entity).
				Error

			if err == nil {
				tags = append(tags, entity)
			}
		}

		task := models.Task{
			UserID:       user.ID,
			ProjectID:    request.ProjectID,
			ParentTaskID: request.ParentTaskID,
			Title:        request.Title,
			Description:  request.Description,
			Tags:         tags,
		}
		db.DB.Save(&task)
		return ctx.JSON(task.Dto())
	})
}

func (c Controller) update() {
	c.App.Put(path+"/:id", func(ctx *fiber.Ctx) error {
		user := auth.TakeUser(ctx)
		taskID := ctx.Params("id", "-1")

		var req request
		if err := ctx.BodyParser(&req); err != nil {
			err := handler.ErrorInvalidRequest
			return ctx.Status(err.Status).JSON(err)
		}

		var task models.Task
		err := db.DB.
			Where("id=? AND user_id=?", taskID, user.ID).
			First(&task).
			Error

		if err != nil {
			err := handler.ErrorEntityNotFound
			return ctx.Status(err.Status).JSON(err)
		}

		task.Title = req.Title
		task.Description = req.Description

		db.DB.Save(&task)
		return ctx.JSON(task.Dto())
	})
}

func (c Controller) get() {
	c.App.Get(path+"/:id", func(ctx *fiber.Ctx) error {
		user := auth.TakeUser(ctx)
		taskID := ctx.Params("id", "-1")

		var task models.Task
		err := db.DB.
			Where("id = ? AND user_id = ?", taskID, user.ID).
			Preload("Tags").
			Preload("SubTasks").
			First(&task).
			Error

		if err != nil {
			err := handler.ErrorEntityNotFound
			return ctx.Status(err.Status).JSON(err)
		}

		return ctx.JSON(task.Dto())
	})
}
