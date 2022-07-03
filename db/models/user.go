package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Login    string
	Password string
	Name     string
	Surname  string
	Email    string
	Phone    string

	Tasks []Task `gorm:"foreignKey:UserID"`
}
