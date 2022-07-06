package models

import "gorm.io/gorm"

type Project struct {
	gorm.Model
	UserID      uint
	Title       string
	Description string

	Tasks []Task `gorm:"foreignKey:ProjectID"`
	Tags  []Tag  `gorm:"many2many:project_tags"`
}
