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
