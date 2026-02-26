package repository

import (
	"context"
	"erpaa/backend/internal/model"
)

type UserPatern interface {
	// FindById(ctx context.Context, id int) (error)
	FindUserPassword(ctx context.Context, user string)(*model.UserModel, error)
	// FindAll(ctx context.Context)([]model.UserModel, error)
	Insert(ctx context.Context, user model.UserModel)(error)
	// Delete(ctx context.Context, id int)(error)
	Update(ctx context.Context, id int, user model.UserModel)(error)
}