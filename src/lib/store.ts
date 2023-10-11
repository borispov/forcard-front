import { UTOPIA_DEFAULT } from './global/utopia';
import { COLOR_SCHEME_CSS, COLOR_SCHEME, GLOBAL_STYLES } from './global/global-styles';
import { writable } from 'svelte/store';
import type { Components } from '../types/components';

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
	components: <Components>[
		{
			type: "container",
			role: "div",
			id: "1",
			children: [ "2", "3", "4", ],
			design: {
					display: {
						type: "flex",
						direction: "column",
						align: "stretch"
					},
					background: {
						type: "color",
						opacity: 1,
						blur: 0,
						color: "var(--background)",
						gradient: "",
						gradientName: "",
						gradientId: ""
				},
				space: {
					margin: {y: '0', x: '0'},
					padding: {y: '4', x: '0'},
				},
				height: "auto",
				width: "auto",
				border: {},
			}
		},
		{
			type: "text",
			role: "h1",
			content: "What's Up Arik?",
			id: "2",
			design: {
				textAlign: 1,
				font: {
					'font-size': "6",
					'font-weight': "1",
				},
				color: "var(--text-color)",
				space: {
					margin: { y: '0', x: '0' },
					padding: { y: '2', x: '0' },
				},
				border: {},
				letterSpacing: 0,
				lineHeight: 110,
				width: 'auto',
			}

		},
		{
			type: "text",
			role: "h2",
			content: "This is built with Svelte (SPA) for funsies",
			id: "3",
			design: {
				textAlign: 1,
				color: "var(--text-color)",
				font: {
					'font-size': "3",
					'font-weight': "1",
				},
				space: {
					margin: { y: '0', x: '0' },
					padding: { y: '3', x: '0' },
				},
				border: {},
				letterSpacing: 0,
				lineHeight: 110,
				width: 'auto',
			}

		},
		{
			type: "container",
			role: "div",
			id: "4",
			children: [ "5", "6", ],
			design: {
				display: {
					type: 'flex',
					direction: 'row',
					align: "center"
				},
				background: {
					opacity: 1,
					blur: 0,
					type: "color",
					color: "var(--background)",
					gradient: "",
					gradientName: "",
					gradientId: ""
				},
				space: {
					margin: {y: '5', x: '0'},
					padding: {y: '6', x: '0'},
				},
				height: "auto",
				width: "auto",
				border: {},
			}
		},
		{
			type: "p",
			role: "p",
			content: "I am a text in a row, I am a text in a row",
			id: "5",
			design: {
				textAlign: 1,
				width: "55ch",
				background: "yellow",
				color: "var(--color-dark)",
				font: {
					'font-size': "2",
					'font-weight': "1",
				},
				space: {
					margin: { y: '0', x: '4' },
					padding: { y: '3', x: '4' },
				},
				border: {},
				letterSpacing: 0,
				lineHeight: 150,
			}
		},
		{
			type: "button",
			role: "button",
			content: "Uhh Click?",
			id: "6",
			settings: {
				innerHTML: "Yes, click Me",
				linkTo: "#",
				openInNewTab: false,
			},
			design: {
				textAlign: 1,
				background: "white",
				color: "black",
				font: {
					'font-size': "3",
					'font-weight': "1",
				},
				space: {
					margin: { y: '0', x: '0' },
					padding: { y: '3', x: '2' },
				},
				border: {},
				letterSpacing: 0,
				lineHeight: 110,
				width: 'auto',
			}
		},

	]
})