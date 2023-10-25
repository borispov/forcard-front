import { z } from "zod";


import type { 
	CssText,
} from "../../types/types";


import { textSchema, typographySchema, backgroundSchema } from "$lib/schemas";

import { STEPPED_TEXT_VALUES, STEPPED_VALUES, FONT_WEIGHTS } from "$lib/utils/UI-CONSTANTS";

const TEXT_ALIGN_VALS = [ "start", "center", "end" ];
const createCssProp = (k, v) => `${k}: ${v};\n`

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
type Text = z.infer<typeof textSchema>;
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
			case 'padding':
				let paddingX = STEPPED_VALUES[Number(o.padding.x)];
				let paddingY = STEPPED_VALUES[Number(o.padding.y)];
				r += `padding: ${paddingY} ${paddingX};\n` 
			case 'border':
				if (!o.border) break
				r += `border: ${o.border.width}px ${o.border.borderStyle} ${o.border.color};\n`;
				r += `border-radius: ${o.border.radius}em;\n`;
			default:
				// If the property doesn't require special treatment, just put
				// the prop name as is and use its value as is
				r += `${boxMap[cssProp]}: ${o[cssProp]};\n`
		}
	}
	return r;
}

const transformTypographyToCss = (o: Typography) => {
	let r = '';
	var tmpCssValue = '';

	for (const k in o) {
		let cssProp = k as keyof Typography

		switch (cssProp) {
			case 'textAlign': 
				if (typeof o.textAlign == 'string') {
					tmpCssValue = o.textAlign
				} else {
					tmpCssValue = TEXT_ALIGN_VALS[Number(o.textAlign)]
				}
				r += createCssProp(typographyMap.textAlign, tmpCssValue)
			case 'letterSpacing':
				tmpCssValue = o.letterSpacing + 'em'
				r += createCssProp(typographyMap.letterSpacing, tmpCssValue)
			case 'lineHeight':
				tmpCssValue = o.lineHeight + '%'
				r += createCssProp(typographyMap.lineHeight, tmpCssValue)
			case 'fontSize':
				tmpCssValue = STEPPED_TEXT_VALUES[Number(o.fontSize)]
				r += createCssProp(typographyMap.fontSize, tmpCssValue)
			case 'fontWeight':
				tmpCssValue = FONT_WEIGHTS[Number(o.fontWeight)]
				r += createCssProp(typographyMap.fontWeight, tmpCssValue)
			default: 
				r += `${typographyMap[cssProp]}: ${o[cssProp]};\n`
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



const parseTextStyles = ( design: any ) => {
	let r = '';

	r += transformTypographyToCss(design.typography);
	r += transformBoxToCss(design.box);
	r += transformEffectsToCss(design.effects);

	return r
}

const parseContainerStyles = ( design: any) => {
	let r = '';

	r += transformTypographyToCss(design.typography);
	r += transformBoxToCss(design.box);
	r += transformEffectsToCss(design.effects);
	r += transformBoxToCss(design.background);

	return r
}

export const getStyles = (type: string, styles: any) => {
	let r = '';

	switch (type) {
		case 'text':
			const textStyles = textSchema.parse(styles);
			r += parseTextStyles(textStyles.design)
		case 'container':
			r += parseContainerStyles(textStyles.design)
		default:
			break;
	}

	console.log(r)
	return r;
}
