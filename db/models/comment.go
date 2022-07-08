package models

import (
	"gorm.io/gorm"
	"time"
)

type Comment struct {
	gorm.Model
	UserID          uint
	TaskID          uint
	ReplayCommentID uint
	Message         string
}

func (c Comment) Dto() CommentDto {
	return CommentDto{
		ID:              c.ID,
		UserID:          c.UserID,
		TaskID:          c.TaskID,
		ReplayCommentID: c.ReplayCommentID,
		Message:         c.Message,
		CreatedAt:       c.CreatedAt,
		UpdatedAt:       c.UpdatedAt,
	}
}

type CommentDto struct {
	ID              uint   `json:"id"`
	UserID          uint   `json:"userId"`
	TaskID          uint   `json:"taskId"`
	ReplayCommentID uint   `json:"replayCommentId"`
	Message         string `json:"message"`

	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
