import { z } from "zod";

import { containerDesignSchema, textDesignSchema, typographySchema, backgroundSchema, buttonDesignSchema } from "$lib/schemas";

import { STEPPED_TEXT_VALUES, STEPPED_VALUES, FONT_WEIGHTS } from "$lib/utils/UI-CONSTANTS";

import { parseWidth } from "./styleParser";

let GLOBAL_MODE = 'string' // RETURN CSS AS STRING | ARRAY

const TEXT_ALIGN_VALS = [ "start", "center", "end" ];

/**
 * @param k {string} CSS Property
 * @param v {string} CSS Value
 * @returns {string|string[]|Array.<string[]>} - Return a string, or
 * array with two strings (key, value) or an array of arrays of two strings
 */
const createCssProp = (k:string, v:string) => {
	return GLOBAL_MODE === 'string'
		? `${k}: ${v};\n`
		: [k,v]
}

const appendStyles = (r, css) => {
	GLOBAL_MODE === 'string'
		? r += css
		: r.push(css)
	return r
}

const createCssPropToArray = (k,v) => ([k, v])

const boxMap = {
	width: 'width',
	height: 'height',
	margin: 'margin',
	padding: 'padding',
	border: {
		radius: "border-radius",
		color: "border-color",
		width: "border-width",
		borderStyle: "border-style",
	},
}

const backgroundMap = {
	opacity: "opacity",
	blur: "blur", 
	gradientValue: "background-image",
	backgroundColor: 'background-color',
}

const typographyMap = {
	fontSize: 'font-size',
	fontWeight: 'font-weight',
	fontFamily: 'font-family',
	textAlign: 'text-align',
	letterSpacing: 'letter-spacing',
	lineHeight: 'line-height',
	color: 'color',
}

export const boxSchema = z.object({
	width: z.string(),
	height: z.string(),
	margin: z.object({ x: z.string(), y: z.string() }),
	padding: z.object({ x: z.string(), y: z.string() }),
	border: z
		.object({
			radius: z.number(),
			color: z.string(),
			width: z.string(),
			borderStyle: z.string(),
		})
		.optional(),
})
type TextDesign = z.infer<typeof textDesignSchema>;
type Box = z.infer<typeof boxSchema>;
type Typography = z.infer<typeof typographySchema>
type Background = z.infer<typeof backgroundSchema>


const transformBoxToCss = (o: Box) => {
	let r = '';
	for (const k in o) {
		let cssProp = k as keyof Box

		switch (cssProp) {
			case 'margin':
				let marginX = STEPPED_VALUES[Number(o.margin.x)];
				let marginY = STEPPED_VALUES[Number(o.margin.y)];
				r += `margin: ${marginY} ${marginX};\n` 
				break;
			case 'padding':
				let paddingX = STEPPED_VALUES[Number(o.padding.x)];
				let paddingY = STEPPED_VALUES[Number(o.padding.y)];
				r += `padding: ${paddingY} ${paddingX};\n` 
				break;
			case 'border':
				if (!o.border || !o.border.width || !o.border.color || o.border.borderStyle) break;
				r += `border: ${o.border.width}px ${o.border.borderStyle} ${o.border.color};\n`;
				r += `border-radius: ${o.border.radius}em;\n`;
				break;
			case 'width':
				r += parseWidth(Number(o.width));
				break;
			default:
				// If the property doesn't require special treatment, just put
				// the prop name as is and use its value as is
				r += `${boxMap[cssProp]}: ${o[cssProp]};\n`
				break;
		}
	}
	return r;
}

