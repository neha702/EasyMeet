package db

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
	//"fmt"
)

func ConnectToDB() (*sql.DB, error) {
	var db *sql.DB
	connection_string := "root@tcp(127.0.0.1:3306)/test_db"
	db, err := sql.Open("mysql", connection_string)
	if err != nil {
		log.Printf("Failed to connect to database.", err)
		return nil, err
	}

	e := db.Ping()
	if e != nil {
		log.Printf("Failed to ping to database.")
		return nil, e
	} else {
		log.Printf("Connected to database successfully.")
	}
	return db, nil
}
