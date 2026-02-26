package database

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/go-sql-driver/mysql"
)


func DataCon() *sql.DB{

	HOST := os.Getenv("DB_HOST")
	USER := os.Getenv("DB_USERNAME")
	PASS := os.Getenv("DB_PASSWORD")
	PATH := os.Getenv("DB_PATH")
	CONNEC := os.Getenv("DB_CONNEC")
	DB := os.Getenv("DB_NAME")

	script := fmt.Sprintf("%v:%v@tcp(%v:%v)/%v?parseTime=True", USER, PASS, HOST, PATH, CONNEC)

	result, err := sql.Open(DB,script)
	if err != nil {
		panic(err)
	}

	return result
}