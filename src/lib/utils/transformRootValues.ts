const translations = {
		"--space-3xs":	"space -3",
		"--space-2xs":	"space -2",
		"--space-xs":		"space -1",
		"--space-s":		"space 0",
		"--space-m":		"space 1",
		"--space-l":		"space 2",
		"--space-xl":		"space 3",
		"--space-2xl":	"space 4",
		"--space-3xl":	"space 5",
}

// str should be taken from some Context object contain user's prefered
// language.
const transform = (v: string, src?: string): string => {
	return translations[v]
}


export const transformValues = (arr: string[]) => {
	return arr.map(a => transform(a))
}
