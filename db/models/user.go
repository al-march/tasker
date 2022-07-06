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

	Tasks    []Task    `gorm:"foreignKey:UserID"`
	Projects []Project `gorm:"foreignKey:UserID"`
	Tags     []Tag     `gorm:"foreignKey:UserID"`
}

func (u User) Dto() UserDto {
	return UserDto{
		ID:      u.ID,
		Login:   u.Login,
		Name:    u.Name,
		Surname: u.Surname,
		Email:   u.Email,
		Phone:   u.Phone,
	}
}

type UserDto struct {
	ID      uint   `json:"id"`
	Login   string `json:"login"`
	Name    string `json:"name"`
	Surname string `json:"surname"`
	Email   string `json:"email"`
	Phone   string `json:"phone"`
}
