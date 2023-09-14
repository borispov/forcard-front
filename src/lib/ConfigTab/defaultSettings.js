const divConf = {
	children: [],
	design: {
		display: {
			type: 'flex',
			direction: 'row',
			align: 'stretch',
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
		width: "100%",
		border: {},
		gap: "1",
		background: "#fff",
		border: "none",
		"box-shadow": "0",
	},
};

export const populateDivDefaults = (id, role = 'div') => {
	console.log("HELLO POPULATING DIV ENERGIES")
	return {
		id,
		type: 'container',
		role,
		...divConf
	}
}

export const populateTextDefaults = (id, role = 'h2') => {
	console.log("HELLO POPULATING TXTOR ENERGIES")
	return {
		id,
		type: 'text',
		role,
		...textConf
	}
}
const textConf = {
	content: "Text",
	design: {
		font: {
			size: 'inherit',
		},
		textAlign: 'start',
		space: {
			margin: { x: '0', y: '0'},
			padding: { x: '0', y: '0'}
		},
		border: {},
		color: "var(--text-color)",
	},
};

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
