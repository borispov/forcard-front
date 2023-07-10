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
		case "5":
			return "50%";
		case "0":
			return "var(--space-3xs, 4px)";
		case "1":
			return "var(--space-xs, 8px)";
		case "2":
			return "var(--space-s, 12px)";
		case "3":
			return "var(--space-m, 16px)";
		case "4":
			return "var(--space-l, 24px)";

		default:
			break;
	}

}
