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
}

func (c Controller) create() {
	c.App.Post(path, func(ctx *fiber.Ctx) error {
		type Request struct {
			ProjectID   uint   `json:"projectId"`
			Title       string `json:"title"`
			Description string `json:"description"`
		}

		user := auth.TakeUser(ctx)
		var request Request

		if err := ctx.BodyParser(&request); err != nil {
			err := handler.ErrorInvalidRequest
			return ctx.Status(err.Status).JSON(err)
		}

		task := models.Task{
			UserID:      user.ID,
			ProjectID:   request.ProjectID,
			Title:       request.Title,
			Description: request.Description,
		}
		db.DB.Save(&task)
		return ctx.JSON(task.Dto())
	})
}
