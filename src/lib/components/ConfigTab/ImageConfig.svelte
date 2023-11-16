<script>
	import Switch from "../../components/common/Switch.svelte";
	import FieldGroup from "./FieldGroup.svelte";
	import ColorInput from "../ColorInput.svelte";
	import ColorPicker from "svelte-awesome-color-picker";
	import { getStyles } from "$lib/utils/parseStyles";
	import { stylesheetStore } from "$lib/sheetStore";

	import SpaceSetting from "./Settings/SpaceSetting.svelte";

	export let imgConfig;

	$: {
		let t = imgConfig.type + imgConfig.id;
		console.log("changing");
		let styles = getStyles("img", imgConfig.design, "array");
		let payload = { t, styles };
		stylesheetStore?.dispatch("ADD_STYLES", payload);
	}

	// Localized state/variables
	let borderOn = imgConfig.design.box.border.width != 0;
	let widthIndicator = imgConfig.design.width || "";
	let files;

	let setShadow = (val) => {
		// let transformedValue = UI_STEPPED_VALUES[val];
		// imgConfig.design.shadow = val;
		// TODO: Shadow
	};

	const handleBorderChange = (e, borderProp) => {
		switch (borderProp) {
			case "color":
				const val = e.detail.hex;
				imgConfig.design.box.border.color = val;
				break;
			case "width":
				imgConfig.design.box.border.width = e.target.value;
				break;
			case "style":
				imgConfig.design.box.border.style = e.target.value;
				break;
			case "radius":
				imgConfig.design.box.border.radius = e.target.value;
				break;
			default:
				break;
		}
	};

	let borderHandler = () => {
		borderOn = borderOn ? false : true;
	};

	let spaceHandler = (type, vec, val) => {
		type === "margin" && setMargins(val, vec);
		type === "padding" && setPaddings(val, vec);
	};

	// TODO: Check/Validate File Size Is below a certain threshold
	let onFileSelect = (e) => {
		const inputTarget = e.target;
		console.log("trying to upload an image");
		let image = inputTarget.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			// files[0] = e.target.result;
			imgConfig.settings.source = e.target.result;
		};
	};

	// figure out the best way to set maxWidth if at all.. offer pre-defined
	// settings ? or let user free-roll this
	let setMaxWidth = (e) => {
		const { target } = e;
		const { value } = target;
	};

	let onWidthCustom = (e) => {
		// maybe store values above 100% as max1, max2, max3?
		const { target } = e;
		const { value } = target;
		const numValue = value + "%";
		widthIndicator = numValue;
		imgConfig.design.box.width = numValue;
	};
</script>

<section data-name="img-config" class="config-section flow">
	<div class="panel">
		<!-- make it a component Field Group -->

		<FieldGroup label="Layout" alignLabel="start" labelFor="layout" group>
			<div class="field-group">
				<div class="field-row repel">
					<label for="div-design_bg_style">Width</label>
					<div class="indicator">
						{imgConfig.design.box.width}
					</div>
				</div>

				<input
					id="container-width"
					name="container-width"
					type="range"
					min="15"
					max="100"
					step="1"
					bind:value={imgConfig.design.box.width}
					on:input={onWidthCustom}
				/>
			</div>

			<div class="field">
				<div class="field-row repel">
					<label for="div-design_bg_style">Height</label>
					<div class="indicator">
						{imgConfig.design.box.height}
					</div>
				</div>

				<input
					id="container-height"
					name="container-height"
					type="range"
					min="0"
					max="100"
					step="1"
					bind:value={imgConfig.design.box.height}
				/>
			</div>
		</FieldGroup>

		<!-- BEGINNING OF FILE GROUP -->
		<FieldGroup label="Image File" labelFor="img">
			<input
				accept=".jpg"
				type="file"
				alt="Choose Image File"
				id="img-file"
				on:change={onFileSelect}
			/>
		</FieldGroup>

		<SpaceSetting
			bind:margin={imgConfig.design.box.margin}
			bind:padding={imgConfig.design.box.padding}
		/>

		<!-- BEGINNING OF BORDER GROUP -->
		<FieldGroup marginTop="var(--space-s)" label="Border" labelFor="border">
			<div class="field-row repel">
				<label for="">Border</label>
				<Switch label="" bind:value={borderOn} />
			</div>

			<div class="field-row repel">
				<label for="border-radius">Border Radius</label>
				<div class="indicator">
					{(imgConfig.design.box.border.hasOwnProperty("radius") &&
						imgConfig.design.box.border["radius"]) ||
						0}
				</div>
			</div>
			<div class="[ field-group ]">
				<input
					id="border-radius"
					name="border-radius"
					type="range"
					min="0"
					max="1.25"
					step="0.25"
					value={imgConfig.design.box.border.radius || "0"}
					on:input={(e) => handleBorderChange(e, "radius")}
				/>
			</div>
		</FieldGroup>

		<!-- START OF SHADOW LOGIC -->
		<FieldGroup label="Shadow" labelFor="shadow">
			<!-- OFFSET SHADOW -->
			<div class="field-row">
				<div class="field-row repel">
					<label class="field-label" for="vertical-shadow">Vertical</label>
					<span>{imgConfig.design.effects.dropShadow.vertical}</span>
				</div>
				<div class="field-row repel">
					<label class="field-label" for="vertical-shadow">Horizontal</label>
					<span>{imgConfig.design.effects.dropShadow.horizontal}</span>
				</div>
			</div>
			<div class="field-row">
				<input
					type="range"
					min="-12"
					max="12"
					step="0"
					bind:value={imgConfig.design.effects.dropShadow.vertical}
				/>
				<input
					type="range"
					min="-12"
					max="12"
					step="0"
					bind:value={imgConfig.design.effects.dropShadow.horizontal}
				/>
			</div>
			<!-- BLUR & SPREAD -->
			<div class="field-row">
				<div class="field-row repel">
					<label class="field-label" for="blur-shadow">Blur</label>
					<span>{imgConfig.design.effects.dropShadow.blur}</span>
				</div>
				<div class="field-row repel">
					<label class="field-label" for="spread-shadow">Spread</label>
					<span>{imgConfig.design.effects.dropShadow.spread}</span>
				</div>
			</div>
			<div class="field-row">
				<input
					type="range"
					min="0"
					max="15"
					step="0.5"
					bind:value={imgConfig.design.effects.dropShadow.blur}
				/>
				<input
					type="range"
					min="0"
					max="15"
					step="0.5"
					bind:value={imgConfig.design.effects.dropShadow.spread}
				/>
			</div>
			<div class="field-row">
				<label class="field-label" for="color-shadow">Shadow Color</label>
				<ColorPicker
					isPopup={false}
					bind:hex={imgConfig.design.effects.dropShadow.color}
					components={{ input: ColorInput }}
				/>
			</div>
		</FieldGroup>
		<!-- END OF SHADOW LOGIC -->
	</div>
</section>

<style>
	.config-section {
		--flow-space: var(--space-s-l);
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

	.repel {
		--repel-vertical-alignment: baseline;
	}

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

	.field-row.repel {
		display: flex;
		width: 100%;
	}
</style>
