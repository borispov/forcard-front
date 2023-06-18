import { UTOPIA_DEFAULT } from './global/utopia';
import { COLOR_SCHEME, GLOBAL_STYLES } from './global/global-styles';
import { writable } from 'svelte/store';

export const site = writable({
	site: {
		utopia: UTOPIA_DEFAULT,
		globalCss: GLOBAL_STYLES,
		title: 'MySite',
		description: 'Welcome to mySite, it is best in class',
		colorScheme: COLOR_SCHEME,
	},
	components: [
		{
			type: "container",
			role: "div",
			id: "1",
			children: [
				{
					id: "2",
				},
				{
					id: "3",
				},
				{
					id: "4",
				}
			],
			design: {
					display: {
						display: "flex",
						direction: "column",
					},
					background: {
					opacity: 1,
					blur: 0,
					type: "color",
					color: "var(--background)",
					gradient: {
						data: "",
					},
				},
				space: {
					margin: {y: '--space-s', x: '0'},
					padding: {y: '--space-s', x: '0'},
				},
				margin: {
					'block': "0",
					'inline': "auto",
				},
				padding: {
					'block': "--space-s",
					'inline': "--space-s",
				},
				height: "auto",
				width: "auto",
				border: "",
			}
		},
		{
			type: "text",
			role: "h1",
			content: "I'm child; #2",
			id: "2",
			design: {
				color: "var(--text-color)",
				"font-size": "var(--step-6)",
				space: {
					padding: { y: '--space-l', x: '0' },
				},
				border: "",
			}

		},
		{
			type: "text",
			role: "h1",
			content: "I'm child #3",
			id: "3",
			design: {
				color: "var(--text-color)",
				"font-size": "var(--step-6)",
				space: {
					padding: { y: '--space-l', x: '0' },
				},
				border: "",
			}

		},
		{
			type: "container",
			role: "div",
			id: "4",
			children: [
				{
					id: "5",
				},
				{
					id: "6",
				},
			],
			design: {
				display: {
					display: 'flex',
					direction: 'row',
				},
				background: {
					opacity: 1,
					blur: 0,
					type: "color",
					color: "var(--background)",
					gradient: {
						data: "",
					},
				},
				space: {
					margin: {y: '--space-s', x: '0'},
					padding: {y: '--space-s', x: '0'},
				},
				margin: {
					'block': "0",
					'inline': "auto",
				},
				padding: {
					'block': "--space-s",
					'inline': "--space-s",
				},
				height: "auto",
				width: "auto",
				border: "",
			}
		},
		{
			type: "text",
			role: "h1",
			content: "I'm a child #5 of Child #4",
			id: "5",
			design: {
				background: "blue",
				color: "white",
				"font-size": "var(--step-2)",
				space: {
					padding: { y: '--space-s', x: '0' },
				},
				border: "",
			}
		},
		{
			type: "text",
			role: "button",
			content: "click me",
			id: "6",
			design: {
				background: "white",
				color: "black",
				"font-size": "var(--step-2)",
				space: {
					padding: { y: '--space-s', x: '0' },
				},
				border: "1px solid black",
			}
		},
	]

})




