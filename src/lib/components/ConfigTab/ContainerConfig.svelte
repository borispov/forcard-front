<script lang="ts">
	import { z } from "zod";
	import Radio from "../../components/common/Radio.svelte";
	import ColorButton from "../../components/ColorButton.svelte";
	import ColorInput from "../../components/ColorInput.svelte";
	import gradients from "../../global/gradients.json";
	import ColorPicker from "svelte-awesome-color-picker";
	import FieldGroup from "./FieldGroup.svelte";

	import Stack from "../SVG/Stack.svelte";
	import HorizontalStack from "../SVG/HorizontalStack.svelte";

	import type {
		CssSpaceUnit,
		WidthAndHeightValue,
		CssDiv,
	} from "../../../types/types";

	import AlignRight from "../SVG/AlignRight.svelte";
	import AlignLeft from "../SVG/AlignLeft.svelte";
	import AlignCenter from "../SVG/AlignCenter.svelte";
	import AlignTop from "../SVG/AlignTop.svelte";
	import AlignMiddle from "../SVG/AlignMiddle.svelte";
	import AlignBottom from "../SVG/AlignBottom.svelte";

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

	const exampleContainer = {
		type: "container",
		role: "div",
		id: "1",
		children: ["2", "3", "4"],

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
		},
	} as CssDiv;

	const justifyContentSchema = z.union([
		z.literal("flex-start"),
		z.literal("flex-end"),
		z.literal("center"),
		z.literal("space-between"),
		z.literal("space-around"),
	]);

	const alignItemsSchema = z.union([
		z.literal("flex-start"),
		z.literal("center"),
		z.literal("flex-end"),
		z.literal("stretch"),
		z.literal("baseline"),
	]);

	const backgroundSchema = z.object({
		type: z.enum(["none", "color", "gradient", "image"]),
		opacity: z.number(),
		blur: z.number(),
		backgroundColor: z.string(),
		pattern: z.object({}),
		gradient: z.object({
			gradientStyle: z.string(),
			angle: z.number(),
			stops: z.array(
				z.object({ color: z.string(), position: z.string().optional() })
			),
			gradientId: z.string().optional(),
			gradientName: z.string().optional(),
			gradientValue: z.string().optional(),
		}),
	});

	const dropShadowSchema = z.object({
		vertical: z.number(),
		horizontal: z.number(),
		blur: z.number(),
		spread: z.number(),
		color: z.string(),
	});

	const containerConfig = z.object({
		id: z.string(),
		role: z.string(),
		type: z.literal("container"),
		children: z.array(z.string()),
		design: z.object({
			layout: z.object({
				display: z.literal("flex"),
				overflow: z.string().optional(),
				direction: z.union([z.literal("row"), z.literal("column")]),
				justifyContent: justifyContentSchema,
				alignItems: alignItemsSchema,
				gap: z.string(),
				wrap: z.string(),
			}),
			background: backgroundSchema,
			box: z.object({
				width: z.string(),
				height: z.string(),
				margin: z.object({ x: z.string(), y: z.string() }),
				padding: z.object({ x: z.string(), y: z.string() }),
				border: z.object({
					radius: z.number(),
					color: z.string(),
					width: z.string(),
				}),
			}),
			effects: z.object({
				dropShadow: dropShadowSchema,
			}),
		}),
	});

	type Layout = z.infer<typeof containerConfig>;

	let divConfig: Layout = exampleContainer;
	$: divConfig = containerConfig.parse(divConfig);

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

	let borderOn =
		divConfig.design.box.border &&
		Object.entries(divConfig.design.box.border).length > 0;

	let widthIndicator = divConfig.design.box.width;

	const setSpace = (spaceUnit: string, vec: string, val: string) => {
		if (spaceUnit === "margin") {
			divConfig.design.box.margin[vec as keyof CssSpaceUnit] = val;
		} else if (spaceUnit === "padding") {
			divConfig.design.box.padding[vec as keyof CssSpaceUnit] = val;
		}
	};

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

	$: console.log(divConfig);
</script>

