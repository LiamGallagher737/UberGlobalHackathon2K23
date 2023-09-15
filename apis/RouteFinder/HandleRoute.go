package main

import "github.com/gin-gonic/gin"

func HandleRoute(c *gin.Context) {
	c.JSON(0, gin.H{
		"hello": "world",
	})
}
