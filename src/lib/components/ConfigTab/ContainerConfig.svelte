<script lang="ts">
	import type { z } from "zod";
	import Radio from "../../components/common/Radio.svelte";
	import ColorInput from "../../components/ColorInput.svelte";
	import gradients from "../../global/gradients.json";
	import ColorPicker from "svelte-awesome-color-picker";
	import FieldGroup from "./FieldGroup.svelte";
	import Accordion from "../common/Accordion.svelte";

	import ShadowSetting from "./Fields/ShadowSetting.svelte";
	import BorderSetting from "./Settings/BorderSetting.svelte";
	import SpaceSetting from "./Settings/SpaceSetting.svelte";

	import { getStyles } from "$lib/utils/parseStyles";
	import { stylesheetStore } from "$lib/sheetStore";
	import { handleStyleChange } from "$lib/utils/getStyles";
	import { buildProxy } from "$lib/utils/buildProxy";

	import Stack from "../SVG/Stack.svelte";
	import HorizontalStack from "../SVG/HorizontalStack.svelte";

	import { containerSchema } from "$lib/schemas";

	import type { CssSpaceUnit, WidthAndHeightValue } from "../../../types/types";

	import AlignRight from "../SVG/AlignRight.svelte";
	import AlignLeft from "../SVG/AlignLeft.svelte";
	import AlignCenter from "../SVG/AlignCenter.svelte";
	import AlignTop from "../SVG/AlignTop.svelte";
	import AlignMiddle from "../SVG/AlignMiddle.svelte";
	import AlignBottom from "../SVG/AlignBottom.svelte";
	import { onMount } from "svelte";

	let currentElement: HTMLElement | null;

	type Layout = z.infer<typeof containerSchema>;

	const handler = (state) => {
		if (!state?.newValue) return;

		const oldState = JSON.stringify(state.previousValue);
		const newState = JSON.stringify(state.newValue);

		if (oldState === newState) return;

		let path = state.path.split(".").splice(1);

		const options = {
			prop: state.prop,
			value: state.newValue,
			path: path,
			designObject: state.designObject,
		};

		let styles = handleStyleChange("", options);
		if (!styles) return;

		let t = divConfig.type + divConfig.id;
		let payload = { t, styles };
		stylesheetStore?.dispatch("ADD_STYLES", payload);
	};

	export let divConfig: Layout;
	// $: divConfig = buildProxy(containerSchema.parse(divConfig), handler);
	$: {
		divConfig = containerSchema.parse(divConfig);
		let t = divConfig.type + divConfig.id;
		let styles = getStyles("container", divConfig.design, "array");
		let payload = { t, styles };
		stylesheetStore?.dispatch("ADD_STYLES", payload);
	}

	onMount(() => {
		currentElement = document.getElementById(divConfig.type + divConfig.id);
	});

	// an example on how to add pseudo element styles
	// stylesheetStore &&
	// 	stylesheetStore?.dispatch("ADD_PSEUDO", {
	// 		pseudo: "hover",
	// 		targetElement: "container1",
	// 	});
	//
	// stylesheetStore &&
	// 	stylesheetStore?.dispatch("ADD_HOVER_STYLE", {
	// 		targetElement: "container1",
	// 		styles: [
	// 			["background", "blue"],
	// 			["padding", "4em"],
	// 		],
	// 	});

	$: backgroundColorIndicator =
		divConfig.design.background.type == "color" &&
		divConfig.design.background.backgroundColor;

	let userJustifyOptions = [
		{ icon: AlignLeft, label: "Left", value: "flex-start" },
		{ icon: AlignCenter, label: "Center", value: "center" },
		{ icon: AlignRight, label: "Right", value: "flex-end" },
	];

	let userAlignItemsOptions = [
		{ icon: AlignTop, label: "Top", value: "flex-start" },
		{ icon: AlignMiddle, label: "Middle", value: "center" },
		{ icon: AlignBottom, label: "Bottom", value: "flex-end" },
	];

	let gradientName =
		divConfig.design.background.type == "gradient" &&
		divConfig.design.background.gradient.gradientName;

	let widthIndicator = divConfig.design.box.width;

	const onWidthCustom = (e: Event) => {
		// maybe store values above 100% as max1, max2, max3?
		const { target } = e;
		const { value } = target as HTMLInputElement;
		const numValue = Number(value);

		// UI part
		if (numValue < 100) widthIndicator = value as WidthAndHeightValue;
		else if (numValue >= 100 && numValue < 110) widthIndicator = "Full Width";
		else if (numValue >= 105 && numValue < 120) widthIndicator = "Edge";
		else widthIndicator = "Full Bleed";

		divConfig.design.box.width = "" + numValue;
	};

	const setPremadeGradient = (val: string) => {
		const { name, colors } = gradients[Number(val)];
		divConfig.design.background.gradient.gradientName = name;
		divConfig.design.background.gradient.stops[0].color = colors[0];
		divConfig.design.background.gradient.stops[1].color = colors[1];
	};

	const handleGradientColorChange = (value, index, posOrColor) => {
		const gradientCopy = divConfig.design.background.gradient;
		gradientCopy.stops[index][posOrColor] = value;
		divConfig.design.background.gradient = gradientCopy;
	};

	// NEED TO ADD IMAGE TYPE ON SCHEMA
	const onFileSelect = (e, type) => {
		if (type === "url") {
			divConfig.design.background.image.settings.source = e.target.value;
			return;
		}
		const inputTarget = e.target;
		console.log("trying to upload an image");
		let image = inputTarget.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			// files[0] = e.target.result;
			divConfig.design.background.image.settings.source = e.target.result;
		};
	};
