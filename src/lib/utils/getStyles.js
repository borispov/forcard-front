import { parseWidth, parseWidthValue } from "./styleParser";

import {
	STEPPED_VALUES,
	STEPPED_TEXT_VALUES,
	FONT_WEIGHTS
} from "$lib/utils/UI-CONSTANTS";

import { parseBackgroundColor, parseGradients } from '$lib/utils/parseStyles.ts'

const TEXT_ALIGN_VALS = [ "start", "center", "end" ];

const createCssProp = (k, v) => [k,v]

export function handleStyleChange(node, { prop, value, path, designObject}) {
	let r;
	let cat = path[0]

	if (node) {
		cat = node.dataset.category
	}


	console.log('path: ', path)
	console.log('prop: ', prop)
	console.log('val: ', value)

	switch (cat) {
		default: case 'box':
			prop = path[1]
			switch (true) {
				case prop === 'width':
					r = parseWidthValue(value)
					break;
				case prop === 'margin' || prop === 'padding':
					path[2] === 'y'
						? r = [prop + '-block', STEPPED_VALUES[value]]
						: r = [prop + '-inline', STEPPED_VALUES[value]]
					break;
				case prop === 'border':
					let borderValue = path[2] === 'width' ? value + 'px' : value
					r = createCssProp('border-' + path[2], borderValue)
					console.log(r)
					break;
				default: 
					r = ['', '']
					break;
			}
		case 'background': 
			switch (true) {
				default: case prop === 'type':
					if (value == 'color') {
						r = parseBackgroundColor(designObject)
					} else if (value == 'gradient') {
						r = parseGradients('45deg', designObject)
					}
					break;
				case prop === 'backgroundColor':
					r = parseBackgroundColor(designObject, 'array')
					break;
				// The Proxy passes insufficient data when just changing those
				// values, it does not send the whole update object.
				case prop === 'color' || prop === 'gradientName':
					break;
				case path[1] === 'gradient':
					let colors = designObject.gradient.stops.map(c => c.color + ' ' + c.position ?? '')
					r = parseGradients('45deg', colors, 'array')
					break;
		}
	}

	return r
}
