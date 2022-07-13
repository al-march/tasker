package models

type Section struct {
	ID        uint `gorm:"primarykey"`
	ProjectID uint
	Title     string
	Tasks     []Task `gorm:"foreignKey:SectionID"`
}

func (s Section) Dto() SectionDto {
	tasks := EntitiesToDto[TaskDto](s.Tasks)

	return SectionDto{
		ID:    s.ID,
		Title: s.Title,
		Tasks: tasks,
	}
}

type SectionDto struct {
	ID    uint      `json:"id"`
	Title string    `json:"title"`
	Tasks []TaskDto `json:"tasks"`
}
