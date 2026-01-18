package main

import "erpaa-backend/cmd/server"

func main() {
	 err := server.Server()
	if err != nil {
		panic(err)
	}
}