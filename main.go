package main

import (
	"github.com/gofiber/fiber/v2"
	"tasker/config"
	"tasker/db"
)

func main() {
	config.Data.Init()
	db.Init()

	app := fiber.New()

	err := app.Listen(":8080")
	if err != nil {
		return
	}
}
