package db

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"tasker/config"
	"tasker/db/models"
)

var DB *gorm.DB

func Init() {
	DB = CreateDb(config.Data.DbName)

	err := DB.AutoMigrate(
		&models.User{},
		&models.Project{},
		&models.Task{},
		&models.Comment{},
		&models.Tag{},
	)

	if err != nil {
		panic("failed to auto migrate database")
	}
}

func CreateDb(dbName string) *gorm.DB {
	var name string
	if len(dbName) > 0 {
		name = dbName
	} else {
		name = "default.db"
	}

	db, err := gorm.Open(sqlite.Open(name), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	return db
}
