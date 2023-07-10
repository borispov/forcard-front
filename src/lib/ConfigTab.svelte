<script>
	import DivConfig from "./ConfigTab/DivConfig.svelte";
	// import TextConfig from "./ConfigTab/TextConfig.svelte";
	// import ButtonConfig from "./ConfigTab/ButtonConfig.svelte";

	export let type;
	export let component;

	$: activePane = "";

	const textConfig = {
		id: "text-",
		type: "text",
		content: "",
		role: "p",
		design: {
			align: "start",
			appearance: "lowercase",
			color: "#FFFFFF",
			font: "Roboto",
			letterSpacing: 0,
			margins: 0.125,
			size: 1,
			lineHeight: 1.125,
			spacingParagraph: 1,
			weight: 400,
		},
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

	const divConfig = {
		id: "div-",
		type: "container",
		children: [
			{
				align: "auto",
				spacer: false,
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
				type: "",
				blur: 0,
				style: "image",
				color: "#fff",
			},
			overlay: {
				style: "color",
				color: "#730D0DC0",
				gradient: {
					angle: 0,
					height: 0,
					left: 0,
					reverse: false,
					style: "linear",
					top: 50,
					width: 50,
					stop1: {
						color: "",
						position: 0,
					},
					stop2: {
						color: "",
						position: 60,
					},
					stop2: {
						color: "",
						position: 100,
					},
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

			margin: 0,
			padding: 0,
			height: "auto",
			width: "auto",

			shadow: {
				x: 0,
				y: 0,
				distance: 0,
				blur: 0,
				color: "rgba(0,0,0,0.16)",
			},

			content: {
				align: "start",
				margins: 0.125,
				position: "center",
				spacing: 1,
				width: 50,
			},
		},
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

	const divConf = {
		display: {
			stack: "",
			columns: "",
		},
		design: {
			"text-alignment": "var(--g-text-alignment)",
			"margin-top": "var(--mt)",
			"margin-bottom": "var(--mb)",
			"padding-top": "var(--pt)",
			"padding-bottom": "var(--pb)",
			gap: "1",
			background: "#fff",
			border: "none",
			"box-shadow": "0",
		},
	};

	const textConf = {
		content: {
			text: "",
		},
		design: {
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

	const buttonConf = {
		content: {
			labels: [
				{
					label: "",
					url: "",
				},
			],
		},
		design: {
			background: "#fff",
			color: "var(--g-text-color)",
			"border-radius": "",
			"font-family": "var(--g-ff)",
			"font-size": "var(--g-fs)",
			"font-weight": "var(--g-fw)",
			"letter-spacing": "var(--g-ls)",
			"margin-top": "",
			"margin-bottom": "",
			"padding-top": "",
			"padding-bottom": "",
			"box-shadow": "0",
		},
	};

	const globalSettings = {
		color: "",
		background: "",
		"font-family": "",
		"font-size": "16",
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
</script>

<div class="config">
	<!-- Render Settings For Container/Div Elements -->
	{#if type === "div"}
		<ul>
			<li
				class={(!activePane || activePane === "display") && "active"}
				data-name="display"
				data-tooltip="גצ"
				on:keydown={() => {}}
				on:click={() => (activePane = "display")}
			>
				Display
			</li>
			<li
				class={(activePane == "design" && "active") || ""}
				data-name="design"
				data-tooltip="עיצוב"
				on:keydown={() => {}}
				on:click={() => (activePane = "design")}
			>
				Design
			</li>
		</ul>

		<section>
			<DivConfig bind:divConfig={component} />
		</section>
	{/if}

	<!-- Render Settings For Text Elements -->
	{#if type === "p" || type[0] === "h" || type == "text"}
		<ul>
			<li
				data-name="content"
				data-tooltip="תוכן"
				on:keydown={() => {}}
				on:click={() => (activePane = "content")}
			/>
			<li
				data-name="design"
				data-tooltip="עיצוב"
				on:keydown={() => {}}
				on:click={() => (activePane = "design")}
			/>
		</ul>

		<!-- <TextConfig /> -->
	{/if}

	<!-- Settings For Buttons -->
	{#if type === "button"}
		<ul>
			<li
				data-name="content"
				data-tooltip="תוכן"
				on:keydown={() => {}}
				on:click={() => (activePane = "content")}
			/>
			<li
				data-name="design"
				data-tooltip="עיצוב"
				on:keydown={() => {}}
				on:click={() => (activePane = "design")}
			/>
		</ul>

		<!-- <ButtonConfig /> -->
	{/if}
</div>

<style>
	ul {
		display: flex;
		flex-direction: row;
		list-style: none;
		justify-content: flex-start;
		margin: 0;
		padding: 0;
		background: rgba(14, 15, 25, 0.175);
	}

	ul li {
		padding: 1em;
		cursor: pointer;
	}

	ul li.active {
		background: rgba(53, 54, 66, 1);
	}

	section {
		padding: 2.25em 1.625em 0.5em 1.625em;
		display: none;
	}

	section.active {
		display: flex;
		flex-direction: column;
	}

	section h2 {
		text-transform: capitalize;
	}

	label {
		display: block;
		font-size: 18px;
		line-height: 1.6;
		margin-top: 10px;
		text-transform: capitalize;
	}

	input {
		padding: 6px 12px;
	}
</style>
