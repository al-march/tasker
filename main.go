package main

import (
	"fmt"
	"tasker/config"
)

func main() {
	config.Data.Init()
	fmt.Println(config.Data)
}
