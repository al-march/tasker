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
	c.get()
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

func (c Controller) get() {
	c.App.Get(path+"/:id", func(ctx *fiber.Ctx) error {
		user := auth.TakeUser(ctx)

		taskID := ctx.Params("id", "0")

		var task models.Task
		err := db.DB.
			Where("id = ? AND user_id = ?", taskID, user.ID).
			Preload("Tags").
			First(&task).
			Error

		if err != nil {
			err := handler.ErrorEntityNotFound
			return ctx.Status(err.Status).JSON(err)
		}

		return ctx.JSON(task.Dto())
	})
}
