import { z } from "zod";

import type { 
	ComponentType, 
	CssWidth, 
	CssBorder, 
	CssSpace, 
	CssFont, 
} from "../../types/components";

const cssFontSchema = z.object({
		'font-size': z.string().or(z.number()),
		'font-weight': z.string().or(z.number()),
})

const cssSpaceSchema = z.object({
	margin: z.object({ x: z.string(), y: z.string() }).partial(),
	padding: z.object({ x: z.string(), y: z.string() }).partial(),
})

const cssColorSchema = z.string()

const ParagraphShape = z.object({
	font: cssFontSchema,
	color: cssColorSchema,
	space: cssSpaceSchema,
	textAlign: z.number(),
	letterSpacing: z.number(),
	lineHeight: z.string().or(z.number()),
	width: z.string().or(z.number())
});


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

const getLetterSpacing = (ls: number) => {
	let r: string = '';
	r += `letter-spacing: ${ls && ls + 'rem'};\n`;
	return r;
}

const getLineHeight = (lh: number) => {
	let r: string = '';
	r += `line-height: ${lh && lh}%;\n`;
	return r;
}

const getTextAlignment = (textAlignValue: number) => {
	let r: string = '';
	r += `text-align: ${textAlignValue && TEXT_ALIGN_VALS[textAlignValue] || 'start' };\n`;
	return r;
}

const getParagraphStyles = (stylesObject: unknown) => {
	const parseStyles = ParagraphShape.parse(stylesObject)
	let r = '';

	r += getFontStyles(parseStyles.font);
	r += getSpaceStyle(parseStyles.space)
	r += getTextAlignment(parseStyles.textAlign);
	r += getLetterSpacing(parseStyles.letterSpacing);
	r += getLineHeight(parseStyles.lineHeight);

	r += `color: ${parseStyles.color};\n`;

	// if client sets width to above 65, set it to 100%
	let { width } = parseStyles;
	if (Number(width) < 65) {
		r += `\nwidth: ${parseStyles.width}ch;\n`;
	} else {
		r += `\nwidth: 100%;\n`;
	}

	return r
}

const getFontStyles = (fontObject: CssFont) => {

	const parsedFonts = cssFontSchema.parse(fontObject);
	let r = '';

	const fontSize = STEPPED_TEXT_VALUES[Number(parsedFonts["font-size"])]
	r += `font-size: ${fontSize};\n`;

	if (parsedFonts['font-weight']) {
		const fontWeight = FONT_WEIGHTS[Number(parsedFonts["font-weight"])]
		r += `font-weight: ${fontWeight};\n`
	}
	return r;
}

const getBackgroundStyle = (bgObject: any) => {
	let r = '';

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
export function getStyles(type: ComponentType, stylesObject: unknown) {
	let r = "";
	let a = Object.entries(stylesObject);

	if (type == 'button') {
		r += getBorderStyle(stylesObject.border);
		r += getLetterSpacing(stylesObject.letterSpacing);
	}

	if (type == "button") {
		r += getFontStyles(stylesObject.font);
		r += getLetterSpacing(stylesObject.letterSpacing);
		return r;
	}

	if (type == 'p' || type == 'text') {
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
