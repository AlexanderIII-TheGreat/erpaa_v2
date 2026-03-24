package database

import (
	"erpaa/backend/internal/model"
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	// Tambahkan baris di bawah ini:
    _ "github.com/go-sql-driver/mysql"
)


func DataCon() *gorm.DB{

	Username := os.Getenv("DB_USERNAME")
	Pass := os.Getenv("DB_PASSWORD")
	Hostname := os.Getenv("DB_HOSTNAME")
	Port := os.Getenv("DB_PORT")
	Database := os.Getenv("DB_DATABASE")

	// 2. DEBUG: Hapus baris ini jika koneksi sudah berhasil
    fmt.Printf("== DEBUG KONEKSI ==\nUser: %s\nHost: %s:%s\nPass Length: %d\n===================\n", 
        Username, Hostname, Port, len(Pass))
	fmt.Println("DB NAME:", Database)

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local&tls=skip-verify",
		Username, Pass, Hostname, Port, Database)

	gormcnfg := gorm.Config{
		PrepareStmt: true,
		Logger: logger.Default.LogMode(logger.Info),
	}

	db, err := gorm.Open(mysql.Open(dsn), &gormcnfg)
	if err != nil {
		panic(err)
	}

	err = db.AutoMigrate(&model.UserModel{})
	if err != nil {
		log.Fatalf("gagal melakukan auto migrate %v", err)
	}

	dbsql, err := db.DB()
	if err != nil {
		log.Fatalf("gagal melakukan singkronisasi ke database local %v", err)
	}

	dbsql.SetMaxIdleConns(10)
	dbsql.SetMaxOpenConns(30)
	dbsql.SetConnMaxLifetime(time.Hour)

	fmt.Println("berhasil mengintegrasikan database")
	fmt.Println("berhail melakukan autu migrate")

	return db
}