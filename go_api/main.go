package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	_ "musicplayce/go_api/docs"

	"github.com/jackc/pgx/v5/pgxpool"
	httpSwagger "github.com/swaggo/http-swagger"
)

type Song struct {
	ID        int          `json:"id"`
	Title     string       `json:"title"`
	Artist    string       `json:"artist"`
	Album     *string      `json:"album"`
	Year      *int         `json:"year"`
	CreatedAt time.Time    `json:"createdAt"`
	UpdatedAt time.Time    `json:"updatedAt"`
}


//  Retorna uma lista completa de todas as músicas cadastradas no banco de dados.
func songsHandler(dbpool *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := dbpool.Query(context.Background(), `SELECT "id", "title", "artist", "album", "year", "createdAt", "updatedAt" FROM "Song"`)
		if err != nil {
			log.Printf("Query failed: %v\n", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var songs []Song
		for rows.Next() {
			var s Song
			var album sql.NullString
			var year sql.NullInt32

			if err := rows.Scan(&s.ID, &s.Title, &s.Artist, &album, &year, &s.CreatedAt, &s.UpdatedAt); err != nil {
				log.Printf("Failed to scan row: %v\n", err)
				http.Error(w, "Internal Server Error", http.StatusInternalServerError)
				return
			}
			if album.Valid {
				s.Album = &album.String
			}
			if year.Valid {
				yearInt := int(year.Int32)
				s.Year = &yearInt
			}
			songs = append(songs, s)
		}

		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(songs); err != nil {
			log.Printf("Failed to encode response: %v\n", err)
		}
	}
}


// @host         localhost:8081
func main() {
	databaseUrl := os.Getenv("GO_DATABASE_URL")
	if databaseUrl == "" {
		log.Fatal("GO_DATABASE_URL environment variable is not set")
	}

	dbpool, err := pgxpool.New(context.Background(), databaseUrl)
	if err != nil {
		log.Fatalf("Unable to create connection pool: %v\n", err)
	}
	defer dbpool.Close()

	// Rota da nossa API
	http.HandleFunc("/songs", songsHandler(dbpool))

	// Rota para a documentação Swagger
	http.HandleFunc("/swagger/", httpSwagger.WrapHandler)

	log.Println("Go API server starting on port 8081...")
	log.Println("Swagger UI available at http://localhost:8081/swagger/index.html")
	if err := http.ListenAndServe(":8081", nil); err != nil {
		log.Fatalf("Could not start server: %s\n", err)
	}
}