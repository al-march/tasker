package user

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"tasker/db/models"
	"time"
)

type Jwt struct {
	Login string
	ID    uint
}

func CreateClaims(u models.User) jwt.MapClaims {
	return jwt.MapClaims{
		"login": u.Login,
		"id":    u.ID,
		"exp":   time.Now().Add(time.Hour * 72).Unix(),
	}
}

func (j *Jwt) TakeUser(ctx *fiber.Ctx) *Jwt {
	user := ctx.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)

	login := claims["name"].(string)
	id := uint(claims["id"].(float64))

	j.ID = id
	j.Login = login
	return j
}
