package model

import (
	"time"

	"gorm.io/gorm"
)

type UserModel struct {
	// 1. Primary Key
	Id int `json:"id" gorm:"primaryKey;autoIncrement"`

	// 2. Kolom Data dengan batasan (Constraints)
	Username        string `json:"username" gorm:"type:varchar(100);not null"`
	Email string `json:"email" gorm:"type:varchar(50);not null"`
	Password       string    `json:"password" gorm:"type:varchar(255)"`

	// 3. Timestamps (Pelacakan Waktu Standar)
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`

	// 4. Soft Delete (Mencegah data hilang permanen)
	DeletedAt gorm.DeletedAt `json:"deleted_at" gorm:"index"`
}

// (Opsional) Memberitahu GORM nama tabel yang spesifik di database
func (UserModel) TableName() string {
	return "data_user"
}