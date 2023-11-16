import { z } from "zod";

import { containerDesignSchema, textDesignSchema, typographySchema, backgroundSchema, buttonDesignSchema } from "$lib/schemas";

import { STEPPED_TEXT_VALUES, STEPPED_VALUES, FONT_WEIGHTS } from "$lib/utils/UI-CONSTANTS";

import { parseBorder, parseWidth, parseWidthValue } from "./styleParser";

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

const appendStyles = (r: any, css: any) => {
	if ( GLOBAL_MODE === 'string' ) {
		return r + css
	} else {
		if (typeof css[0] === 'string') {
			r.push(css)
		} else {
			r = r.concat(css)
		}

		// r = r.push(css)
		// r.concat(css).flatMap(style => Array.isArray(style[0]) ? style : [style])
	}
	return r
}

const boxMap = {
	width: 'width',
	height: 'height',
	margin: 'margin',
	padding: 'padding',
	border: {
		radius: "border-radius",
		color: "border-color",
		width: "border-width",
		style: "border-style",
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
			style: z.string(),
		})
		.optional(),
})
type TextDesign = z.infer<typeof textDesignSchema>;
type Box = z.infer<typeof boxSchema>;
type Typography = z.infer<typeof typographySchema>
type Background = z.infer<typeof backgroundSchema>


export const transformImageToCss = (o) => {
	var tmpCssValue: string | string[] | string[][] = '';
	let r = [];

	for (const k in o) {
		let cssProp = k

		switch (cssProp) {
			case 'imgFilter':
				tmpCssValue = createCssProp('filter', o.imgFilter);
				r  = appendStyles(r, tmpCssValue)
				break;
				default: break;
		}
	}

	return r;
}

export const transformBoxToCss = (o: Box) => {
	var tmpCssValue: string | string[] | string[][] = '';

	let r = []

	for (const k in o) {
		let cssProp = k as keyof Box

		switch (cssProp) {
			case 'margin':
				let marginX = STEPPED_VALUES[Number(o.margin.x)];
				let marginY = STEPPED_VALUES[Number(o.margin.y)];
				tmpCssValue = createCssProp(cssProp, `${marginY} ${marginX}`)
				r = appendStyles(r, tmpCssValue)
				// r += `margin: ${marginY} ${marginX};\n` 
				break;
			case 'padding':
				let paddingX = STEPPED_VALUES[Number(o.padding.x)];
				let paddingY = STEPPED_VALUES[Number(o.padding.y)];
				tmpCssValue = createCssProp(cssProp, `${paddingY} ${paddingX}`)
				r =  appendStyles(r, tmpCssValue)
				// r += `padding: ${paddingY} ${paddingX};\n` 
				break;
			case 'border':
				if (!o.border || !o.border.width || !o.border.color || !o.border.style) break;
				r = appendStyles(r, createCssProp( 'border', `${o.border.width}px ${o.border.style} ${o.border.color}`))
				r = appendStyles(r, createCssProp('border-radius', `${o.border.radius}em`))
				break;
			case 'width':
				tmpCssValue = GLOBAL_MODE === 'string'
					? parseWidth(Number(o.width))
					: parseWidthValue(Number(o.width))
				r = appendStyles(r, tmpCssValue)
				// r += parseWidth(Number(o.width));
				break;
			default:
				tmpCssValue = createCssProp(boxMap[cssProp], o[cssProp])
				r = appendStyles(r, tmpCssValue)
				// r += `${boxMap[cssProp]}: ${o[cssProp]};\n`
				break;
		}
	}
	return r
}

