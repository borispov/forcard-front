<script>
	import SpaceSetting from "./Settings/SpaceSetting.svelte";
	import Switch from "$lib/components/common/Switch.svelte";
	import { stylesheetStore } from "$lib/sheetStore";
	import { getStyles } from "$lib/utils/parseStyles";

	import ColorInput from "../../components/ColorInput.svelte";
	import FieldGroup from "./FieldGroup.svelte";
	import ColorPicker from "svelte-awesome-color-picker";
	import TypographySetting from "./Settings/TypographySetting.svelte";

	import { buttonSchema } from "$lib/schemas";

	import {
		UI_STEPPED_TEXT_SIZES,
		UI_STEPPED_TEXT_WEIGHTS,
		TEXT_ALIGN_VALS,
	} from "$lib/utils/UI-CONSTANTS";

	let hoverState = false;

	export let buttonConfig;
	$: {
		buttonConfig = buttonSchema.parse(buttonConfig);
		let t = buttonConfig.type + buttonConfig.id;
		let styles = getStyles("button", buttonConfig.design, "array");
		let payload = { t, styles };
		stylesheetStore?.dispatch("ADD_STYLES", payload);
	}
	let selectorCurrent = buttonConfig.id + buttonConfig.type;
	$: {
		hoverState
			? stylesheetStore.dispatch("ADD_PSEUDO", {
					targetElement: selectorCurrent,
					pseudo: "hover",
			  })
			: stylesheetStore.dispatch("DELETE_STYLE", {
					targetElement: selectorCurrent,
					pseudo: "hover",
			  });
	}

	const buttonPaddingsSizings = [
		{
			size: "small",
			values: ["1", "3"],
		},
		{
			size: "normal",
			values: ["2", "4"],
		},
		{
			size: "large",
			values: ["3", "6"],
		},
	];

	// normal
	$: buttonPaddingsIndex = 1;

	let onPaddingsChange = () => {
		buttonConfig.design.box.padding = {
			y: buttonPaddingsSizings[buttonPaddingsIndex].values[0],
			x: buttonPaddingsSizings[buttonPaddingsIndex].values[1],
		};
	};

	let onMarginsChange = (vec, val) => {
		buttonConfig.design.box.margin[vec] = val;
	};

	$: textAlignmentIndicator =
		TEXT_ALIGN_VALS[Number(buttonConfig.design.typography.textAlign)];
	$: fsIndicator =
		UI_STEPPED_TEXT_SIZES[buttonConfig.design.typography.fontSize];
	$: fwIndicator =
		UI_STEPPED_TEXT_WEIGHTS[buttonConfig.design.typography.fontWeight] ||
		"Default";
	$: borderOn = true;

	$: backgroundColor = null;

	let colorIndicator = buttonConfig.design.typography.color;

	const changeBorderRadius = (val) => {
		console.log("changing to val: ", val);
		buttonConfig.design.box.border.radius = val;
	};

	function updateButtonConfig(event) {
		const { name, value, type, checked } = event.target;

		if (type === "checkbox") {
			buttonConfig[name] = checked;
		} else {
			buttonConfig[name] = value;
		}
	}

	// HOW TO FETCH DEFAULT COLORS FROM CSS VARIABLES??
	// SITE's GENERAL SETTINGS..?
	const onColorSelect = (e) => {
		const { value } = e.target;
		buttonConfig.design.typography.color = value;
	};
</script>

