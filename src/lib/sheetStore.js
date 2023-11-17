import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const createStylesheetStore = () => {

	/**
	 * 
	 * @param {Object} payload 
	 * @param {string} payload.targetElement - The Element To Add Pseudo Element To
	 * @param {string} payload.pseudo - The Pseudo Element (:hover, :focus, etc)
	 */


	if (browser) {
		const { update, subscribe} = writable(new CSSStyleSheet())

		function log (s) {
			if (s) {
				let rules = s.cssRules
				for (const r of rules) {
				}
			} else {
				update(sheet => {
					let rules = sheet.cssRules
					for (const r of rules) {
					}
					return sheet
				})
			}
		}


		function addPseudoElement(payload) {
			update(sheet => {
				const { targetElement, pseudo } = payload
				let len = sheet.cssRules.length
				let pseudoExists = false
				for (const i of sheet.cssRules) {
					if (i.selectorText.includes(targetElement)) {
						if (i.selectorText.split(':')[1] === 'hover') {
							pseudoExists = true;
							break;
						}
					}
				}
				if (!pseudoExists) {
					sheet.insertRule(`#${targetElement}:${pseudo} {}`, len)
				}
				for (const i of sheet.cssRules) {
					console.log(i.selectorText)
				}
				return sheet
			})
		}


		/**
		 * 
		 * @param {Object} payload 
		 * @param {string} payload.targetElement - The Element To Add Pseudo Element To
		 * @param {Array.<string[]>} payload.styles - Array of string arrays.
		 */
		function addStyleToHover({ targetElement , styles }) {
			update(sheet => {
				for (const i of sheet.cssRules) {
					if (i.selectorText.split(':')[1] == 'hover' && i.selectorText.split(':')[0].includes(targetElement)){
						for (const cssStyle of styles) {
							let [k,v] = cssStyle
							i.style[k] = v
						}
						log(sheet)
					}
				}
				return sheet
			})
		}

		/**
		 * 
		 * @param {Object} payload 
		 * @param {string} payload.targetElement - The Element To Add Pseudo Element To
		 * @param {Array.<string[]>|string[]} payload.styles - Array of string arrays.
		 */
		function addStyle(payload) {
			const { t, styles } = payload;

			update(sheet => {
				for (const i of sheet.cssRules) {
					if (i.selectorText === `#${t}`){

						if (Array.isArray(styles[0])) {
							for (const cssStyle of styles) {
								let [k,v] = cssStyle
								i.style[k] = v
							}
						}

						let [k,v] = styles
						i.style[k] = v

						break;
					}
				}
				return sheet
			})
		}


		function deleteStyle(payload) {
			const t = payload.targetElement;

			update(sheet => {
				for (const i of sheet.cssRules) {
					if (i.selectorText === `#${t}`){
						sheet.deleteRule(t)
					}
				}
				return sheet
			})

		}

		/**
		 * 
		 * @param {Object} payload 
		 * @param {string} payload.targetElement - The Element To Add Pseudo Element To
		 * @param {string[]} payload.style - Array of string arrays.
		 */
		function addSingleStyle(payload) {
			const { t, style } = payload;
			update(sheet => {
				for (const i of sheet.cssRules) {
					console.log(t)
					console.log(i.selectorText)
					if (i.selectorText.includes(t)){
						let [k,v] = style
						i.style[k] = v
					}
					break;
				}
				return sheet
			})
		}

		
		/**
		 * @param {'DELETE_STYLE'|'ADD_PSEUDO'|'ADD_HOVER_STYLE'|'ADD_STYLES'|'ADD_SINGLE_STYLE'} action
		 * @param {Object} payload
		 */
		function dispatch(action, payload) {
			update(sheet => {
				switch (action) {
					case "ADD_PSEUDO":
						addPseudoElement(payload)
						break;
					case 'ADD_HOVER_STYLE':
						addStyleToHover(payload)
						break;
					case 'ADD_STYLES':
						addStyle(payload)
						break;
					case 'ADD_SINGLE_STYLE':
						addSingleStyle(payload)
						break;
					case 'DELETE_STYLE':
						deleteStyle(payload)
						break;
					case 'updateStyle':
						break;
				
					default:
						break;
				}
				return sheet
			})
		}

		return {
			log, 
			subscribe,
			dispatch
		}
	}
}


export const stylesheetStore = createStylesheetStore();