const transformTypographyToCss = (o: Typography) => {
	var tmpCssValue = '';
	let r = [];

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

export const parseGradients = (angle:any = '45right', colors: string[], mode = GLOBAL_MODE): string|string[][] => (
	mode === 'string'
		? `background: ${colors[0]};
	background: -webkit-linear-gradient(${angle}, ${[...colors].reverse().join(", ")});
	background: linear-gradient(${angle}, ${[...colors].reverse().join(", ")});
	` : [
		['background', `${colors[0]}`],
		['background', `-webkit-linear-gradient(${angle}, ${[...colors].reverse().join(", ")})`],
		['background', `linear-gradient(${angle}, ${[...colors].reverse().join(", ")})`]
	]
)

export const parseBackgroundColor = ( o: Background, mode = GLOBAL_MODE ) => {
	let r = mode == 'string'
		? `background: ${o.backgroundColor};\n opacity: ${o.opacity};\n blur: ${o.blur};`
		: [
			['background', o.backgroundColor], ['opacity', `${o.opacity}`], ['blur', `${o.blur}`]
		]
	return r
}

const transformBackgroundToCss = (o: Background) => {
	var tmpCssValue:string | string[][] = '';

	switch (o.type) {
		default:
		case 'gradient':
			let colors = o.gradient.stops.map(c => c.color + ' ' + c.position ?? '')
			return parseGradients(o.gradient.angle, colors)
			tmpCssValue = parseGradients(o.gradient.angle, colors)
			// r = appendStyles(r, tmpCssValue)
			// r += tmpCssValue
			break;
		case 'color':
			return parseBackgroundColor(o)
			tmpCssValue = parseBackgroundColor(o)
			// r = appendStyles(r, tmpCssValue)
			// r += tmpCssValue
	}
	return tmpCssValue
}

const transformEffectsToCss = (o: any) => {
	var tmpCssValue: string | string[] = '';
	let r = [];
	for (const cssProp in o) {
		if (cssProp == 'dropShadow') {
			const { vertical, horizontal, blur, spread, color } = o.dropShadow;
			const boxShadowValue = vertical + 'px ' + horizontal + 'px ' + blur + 'px ' + spread + 'px ' + color;
			tmpCssValue = createCssProp('box-shadow', boxShadowValue)
			console.log(tmpCssValue)
			r = appendStyles(r, tmpCssValue)
			// r += `box-shadow: ${boxShadowValue};\n`
		}
	}
	return r;
}

// TODO: Next
const transformLayoutToCss = (o: any) => {
	var tmpCssValue: string | string[] = '';
	let r = [];

	for (const cssProp in o) {
		switch (cssProp) {
			case 'direction':
				tmpCssValue = createCssProp('flex-direction', o.direction)
				r = appendStyles(r, tmpCssValue)
				// r += `flex-direction: ${o.direction};\n`
				break;
			case 'display':
				tmpCssValue = createCssProp('display', 'flex')
				r = appendStyles(r, tmpCssValue)
				// r += 'display: flex;\n'
				break;
			case 'justifyContent':
				tmpCssValue = createCssProp('justify-content', o.justifyContent)
				r = appendStyles(r, tmpCssValue)
				// r += `justify-content: ${o.justifyContent};\n`
				break;
			case 'alignItems':
				tmpCssValue = createCssProp('align-items', o.alignItems)
				r = appendStyles(r, tmpCssValue)
				// r += `align-items: ${o.alignItems};\n`
				break;
			case 'gap':
				tmpCssValue = createCssProp('gap', o.gap)
				r = appendStyles(r, tmpCssValue)
				// r += `gap: ${o.gap};\n`
				break;
			case 'wrap':
				tmpCssValue = createCssProp('flex-wrap', o.wrap)
				r = appendStyles(r, tmpCssValue)
				// r += `flex-wrap: ${o.wrap};\n`
				break;
			default:
				break;
		}
	}
	return r;
}


const parseTextStyles = (r: string | [], design: TextDesign ) => {
	r = appendStyles(r, transformTypographyToCss(design.typography))
	r = appendStyles(r, transformBoxToCss(design.box))
	r = appendStyles(r, transformEffectsToCss(design.effects))
	return r
}

const parseContainerStyles = (r: string | [], design: any) => {
	r = appendStyles(r, transformBackgroundToCss(design.background))
	r = appendStyles(r, transformBoxToCss(design.box))
	r = appendStyles(r, transformEffectsToCss(design.effects))
	r = appendStyles(r, transformLayoutToCss(design.layout))
	return r
}

const parseButtonStyles = (r: string | [], design: any) => {
	r = appendStyles(r, transformTypographyToCss(design.typography))
	r = appendStyles(r, transformBoxToCss(design.box))
	r = appendStyles(r, transformEffectsToCss(design.effects))
	r = appendStyles(r, transformBackgroundToCss(design.background))
	return r;
}

// TODO: get img styles right
const parseImageStyles = (r: string | [], design: any) => {
	r = appendStyles(r, transformBoxToCss(design.box))
	r = appendStyles(r, transformEffectsToCss(design.effects))
	console.log('inside parser' , r)
	return r
}

export const getStyles = (type: string, styles: any, mode: string = 'string') => {
	GLOBAL_MODE = mode
	let r = GLOBAL_MODE === 'string' ? '' : [];

	switch (type) {
		case 'text':
			const textStyles = textDesignSchema.parse(styles);
			r = parseTextStyles(r, textStyles)
			break;
		case 'container':
			const containerStyles = containerDesignSchema.parse(styles);
			r = parseContainerStyles(r, containerStyles)
			break
		case 'img':
			r = parseImageStyles(r, styles)
			break;
		case 'button':
			const buttonStyles = buttonDesignSchema.parse(styles);
			r = parseButtonStyles(r, buttonStyles)
			break;
		default:
			break;
	}
	return r;
}
