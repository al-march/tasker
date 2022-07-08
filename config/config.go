package config

import (
	"fmt"
	"gopkg.in/yaml.v3"
	"io/ioutil"
)

var Data = config{}

type config struct {
	ClientUrl string `yaml:"client_url"`
	DbName    string `yaml:"db_name"`
	JwtSecret string `yaml:"jwt_secret"`
}

func (c *config) Init() *config {
	yamlFile, err := ioutil.ReadFile("config.yaml")
	if err != nil {
		fmt.Println(err.Error())
	}
	err = yaml.Unmarshal(yamlFile, c)
	if err != nil {
		fmt.Println(err.Error())
	}
	return c
}
