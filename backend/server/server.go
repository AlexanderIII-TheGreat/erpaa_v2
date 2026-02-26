package server

import (
	"embed"
	"fmt"
	// Di dalam backend/server/server.go
	"erpaa/backend/internal/database"
	"erpaa/backend/internal/handler"
	"erpaa/backend/internal/middlewares"
	"erpaa/backend/internal/repository"
	"html/template"
	"io/fs"
	"net/http"
	"time"
)

func Server(templ embed.FS) error {

	UserPatern := repository.NewUserImplemen(database.DataCon())
	UserHandler := handler.NewHandlerUser(UserPatern)

	cleanedfs, _ := fs.Sub(templ, "frontend/pages")

	render := func(w http.ResponseWriter, page string, data interface{}){
		tmpl, err := template.ParseFS(cleanedfs, page)
		err = tmpl.Execute(w, data)
		if err != nil {
			http.Error(w, "internal server error", http.StatusInternalServerError)
		}
	}

	mux := http.NewServeMux()

	mux.HandleFunc("/dashboard/", func (w http.ResponseWriter, r *http.Request)  {
		render(w, "dashboard.html", map[string]interface{}{"title":"dashboard"})
	})

	mux.HandleFunc("/dashboard/daily/", func (w http.ResponseWriter, r *http.Request)  {
		render(w, "DailyBrief.html", map[string]interface{}{"title":"dailybrief"})
	})

	mux.HandleFunc("/inventory/", func (w http.ResponseWriter, r *http.Request)  {
		render(w, "inventory.html", map[string]interface{}{"title":"inventory"})
	})

	mux.HandleFunc("/product/", func (w http.ResponseWriter, r *http.Request)  {
		render(w, "product.html", map[string]interface{}{"title":"product"})
	})

	mux.HandleFunc("/integrasi/", func (w http.ResponseWriter, r *http.Request)  {
		render(w, "Integrasi.html", map[string]interface{}{"title":"integrasi"})
	})

	mux.HandleFunc("/salesforecasting/", func (w http.ResponseWriter, r *http.Request)  {
		render(w, "salesforecasting.html", map[string]interface{}{"title":"salesforecasting"})
	})

	mux.HandleFunc("/inventory/stok/", func (w http.ResponseWriter, r *http.Request)  {
		render(w, "stokmanagement.html", map[string]interface{}{"title":"stokmanagement"})
	})

	mux.HandleFunc("/shipping/", func (w http.ResponseWriter, r *http.Request)  {
		render(w, "shipping.html", map[string]interface{}{"title":"shipping"})
	})

	mux.HandleFunc("/", func (w http.ResponseWriter, r *http.Request)  {
		render(w, "login.html", map[string]interface{}{"title":"login"})
	})

	// Serve static assets (CSS, images, etc.)
	mux.Handle("/asset/", http.StripPrefix("/asset/",
	http.FileServer(http.Dir("/frontend/CSS")),
	))

	// Serve JavaScript files from src folder
	mux.Handle("/src/", http.StripPrefix("/src/",
		http.FileServer(http.Dir("C:/Users/user/erpaa/frontend/src")),
	))

	// kelompok auth 
	mux.HandleFunc("/login/auth",UserHandler.FindUser)

	mux.HandleFunc("/login/register", UserHandler.Registrasi)

	mux.HandleFunc("/logout/", UserHandler.Logout)

	fmt.Println("server berjalan di port 8090")

	muxmiddleware := middleware.Chain(middleware.RecoverMiddleware(middleware.LoggingMiddleware(mux)))

	serve := http.Server{
		Addr: ":8090",
		Handler: muxmiddleware,
		ReadTimeout: 5 *time.Second,
		WriteTimeout: 10 *time.Second,
		IdleTimeout: 120 * time.Second,
	}

	err := serve.ListenAndServe()
	if err != nil{
		panic(err)
	}
	return err

}
