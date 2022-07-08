package main

import (
	"github.com/gofiber/fiber/v2"
	jwtware "github.com/gofiber/jwt/v3"
	"strings"
	"tasker/config"
	"tasker/db"
	"tasker/rest/project"
	"tasker/rest/user"
)

func main() {
	config.Data.Init()
	db.Init()

	app := fiber.New()

	app.Use(jwtware.New(jwtware.Config{
		SigningKey: []byte(config.Data.JwtSecret),
		Filter: func(ctx *fiber.Ctx) bool {
			path := ctx.Path()
			if strings.Contains(path, "/auth/") {
				return true
			}
			return !strings.Contains(path, "/api/")
		},
	}))

	userController := user.Controller{App: app}
	projectController := project.Controller{App: app}
	userController.Init()
	projectController.Init()

	err := app.Listen(":8080")
	if err != nil {
		return
	}
}
