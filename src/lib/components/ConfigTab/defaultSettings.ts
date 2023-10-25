import type { ImageElement, ButtonElement, ComponentRole, ContainerElement, TextElement } from "../../../types/components";
import type { CssBackground, CssBox, CssDiv, CssFlexLayout, CssGradient } from "../../../types/types";

const btnConf = {
	content: "Click Me",
	settings: {
		linkTo: '#',
		openInNewTab: true,
	},
	design: {
		letterSpacing: 0,
		lineHeight: 150,
		textAlign: 1,
		font: {
			'font-size': '1',
			'font-weight': '1',
		},
		space: {
			margin: { x: '0', y: '0'},
			padding: { x: 'var(--step-s)', y: 'var(--step-3xs)'}
		},
		shadow: {
			x: 0, y: 0, distance: 0, blur: '9px', color: 'rgba(0,0,0,0.08)'
		},
		background: {
			opacity: 1,
			blur: 0,
			type: "color",
			color: "white",
			gradient: "",
			gradientName: "",
			gradientId: ""
		},
		color: "var(--text-color)",
		border: {},
	}
}

const paragraphConf = {
	content: "Default Parapgraph, Edit Me As You Wish...",
	design: {
		color: "var(--text-color)",
		width: '60',
		font: {
			'font-size': '1',
			'font-weight': '1',
		},
		textAlign: 1,
		lineHeight: 150,
		space: {
			margin: { x: '0', y: '0'},
			padding: { x: '0', y: '0'}
		},
		border: {},
		letterSpacing: 0,
	},
}

const textConf = {
	content: "Text",
	design: {
		color: "var(--text-color)",
		width: '60',
		font: {
			'font-size': '4',
			'font-weight': '1',
		},
		textAlign: 1,
		lineHeight: 110,
		space: {
			margin: { x: '0', y: '0'},
			padding: { x: '0', y: '0'}
		},
		border: {},
		letterSpacing: 0,
	},
};

const divConf = {
	children: [],
	design: {
		display: {
			type: 'flex',
			direction: 'row',
			align: 'center',
		},
		background: {
			opacity: 1,
			blur: 0,
			type: "color",
			color: "red",
			gradient: "",
			gradientName: "",
			gradientId: ""
		},
		space: {
			margin: {y: '0', x: '0'},
			padding: {y: '0', x: '0'},
		},
		height: "350px",
		width: 100,
		border: {},
	},
};

const initialContainer = {
	design: {
		layout: {
			display: "flex" ,
			direction: 'column',
			justifyContent: "center",
			alignItems: 'flex-start',
			gap: '10px',
			wrap: 'nowrap',
		} as CssFlexLayout,
		box: {
			width: 'auto',
			height: 'auto',
			margin: {y: '0', x: '0'},
			padding: {y: '0', x: '0'},
		} as CssBox,
		background: {
			type: 'none',
			opacity: 1,
			blur: 0,
			backgroundColor: 'inherit',
			backgroundSize: '',
			backgroundPosition: '',
			backgroundRepeat: '',
		} as CssBackground | CssGradient,
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
		width: "100%",
		height: "100%",
		border: {},
		imgFilter: "",
		position: "static",
		space: {
			margin: {y: '0', x: '0'},
			padding: {y: '0', x: '0'},
		},
	}
}

export const populateImgDefaults = 
(id: string, role: ComponentRole = 'img'): ImageElement => {
	return {
		id,
		type: 'img',
		role,
		...imgConf
	}
}

export const populateBtnDefaults = 
(id: string, role: ComponentRole = 'button'): ButtonElement => {
	return {
		id,
		type: 'button',
		role,
		...btnConf
	}
}

export const populateDivDefaults = (id: string, role: ComponentRole= 'div'): ContainerElement => {
	return {
		id,
		type: 'container',
		role,
		...divConf
	}
}

// try new div - flex all approach 
export const initContainer = (id: string, role = 'div'): CssDiv => {
	let containerData = structuredClone(initialContainer);
	return {
		id,
		role,
		type: 'container',
		children: [],
		...containerData
	}
}

export const populateTextDefaults = (id: string, role: ComponentRole = 'h2'): TextElement => {
	return {
		type: 'text',
		role,
		id,
		...textConf
	}
}

export const populateParagraphDefaults = (id: string, role: ComponentRole = 'p'): TextElement => {
	return {
		type: 'p',
		role,
		id,
		...paragraphConf
	}
}


const pageConf = {
	design: {
		"padding-top": "var(--pt)",
		"padding-bottom": "var(--pb)",
		dir: "rtl",
		background: "var(--g-bg-color)",
		color: "var(--g-text-color)",
		"font-family": "var(--g-ff)",
		"font-size": "var(--g-fs)",
		"font-weight": "var(--g-fw)",
		"line-height": "var(--g-line-height)",
		"letter-spacing": "var(--g-ls)",
		"text-alignment": "var(--g-text-alignment)",
		"margin-top": "",
		"margin-bottom": "",
		"padding-top": "",
		"padding-bottom": "",
	},
};





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
