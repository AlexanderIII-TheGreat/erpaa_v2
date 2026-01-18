// package server

// import (
// 	"erpaa-backend/internal/database"
// 	"erpaa-backend/internal/handler"
// 	middleware "erpaa-backend/internal/middlewares"
// 	"erpaa-backend/internal/repository"
// 	"net/http"
// 	"time"
// )

// func Server() error {

// 	UserPatern := repository.NewUserImplemen(database.DataCon())
// 	UserHandler := handler.NewHandlerUser(UserPatern)

// 	StokHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		http.ServeFile(w,r, "/frontend/pages/stokmanagement.html")
// 	})

// 	dashboardhandler := http.HandlerFunc(func(writer http.ResponseWriter, req *http.Request) {
// 		http.ServeFile(writer, req, "/frontend/pages/dashboard.html")
// 	})

// 	producthandler := http.HandlerFunc(func(writer http.ResponseWriter, req *http.Request) {
// 		http.ServeFile(writer, req, "/frontend/pages/product.html")
// 	})

// 	inventoryhandler := http.HandlerFunc(func(writer http.ResponseWriter, req *http.Request) {
// 		http.ServeFile(writer, req, "/frontend/pages/inventory.html")
// 	})

// 	saleshandler := http.HandlerFunc(func(writer http.ResponseWriter, req *http.Request) {
// 		http.ServeFile(writer, req, "/frontend/pages/salesforecasting.html")
// 	})

// 	shippinghandler := http.HandlerFunc(func(writer http.ResponseWriter, req *http.Request) {
// 		http.ServeFile(writer, req, "/frontend/pages/shipping.html")
// 	})

// 	IntegrasiHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		http.ServeFile(w,r, "/frontend/pages/Integrasi.html")
// 	})

// 	BriefHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		http.ServeFile(w,r, "/frontend/pages/DailyBrief.html")
// 	})

// 	mux := http.NewServeMux()

// 	mux.Handle("/asset/", http.StripPrefix("/asset/",
// 	http.FileServer(http.Dir("/frontend/CSS")),
// 	))

// 	mux.Handle("/dashboard/daily/", middleware.AuthMiddleware(BriefHandler))

// 	mux.Handle("/inventory/stok/", middleware.AuthMiddleware(StokHandler))

// 	mux.Handle("/integrasi/", middleware.AuthMiddleware(IntegrasiHandler))

// 	mux.Handle("/dashboard/", middleware.AuthMiddleware(dashboardhandler))

// 	mux.Handle("/product/", middleware.AuthMiddleware(producthandler))

// 	mux.Handle("/shipping/", middleware.AuthMiddleware(shippinghandler))

// 	mux.Handle("/inventory/", middleware.AuthMiddleware(inventoryhandler))

// 	mux.HandleFunc("/aipage/", func(w http.ResponseWriter, r *http.Request)  {
// 		http.ServeFile(w, r, "/frontend/pages/ai.html")
// 	})

// 	mux.Handle("/salesforecasting/", middleware.AuthMiddleware(saleshandler))

// 		mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
// 		http.ServeFile(w, r, "/frontend/pages/login.html")
// 	})

// 	mux.Handle("/login/auth", middleware.Chain(
// 		http.HandlerFunc(UserHandler.FindUser),
// 		middleware.LoggingMiddleware,
// 		middleware.RecoverMiddleware,
// 	))

// 	mux.Handle("/login/register", middleware.Chain(
// 		http.HandlerFunc(UserHandler.Registrasi),
// 		middleware.LoggingMiddleware,
// 		middleware.RecoverMiddleware,
// 	))

// 	mux.HandleFunc("/logout/", UserHandler.Logout)

// 	serve := http.Server{
// 		Addr: ":8090",
// 		Handler: mux,
// 		ReadTimeout: 5 *time.Second,
// 		WriteTimeout: 10 *time.Second,
// 		IdleTimeout: 120 * time.Second,
// 	}

// 	err := serve.ListenAndServe()
// 	if err != nil{
// 		panic(err)
// 	}
// 	return err

// }

package server

import (
	"erpaa-backend/internal/database"
	"erpaa-backend/internal/handler"
	middleware "erpaa-backend/internal/middlewares"
	"erpaa-backend/internal/repository"
	"log"
	"net/http"
	"time"
)

func Server() error {

	db := database.DataCon()
	userRepo := repository.NewUserImplemen(db)
	userHandler := handler.NewHandlerUser(userRepo)

	mux := http.NewServeMux()

	// ===== AUTH =====
	mux.Handle("/api/login", middleware.Chain(
		http.HandlerFunc(userHandler.FindUser),
		middleware.LoggingMiddleware,
		middleware.RecoverMiddleware,
	))

	mux.Handle("/api/register", middleware.Chain(
		http.HandlerFunc(userHandler.Registrasi),
		middleware.LoggingMiddleware,
		middleware.RecoverMiddleware,
	))

	mux.Handle("/api/logout", http.HandlerFunc(userHandler.Logout))

	// ===== PROTECTED API =====
	mux.Handle("/api/dashboard", middleware.AuthMiddleware(
		http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte(`{"message":"dashboard ok"}`))
		}),
	))

	server := &http.Server{
		Addr:         ":8090",
		Handler:      mux,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	log.Println("✅ ERPAA Backend running on :8090")
	log.Fatal(server.ListenAndServe())
	return nil
}
