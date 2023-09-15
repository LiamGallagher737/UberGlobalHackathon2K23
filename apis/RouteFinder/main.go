package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.POST(
		"api/findRoute",
		HandleRoute,
	)
	router.Run()
}
