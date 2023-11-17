<script>
	import SpaceSetting from "./Settings/SpaceSetting.svelte";
	import { stylesheetStore } from "$lib/sheetStore";
	import { getStyles } from "$lib/utils/parseStyles";

	import BorderSetting from "./Settings/BorderSetting.svelte";
	import ColorInput from "../../components/ColorInput.svelte";
	import FieldGroup from "./FieldGroup.svelte";
	import ColorPicker from "svelte-awesome-color-picker";
	import TypographySetting from "./Settings/TypographySetting.svelte";

	import { buttonSchema } from "$lib/schemas";

	import { TEXT_ALIGN_VALS } from "$lib/utils/UI-CONSTANTS";
	import { derived, writable } from "svelte/store";
	import { afterUpdate } from "svelte";

	let hoverState = false;

	export let buttonConfig;
	let btnStore = writable(buttonConfig);
	$: {
		buttonConfig = buttonSchema.parse(buttonConfig);
		$btnStore = buttonConfig;
		let t = buttonConfig.type + buttonConfig.id;
		let styles = getStyles("button", buttonConfig.design, "array");
		let payload = { t, styles };
		stylesheetStore?.dispatch("ADD_STYLES", payload);
	}
	let selectorCurrent = buttonConfig.type + buttonConfig.id;

	let hoverStyles = derived(btnStore, ($btnStore) => {
		return {
			color: $btnStore.design.typography.hover.color,
			background: $btnStore.design.background.hover.backgroundColor,
		};
	});

	// TODO: WRONG approach, must FIX
	// Probably should add pseudo element if the styles AREN"T EMPTY
	// AND should only add this if it odesn't exist
	afterUpdate(() => {
		if (!$hoverStyles.color && !$hoverStyles.background) {
			stylesheetStore.dispatch("DELETE_STYLE", {
				targetElement: selectorCurrent + ":hover",
			});
		}
	});
	$: {
		$hoverStyles.color &&
			$hoverStyles.background &&
			stylesheetStore.dispatch("ADD_PSEUDO", {
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

	const onPaddingsChange = () => {
		buttonConfig.design.box.padding = {
			y: buttonPaddingsSizings[buttonPaddingsIndex].values[0],
			x: buttonPaddingsSizings[buttonPaddingsIndex].values[1],
		};
	};

	const onHoverStyleChange = (e, prop) => {
		const value = e.detail.hex;
		const payload = {
			targetElement: selectorCurrent,
			styles: [[prop, value]],
		};
		stylesheetStore.dispatch("ADD_HOVER_STYLE", payload);
	};

	$: textAlignmentIndicator =
		TEXT_ALIGN_VALS[Number(buttonConfig.design.typography.textAlign)];

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
						on:input={(e) => onHoverStyleChange(e, "background")}
						components={{ input: ColorInput }}
					/>
				</FieldGroup>

				<FieldGroup label="Color" alignLabel="center" labelFor="text-content">
					<ColorPicker
						bind:hex={buttonConfig.design.typography.hover.color}
						on:input={(e) => onHoverStyleChange(e, "color")}
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

		<BorderSetting bind:border={buttonConfig.design.box.border} />
	</div>
</section>

<style>
	.panel {
		padding-inline: var(--space-s-m);
		font-size: 12px;
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
