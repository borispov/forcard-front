import { UTOPIA_DEFAULT } from './global/utopia';
import { COLOR_SCHEME_CSS, COLOR_SCHEME, GLOBAL_STYLES } from './global/global-styles';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const componentIndex = writable(null)

export const createStylesheetStore = () => {

	/**
	 * 
	 * @param {Object} payload 
	 * @param {string} payload.targetElement - The Element To Add Pseudo Element To
	 * @param {string} payload.pseudo - The Pseudo Element (:hover, :focus, etc)
	 */
	function addPseudoElement(payload, updateFn) {
		updateFn(sheet => {
			const { targetElement, pseudo } = payload
			let len = sheet.cssRules.length

			let pseudoExists = false

			let targetIndex = -1 // should always exist, can't add pseudo over non existent element

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
			return sheet
		})
	}


	if (browser) {
		const { update, subscribe} = writable(new CSSStyleSheet())

		function log (s) {
			if (s) {
				let rules = s.cssRules
				for (const r of rules) {
					console.log(r)
				}
			} else {
				update(sheet => {
					let rules = sheet.cssRules
					for (const r of rules) {
						console.log(r)
					}
					return sheet
				})
			}
		}

		function addStyleToHover({ t , styles }) {
			update(sheet => {
				for (const i of sheet.cssRules) {
					if (i.selectorText.split(':')[1] == 'hover' && i.selectorText.split(':')[0].includes(t)){
						styles.map(style => {
							let [k,v] = style
							i.style[k] = v
						})
					}
				}
				return sheet
			})
		}

		function addStyle(paylaod) {
			const { t, styles } = paylaod;
			update(sheet => {
				for (const i of sheet.cssRules) {
					if (i.selectorText === t){
						styles.map(style => {
							let [k,v] = style
							i.style[k] = v
						})
					}
				}
				return sheet
			})
		}

		
		/**
		 * @param {string} action
		 */
		function dispatch(action, payload) {
			update(sheet => {
				switch (action) {
					case "ADD_PSEUDO":
						addPseudoElement(payload, update)
						break;
					case 'addStyleHover':
						addStyleToHover(payload)
						break;
					case 'addStyle':
						addStyleToHover(payload)
						break;
					case 'deleteStyle':
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
			addStyleToHover,
			dispatch
		}
	}
}

export const stylesheetStore = createStylesheetStore();

export const site = writable({
	site: {
		utopia: UTOPIA_DEFAULT,
		globalCss: GLOBAL_STYLES,
		title: 'MySite',
		description: 'Welcome to mySite, it is best in class',
		cssColorScheme: COLOR_SCHEME_CSS,
		colorScheme: COLOR_SCHEME,
		pageSettings: {
			width: "100%",
		},
	},
	components: [
		{
			type: "container",
			role: "div",
			id: "1",
			children: [ "2" ],
			design: {
				layout: {
					display: "flex",
					direction: "column",
					alignItems: "center",
					justifyContent: "center",
					gap: "10px",
					wrap: "nowrap",
				},
				background: {
					type: "gradient",
					opacity: 1,
					blur: 0,
					backgroundColor: "#a9b1b1",
					pattern: {},
					gradient: {
					gradientStyle: "linear",
					angle: 0,
					stops: [
						{ color: "#b9387a", position: "" },
						{ color: "#89c89a", position: "" },
					],
				},
				hover: {
					backgroundColor: "",
				}
			},
				box: {
					width: "100",
					height: "auto",
					margin: { y: "0", x: "0" },
					padding: { y: "4", x: "0" },
					border: {
						color: "",
						width: "",
						radius: 0,
						style: 'solid',
					},
				},
				effects: {
					dropShadow: {
						vertical: 0,
						horizontal: 0,
						blur: 0,
						spread: 0,
						color: "#0000000A",
					},
				},
			}
		},
		{
			type: "text",
			role: "h1",
			content: "What's Up Arik?sssss",
			id: "2",
			design: {
				background: {
					type: "gradient",
					opacity: 1,
					blur: 0,
					backgroundColor: "#a9b1b1",
					pattern: {},
					gradient: {
						gradientStyle: "linear",
						angle: 0,
						stops: [
							{ color: "#b9387a", position: "" },
							{ color: "#89c89a", position: "" },
						],
					},
					hover: {
						backgroundColor: "",
					}
				},
				typography: {
					fontFamily: "inherit",
					color: "var(--text-color)",
					fontSize: "6",
					fontWeight: "1",
					textAlign: "center",
					letterSpacing: 0,
					lineHeight: 110,
					hover: {
						color: "",
					}
				},
				box: {
					width: '100',
					height: 'auto',
					margin: { y: '0', x: '0' },
					padding: { y: '2', x: '0' },
				},
				effects: {
					dropShadow: {
						vertical: 0,
						horizontal: 0,
						blur: 0,
						spread: 0,
						color: "#0000000A",
					},
				},
			}
		}]
	// 	{
	// 		type: "text",
	// 		role: "h2",
	// 		content: "This is built with Svelte (SPA) for funsies",
	// 		id: "3",
	// 		design: {
	// 			background: {
	// 				type: "gradient",
	// 				opacity: 1,
	// 				blur: 0,
	// 				backgroundColor: "#a9b1b1",
	// 				pattern: {},
	// 					gradient: {
	// 					gradientStyle: "linear",
	// 					angle: 0,
	// 					stops: [
	// 						{ color: "#b9387a", position: "" },
	// 						{ color: "#89c89a", position: "" },
	// 					],
	// 				},
	// 			},
	// 			typography: {
	// 				fontFamily: "inherit",
	// 				color: "var(--text-color)",
	// 				fontSize: "6",
	// 				fontWeight: "1",
	// 				textAlign: "center",
	// 				letterSpacing: 0,
	// 				lineHeight: 110,
	// 			},
	// 			box: {
	// 				width: '100%',
	// 				height: 'auto',
	// 				margin: { y: '0', x: '0' },
	// 				padding: { y: '2', x: '0' },
	// 			},
	// 		}
	// 	},
	// 	{
	// 		type: "container",
	// 		role: "div",
	// 		id: "4",
	// 		children: [ "5", "6", ],
	// 		design: {
	// 			layout: {
	// 				display: "flex",
	// 				direction: "column",
	// 				alignItems: "center",
	// 				justifyContent: "center",
	// 				gap: "10px",
	// 				wrap: "nowrap",
	// 			},
	// 			background: {
	// 				type: "color",
	// 				opacity: 1,
	// 				blur: 0,
	// 				backgroundColor: "#f9f9f9",
	// 				pattern: {},
	// 				gradient: {
	// 					gradientStyle: "linear",
	// 					angle: 0,
	// 					stops: [
	// 						{ color: "#b9387a", position: "" },
	// 						{ color: "#89c89a", position: "" },
	// 					],
	// 				},
	// 			},
	// 			box: {
	// 				width: "auto",
	// 				height: "auto",
	// 				margin: { y: "0", x: "0" },
	// 				padding: { y: "4", x: "0" },
	// 				border: {
	// 					color: "#3d3d3d",
	// 					width: "",
	// 					radius: 0,
	// 				},
	// 			},
	// 			effects: {
	// 				dropShadow: {
	// 					vertical: 0,
	// 					horizontal: 0,
	// 					blur: 0,
	// 					spread: 0,
	// 					color: "#0000000A",
	// 				},
	// 			},
	// 	},
	// 	},
	// 	{
	// 		type: "p",
	// 		role: "p",
	// 		content: "I am a text in a row, I am a text in a row",
	// 		id: "5",
	// 		design: {
	// 			background: {
	// 				type: "none",
	// 				opacity: 1,
	// 				blur: 0,
	// 				backgroundColor: "",
	// 				pattern: {},
	// 					gradient: {
	// 					gradientStyle: "linear",
	// 					angle: 0,
	// 					stops: [
	// 						{ color: "", position: "" },
	// 						{ color: "", position: "" },
	// 					],
	// 				},
	// 			},
	// 			typography: {
	// 				fontFamily: "inherit",
	// 				color: "var(--color-dark)",
	// 				fontSize: "1",
	// 				fontWeight: "1",
	// 				textAlign: "center",
	// 				letterSpacing: 0,
	// 				lineHeight: 110,
	// 			},
	// 			box: {
	// 				width: '45ch',
	// 				height: 'auto',
	// 				margin: { y: '0', x: '4' },
	// 				padding: { y: '3', x: '4' },
	// 			},
	// 		}
	// 	},
	// ]
})