</script>

<section data-name="div-config" class="config-section flow">
	<div class="panel">
		{#if currentElement === null}
			<FieldGroup label="Error" alignLabel="center" labelFor="error">
				<h2>Failed to load element</h2>
			</FieldGroup>
		{:else}
			<div class="[ field-group flow ] [ flex ]">
				<FieldGroup label="Layout" alignLabel="start" labelFor="layout" group>
					<FieldGroup
						marginTop="var(--space-2xs)"
						label="Block Direction"
						alignLabel="center"
						labelFor="justify"
					>
						<div class="field-row">
							<Radio
								flexDirection="row"
								fontSize={60}
								options={[
									{ label: "Vertical", value: "column", icon: Stack },
									{ label: "Horizontal", value: "row", icon: HorizontalStack },
								]}
								bind:userSelected={divConfig.design.layout.direction}
							/>
						</div>
					</FieldGroup>

					<FieldGroup
						marginTop="var(--space-3xs)"
						label="Horizontal Alignment"
						alignLabel="center"
						labelFor="justify"
					>
						<div class="field-row">
							<Radio
								flexDirection="row"
								fontSize={16}
								options={userJustifyOptions}
								bind:userSelected={divConfig.design.layout.justifyContent}
							/>
						</div>
					</FieldGroup>

					<FieldGroup
						marginTop="var(--space-3xs)"
						label="Vertical Alignment"
						alignLabel="center"
						labelFor="alignItems"
					>
						<div class="field-row">
							<Radio
								flexDirection="row"
								fontSize={16}
								options={userAlignItemsOptions}
								bind:userSelected={divConfig.design.layout.alignItems}
							/>
						</div>
					</FieldGroup>
				</FieldGroup>

				<div class="field-group">
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
						value={divConfig.design.box.width}
						on:input={onWidthCustom}
					/>
				</div>

				<div class="field-group">
					<div class="field-row">
						<label for="div-design_bg_style">Gap</label>
					</div>
					<input
						type="text"
						bind:value={divConfig.design.layout.gap}
						id="div-design_bg_style"
					/>
				</div>

				<Accordion label="Space">
					<SpaceSetting
						bind:margin={divConfig.design.box.margin}
						bind:padding={divConfig.design.box.padding}
					/>
				</Accordion>

				<Accordion label="Background">
					<div>
						<FieldGroup label="Background" labelFor="space" alignLabel="left">
							<Radio
								flexDirection="row"
								fontSize={20}
								options={[
									{ label: "None", value: "none" },
									{ label: "Color", value: "color" },
									{ label: "Gradient", value: "gradient" },
									{ label: "Image", value: "image" },
								]}
								bind:userSelected={divConfig.design.background.type}
							/>
						</FieldGroup>

						<!-- ... START FILE SELECT ... -->
						{#if divConfig.design.background.type == "image"}
							<FieldGroup
								label="Color"
								labelFor="backgroundColor"
								alignLabel="left"
							>
								<div class="[ field-group ]">
									<div class="field-row repel">
										<label for="text-content">Background Color</label>
									</div>

									<ColorPicker
										isPopup={false}
										bind:hex={divConfig.design.background.image.overlay
											.backgroundColor}
										components={{ input: ColorInput }}
									/>

									<FieldGroup label="Image File / Url" labelFor="img" group>
										<input
											accept=".jpg"
											type="file"
											alt="Choose Image File"
											id="img-file"
											on:change={onFileSelect}
										/>
										<input
											type="url"
											alt="Choose Image File"
											id="img-file"
											on:change={(e) => onFileSelect(e, "url")}
											placeholder="Image Url"
										/>
									</FieldGroup>

									<FieldGroup label="Blend Mode" labelFor="img-blend">
										<select
											bind:value={divConfig.design.background.image.overlay
												.blendMode}
										>
											<option value="default">Default</option>
											<option value="multiply">Multiply</option>
											<option value="darken">Darken</option>
											<option value="overlay">Overlay</option>
										</select>
									</FieldGroup>
								</div>
								<!-- OPACITY -->
								<div class="field-row repel">
									<label for="text-content">Opacity (0 to 1)</label>
									<label for="text-content">Blur (0 to 1)</label>
								</div>
								<div class="field-row">
									<input
										type="text"
										name="bg-opacity"
										oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');"
										bind:value={divConfig.design.background.opacity}
									/>

									<input
										type="text"
										name="bg-blur"
										oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');"
										bind:value={divConfig.design.background.blur}
									/>
								</div>
							</FieldGroup>
						{/if}
						<!-- END OF COLOR PICK -->

						<!-- START OF COLOR PICK -->
						{#if divConfig.design.background.type == "color"}
							<FieldGroup
								label="Color"
								labelFor="backgroundColor"
								alignLabel="left"
							>
								<div class="[ field-group ]">
									<div class="field-row repel">
										<label for="text-content">Background Color</label>
									</div>

									<ColorPicker
										isPopup={false}
										bind:hex={divConfig.design.background.backgroundColor}
										components={{ input: ColorInput }}
									/>
								</div>
								<!-- OPACITY -->
								<div class="field-row repel">
									<label for="text-content">Opacity (0 to 1)</label>
									<label for="text-content">Blur (0 to 1)</label>
								</div>
								<div class="field-row">
									<input
										type="text"
										name="bg-opacity"
										oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');"
										bind:value={divConfig.design.background.opacity}
									/>

									<input
										type="text"
										name="bg-blur"
										oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');"
										bind:value={divConfig.design.background.blur}
									/>
								</div>
							</FieldGroup>
						{/if}
						<!-- END OF COLOR PICK -->

						<!-- START OF GRADIENT LOGIC -->
						{#if divConfig.design.background.type == "gradient"}
							<FieldGroup label="Gradient" labelFor="gradient">
								<div class="gradient gradient__stops">
									<div class="gradient-color">
										<label for="color-1">Color 1</label>
										<ColorPicker
											isPopup={false}
											on:input={(e) =>
												handleGradientColorChange(e.detail.hex, 0, "color")}
											components={{ input: ColorInput }}
											hex={divConfig.design.background.gradient.stops[0].color}
										/>
									</div>
									<div class="gradient-position">
										<label for="color-1">Pos 1</label>
										<input
											placeholder="%"
											type="text"
											name="position-1"
											on:input={(e) =>
												handleGradientColorChange(
													e.currentTarget.value,
													0,
													"position"
												)}
											value={divConfig.design.background.gradient.stops[0]
												.position}
										/>
									</div>
								</div>
								<div class="gradient gradient__stops">
									<div class="gradient-color">
										<label for="color-2">Color 2</label>

										<ColorPicker
											on:input={(e) =>
												handleGradientColorChange(e.detail.hex, 1, "color")}
											isPopup={false}
											components={{ input: ColorInput }}
											bind:hex={divConfig.design.background.gradient.stops[1]
												.color}
										/>
									</div>
									<div class="gradient-position">
										<label for="color-1">Pos 2</label>
										<input
											type="text"
											placeholder="%"
											name="position-2"
											on:input={(e) =>
												handleGradientColorChange(
													e.currentTarget.value,
													1,
													"position"
												)}
											value={divConfig.design.background.gradient.stops[1]
												.position}
										/>
									</div>
								</div>
							</FieldGroup>
							<FieldGroup label="Gradients" labelFor="gradient-select">
								<select
									id="div-gradient"
									bind:value={gradientName}
									on:change={(e) => setPremadeGradient(e.currentTarget.value)}
								>
									{#each gradients as gradient, id}
										<option value={id}>{gradient.name}</option>
									{/each}
									<option value="none">Reds</option>
								</select>
							</FieldGroup>
							<!-- END OF GRADIENT LOGIC -->
						{/if}
					</div>
				</Accordion>

				<Accordion label="Border">
					<BorderSetting bind:border={divConfig.design.box.border} />
				</Accordion>
				<ShadowSetting bind:dropShadow={divConfig.design.effects.dropShadow} />
			</div>
		{/if}
	</div>
</section>

<style>
	section {
		padding-bottom: 20px;
	}

	.field-group {
		padding-inline: var(--space-3xs);
		font-size: 12px;
	}

	.field-row {
		display: flex;
		--cluster-horizontal-alignment: center;
		justify-content: space-between;
		padding-inline: 1em;
		gap: var(--space-3xs);
	}

	.field-row input {
		width: 65%;
	}

	.gradient__stops {
		display: flex;
		flex-wrap: nowrap;
		gap: 1em;
		width: 100%;
	}

	.gradient-position {
		display: block;
		width: 30%;
		padding-right: 30px;
	}

	.field-row.repel {
		display: flex;
		width: 100%;
	}
</style>
