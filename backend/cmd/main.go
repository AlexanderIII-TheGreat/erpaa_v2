package main

import (
	"erpaa/backend/internal/database"
	"erpaa/backend/server"
	"erpaa/frontend/resource"
	"fmt"
	"log"

	"github.com/joho/godotenv"
)

// //go:embed frontend/src/*
// var src embed.FS

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatalf("gagal melakukan integrasi env")
	}

	db := database.DataCon()
	dbsql, err := db.DB()
	if err != nil {
		log.Fatalf("gagal melakukan inisiasi ke database %v", err)
	}
	defer dbsql.Close()

	fmt.Println("berhail menyalakan server")
	fmt.Println("berhasil melakukan inisiasi ke database")
	server.Server(resource.Pages, db)
}