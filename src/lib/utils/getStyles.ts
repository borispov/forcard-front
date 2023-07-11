import type { CssBorder, CssSpace, CssFont, StyleProperties } from "../../types/components";

import { parseWidth, parseBorder } from "./styleParser";

const STEPPED_VALUES = [
	"0",
	"var(--space-2xs)",
	"var(--space-xs)",
	"var(--space-s)",
	"var(--space-m)",
	"var(--space-l)",
	"var(--space-xl)",
	"var(--space-2xl)",
	"var(--space-3xl)",
];

const STEPPED_TEXT_VALUES = [
	"var(--step--1)",
	"var(--step--2)",
	"var(--step-1)",
	"var(--step-2)",
	"var(--step-3)",
	"var(--step-4)",
	"var(--step-5)",
	"var(--step-6)",
];


const ALIGNMENT_VALUES = {start: "flex-start", center: "center", end: "flex-end", stretch: "stretch", baseline: "baseline" };

const getFontStyles = (fontObject: CssFont) => {
	let r: string = '';

	const fontSize = STEPPED_TEXT_VALUES[Number(fontObject["font-size"])]
	r += `font-size: ${fontSize};\n`;

	if (fontObject.weight) {
		r += `font-weight: ${fontObject.weight};\n`
	}
	return r;
}

const getBackgroundStyle = (bgObject: any) => {
	let r: string;

	if (bgObject.type === "gradient") {
		r = `${bgObject.gradient};`
		if (bgObject.opacity) {
			r += `opacity: ${bgObject.opacity};\n`;
		}
	}

	if (bgObject.type === "color") {
		r = `background-color: ${bgObject.color};`;
		if (bgObject.opacity) {
			r += `opacity: ${bgObject.opacity};\n`;
		}
	}
	return r;
};

//  UGLY sorry.
const getSpaceStyle = (spaceObject: CssSpace ) => {
	let r = "";

	for (const [k, v] of Object.entries(spaceObject)) {
		if (Object.hasOwn(v, "x") && v["x"]) {
			r += `${k}-inline: ${STEPPED_VALUES[v["x"]]};\n`;
		}

		if (Object.hasOwn(v, "y") && v["y"]) {
			r += `${k}-block: ${STEPPED_VALUES[v["y"]]};\n`;
		}
	}

	return r;
};

const getBorderStyle = (borderObject: CssBorder) => {
	let r = "";
	if (borderObject.radius) {
		let parsedRadius = parseBorder(borderObject.radius);
		r += `border-radius: ${parsedRadius};\n`
	}
	return r;
}

const getContainerStyle = (displayObject: {
	type: string | '';
	direction: string | '';
}) => {
	let r = "";
	r += `display: ${displayObject.type || 'block'};\n`;

	if (displayObject.type === 'flex') {
		r += `flex-direction: ${displayObject['direction']};\n`;
		r += `align-items: ${ALIGNMENT_VALUES[displayObject['align']]};\n`;
	}

	if (displayObject.direction) {
		r += `flex-direction: ${displayObject.direction};\n`
	}

	return r;
}

const getDimensions = (width: 'auto' | number, height: string) => {
	let r: string = '';

	if (width !== 'auto') {
		r += parseWidth(width);
	} else {
		r += `width: ${width};\n`;
	}

	if (height !== 'auto') {
		r += `height: ${height};\n`;
	}

	return r;
}


// Show UP
export function getStyles(type: string, stylesObject: StyleProperties) {
	let r = "";
	let a = Object.entries(stylesObject);

	if (type == "text" || type == "button") {
		r += getFontStyles(stylesObject.font);
		for (const [k, v] of a) {
			if (k == "space") {
			} else {
				r += `${k}: ${v};\n`;
			}
		}
		return r;
	}

	if (type == "container" && stylesObject.display ) {
		r += getContainerStyle(stylesObject.display);
		r += getDimensions(stylesObject.width, stylesObject.height);
		if (Object.entries(stylesObject.border).length) {
			r += getBorderStyle(stylesObject.border);
		}
	}

	// encapsulate DIV settings
	r += getBackgroundStyle(stylesObject.background) + "\n";


	for (const [k, v] of a) {
		if (k == "space") {
			r += getSpaceStyle(v) + "\n";
		}
	}
	return r;
}
