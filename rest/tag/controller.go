package tag

import (
	"github.com/gofiber/fiber/v2"
	"tasker/auth"
	"tasker/constants"
	"tasker/db"
	"tasker/db/models"
	"tasker/rest/handler"
	"tasker/utils"
)

type Controller struct {
	App *fiber.App
}

const path = "api/v1/tag"

func (c Controller) Init() {
	c.create()
	c.update()
	c.getAll()
	c.colors()
	c.get()
}

type request struct {
	Title string
	Color int
}

func (c Controller) create() {
	c.App.Post(path, func(ctx *fiber.Ctx) error {
		user := auth.TakeUser(ctx)
		var req request
		if err := ctx.BodyParser(&req); err != nil {
			err := handler.ErrorInvalidRequest
			return ctx.Status(err.Status).JSON(err)
		}

		tag := models.Tag{
			UserID: user.ID,
			Title:  req.Title,
			Color:  constants.Color(req.Color),
		}

		db.DB.Save(&tag)
		return ctx.JSON(tag.Dto())
	})
}

func (c Controller) update() {
	c.App.Put(path+"/:id", func(ctx *fiber.Ctx) error {
		user := auth.TakeUser(ctx)
		tagID := ctx.Params("id", "-1")

		var req request
		if err := ctx.BodyParser(&req); err != nil {
			err := handler.ErrorInvalidRequest
			return ctx.Status(err.Status).JSON(err)
		}

		var tag models.Tag
		err := db.DB.
			Where("id=? AND user_id=?", tagID, user.ID).
			First(&tag).
			Error

		if err != nil {
			err := handler.ErrorEntityNotFound
			return ctx.Status(err.Status).JSON(err)
		}

		tag.Title = req.Title
		tag.Color = constants.Color(req.Color)
		db.DB.Save(&tag)
		return ctx.JSON(tag.Dto())
	})
}

func (c Controller) get() {
	c.App.Get(path+"/:id", func(ctx *fiber.Ctx) error {
		user := auth.TakeUser(ctx)
		tagID := ctx.Params("id", "-1")

		var entity models.Tag
		err := db.DB.
			Where("id = ? AND user_id = ?", tagID, user.ID).
			First(&entity).
			Error

		if err != nil {
			err := handler.ErrorEntityNotFound
			return ctx.Status(err.Status).JSON(err)
		}

		return ctx.JSON(entity.Dto())
	})
}

func (c Controller) getAll() {
	c.App.Get(path+"/all", func(ctx *fiber.Ctx) error {
		user := auth.TakeUser(ctx)

		entities := make([]models.Tag, 0)
		err := db.DB.
			Where("user_id = ?", user.ID).
			Find(&entities).
			Error

		if err != nil {
			err := handler.ErrorServerInternal
			return ctx.Status(err.Status).JSON(err)
		}

		tags := utils.Map(entities, func(tag models.Tag) models.TagDto {
			return tag.Dto()
		})
		return ctx.JSON(tags)
	})
}

func (c Controller) colors() {
	c.App.Get(path+"/colors", func(ctx *fiber.Ctx) error {
		colors := make([]constants.ColorDto, 8)

		for i := 0; i < 8; i++ {
			color := constants.Color(i)
			colors[i] = color.Dto()
		}

		return ctx.JSON(colors)
	})
}