<section data-name="text-config" class="config-section flow">
	<div class="panel">
		<!-- BEGINNING OF INNER HTML GROUP -->
		<FieldGroup label="Content" labelFor="text-content" alignLabel="left">
			<input bind:value={buttonConfig.content} type="text" id="text-content" />
		</FieldGroup>

		<!-- Button Size -->
		<FieldGroup
			label="Button Size"
			labelFor="btn-size"
			alignLabel="left"
			indicator={buttonPaddingsIndex}
		>
			<input
				type="range"
				min="0"
				step="1"
				max="2"
				id="btn-size"
				name="btn-size"
				bind:value={buttonPaddingsIndex}
				on:input={onPaddingsChange}
			/>
		</FieldGroup>

		<SpaceSetting onlyMargin bind:margin={buttonConfig.design.box.margin} />

		<FieldGroup group={true} label="Color Settings" alignLabel="left">
			<button
				class:active={hoverState}
				class="btn-hover"
				slot="state-btn"
				on:click={() => (hoverState = !hoverState)}
			>
				:hover
			</button>
			{#if hoverState}
				<FieldGroup
					label="Background"
					labelFor="backgroundColor"
					alignLabel="left"
					marginTop="var(--space-s)"
				>
					<ColorPicker
						bind:hex={buttonConfig.design.background.hover.backgroundColor}
						isPopup={false}
						components={{ input: ColorInput }}
					/>
				</FieldGroup>

				<FieldGroup label="Color" alignLabel="center" labelFor="text-content">
					<ColorPicker
						bind:hex={buttonConfig.design.typography.hover.color}
						isPopup={false}
						components={{ input: ColorInput }}
					/>
				</FieldGroup>
			{:else}
				<FieldGroup
					label="Background"
					labelFor="backgroundColor"
					alignLabel="left"
					marginTop="var(--space-s)"
				>
					<ColorPicker
						bind:hex={buttonConfig.design.background.backgroundColor}
						isPopup={false}
						components={{ input: ColorInput }}
					/>
				</FieldGroup>

				<FieldGroup label="Color" alignLabel="center" labelFor="text-content">
					<ColorPicker
						bind:hex={buttonConfig.design.typography.color}
						isPopup={false}
						components={{ input: ColorInput }}
					/>
				</FieldGroup>
			{/if}
		</FieldGroup>

		<FieldGroup label="Link To" labelFor="link-to" alignLabel="left">
			<input
				type="text"
				id="linkTo"
				name="linkTo"
				bind:value={buttonConfig.settings.linkTo}
				on:input={updateButtonConfig}
			/>
			<FieldGroup labelFor="link-to" alignLabel="left">
				<input
					type="checkbox"
					id="openInNewTab"
					name="openInNewTab"
					bind:checked={buttonConfig.settings.openInNewTab}
					on:change={updateButtonConfig}
				/>
				Open in New Tab
			</FieldGroup>
		</FieldGroup>

		<!-- ALIGNMENT -->
		<TypographySetting
			settingName="textAlign"
			indicator={textAlignmentIndicator}
			bind:value={buttonConfig.design.typography.textAlign}
		/>
		<TypographySetting
			settingName="fontSize"
			bind:value={buttonConfig.design.typography.fontSize}
		/>
		<TypographySetting
			settingName="fontWeight"
			bind:value={buttonConfig.design.typography.fontWeight}
		/>
		<TypographySetting
			settingName="letterSpacing"
			bind:value={buttonConfig.design.typography.letterSpacing}
		/>

		<div class="[ field-group flow ] [ flex ]">
			<!-- BEGINNING OF BORDER GROUP -->
			<div class="[ field-group ]">
				<div class="field-row repel">
					<label for="text-content">Border</label>
					<div class="indicator">
						<Switch
							design="slider"
							fontSize={14}
							label=""
							bind:value={borderOn}
							actionOnClick={() => {
								// remove Border-Radius when switched OFF
								if (!borderOn) {
									console.log("WE SWITCHED OFF");
									buttonConfig.design.box.border.radius = 0;
								}
							}}
						/>
					</div>
				</div>

				{#if borderOn}
					<div class="repel border-icons">
						<button
							on:click={() => changeBorderRadius(0)}
							style="border-radius: 0;">0</button
						>
						<button
							on:click={() => changeBorderRadius(1)}
							style="border-radius: .25em;">0.25</button
						>
						<button
							on:click={() => changeBorderRadius(2)}
							style="border-radius: .5em;">0.5</button
						>
						<button
							on:click={() => changeBorderRadius(3)}
							style="border-radius: .75em;">0.75</button
						>
						<button
							on:click={() => changeBorderRadius(4)}
							style="border-radius: 9999px;">100%</button
						>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.panel {
		padding-inline: var(--space-s-m);
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

	.field-row {
		width: 80%;
	}

	.repel {
		--repel-vertical-alignment: baseline;
	}

	.border-icons {
		font-size: 12px;
		gap: 0;
	}

	.border-icons button {
		border-radius: 0.25em;
		background-color: var(--color-onyx);
		padding: 0 var(--space-xs);
	}

	.border-icons button:hover {
		background-color: var(--button-background);
		color: inherit;
		border-radius: 0.25em;
	}

	.btn-hover {
		padding: 0.125em 0.75em;
		border-radius: 4px;
		font-size: var(--step--2);
		background: rgba(255, 255, 255, 0.04);
		color: gray;
	}

	.btn-hover.active {
		background: rgba(255, 255, 255, 0.09);
		color: white;
		border: 1px solid red;
	}
</style>
