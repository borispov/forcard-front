<script lang="ts">
	import type { TextElement } from "../../../types/components";

	import {
		UI_STEPPED_TEXT_SIZES,
		UI_STEPPED_TEXT_WEIGHTS,
		TEXT_ALIGN_VALS,
	} from "$lib/utils/UI-CONSTANTS";

	export let textConfig: TextElement;
	export let colors: any;

	$: textAlignmentIndicator = TEXT_ALIGN_VALS[textConfig.design.textAlign];
	$: wIndicator = textConfig.design.width;
	$: fsIndicator = UI_STEPPED_TEXT_SIZES[textConfig.design.font["font-size"]];
	$: fwIndicator =
		UI_STEPPED_TEXT_WEIGHTS[textConfig.design.font["font-weight"]] || "Default";
	let colorIndicator = textConfig.design.color;

	// todo: accomplish text alignemnt
	const textAlignmentHandler = (e: any) => {
		const { value } = e.target;
	};

	// HOW TO FETCH DEFAULT COLORS FROM CSS VARIABLES??
	// SITE's GENERAL SETTINGS..?
	const onColorSelect = (e: any) => {
		const { value } = e.target;
		console.log(`Picking a color: ${value}\n`);
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

		<div class="[ field-group flow ] [ flex ]">
			<div class="[ field-group ]">
				<div class="field-row repel">
					<label for="width">Max Width</label>
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

			{#if colors}
				<div class="[ field-group flow ] [ flex ]">
					<!-- BEGINNING OF BORDER GROUP -->
					<div class="[ field-group ]">
						<div class="field-row repel">
							<label for="text-content">Color</label>
							<div class="indicator">
								{colorIndicator}
							</div>
						</div>

						<select id="div-design_bg_style" on:change={onColorSelect}>
							{#each Object.entries(colors) as [color, value]}
								<option {value}>{color}</option>
							{/each}
						</select>
					</div>
				</div>
			{/if}
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
