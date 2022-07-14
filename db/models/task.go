package models

import (
	"gorm.io/gorm"
	"time"
)

type Task struct {
	gorm.Model
	UserID       uint
	ProjectID    uint
	ParentTaskID uint `gorm:"default:0"`
	SectionID    uint `gorm:"default:0"`
	Title        string
	Description  string
	Status       string

	SubTasks []Task    `gorm:"foreignKey:ParentTaskID"`
	Tags     []Tag     `gorm:"many2many:task_tags"`
	Comments []Comment `gorm:"foreignKey:TaskID"`
}

func (t Task) Dto() TaskDto {
	tags := EntitiesToDto[TagDto](t.Tags)
	subTasks := EntitiesToDto[TaskDto](t.SubTasks)

	return TaskDto{
		ID:           t.ID,
		UserID:       t.UserID,
		ProjectID:    t.ProjectID,
		ParentTaskID: t.ParentTaskID,
		Title:        t.Title,
		Description:  t.Description,
		Tags:         tags,
		SubTasks:     subTasks,

		CreatedAt: t.CreatedAt,
		UpdatedAt: t.UpdatedAt,
	}
}

type TaskDto struct {
	ID           uint      `json:"id"`
	UserID       uint      `json:"userId"`
	ProjectID    uint      `json:"projectId"`
	ParentTaskID uint      `json:"parentTaskId"`
	Title        string    `json:"title"`
	Description  string    `json:"description"`
	Status       string    `json:"status"`
	Tags         []TagDto  `json:"tags"`
	SubTasks     []TaskDto `json:"subTasks"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
}
