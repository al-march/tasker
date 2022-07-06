package models

import (
	"gorm.io/gorm"
	"tasker/constants"
)

type Tag struct {
	gorm.Model
	UserID uint
	Title  string
	Color  constants.Color
}

func (t Tag) Dto() TagDto {
	return TagDto{
		ID:     t.ID,
		Title:  t.Title,
		UserID: t.UserID,
		Color: TagColorDto{
			ID:    int(t.Color),
			Value: t.Color.String(),
		},
	}
}

type TagDto struct {
	ID     uint   `json:"id"`
	UserID uint   `json:"userId"`
	Title  string `json:"title"`
	Color  struct {
		ID    int    `json:"id"`
		Value string `json:"value"`
	}
}

type TagColorDto struct {
	ID    int    `json:"id"`
	Value string `json:"value"`
}
