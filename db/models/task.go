package models

import (
	"gorm.io/gorm"
	"time"
)

type Task struct {
	gorm.Model
	UserID      uint
	ProjectID   uint
	Title       string
	Description string
	Status      string

	Tags     []Tag     `gorm:"many2many:task_tags"`
	Comments []Comment `gorm:"foreignKey:TaskID"`
}

func (t Task) Dto() TaskDto {
	tags := EntitiesToDto[TagDto](t.Tags)

	return TaskDto{
		ID:          t.ID,
		UserID:      t.UserID,
		ProjectID:   t.ProjectID,
		Title:       t.Title,
		Description: t.Description,
		Tags:        tags,

		CreatedAt: t.CreatedAt,
		UpdatedAt: t.UpdatedAt,
	}
}

type TaskDto struct {
	ID          uint      `json:"id"`
	UserID      uint      `json:"userId"`
	ProjectID   uint      `json:"projectId"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Status      string    `json:"status"`
	Tags        []TagDto  `json:"tags"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}
