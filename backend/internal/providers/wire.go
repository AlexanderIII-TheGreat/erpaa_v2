//go:build wireinject
// +build wireinject

package providers

import (
	"erpaa/backend/internal/handler"
	"erpaa/backend/internal/repository"

	"github.com/google/wire"
	"gorm.io/gorm"
)

type App struct {
	UserHandler *handler.HandlerUser
}

func NewApp(
	hu *handler.HandlerUser,
) *App{
	return &App{
		UserHandler: hu,
	}
}

func InitializedApp(db *gorm.DB) *App{
	wire.Build(
		repository.Repository_set,
		handler.Handler_set,
		NewApp,
	)
	return nil
}