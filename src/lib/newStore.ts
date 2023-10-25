import { UTOPIA_DEFAULT } from './global/utopia';
import { COLOR_SCHEME_CSS, COLOR_SCHEME, GLOBAL_STYLES } from './global/global-styles';
import { writable } from 'svelte/store';

export const componentIndex = writable(null)

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
			children: [ "2", "3", "4", ],
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
			},
				box: {
					width: "auto",
					height: "auto",
					margin: { y: "0", x: "0" },
					padding: { y: "4", x: "0" },
					border: {
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
		},
		{
			type: "text",
			role: "h1",
			content: "What's Up Arik?",
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
				},
				typography: {
					fontFamily: "inherit",
					color: "var(--text-color)",
					fontSize: "6",
					fontWeight: "1",
					textAlign: "center",
					letterSpacing: 0,
					lineHeight: 110,
				},
				box: {
					width: '100%',
					height: 'auto',
					margin: { y: '0', x: '0' },
					padding: { y: '2', x: '0' },
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