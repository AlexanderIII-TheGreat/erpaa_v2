package handler

import (
	"context"
	"erpaa-backend/internal/model"
	"erpaa-backend/internal/repository"
	"log"
	"net/http"
	"time"
)

type HandlerUser struct {
	userpatern repository.UserPatern
}

func NewHandlerUser(user repository.UserPatern) *HandlerUser {
	return &HandlerUser{userpatern: user}
}

func (h *HandlerUser) Registrasi(w http.ResponseWriter, r *http.Request) {
	
		if r.Method != http.MethodPost {
			http.Error(w, "method tidak diizinkan", http.StatusMethodNotAllowed)
			return
		}

		if err := r.ParseForm(); err != nil {
			http.Error(w, "tidak ada form yang terdeteksi", http.StatusBadRequest)
			return
		} 

		username := r.FormValue("username")
		email := r.FormValue("email")
		password := r.FormValue("password")

		if username == "" || email == ""|| password == "" {
			http.Error(w, "setiap field wajib di isi", http.StatusBadRequest)
			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)

		defer cancel()

		data := model.UserModel{
			Username: username,
			Email: email,
			Password: password,
		}

		if err := h.userpatern.Insert(ctx, data); err != nil {
			log.Println("gagal memasukan data", err)
			http.Error(w, "gagal menyimpan data user", http.StatusInternalServerError)
			return
		}

		http.Redirect(w, r, "/", http.StatusSeeOther)

}

func (h *HandlerUser) FindUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method tidak diizinkan", http.StatusMethodNotAllowed)
		return
	}

	if err := r.ParseForm(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	username := r.FormValue("username")
	password := r.FormValue("password")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	user, err := h.userpatern.FindUserPassword(ctx, username)
	if err != nil {
		http.Error(w, "maaf username anda belum terdaftar", http.StatusUnauthorized)
		return
	}

	if user.Password != password {
		http.Error(w, "password salah", http.StatusUnauthorized)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "is_login",
		Value:    "true",
		Path:     "/",
		HttpOnly: true,
		MaxAge:   3600,
	})

	http.Redirect(w, r, "/dashboard", http.StatusSeeOther)
}

func (Next *HandlerUser) Logout(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method tidak di izinkan", http.StatusMethodNotAllowed)
		return
		}
		
		http.SetCookie(w, &http.Cookie{
			Name:   "is_login",
			Value:  "",
			Path:   "/",
			MaxAge: -1, // hapus cookie
		})
		http.Redirect(w,r, "/", http.StatusSeeOther)
}
