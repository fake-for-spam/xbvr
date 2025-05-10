package svelteui

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
)

//go:embed build
var Assets embed.FS

func GetFileSystem(useOS bool) http.FileSystem {
	if useOS {
		return http.Dir("svelteui/build")
	}

	fs, err := fs.Sub(Assets, "build")
	if err != nil {
		log.Panic(err)
	}
	return http.FS(fs)
}
