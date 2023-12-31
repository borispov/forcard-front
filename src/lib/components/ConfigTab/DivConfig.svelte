<script lang="ts">
	// IMPORTS
	import Switch from "../../components/common/Switch.svelte";
	import { gradientsChoice } from "../../utils/generateGradient";
	import gradients from "../../global/gradients.json";

	import type { ContainerElement, CssWidth } from "../../../types/components";
	type spaceType = "margin" | "padding" | "gutter";

	export let divConfig: ContainerElement;

	let gradientName = divConfig.design.background.gradientName;

	// TODO: Fix border settings...
	// settings variables
	let borderOn = Object.entries(divConfig.design.border).length > 0;

	let widthIndicator: CssWidth = divConfig.design.width || "";

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

	let setDirection = (e: any) => {
		const { value } = e.target;
		divConfig.design.display.direction = value;
	};

	let setMargins = (val: string, vec: string) => {
		divConfig.design.space.margin[vec] = val;
	};

	let setPaddings = (val: string, vec: string) => {
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
			divConfig.design.border["radius"] = val;
		}
	};

	// Tbind:ODO: When We'll expand the collection of gradients, we can offer
	// gradients based on a color like in https://uigradients.com
	let onGradientColorChoice = (e) => {
		const id = e.target.value;
		if (id) {
			let [gradientName, gradientCss] = gradientsChoice("", id);

			divConfig.design.background = {
				...divConfig.design.background,
				type: "gradient",
				gradient: gradientCss,
				gradientName: gradientName,
				gradientId: id,
			};
			console.log(`g: ${gradientCss}`);
		}
	};

	let setBackgroundColor = (val: string) => {
		let { type, color } = divConfig.design.background;
		console.log(`type is: ${type}`);

		// if (type !== "color") {
		// 	type = "color";
		// }

		if (type == "gradient") {
			let [gradientName, gradientCss] = gradientsChoice("", val);
			divConfig.design.background = {
				...divConfig.design.background,
				type: "gradient",
				gradient: gradientCss,
				gradientName: gradientName,
				gradientId: val,
			};
			return;
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
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => (files[0] = e.target.result);
	};

	// figure out the best way to set maxWidth if at all.. offer pre-defined
	// settings ? or let user free-roll this
	let setMaxWidth = (e: Event) => {
		const { target } = e;
		const { value } = target as HTMLInputElement;
	};

	let onWidthCustom = (e: Event) => {
		// maybe store values above 100% as max1, max2, max3?
		const { target } = e;
		const { value } = target as HTMLInputElement;

		const numValue = Number(value);

		if (numValue < 100) widthIndicator = value;
		else if (numValue >= 100 && numValue < 110) widthIndicator = "Full Width";
		else if (numValue >= 105 && numValue < 120) widthIndicator = "Edge";
		else widthIndicator = "Full Bleed";

		divConfig.design.width = numValue;
	};

	let onAlignmentSelect = (e: Event) => {
		const { target } = e;
		const { value } = target as HTMLInputElement;
		divConfig.design.display["align"] = value;
	};
</script>

<section data-name="div-config" class="config-section flow">

	<div class="panel">
		<!-- make it a component Field Group -->
		<div class="[ field-group flow ] [ flex ]">
			<div class="field">
				<div class="field-row repel">
					<label for="div-design_bg_style">Width</label>
					<div class="indicator">
						{widthIndicator}
					</div>
				</div>

				<input
					id="container-width"
					name="container-width"
					type="range"
					min="15"
					max="120"
					step="1"
					bind:value={divConfig.design.width}
					on:input={onWidthCustom}
				/>
			</div>

			{#if divConfig.design.display.type == "flex"}
				<div class="field">
					<label for="div-design_bg_style">Direction</label>
					<select
						bind:value={divConfig.design.display.direction}
						id="div-design_bg_style"
					>
						<option value="column">Column</option>
						<option value="row">Row</option>
					</select>
				</div>
			{/if}

			<div class="field">
				<label for="div-design_bg_style">Alignment</label>
				<select id="div-design_bg_style" on:change={onAlignmentSelect}>
					<option value="start">Left</option>
					<option value="center">Center</option>
					<option value="end">Right</option>
				</select>
			</div>

			<!-- BEGINNING OF BACKGROUND GROUP -->
			<div class="field">
				<label for="div-design_bg_style">Background</label>
				<select id="div-design_bg_style" on:change={onSelectBackground}>
					<option value="isNone">None</option>
					<option value="isColor">Color</option>
					<option value="isGradient">Gradient</option>
					<option value="isImage">Image</option>
				</select>

				{#if backgroundSettings.isBackground}
					{#if backgroundSettings.isColor}
						<div class="[ field-group flow ] pt-s">
							<div class="field field-row">
								<input
									bind:value={divConfig.design.background.color}
									type="text"
									on:change={(e) => setBackgroundColor(e.currentTarget.value)}
								/>
							</div>
						</div>
					{/if}
				{/if}

				{#if backgroundSettings.isBackground}
					{#if backgroundSettings.isGradient}
						<div class="[ field-group flow ] pt-s">
							<div class="field field-row">
								<label for="div-gradient">Gradient Color</label>
								<select
									id="div-gradient"
									bind:value={gradientName}
									on:change={(e) => setBackgroundColor(e.currentTarget.value)}
								>
									{#each gradients as gradient, id}
										<option value={id}>{gradient.name}</option>
									{/each}
									<option value="isNone">Reds</option>
								</select>
							</div>
						</div>
					{/if}
				{/if}

				<!-- render fields based on user's select  -->
				{#if backgroundSettings.isBackground}
					{#if backgroundSettings.isImage}
						<div class="[ field-group flow ]">
							<div class="field">
								<div class="thumbnail" />
								<input
									bind:files
									type="file"
									style="display: none"
									accept="image/jpeg, image/png, image/jpg"
									on:change={(e) => onFileSelect(e)}
								/>
							</div>
						</div>
					{/if}
				{/if}
			</div>

			<div class="[ field-group ]">
				<!-- BEGINNING OF MARGINS GROUP -->
				<label for="">Margins</label>
				<div class="field-row repel">
					<label for="margin_vertical">X-Axis</label>
					<div class="indicator">
						{UI_STEPPED_VALUES[divConfig.design.space.margin["x"]] || "None"}
					</div>
				</div>
				<div class="[ field-group ]">
					<input
						bind:value={divConfig.design.space.margin["x"]}
						id="margin_vertical"
						name="margin_vertical"
						type="range"
						min="0"
						max="8"
						step="1"
						on:input={(e) => spaceHandler("margin", "x", e.currentTarget.value)}
					/>
				</div>
				<div class="[ field-group ]">
					<div class="field-row repel">
						<label for="margin_horizontal">Y-Axis</label>
						<div class="indicator">
							{UI_STEPPED_VALUES[divConfig.design.space.margin["y"]] || "None"}
						</div>
					</div>
					<input
						bind:value={divConfig.design.space.margin["y"]}
						id="margin_horizontal"
						name="margin_horizontal"
						type="range"
						min="0"
						max="8"
						step="1"
						on:input={(e) => spaceHandler("margin", "y", e.currentTarget.value)}
					/>
				</div>
				<!-- END OF MARGINS GROUP -->
			</div>

			<!-- BEGINNING OF PADDING GROUP -->
			<div class="[ field-group ]">
				<label for="">Padding</label>
				<div class="[ field-group ]">
					<div class="field-row repel">
						<label for="padding_vertical">X-Axis</label>
						<div class="indicator">{divConfig.design.space.padding["x"]}</div>
					</div>
					<input
						id="padding_vertical"
						name="padding_vertical"
						type="range"
						min="0"
						max="8"
						step="1"
						bind:value={divConfig.design.space.padding["x"]}
						on:input={(e) =>
							spaceHandler("padding", "x", e.currentTarget.value)}
					/>
				</div>
				<div class="[ field-group ]">
					<div class="field-row repel" data-nowrap>
						<label for="padding_horizontal">Y-Axis</label>
						<div class="indicator">{divConfig.design.space.padding["y"]}</div>
					</div>
					<input
						id="padding_horizontal"
						name="padding_horizontal"
						type="range"
						min="0"
						max="8"
						step="1"
						bind:value={divConfig.design.space.padding["y"]}
						on:input={(e) =>
							spaceHandler("padding", "y", e.currentTarget.value)}
					/>
				</div>
				<!-- END OF PADDING GROUP -->

				<!-- BEGINNING OF BORDER GROUP -->
				<div class="[ field-group ]">
					<div class="field-row repel">
						<label for="">Border</label>
						<Switch label="" bind:value={borderOn} />
					</div>

					<div class="field-row repel">
						<label for="border-radius">Border Radius</label>
						<div class="indicator">
							{(divConfig.design.border.hasOwnProperty("radius") &&
								divConfig.design.border["radius"]) ||
								0}
						</div>
					</div>
					<div class="[ field-group ]">
						<input
							id="border-radius"
							name="border-radius"
							type="range"
							min="0"
							max="5"
							step="1"
							value={divConfig.design.border["radius"] || "0"}
							on:input={(e) => borderHandler("radius", e.currentTarget.value)}
						/>
					</div>

					{#if borderOn}
						<div class="[ field-group ]">
							<input
								id="border"
								name="border"
								type="text"
								value="BORDERRRRRRRR"
							/>
						</div>
					{/if}
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

	.thumbnail {
		height: 12em;
		cursor: pointer;
		overflow: hidden;
		border-radius: 12px;
		background-color: rgb(0, 0, 0);
	}

	select {
		padding-right: 3em;
		text-overflow: ellipsis;
		height: 3em;
		background-repeat: no-repeat;
		background-size: 1.5em;
		background-position: calc(100% - 0.75em) center;
		background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Ctitle%3Edown-arrow%3C%2Ftitle%3E%3Cg%20fill%3D%22%23000000%22%3E%3Cpath%20d%3D%22M10.293%2C3.293%2C6%2C7.586%2C1.707%2C3.293A1%2C1%2C0%2C0%2C0%2C.293%2C4.707l5%2C5a1%2C1%2C0%2C0%2C0%2C1.414%2C0l5-5a1%2C1%2C0%2C1%2C0-1.414-1.414Z%22%20fill%3D%22%23CACACA%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E");
		width: 100%;
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
