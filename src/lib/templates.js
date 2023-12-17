const serviceElement = {
	id: "service-container",
	type: "container",
	role: "div",
	children: ["service-1", "service-2", "service-3"],
	design: {
		layout: {
			display: "flex",
			direction: "row",
			alignItems: "center",
			justifyContent: "space-around",
			gap: "20px",
			wrap: "nowrap",
		},
		background: {
			type: "color",
			opacity: 1,
			blur: 0,
			backgroundColor: "#f9f9f9",
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
			padding: { y: "6", x: "3" },
			border: {
				style: 'solid',
				color: "#3d3d3d",
				width: "0",
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

const serviceTemplate = (serviceNum) => ({
	id: `service-${serviceNum}`,
	type: "container",
	role: "div",
	children: [`service-${serviceNum}-icon`, `service-${serviceNum}-header`, `service-${serviceNum}-text`],
	design: {
		layout: {
			display: "flex",
			direction: "column",
			alignItems: "center",
			justifyContent: "flex-start",
			gap: "10px",
			wrap: "nowrap",
		},
		background: {
			type: "color",
			opacity: 1,
			blur: 0,
			backgroundColor: "",
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
			padding: { y: "0", x: "0" },
			border: {
				style: 'solid',
				color: "#3d3d3d",
				width: "0",
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
});

const makeIcon = (serviceNum) => ({
	id: `service-${serviceNum}-icon`,
	type: "icon",
	role: "svg",
	media: "", // should it be a path to the icon??
	design: {
		background: {
			type: "color",
			opacity: 1,
			blur: 0,
			backgroundColor: "black",
			pattern: {},
			hover: {
				backgroundColor: "",
			}
	},
		box: {
			width: "auto",
			height: "auto",
			margin: { y: "0", x: "0" },
			padding: { y: "0", x: "0" },
			border: {
				style: '',
				color: "",
				width: "0",
				radius: 0,
			},
		},
	}
})

const makeHeader = (serviceNum, content) => ({
	id: `service-${serviceNum}-header`,
	role: "h2",
	type: "text",
	content: content,
	design: {
		typography: {
			fontFamily: "inherit",
			color: "#000000",
			fontSize: "2",
			fontWeight: "1",
			textAlign: "center",
			letterSpacing: "0",
			lineHeight: 110,
			hover: {
				color: "",
			}
		},
		box: {
			width: '100%',
			height: 'auto',
			margin: { y: '1', x: '0' },
			padding: { y: '0', x: '0' },
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
})


const makeParagraph = (serviceNum, content) => ({
	id: `service-${serviceNum}-text`,
	type: "text",
	role: "p",
	content: content,
	design: {
		typography: {
			fontFamily: "inherit",
			color: "#000000",
			fontSize: "0",
			fontWeight: "0",
			textAlign: "center",
			letterSpacing: "0",
			lineHeight: 130,
			hover: {
				color: "",
			}
		},
		box: {
			width: '100%',
			height: 'auto',
			margin: { y: '0', x: '0' },
			padding: { y: '0', x: '0' },
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
})

export const servicesLayout = [
		serviceElement,
		serviceTemplate(1),
		serviceTemplate(2),
		serviceTemplate(3),
		makeIcon(1),
		makeIcon(2),
		makeIcon(3),
		makeHeader(1, "Fast & Reliable"),
		makeHeader(2, "Decades Of Experience"),
		makeHeader(3, "Passion For Our Craft"),
		makeParagraph(1, "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia."),
		makeParagraph(2, "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident."),
		makeParagraph(3, "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."),
]

