package model

import "time"

type UserModel struct {
	Id         int
	Username   string
	Email      string
	Password  string
	Updated_at time.Time
	Created_at time.Time
}