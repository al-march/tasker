package models

import "gorm.io/gorm"

type Task struct {
	gorm.Model
	Title       string
	Description string
	Status      string
	UserID      uint
	ProjectID   uint

	Tags []Tag `gorm:"many2many:task_tags"`
}
