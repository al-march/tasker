package models

import (
	"gorm.io/gorm"
	"tasker/constants"
)

type Tag struct {
	gorm.Model
	Title string
	Color constants.Color
}
