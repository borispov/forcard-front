// should be renamed to parseContainerWidth because it's not generic
// enough 

export function parseWidthValue(widthValue: number) {

	if (widthValue >= 100 && widthValue <= 110) {
		return ['width', '100%']
	} else if (widthValue > 110 && widthValue < 120) {
		return [
			['width', 'calc(100% + calc(var(--padding-horizontal) * 2) + 0.4725px)'],
			['max-width', 'calc(100% + calc(var(--padding-horizontal) * 2) + 0.4725px)']
		]
	} else if (widthValue == 120) {
		return [ 
			[ 'width', '100vw'], [ 'max-width', '100vw' ]
		]
	} else {
		return [ 'width', widthValue + 'rem' ]
	}
}

export const parseWidth = (widthValue: number) => {
	let r: string;

	if (widthValue >= 100 && widthValue <= 110) {
		r = `width: 100%;\n`;
	} else if (widthValue > 110 && widthValue < 120) {
		r = `width: calc(100% + calc(var(--padding-horizontal) * 2) + 0.4725px);\nmax-width: calc(100% + calc(var(--padding-horizontal) * 2) + 0.4725px);\n`;
	} else if (widthValue == 120) {
		r = `width: 100vw;\nmax-width: 100vw;\n`
	} else {
		r = `width: ${widthValue + 'rem'};\n`;
	}

	return r;
}

export const parseBorder = (radius: string | number) => {

	let rad = typeof radius === 'string' && radius || String(radius);

	switch (rad) {
		case "0":
			return "0"
		case "1":
			return "var(--space-3xs, 0.25em)";
		case "2":
			return "var(--space-2xs, 0.5em)";
		case "3":
			return "var(--space-s, 1em)";
		case "4":
			return "100%";
		default:
			return "0"
			break;
	}

}
