<script lang="ts">
	// IMPORTS
	import Switch from "../../components/common/Switch.svelte";
	import type { ImageElement, CssWidth } from "../../../types/components";

	export let imgConfig: ImageElement;

	// Localized state/variables
	let borderOn = Object.entries(imgConfig.design.border).length > 0;
	let widthIndicator: CssWidth = imgConfig.design.width || "";
	let files: File;

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

	let setMargins = (val: string, vec: string) => {
		imgConfig.design.space.margin[vec] = val;
	};

	let setPaddings = (val: string, vec: string) => {
		imgConfig.design.space.padding[vec] = val;
	};

	let setShadow = (val: string) => {
		// let transformedValue = UI_STEPPED_VALUES[val];
		// imgConfig.design.shadow = val;
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
			imgConfig.design.border["radius"] = val;
		}
	};

	let spaceHandler = (type: spaceType, vec: string, val: string) => {
		type === "margin" && setMargins(val, vec);
		type === "padding" && setPaddings(val, vec);
	};

	let imageSettings = {
		isBackground: false,
		isImage: false,
		isColor: false,
		isGradient: false,
		data: {
			bgColor: "",
		},
	};

	// TODO: Check/Validate File Size Is below a certain threshold
	let onFileSelect = (e) => {
		const inputTarget = e.target as HTMLInputElement;
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
	let setMaxWidth = (e: Event) => {
		const { target } = e;
		const { value } = target as HTMLInputElement;
	};

	let onWidthCustom = (e: Event) => {
		// maybe store values above 100% as max1, max2, max3?
		const { target } = e;
		const { value } = target as HTMLInputElement;
		const numValue = value + "%";
		widthIndicator = numValue;
		imgConfig.design.width = numValue;
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
						{imgConfig.design.width}
					</div>
				</div>

				<input
					id="container-width"
					name="container-width"
					type="range"
					min="0"
					max="100"
					step="1"
					bind:value={imgConfig.design.width}
				/>
			</div>

			<div class="field">
				<div class="field-row repel">
					<label for="div-design_bg_style">Height</label>
					<div class="indicator">
						{imgConfig.design.height}
					</div>
				</div>

				<input
					id="container-height"
					name="container-height"
					type="range"
					min="0"
					max="100"
					step="1"
					bind:value={imgConfig.design.height}
				/>
			</div>

			<!-- BEGINNING OF BACKGROUND GROUP -->
			<div class="field">
				<label for="img-file">Image File</label>
				<input
					accept=".jpg"
					type="file"
					alt="Choose Image File"
					id="img-file"
					on:change={onFileSelect}
				/>
			</div>

			<div class="field">
				<div class="[ field-group ]">
					<!-- BEGINNING OF MARGINS GROUP -->
					<label for="">Margins</label>
					<div class="field-row repel">
						<label for="margin_vertical">X-Axis</label>
						<div class="indicator">
							{UI_STEPPED_VALUES[imgConfig.design.space.margin["x"]] || "None"}
						</div>
					</div>
					<div class="[ field-group ]">
						<input
							bind:value={imgConfig.design.space.margin["x"]}
							id="margin_vertical"
							name="margin_vertical"
							type="range"
							min="0"
							max="8"
							step="1"
							on:input={(e) =>
								spaceHandler("margin", "x", e.currentTarget.value)}
						/>
					</div>

					<div class="[ field-group ]">
						<div class="field-row repel">
							<label for="margin_horizontal">Y-Axis</label>
							<div class="indicator">
								{UI_STEPPED_VALUES[imgConfig.design.space.margin["y"]] ||
									"None"}
							</div>
						</div>
						<input
							bind:value={imgConfig.design.space.margin["y"]}
							id="margin_horizontal"
							name="margin_horizontal"
							type="range"
							min="0"
							max="8"
							step="1"
							on:input={(e) =>
								spaceHandler("margin", "y", e.currentTarget.value)}
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
							<div class="indicator">{imgConfig.design.space.padding["x"]}</div>
						</div>
						<input
							id="padding_vertical"
							name="padding_vertical"
							type="range"
							min="0"
							max="8"
							step="1"
							bind:value={imgConfig.design.space.padding["x"]}
							on:input={(e) =>
								spaceHandler("padding", "x", e.currentTarget.value)}
						/>
					</div>

					<div class="[ field-group ]">
						<div class="field-row repel" data-nowrap>
							<label for="padding_horizontal">Y-Axis</label>
							<div class="indicator">{imgConfig.design.space.padding["y"]}</div>
						</div>
						<input
							id="padding_horizontal"
							name="padding_horizontal"
							type="range"
							min="0"
							max="8"
							step="1"
							bind:value={imgConfig.design.space.padding["y"]}
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
								{(imgConfig.design.border.hasOwnProperty("radius") &&
									imgConfig.design.border["radius"]) ||
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
								value={imgConfig.design.border["radius"] || "0"}
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
