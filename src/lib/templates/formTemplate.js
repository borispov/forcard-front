
// TODO: Finihs workign on our first FORM element template!!!
const formElement = {
	id: "form-wrapper",
	dataset: {
		name: 'form'
	},
	type: "form",
	role: "form",
	children: [
		"form__label-1", "form__input-1",
		"form__label-2", "form__input-2",
		"form__label-3", "form__input-3",
		"form-button"

],
	design: {
		layout: {
			display: "flex",
			direction: "column",
			alignItems: "start",
			justifyContent: "space-around",
			gap: "8px",
			wrap: "nowrap",
			flow: true,
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
			maxWidth: '300px',
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
				horizontal: 1,
				blur: 0,
				spread: 0,
				color: "#00000088",
			},
		},
		misc: {
			label: {
				typography: {
					fontFamily: "inherit",
					color: '#3d3d3d',
					fontSize: "0",
					fontWeight: "0",
					textAlign: 0,
					letterSpacing: 0,
					lineHeight: 120,
					hover: {
						color: "",
					}
				},
				box: {
					width: '100',
					height: 'auto',
					margin: { y: '0', x: '0' },
					padding: { y: '0', x: '0' },
				},
			},
			input: {
				typography: {
					fontFamily: "inherit",
					color: '#8a97a0',
					fontSize: "0",
					fontWeight: "1",
					textAlign: 0,
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
					padding: { y: '3', x: '3' },
				},
				misc: {
					'outline': 'none',
					'background': '#e8eeef',

				}
			},
			button: {
				layout: {
					display: "flex",
					direction: "row",
					alignItems: "center",
					justifyContent: "center",
					gap: "10px",
					wrap: "nowrap",
				},
				typography: {
					fontFamily: "inherit",
					color: "#111111",
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
					width: "100",
					height: "auto",
					margin: { y: "0", x: "0" },
					padding: { y: "2", x: "5" },
					border: {
						style: 'solid',
						color: "#3d3d3d",
						width: "",
						radius: 0,
					},
				},
				effects: {
					dropShadow: {
						vertical: 1,
						horizontal: 0,
						blur: 9,
						spread: 0,
						color: "#0000006A",
					},
				},
			},
		}
	}
};


const makeLabel = (num, labelContent, forId) => ({
	id: `form__label-${num}`,
	dataset: {
		name: 'form-label'
	},
	type: `form-element`,
	role: "label",
	content: labelContent,
	for: forId,
	design: {
		typography: {
		},
	}
})

const makeInput = (num, type, inputProps) => ({
	id: `form__input-${num}`,
	dataset: {
		name: 'form-input',
		type,
	},
	type: 'form-element',
	role: "input",
	settings: inputProps,
})

const makeButton = (content, inputProps) => ({
	id: `form-button`,
	dataset: {
		name: 'form-button'
	},
	type: 'form-element',
	role: "button",
	content: content,
	settings: inputProps,
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
})


export const formTemplate = [
	formElement,
	makeLabel(1, 'name', 'name'),
	makeLabel(2, 'email', 'email'),
	makeLabel(3, 'note', 'note'),
	makeInput(1, 'text', { name: 'name', placeholder: "John doe", required: true }),
	makeInput(2, 'text', { name: 'email', placeholder: "johndoe@gmail.com", required: true }),
	makeInput(3, 'note', { name: 'note', placeholder: "Your message here", required: false }),
	makeButton('Submit'),
]

