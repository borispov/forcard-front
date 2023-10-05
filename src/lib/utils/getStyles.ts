import type { ComponentType, CssWidth, CssBorder, CssSpace, CssFont, StyleProperties } from "../../types/components";

import { parseWidth, parseBorder } from "./styleParser";

import {
	STEPPED_VALUES,
	STEPPED_TEXT_VALUES,
	FONT_WEIGHTS
} from "$lib/utils/UI-CONSTANTS";

const ALIGNMENT_VALUES = { 
	start: "flex-start", 
	center: "center", 
	end: "flex-end", 
	stretch: "stretch",
	baseline: "baseline" 
};

const TEXT_ALIGN_VALS = [ "start", "center", "end" ];

const getImgStyles = (imgStylesObject) => {
}

const getTextAlignment = (textAlignValue: string) => {
	let r: string = '';
	r += `text-align: ${textAlignValue && TEXT_ALIGN_VALS[textAlignValue] || 'start' };\n`;
	return r;
}

const getParagraphStyles = (stylesObject: StyleProperties) => {
	let r: string = '';
	r += getFontStyles(stylesObject.font);
	r += getSpaceStyle(stylesObject.space)
	r += getTextAlignment(stylesObject.textAlign);

	// if client sets width to above 65, set it to 100%
	let { width } = stylesObject;
	if (Number(width) < 65) {
		r += `\nwidth: ${stylesObject.width}ch;\n`;
	} else {
		r += `\nwidth: 100%;\n`;
	}

	return r
}

const getFontStyles = (fontObject: CssFont) => {
	let r: string = '';

	const fontSize = STEPPED_TEXT_VALUES[Number(fontObject["font-size"])]
	r += `font-size: ${fontSize};\n`;

	if (fontObject['font-weight']) {
		const fontWeight = FONT_WEIGHTS[Number(fontObject["font-weight"])]
		r += `font-weight: ${fontWeight};\n`
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

const getDimensions = (width: CssWidth, height: string) => {
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
export function getStyles(type: ComponentType, stylesObject: StyleProperties) {
	let r = "";
	let a = Object.entries(stylesObject);

	if (type == 'button') {
		r += getBorderStyle(stylesObject.border);
	}

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

	if (type == 'p') {
		r += getParagraphStyles(stylesObject);
		return r
	}



	if (type == "container" && stylesObject.display ) {
		r += getContainerStyle(stylesObject.display);
		r += getDimensions(stylesObject.width, stylesObject.height);
		if (Object.entries(stylesObject.border).length) {
			r += getBorderStyle(stylesObject.border);
		}
	}

	if (type == 'img') {

		let w = stylesObject.width
		let h = stylesObject.height

		console.log('height is: ', h);

		r += `width: ${w}%;\n height:${h}%;\n`

		// r += getDimensions(stylesObject.width, stylesObject.height);

		for (const [k, v] of a) {
			if (k == "space") {
				r += getSpaceStyle(v) + "\n";
			}
		}

		return r;
	}

	// encapsulate DIV settings -- if code reached here, then it's
	// probably a DIV
	// BAD PRACTICE!
	r += getBackgroundStyle(stylesObject.background) + "\n";


	for (const [k, v] of a) {
		if (k == "space") {
			r += getSpaceStyle(v) + "\n";
		}
	}
	return r;
}
