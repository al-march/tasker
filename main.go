package main

import (
	"github.com/gofiber/fiber/v2"
	"tasker/config"
	"tasker/db"
	"tasker/rest/user"
)

func main() {
	config.Data.Init()
	db.Init()

	app := fiber.New()

	userController := user.Controller{App: app}
	userController.Init()

	err := app.Listen(":8080")
	if err != nil {
		return
	}
}
