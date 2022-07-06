package constants

type Color int

const (
	Undefined Color = iota
	Primary
	Secondary
	Accent
	Info
	Success
	Warning
	Error
)

func (c Color) String() string {
	switch c {
	case Undefined:
		return "undefined"
	case Primary:
		return "primary"
	case Secondary:
		return "secondary"
	case Accent:
		return "accent"
	case Info:
		return "info"
	case Success:
		return "success"
	case Warning:
		return "warning"
	case Error:
		return "error"
	}
	return "undefined"
}
