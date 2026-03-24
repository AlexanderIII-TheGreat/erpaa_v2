package handler

import "github.com/google/wire"

var Handler_set = wire.NewSet(
	NewHandlerUser,
)