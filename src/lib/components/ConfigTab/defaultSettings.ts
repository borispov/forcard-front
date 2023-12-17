import type { ComponentRole, Layout, Text } from "$lib/schemas";

const btnConf = {
	content: "Click Me",
	settings: {
		linkTo: '#',
		openInNewTab: true,
	},
	design: {
		layout: {
			display: "flex",
			direction: "row",
			alignItems: "center",
			justifyContent: "space-between",
			gap: "10px",
			wrap: "nowrap",
		},
		typography: {
			fontFamily: "inherit",
			color: "var(--color-dark)",
			fontSize: "1",
			fontWeight: "2",
			textAlign: "center",
			letterSpacing: "-0.025",
			lineHeight: 110,
			hover: {
				color: "",
			}
		},
		background: {
			type: "color",
			opacity: 1,
			blur: 0,
			backgroundColor: "var(--color-primary)",
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
			width: "auto",
			height: "auto",
			margin: { y: "0", x: "0" },
			padding: { y: "2", x: "3" },
			border: {
				style: 'solid',
				color: "#3d3d3d",
				width: "",
				radius: 0,
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
}

const textConf = {
	content: "I'm a headline, be concise and accurate.",
	design: {
		background: {
			type: "color",
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
			fontSize: "4",
			fontWeight: "2",
			textAlign: "center",
			letterSpacing: "-0.025",
			lineHeight: 110,
			hover: {
				color: "",
			}
		},
		box: {
			width: '100%',
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
};

const paragraphConf = {
	content: "I'm a paragraph, edit me as you see fit, write something awesome!",
	design: {
		...textConf.design,
		background: {
			...textConf.design.background
		},
		typography: {
			...textConf.design.typography,
			fontSize: "1",
			fontWeight: "1",
			lineHeight: 150,
			letterSpacing: 0,
		}
	}
}

const divConf = {
	children: [],
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
			type: "color",
			opacity: 1,
			blur: 0,
			backgroundColor: "#ffffff",
			pattern: {},
				gradient: {
				gradientStyle: "linear",
				angle: 0,
				stops: [
					{ color: "#b9387a", position: "" },
					{ color: "#89c89a", position: "" },
				],
			},
			image: {
				overlay: {
					backgroundColor: "",
					blendMode: "default",
				},
				settings: {
					source: '',
					altText: 'alt text is good for accessibility',
					link: {},
					placeholder: true,
					placeholder_source: "https://images.placeholders.dev/?width=1055&height=100&text=This%20is%20just%20a%20placeholder&bgColor=%239af273&textColor=%236d6e71",
				},
			},
			hover: {
				backgroundColor: "",
			}
	},
		box: {
			width: "auto",
			height: "auto",
			margin: { y: "0", x: "0" },
			padding: { y: "4", x: "4" },
			border: {
				style: 'solid',
				color: "#3d3d3d",
				width: "",
				radius: 0,
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
};

const imgConf = {
	settings: {
		source: '',
		altText: 'alt text is good for accessibility',
		link: {},
		placeholder: true,
		placeholder_source: "https://images.placeholders.dev/?width=1055&height=100&text=This%20is%20just%20a%20placeholder&bgColor=%239af273&textColor=%236d6e71",
	},
	design: {
		imgSettings: {
			imgFilter: "none",
			bend: "",
		},
		layout: {
			position: "static",
			top: "auto",
			bottom: "auto",
			right: "auto",
			left: "auto",
		},
		box: {
			maxWidth: "100%",
			width: "auto",
			height: "auto",
			margin: { y: "0", x: "0" },
			padding: { y: "4", x: "4" },
			border: {
				borderStyle: 'solid',
				color: "#3d3d3d",
				width: "",
				radius: 0,
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
}

export const populateImgDefaults = 
(id: string, role: ComponentRole = 'img') => {
	return {
		id,
		type: 'img',
		role,
		...imgConf
	}
}

export const populateBtnDefaults = 
(id: string, role: ComponentRole = 'button') => {
	let buttonData = structuredClone(btnConf);
	return {
		id,
		type: 'button',
		role,
		...buttonData
	}
}

export const populateDivDefaults = (id: string, role: string = 'div'): Layout => {
	let containerData = structuredClone(divConf);
	return {
		id,
		role,
		type: 'container',
		...containerData
	}
}

export const populateTextDefaults = (id: string, role: string = 'h2'): Text => {
	const textData = structuredClone(textConf);
	return {
		type: 'text',
		role: 'h1',
		id,
		...textData
	}
}

export const populateParagraphDefaults = (id: string, role: ComponentRole = 'p'): Text => {
	const paragraphData = structuredClone(paragraphConf);
	return {
		type: 'text',
		role,
		id,
		...paragraphData
	}
}


// const pageConf = {
// 	design: {
// 		"padding-top": "var(--pt)",
// 		"padding-bottom": "var(--pb)",
// 		dir: "rtl",
// 		background: "var(--g-bg-color)",
// 		color: "var(--g-text-color)",
// 		"font-family": "var(--g-ff)",
// 		"font-size": "var(--g-fs)",
// 		"font-weight": "var(--g-fw)",
// 		"line-height": "var(--g-line-height)",
// 		"letter-spacing": "var(--g-ls)",
// 		"text-alignment": "var(--g-text-alignment)",
// 		"margin-top": "",
// 		"margin-bottom": "",
// 		"padding-top": "",
// 		"padding-bottom": "",
// 	},
// };





const divConfig = {
	id: "div-",
	type: "container",
	children: [
		{
			ids: [],
			align: "auto",
			spacer: false, // do I need this? maybe .flow class
		},
	],
	design: {
		media: {
			image: {
				assetId: "",
				css: {
					parallax: false,
					position: "center",
					size: "fit",
					sizevalue: 25,
					colorBG: "",
				},
			},
		},
		background: {
			blur: 0,
			type: "image",
			color: "#fff",
			opacity: 1,
			gradient: {
				data: "",
			},
		},
		overlay: {
			style: "color",
			color: "#730D0DC0",
			gradient: {
				data: "",
			},
		},

		// BORDERS
		border: {
			style: "solid",
			width: 1,
			top: 0,
			bottom: 0,
			right: 0,
			left: 0,
		},

		borderRadius: 0,

		margin: {
			x: "auto",
			y: "10px",
		},
		// margin: { x: 0, y: 0 } // This way we can adhere to the Utopia
		// convention and still easily set separately block and inline
		// paddings and margins rather than for the whole BOX only.

		// padding: { x: 0, y: 0 }
		padding: 0,
		height: "auto",
		width: "auto",

		dropShadow: {
			x: 0,
			y: 0,
			distance: 0,
			blur: 0,
			color: "rgba(0,0,0,0.16)",
		},

		// Used to align the contents within the <div>
		content: {
			align: "start",
			margins: 0.125,
			position: "center",
			spacing: 1,
			width: 50,
		},
	},
	// for later
	animation: {
		onvisible: {
			delay: 0,
			intensity: 5,
			replay: false,
			speed: 1000,
			style: "none",
		},
	},
	mobile: {},
};
