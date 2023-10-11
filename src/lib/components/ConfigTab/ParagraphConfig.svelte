<script lang="ts">
	import type { TextElement } from "../../../types/components";

	import {
		UI_STEPPED_TEXT_SIZES,
		UI_STEPPED_TEXT_WEIGHTS,
		TEXT_ALIGN_VALS,
	} from "$lib/utils/UI-CONSTANTS";

	export let textConfig: TextElement;
	export let colors: { [key: string]: string };

	let onMarginsChange = (vec: string, val: string) => {
		textConfig.design.space.margin[vec] = val;
	};

	$: textAlignmentIndicator =
		TEXT_ALIGN_VALS[Number(textConfig.design.textAlign)];
	$: wIndicator = textConfig.design.width;
	$: fsIndicator =
		UI_STEPPED_TEXT_SIZES[Number(textConfig.design.font["font-size"])];
	$: fwIndicator =
		UI_STEPPED_TEXT_WEIGHTS[Number(textConfig.design.font["font-weight"])] ||
		"Default";
	$: colorIndicator = textConfig.design.color;

	// HOW TO FETCH DEFAULT COLORS FROM CSS VARIABLES??
	// SITE's GENERAL SETTINGS..?
	const onColorSelect = (e: any) => {
		const { value } = e.target;
		textConfig.design.color = value;
	};
</script>

<section data-name="text-config" class="config-section flow">
	<div class="panel">
		<!-- make it a component Field Group -->
		<div class="[ field-group flow ] [ flex ]">
			<!-- BEGINNING OF BORDER GROUP -->
			<div class="[ field-group ]">
				<label for="text-content">Content</label>
				<input bind:value={textConfig.content} type="text" id="text-content" />
			</div>
		</div>

		{#if colors}
			<div class="[ field-group flow ] [ flex ]">
				<!-- BEGINNING OF COLOR GROUP -->
				<div class="[ field-group ]">
					<div class="field-row repel">
						<label for="text-content">Color</label>
					</div>

					<div class="color-input-wrapper">
						<input
							type="text"
							bind:value={textConfig.design.color}
							name="text-color"
							class="color-input"
						/>

						<div class="color-input__button">
							<input type="color" bind:value={textConfig.design.color} />
							<div
								class="indicator__color"
								style="--indicator-color: {colorIndicator}"
							/>
						</div>
					</div>

					<select
						class="color-input__select"
						id="div-design_bg_style"
						on:change={onColorSelect}
					>
						{#each Object.entries(colors) as [color, value]}
							<option {value}>{color}</option>
						{/each}
					</select>
				</div>
			</div>
		{/if}

		<div class="[ field-group flow ] [ flex ]">
			<div class="[ field-group ]">
				<div class="field-row repel">
					<label for="width">Width</label>
					<div class="indicator">
						{wIndicator}
					</div>
				</div>
				<input
					name="width"
					type="range"
					step="5"
					min="35"
					max="75"
					bind:value={textConfig.design.width}
				/>
			</div>

			<div class="[ field-group flow ] [ flex ]">
				<div class="[ field-group ]">
					<div class="field-row repel">
						<label for="width">Text Alignment</label>
						<div class="indicator">
							{textAlignmentIndicator}
						</div>
					</div>
					<input
						name="width"
						type="range"
						step="1"
						min="0"
						max="2"
						list="markers"
						bind:value={textConfig.design.textAlign}
					/>
				</div>

				<!-- BEGINNING OF BORDER GROUP -->
				<div class="[ field-group ]">
					<div class="field-row repel">
						<label for="text-content">Font Size</label>
						<div class="indicator">
							{fsIndicator}
						</div>
					</div>
					<input
						type="range"
						step="1"
						min="0"
						max="7"
						bind:value={textConfig.design.font["font-size"]}
						name="text-content"
					/>
				</div>
			</div>

			<div class="[ field-group flow ] [ flex ]">
				<!-- BEGINNING OF BORDER GROUP -->
				<div class="[ field-group ]">
					<div class="field-row repel">
						<label for="text-content">Font Weight</label>
						<div class="indicator">
							{fwIndicator}
						</div>
					</div>
					<input
						type="range"
						step="1"
						min="0"
						max="2"
						bind:value={textConfig.design.font["font-weight"]}
						name="text-content"
					/>
				</div>
			</div>

			<div class="[ field-group flow ] [ flex ]">
				<!-- BEGINNING OF MARGINS GROUP -->
				<div class="[ field-group ]">
					<div class="field-row repel">
						<label for="margins">Margins</label>
						<div class="indicator">
							{textConfig.design.space.margin.y}
						</div>
					</div>
					<input
						type="range"
						step="1"
						min="0"
						max="8"
						bind:value={textConfig.design.space.margin.y}
						on:input={(e) => onMarginsChange("y", e.currentTarget.value)}
						name="margins"
					/>
				</div>
			</div>

			<div class="[ field-group flow ] [ flex ]">
				<!-- BEGINNING OF LETER SPACING GROUP -->
				<div class="[ field-group ]">
					<div class="field-row repel">
						<label for="margins">Letter Spacing</label>
						<div class="indicator">
							{textConfig.design["letterSpacing"]}
						</div>
					</div>
					<input
						type="range"
						step="0.025"
						min="-0.5"
						max="1"
						bind:value={textConfig.design["letterSpacing"]}
						name="margins"
					/>
				</div>
			</div>

			<div class="[ field-group flow ] [ flex ]">
				<!-- LINE HEIGHT -->
				<div class="[ field-group ]">
					<div class="field-row repel">
						<label for="line-height">Line Height</label>
						<div class="indicator">
							{textConfig.design.lineHeight}
						</div>
					</div>
					<input
						type="range"
						step="10"
						min="100"
						max="200"
						bind:value={textConfig.design.lineHeight}
						name="line-height"
					/>
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

	.field-row {
		width: 80%;
	}

	.repel {
		--repel-vertical-alignment: baseline;
	}

	.indicator__color {
		background: --var(--indicator-color);
		width: 32px;
		height: 32px;
		border-radius: 4px;
		margin-right: 10px;
		border: 1px solid white;
		display: inline-block;
	}

	.color-input-wrapper {
		display: flex;
		flex-flow: row nowrap;
		background: var(--color-onyx);
		align-items: center;
	}

	.color-input {
		background: inherit;
		width: 80%;
		font-style: italic;
	}
	.color-input__button input {
		border: 0;
		padding: 0;
		margin: 0;
		opacity: 0;
		position: absolute;
		background: transparent;
	}

	.color-input__select {
		margin-top: var(--space-s);
		padding-block: var(--space-3xs);
		padding-right: var(--space-m-l);
	}
</style>
