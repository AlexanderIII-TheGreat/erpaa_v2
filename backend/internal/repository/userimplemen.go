package repository

import (
	"context"
	"erpaa/backend/internal/model"
	"fmt"
	"log"
	"gorm.io/gorm"
)

type UserImpl struct {
	DB *gorm.DB
}

type UserPatern interface {
	// FindById(ctx context.Context, id int) (error)
	FindUserPassword(ctx context.Context, user string)(model.UserModel, error)
	// FindAll(ctx context.Context)([]model.UserModel, error)
	Insert(ctx context.Context, user model.UserModel)(error)
	// Delete(ctx context.Context, id int)(error)
	Update(ctx context.Context, id int, user model.UserModel)(error)
}

func NewUserImplemen(db *gorm.DB) UserPatern{
	return &UserImpl{DB: db}
}

func (impl *UserImpl) FindUserPassword(ctx context.Context, username string) (model.UserModel, error) {
	var data model.UserModel
	err := impl.DB.WithContext(ctx).Find(&data).Where("username = ?", username).Error 
	if err != nil {
		log.Fatalf("gagal melakukan pengambilan username %v", err)
	}

	fmt.Printf("berhasil mengambil data username :%v", username)
	
	return data, nil

}

func (impl *UserImpl) Insert(ctx context.Context, user model.UserModel)(error){

	err := impl.DB.WithContext(ctx).Create(&user).Error
	if err != nil {
		log.Fatalf("gagal melakukan insert user %v",err)
	}
	
	fmt.Println("berhasil melakukan insert username : %v", user)
	return nil
}

func (impl *UserImpl) Update(ctx context.Context, id int, user model.UserModel) (error){
	
	err := impl.DB.WithContext(ctx).Model(&model.UserModel{}).Where("id = ?", id).Error
	if err != nil {
		log.Fatalf("gagal melakukan update data user :%v", id)
	}

	return nil

}

