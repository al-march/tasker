package user

import (
	"errors"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"log"
	"tasker/auth"
	"tasker/config"
	"tasker/db"
	"tasker/db/models"
	"tasker/rest/handler"
	"tasker/utils"
)

const publicPath = "api/v1/auth"
const privatePath = "api/v1/profile"

type Controller struct {
	App *fiber.App
}

func (c Controller) Init() {
	c.registration()
	c.login()
	// private methods
	c.info()
	c.notification()
}

func (c Controller) registration() {
	c.App.Post(publicPath+"/registration", func(ctx *fiber.Ctx) error {
		type Registration struct {
			Login    string
			Password string
			Name     string
		}

		// Если не можешь спарсить - значит корявый запрос
		var request Registration
		err := ctx.BodyParser(&request)
		if err != nil {
			err := handler.ErrorInvalidRequest
			return ctx.Status(err.Status).JSON(err)
		}

		// Проверяем есть ли юзер уже с таким логином
		var user models.User
		result := db.DB.Where(
			models.User{Login: request.Login},
		).First(&user)

		if !errors.Is(result.Error, gorm.ErrRecordNotFound) {
			err := handler.ErrorAlreadyExist
			return ctx.Status(err.Status).JSON(err)
		}

		user = models.User{
			Login:    request.Login,
			Name:     request.Name,
			Password: getHash(request.Password),
		}

		db.DB.Save(&user)
		return ctx.JSON(user.Dto())
	})
}

func (c Controller) login() {
	c.App.Post(publicPath+"/login", func(ctx *fiber.Ctx) error {
		type Login struct {
			Login    string
			Password string
		}

		var request Login
		err := ctx.BodyParser(&request)
		if err != nil {
			err := handler.ErrorInvalidRequest
			return ctx.Status(err.Status).JSON(err)
		}

		var user models.User
		result := db.DB.Where(
			models.User{Login: request.Login},
		).First(&user)

		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			err := handler.ErrorUserNotFound
			return ctx.Status(err.Status).JSON(err)
		}

		if err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(request.Password)); err != nil {
			err := handler.ErrorInvalidUserLogin
			return ctx.Status(err.Status).JSON(err)
		}

		claims := auth.CreateClaims(user)
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

		t, err := token.SignedString([]byte(config.Data.JwtSecret))
		if err != nil {
			err := handler.ErrorServerInternal
			return ctx.Status(err.Status).JSON(err)
		}

		return ctx.JSON(fiber.Map{
			"user":  user.Dto(),
			"token": t,
		})
	})
}

func (c Controller) info() {
	c.App.Get(privatePath+"/info", func(ctx *fiber.Ctx) error {
		u := auth.TakeUser(ctx)

		var user models.User
		err := db.DB.Where("id = ?", u.ID).First(&user).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			err := handler.ErrorServerInternal
			return ctx.Status(err.Status).JSON(err)
		}

		return ctx.JSON(user.Dto())
	})
}

func (c Controller) notification() {
	c.App.Get(privatePath+"/invites", func(ctx *fiber.Ctx) error {
		user := auth.TakeUser(ctx)

		invitedProjects := make([]models.Project, 0)

		type invite struct {
			UserID           uint `json:"userId"`
			ProjectManagerID uint `json:"projectManagerId"`
		}

		var invites []invite
		err := db.DB.
			Table("project_invited_users").
			Where("user_id=?", user.ID).
			Find(&invites).
			Error

		if err != nil {
			return ctx.JSON(invitedProjects)
		}

		utils.ForEach(invites, func(item invite, i int) {
			project, err := getProjectByManagerID(item.ProjectManagerID)
			if err == nil {
				invitedProjects = append(invitedProjects, project)
			}
		})

		projects := models.EntitiesToDto[models.ProjectDto](invitedProjects)
		return ctx.JSON(projects)
	})
}

func getHash(p string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(p), bcrypt.MinCost)
	if err != nil {
		log.Println(err)
	}
	return string(hash)
}

func getProjectByID(projectID uint) (models.Project, error) {
	var project models.Project
	err := db.DB.
		Where("id=?", projectID).
		First(&project).
		Error

	return project, err
}

func getProjectByManagerID(managerID uint) (models.Project, error) {
	var prManager models.ProjectManager
	db.DB.
		Where("id=?", managerID).
		Omit("ProjectManager").
		First(&prManager)

	return getProjectByID(prManager.ProjectID)
}