<section data-name="div-config" class="config-section flow">
	<div class="panel">
		<div class="[ field-group flow ] [ flex ]">
			<FieldGroup
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

			<!-- BEGINNING OF MARGINS GROUP -->
			<FieldGroup label="Margins" labelFor="space" alignLabel="left">
				<div class="field-row">
					<div class="field-row repel">
						<label for="margin_vertical">X-Axis</label>
						<div class="indicator">
							{UI_STEPPED_VALUES[Number(divConfig.design.box.margin.x)]}
						</div>
					</div>
					<div class="field-row repel">
						<label for="margin_horizontal">Y-Axis</label>
						<div class="indicator">
							{UI_STEPPED_VALUES[Number(divConfig.design.box.margin.y)]}
						</div>
					</div>
				</div>
				<div class="field-row">
					<input
						value={divConfig.design.box.margin.x}
						id="margin_vertical"
						name="margin_vertical"
						type="range"
						min="0"
						max="8"
						step="1"
						on:input={(e) => setSpace("margin", "x", e.currentTarget.value)}
					/>
					<input
						value={divConfig.design.box.margin.y}
						id="margin_horizontal"
						name="margin_horizontal"
						type="range"
						min="0"
						max="8"
						step="1"
						on:input={(e) => setSpace("margin", "y", e.currentTarget.value)}
					/>
				</div>
				<!-- END OF MARGINS GROUP -->

				<!-- BEGINNING OF PADDINGS GROUP -->
				<FieldGroup marginTop="var(--space-s)" label="Pad" labelFor="padding">
					<div class="field-row">
						<div class="field-row repel">
							<label for="padding_vertical">X-Axis</label>
							<div class="indicator">
								{UI_STEPPED_VALUES[Number(divConfig.design.box.padding.x)]}
							</div>
						</div>
						<div class="field-row repel">
							<label for="padding_horizontal">Y-Axis</label>
							<div class="indicator">
								{UI_STEPPED_VALUES[Number(divConfig.design.box.padding.y)]}
							</div>
						</div>
					</div>
					<div class="field-row">
						<input
							value={divConfig.design.box.padding.x}
							id="padding_vertical"
							name="padding_vertical"
							type="range"
							min="0"
							max="8"
							step="1"
							on:input={(e) => setSpace("padding", "x", e.currentTarget.value)}
						/>
						<input
							value={divConfig.design.box.padding.y}
							id="padding_horizontal"
							name="padding_horizontal"
							type="range"
							min="0"
							max="8"
							step="1"
							on:input={(e) => setSpace("padding", "y", e.currentTarget.value)}
						/>
					</div>
					<!-- END OF PADDINGS GROUP -->
				</FieldGroup>
			</FieldGroup>

			<FieldGroup label="Background" labelFor="space" alignLabel="left">
				<Radio
					flexDirection="row"
					fontSize={20}
					options={[
						{ label: "None", value: "none" },
						{ label: "Color", value: "color" },
						{ label: "Gradient", value: "gradient" },
					]}
					bind:userSelected={divConfig.design.background.type}
				/>
			</FieldGroup>
			<!-- END OF BACKGROUND TYPE PICK -->

			<!-- START OF COLOR PICK -->
			{#if divConfig.design.background.type == "color"}
				<FieldGroup label="Color" labelFor="backgroundColor" alignLabel="left">
					<div class="[ field-group ]">
						<div class="field-row repel">
							<label for="text-content">Background Color</label>
						</div>

						<ColorButton
							bind:color={divConfig.design.background.backgroundColor}
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
							<ColorButton
								bind:color={divConfig.design.background.gradient.stops[0].color}
							/>
						</div>
						<div class="gradient-position">
							<label for="color-1">Pos 1</label>
							<input
								placeholder="%"
								type="text"
								name="position-1"
								bind:value={divConfig.design.background.gradient.stops[0]
									.position}
							/>
						</div>
					</div>
					<div class="gradient gradient__stops">
						<div class="gradient-color">
							<label for="color-2">Color 2</label>

							<ColorButton
								bind:color={divConfig.design.background.gradient.stops[1].color}
							/>
						</div>
						<div class="gradient-position">
							<label for="color-1">Pos 2</label>
							<input
								type="text"
								placeholder="%"
								name="position-2"
								bind:value={divConfig.design.background.gradient.stops[1]
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
			<!-- START OF BORDER LOGIC -->
			<FieldGroup label="Border" labelFor="border">
				<div class="field-row">
					<label class="field-label" for="border-color">Color</label>
					<ColorPicker
						isPopup={false}
						bind:hex={divConfig.design.box.border.color}
						components={{ input: ColorInput }}
					/>
				</div>

				<div class="field-row">
					<label class="field-label" for="border-color">Width</label>
					<input
						type="range"
						min="0"
						max="6"
						bind:value={divConfig.design.box.border.width}
					/>
				</div>
			</FieldGroup>
			<!-- END OF BORDER LOGIC -->

			<div class="[ field-group ]">
				<div class="field-row repel">
					<label class="field-label" for="border-radius">Border Radius</label>
					<div class="indicator">
						{divConfig.design.box.border.radius}
					</div>
				</div>
				<input
					id="border-radius"
					name="border-radius"
					type="range"
					min="0"
					max="5"
					step="1"
					bind:value={divConfig.design.box.border.radius}
				/>
			</div>

			<!-- START OF SHADOW LOGIC -->
			<FieldGroup label="Shadow" labelFor="shadow">
				<!-- OFFSET SHADOW -->
				<div class="field-row">
					<div class="field-row repel">
						<label class="field-label" for="vertical-shadow">Vertical</label>
						<span>{divConfig.design.effects.dropShadow.vertical}</span>
					</div>
					<div class="field-row repel">
						<label class="field-label" for="vertical-shadow">Horizontal</label>
						<span>{divConfig.design.effects.dropShadow.horizontal}</span>
					</div>
				</div>
				<div class="field-row">
					<input
						type="range"
						min="-12"
						max="12"
						step="0"
						bind:value={divConfig.design.effects.dropShadow.vertical}
					/>
					<input
						type="range"
						min="-12"
						max="12"
						step="0"
						bind:value={divConfig.design.effects.dropShadow.horizontal}
					/>
				</div>
				<!-- BLUR & SPREAD -->
				<div class="field-row">
					<div class="field-row repel">
						<label class="field-label" for="blur-shadow">Blur</label>
						<span>{divConfig.design.effects.dropShadow.blur}</span>
					</div>
					<div class="field-row repel">
						<label class="field-label" for="spread-shadow">Spread</label>
						<span>{divConfig.design.effects.dropShadow.spread}</span>
					</div>
				</div>
				<div class="field-row">
					<input
						type="range"
						min="0"
						max="15"
						step="0.5"
						bind:value={divConfig.design.effects.dropShadow.blur}
					/>
					<input
						type="range"
						min="0"
						max="15"
						step="0.5"
						bind:value={divConfig.design.effects.dropShadow.spread}
					/>
				</div>
				<div class="field-row">
					<label class="field-label" for="color-shadow">Shadow Color</label>
					<ColorPicker
						isPopup={false}
						bind:hex={divConfig.design.effects.dropShadow.color}
						components={{ input: ColorInput }}
					/>
				</div>
			</FieldGroup>
			<!-- END OF SHADOW LOGIC -->
		</div>
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
