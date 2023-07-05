<script lang="ts">
	// IMPORTS
	import Header from "./Header.svelte";
	import Switch from "../common/Switch.svelte";
	import { gradientsChoice } from "../utils/generateGradient";
	import gradients from "../global/gradients.json";

	import type { Component } from "../../types/components";
	type spaceType = "margin" | "padding" | "gutter";

	export let divConfig: Component;

	// settings variables
	let borderOn = Object.entries(divConfig.design.border).length > 0;

	// TODO: show those values instead of RANGE numbers for space style
	// properties such as Margins & Paddings.
	const UI_STEPPED_VALUES = [
		"None",
		"2XS",
		"Extra Small",
		"Small",
		"Medium",
		"Large",
		"XL",
		"2XL",
		"3XL",
	];

	const STEPPED_VALUES = [
		"0",
		"--space-2xs",
		"--space-xs",
		"--space-s",
		"--space-m",
		"--space-l",
		"--space-xl",
		"--space-2xl",
		"--space-3xl",
	];

	let setMargins = (val: string, vec: string) => {
		// let transformedValue = UI_STEPPED_VALUES[val];
		divConfig.design.space.margin[vec] = val;
	};

	let setPaddings = (val: string, vec: string) => {
		// let transformedValue = UI_STEPPED_VALUES[val];
		divConfig.design.space.padding[vec] = val;
	};

	let setShadow = (val: string) => {
		// let transformedValue = UI_STEPPED_VALUES[val];
		// divConfig.design.shadow = val;
		// TODO: Shadow
	};

	let borderHandler = (type: string, val = "") => {
		if (type == "borderOn") {
			borderOn = val === "on" ? true : false;
		}

		if (type == "border") {
			let r = "1px solid black";
			return r;
		}

		if (type == "radius") {
			switch (val) {
				case "5":
					divConfig.design.border["radius"] = "50%";
				case "0":
					divConfig.design.border["radius"] = "4px";
				case "1":
					divConfig.design.border["radius"] = "8px";
				case "2":
					divConfig.design.border["radius"] = "12px";
				case "3":
					divConfig.design.border["radius"] = "16px";
				case "4":
					divConfig.design.border["radius"] = "24px";

				default:
					break;
			}
			divConfig.design.border["radius"] = val;
		}
	};

	// Tbind:ODO: When We'll expand the collection of gradients, we can offer
	// gradients based on a color like in https://uigradients.com
	let onGradientColorChoice = (e) => {
		const id = e.target.value;
		if (id) {
			let gradientCss = gradientsChoice("", id);

			divConfig.design.background = {
				...divConfig.design.background,
				type: "gradient",
				gradient: gradientCss,
			};
		}
	};

	let setBackgroundColor = (val: string) => {
		let { type, color } = divConfig.design.background;

		if (type !== "color") {
			type = "color";
		}

		if (type == "gradient") {
			let gradientCss = gradientsChoice("", val);
			divConfig.design.background = {
				...divConfig.design.background,
				type: "gradient",
				gradient: gradientCss,
			};
		}

		if (color != val) {
			color = val;
		} else {
			return;
		}

		divConfig.design.background = {
			...divConfig.design.background,
			type: type,
			color: color,
		};
	};

	let spaceHandler = (type: spaceType, vec: string, val: string) => {
		type === "margin" && setMargins(val, vec);
		type === "padding" && setPaddings(val, vec);
	};

	let files: File;

	let backgroundSettings = {
		isBackground: false,
		isImage: false,
		isColor: false,
		isGradient: false,
		data: {
			bgColor: "",
		},
	};

	let onSelectBackground = (e) => {
		const p = e.target.value;

		let none = p !== "isNone";
		let gradient = p === "isGradient";
		let color = p === "isColor";
		let image = p === "isImage";

		if (gradient) {
			divConfig.design.background.type = "gradient";
		}

		if (color) {
			divConfig.design.background.type = "color";
		}

		backgroundSettings = {
			...backgroundSettings,
			isBackground: none,
			isGradient: gradient,
			isColor: color,
			isImage: image,
		};
	};

	let onFileSelect = (e) => {
		// TODO: Check/Validate File Size Is below a certain threshold
		let image = e.target.files[0];
		let reader = new FileReader(image);
		reader.readAsDataURL(image);
		reader.onload = (e) => (files[0] = e.target.result);
	};
</script>

<section data-name="text-config" class="config-section flow">
	<Header />

	<div class="panel">
		<!-- make it a component Field Group -->
		<div class="[ field-group flow ] [ flex ]">
			<!-- BEGINNING OF BORDER GROUP -->
			<div class="[ field-group ]">
				<div class="field-row repel">
					<label for="">Content</label>
					<input type="text" />
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.config-section {
		--flow-space: var(--space-s-l);
	}

	.panel {
		padding-inline: var(--space-m);
	}

	label {
		display: inline-block;
		font-size: 1rem;
		font-weight: bold;
		margin: 0 0 1em;
		color: var(--color-light);
	}

	.field-group {
		display: flex;
		flex-wrap: wrap;
		padding-bottom: var(--space-m);
		width: 100%;
	}

	.field-group > * {
		width: 100%;
	}

	.field {
		flex-shrink: 1;
		flex-grow: 1;
		position: relative;
		vertical-align: top;
	}

	.field-row {
		width: 80%;
	}

	.repel {
		--repel-vertical-alignment: baseline;
	}
</style>
