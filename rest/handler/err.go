package handler

import "github.com/gofiber/fiber/v2"

type Error struct {
	Message string `json:"message"`
	Status  int    `json:"status"`
}

var (
	ErrorAlreadyExist   = Error{Message: "Entity already exists", Status: fiber.StatusBadRequest}
	ErrorInvalidRequest = Error{Message: "Invalid request data", Status: fiber.StatusBadRequest}
)
