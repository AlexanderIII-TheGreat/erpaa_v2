package middleware

import (
	"fmt"
	"net/http"
	"time"
)

func RecoverMiddleware(Next http.Handler) http.Handler{
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if err := recover() ; err != nil {
			fmt.Printf("weladalah lhakok servernya error")
			http.Error(w, "internal server error", http.StatusInternalServerError)
		}
		Next.ServeHTTP(w, r)
	})
}

func LoggingMiddleware(Next http.Handler) http.Handler{
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		Now := time.Now()

		fmt.Printf(`sebelum header PATH = %v, METHOD =  %v`, r.URL.Path, r.Method)

		Next.ServeHTTP(w,r)

		fmt.Printf(`sesudah header PATH = %v, Method= %v, SPEED = %v`, 
		r.URL.Path, r.Method, time.Since(Now))
	})
}

func AuthMiddleware(Next http.Handler) http.Handler{
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request){
		cookie, err := r.Cookie("is_login")
		if err != nil || cookie.Value != "true" {
			http.Redirect(w, r, "/", http.StatusSeeOther)
		}
		 Next.ServeHTTP(w, r)
	})
}



func Chain(h http.Handler, Middlewares ...func(http.Handler)http.Handler)http.Handler{
	for i := len(Middlewares) -1; i >= 0 ; i--{
		h = Middlewares[i](h)
	}
	return h
}