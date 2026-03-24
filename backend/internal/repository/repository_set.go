package repository

import "github.com/google/wire"

var Repository_set = wire.NewSet(
	NewUserImplemen,
)