const transformTypographyToCss = (o: Typography) => {
	let r = GLOBAL_MODE === 'string' && '' || [];
	var tmpCssValue = '';

	for (const k in o) {
		let cssProp = k as keyof Typography

		switch (cssProp) {
			case 'textAlign': 
				if (typeof o.textAlign == 'string' && isNaN(o.textAlign)) {
					tmpCssValue = o.textAlign
				} else {
					tmpCssValue = TEXT_ALIGN_VALS[Number(o.textAlign)]
				}
				r = appendStyles(r, createCssProp(typographyMap.textAlign, tmpCssValue))
				// r += createCssProp(typographyMap.textAlign, tmpCssValue)
				break;
			case 'letterSpacing':
				tmpCssValue = o.letterSpacing + 'em'
				r = appendStyles(r, createCssProp(typographyMap.letterSpacing, tmpCssValue))
				// r += createCssProp(typographyMap.letterSpacing, tmpCssValue)
				break;
			case 'lineHeight':
				tmpCssValue = o.lineHeight + '%'
				r = appendStyles(r, createCssProp(typographyMap.lineHeight, tmpCssValue))
				// r += createCssProp(typographyMap.lineHeight, tmpCssValue)
				break;
			case 'fontSize':
				tmpCssValue = STEPPED_TEXT_VALUES[Number(o.fontSize)]
				r = appendStyles(r, createCssProp(typographyMap.fontSize, tmpCssValue))
				// r += createCssProp(typographyMap.fontSize, tmpCssValue)
				break;
			case 'fontWeight':
				tmpCssValue = FONT_WEIGHTS[Number(o.fontWeight)]
				r = appendStyles(r, createCssProp(typographyMap.fontWeight, tmpCssValue))
				// r += createCssProp(typographyMap.fontWeight, tmpCssValue)
				break;
			case 'hover':
				break;
			default: 
				r = appendStyles(r, createCssProp(typographyMap[cssProp], o[cssProp]))
				// r += `${typographyMap[cssProp]}: ${o[cssProp]};\n`
		}
	}
	return r;
}

const parseGradients = (angle:any = '45right', colors: string[]) => (
	`background: ${colors[0]};
	background: -webkit-linear-gradient(${angle}, ${[...colors].reverse().join(", ")});
	background: linear-gradient(${angle}, ${[...colors].reverse().join(", ")});
	`
)

const transformBackgroundToCss = (o: Background) => {
	let r = '';
	var tmpCssValue = '';

	switch (o.type) {
		case 'gradient':
			let colors = o.gradient.stops.map(c => c.color + ' ' + c.position ?? '')
			tmpCssValue = parseGradients(o.gradient.angle, colors)
			r += tmpCssValue
			break;
		case 'color':
			tmpCssValue = `background: ${o.backgroundColor};\n opacity: ${o.opacity};\n blur: ${o.blur};`
			r += tmpCssValue
		default:
			break;
	}

	return r;
}

const transformEffectsToCss = (o: any) => {
	let r = '';
	for (const cssProp in o) {
		if (cssProp == 'dropShadow') {
			const { vertical, horizontal, blur, spread, color } = o.dropShadow;
			const boxShadowValue = vertical + ' ' + horizontal + ' ' + blur + ' ' + spread + ' ' + color;
			r += `box-shadow: ${boxShadowValue};\n`
		}
	}
	return r;
}

// TODO: Next
const transformLayoutToCss = (o: any) => {
	let r = '';
	for (const cssProp in o) {
		switch (cssProp) {
			case 'direction':
				r += `flex-direction: ${o.direction};\n`
				break;
			case 'display':
				r += 'display: flex;\n'
				break;
			case 'justifyContent':
				r += `justify-content: ${o.justifyContent};\n`
				break;
			case 'alignItems':
				r += `align-items: ${o.alignItems};\n`
				break;
			case 'gap':
				r += `gap: ${o.gap};\n`
				break;
			case 'wrap':
				r += `flex-wrap: ${o.wrap};\n`
				break;
			default:
				break;
		}
	}
	return r;
}


const parseTextStyles = ( design: TextDesign ) => {
	let r = '';

	r += transformTypographyToCss(design.typography);
	r += transformBoxToCss(design.box);
	r += transformEffectsToCss(design.effects);

	return r
}

const parseContainerStyles = ( design: any) => {
	let r = '';

	r += transformBoxToCss(design.box);
	r += transformEffectsToCss(design.effects);
	r += transformBackgroundToCss(design.background);
	r += transformLayoutToCss(design.layout);

	return r
}

const parseButtonStyles = ( design: any) => {
	let r = '';

	r += transformTypographyToCss(design.typography);
	r += transformBoxToCss(design.box);
	r += transformEffectsToCss(design.effects);
	r += transformBackgroundToCss(design.background);

	return r;
}

export const getStyles = (type: string, styles: any, mode: string = 'string') => {
	GLOBAL_MODE = mode
	let r = '';

	switch (type) {
		case 'text':
			const textStyles = textDesignSchema.parse(styles);
			r += parseTextStyles(textStyles)
			break;
		case 'container':
			const containerStyles = containerDesignSchema.parse(styles);
			r += parseContainerStyles(containerStyles)
			break
		case 'button':
			const buttonStyles = buttonDesignSchema.parse(styles);
			r += parseButtonStyles(buttonStyles)
			break;
		default:
			break;
	}

	return r;
}
