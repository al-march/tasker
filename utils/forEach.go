package utils

func ForEach[T any](items []T, fn func(item T, index int)) {
	if items != nil {
		for i, item := range items {
			fn(item, i)
		}
	}
}
