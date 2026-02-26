package main

import (
	"embed"
	"erpaa/backend/server"
	
	"github.com/joho/godotenv"
)

//go:embed frontend/pages/*
var tmpl embed.FS

func main() {
	err := godotenv.Load("C:/Users/user/Documents/ERPAA/backend/.env")
	if err != nil {
		panic(err)
	}

	server.Server(tmpl)
}