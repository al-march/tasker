package models

import "tasker/utils"

type entity[T any] interface {
	Dto() T
}

func EntitiesToDto[Dto any, Entity entity[Dto]](list []Entity) []Dto {
	return utils.Map(list, func(item Entity) Dto {
		return item.Dto()
	})
}
