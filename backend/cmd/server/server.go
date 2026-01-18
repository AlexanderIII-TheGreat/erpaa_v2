package server

import (
	"erpaa-backend/internal/database"
	"erpaa-backend/internal/handler"
	middleware "erpaa-backend/internal/middlewares"
	"erpaa-backend/internal/repository"
	"net/http"
	"time"
)

func Server() error {

	UserPatern := repository.NewUserImplemen(database.DataCon())
	UserHandler := handler.NewHandlerUser(UserPatern)

	StokHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w,r, "C:/Users/user/Documents/ERPAA/frontend/pages/stokmanagement.html")
	})

	dashboardhandler := http.HandlerFunc(func(writer http.ResponseWriter, req *http.Request) {
		http.ServeFile(writer, req, "C:/Users/user/Documents/ERPAA/frontend/pages/dashboard.html")
	})

	producthandler := http.HandlerFunc(func(writer http.ResponseWriter, req *http.Request) {
		http.ServeFile(writer, req, "C:/Users/user/Documents/ERPAA/frontend/pages/product.html")
	})

	inventoryhandler := http.HandlerFunc(func(writer http.ResponseWriter, req *http.Request) {
		http.ServeFile(writer, req, "C:/Users/user/Documents/ERPAA/frontend/pages/inventory.html")
	})

	saleshandler := http.HandlerFunc(func(writer http.ResponseWriter, req *http.Request) {
		http.ServeFile(writer, req, "C:/Users/user/Documents/ERPAA/frontend/pages/salesforecasting.html")
	})

	shippinghandler := http.HandlerFunc(func(writer http.ResponseWriter, req *http.Request) {
		http.ServeFile(writer, req, "C:/Users/user/Documents/ERPAA/frontend/pages/shipping.html")
	})

	IntegrasiHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w,r, "C:/Users/user/Documents/ERPAA/frontend/pages/Integrasi.html")
	})

	BriefHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w,r, "C:/Users/user/Documents/ERPAA/frontend/pages/DailyBrief.html")
	})

	mux := http.NewServeMux()

	mux.Handle("/asset/", http.StripPrefix("/asset/",
	http.FileServer(http.Dir("C:/Users/user/Documents/ERPAA/frontend/CSS")),
	))

	mux.Handle("/dashboard/daily/", middleware.AuthMiddleware(BriefHandler))

	mux.Handle("/inventory/stok/", middleware.AuthMiddleware(StokHandler))

	mux.Handle("/integrasi/", middleware.AuthMiddleware(IntegrasiHandler))

	mux.Handle("/dashboard/", middleware.AuthMiddleware(dashboardhandler))

	mux.Handle("/product/", middleware.AuthMiddleware(producthandler))

	mux.Handle("/shipping/", middleware.AuthMiddleware(shippinghandler))

	mux.Handle("/inventory/", middleware.AuthMiddleware(inventoryhandler))

	mux.HandleFunc("/aipage/", func(w http.ResponseWriter, r *http.Request)  {
		http.ServeFile(w, r, "C:/Users/user/Documents/ERPAA/frontend/pages/ai.html")
	})

	mux.Handle("/salesforecasting/", middleware.AuthMiddleware(saleshandler))

		mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "C:/Users/user/Documents/ERPAA/frontend/pages/login.html")
	})

	mux.Handle("/login/auth", middleware.Chain(
		http.HandlerFunc(UserHandler.FindUser),
		middleware.LoggingMiddleware,
		middleware.RecoverMiddleware,
	))

	mux.Handle("/login/register", middleware.Chain(
		http.HandlerFunc(UserHandler.Registrasi),
		middleware.LoggingMiddleware,
		middleware.RecoverMiddleware,
	))

	mux.HandleFunc("/logout/", UserHandler.Logout)

	serve := http.Server{
		Addr: "localhost:8090",
		Handler: mux,
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