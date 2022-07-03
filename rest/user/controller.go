package user

import (
	"errors"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"log"
	"tasker/db"
	"tasker/db/models"
	"tasker/rest/handler"
)

const publicPath = "api/v1/user"

type Controller struct {
	App *fiber.App
}

func (c Controller) Init() {
	c.registration()
}

func (c Controller) registration() {
	c.App.Post(publicPath+"/registration", func(ctx *fiber.Ctx) error {
		type Registration struct {
			Login    string
			Password string
			Name     string
		}

		// Если не можешь спарсить - значит корявый запрос
		var request Registration
		err := ctx.BodyParser(&request)
		if err != nil {
			return ctx.Status(fiber.StatusBadRequest).JSON(handler.ErrorInvalidRequest)
		}

		// Проверяем есть ли юзер уже с таким логином
		var user models.User
		result := db.DB.Where(
			models.User{Login: request.Login},
		).First(&user)

		if !errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return ctx.Status(fiber.StatusBadRequest).JSON(handler.ErrorAlreadyExist)
		}

		user = models.User{
			Login:    request.Login,
			Name:     request.Name,
			Password: getHash(request.Password),
		}

		db.DB.Save(&user)
		return ctx.JSON(user.Dto())
	})
}

func getHash(p string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(p), bcrypt.MinCost)
	if err != nil {
		log.Println(err)
	}
	return string(hash)
}
