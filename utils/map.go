package utils

func Map[T, Y any](entities []T, fn func(item T) Y) []Y {
	if entities == nil {
		return make([]Y, 0)
	}

	output := make([]Y, len(entities))
	for i, item := range entities {
		mapped := fn(item)
		output[i] = mapped
	}
	return output
}
