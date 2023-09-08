<script lang="ts">
	// IMPORTS
	import Header from "./Header.svelte";
	import Switch from "../common/Switch.svelte";

	import type { TextElement } from "../../types/components";

	export let textConfig: TextElement;
	export let colors;

	const UI_STEPPED_TEXT_SIZES = [
		"Step -2",
		"Step -1",
		"Step 1",
		"Step 2",
		"Step 3",
		"Step 4",
		"Step 5",
		"Step 6",
	];

	const UI_STEPPED_TEXT_WEIGHTS = ["Thin", "Regular", "Bold"];

	let fsIndicator = UI_STEPPED_TEXT_SIZES[textConfig.design.font["font-size"]];
	let fwIndicator =
		UI_STEPPED_TEXT_WEIGHTS[textConfig.design.font["weight"]] || "DEFAULT";

	let colorIndicator = textConfig.design.color;

	const fontWeightHandler = (e: any) => {
		const { value } = e.target;
		if (value) textConfig.design.font["weight"] = value;

		fwIndicator = UI_STEPPED_TEXT_WEIGHTS[Number(value)];
		textConfig.design.font["weight"] = value;
	};

	// todo: accomplish text alignemnt
	const textAlignmentHandler = (e: any) => {
		const { value } = e.target;
	};

	const fontSizeHandler = (e: any) => {
		const { value } = e.target;
		if (value) textConfig.design.font["font-size"] = value;

		fsIndicator = UI_STEPPED_TEXT_SIZES[Number(value)];
		textConfig.design.font["font-size"] = value;
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
	<Header />

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
					id="text-content"
					on:input={fontSizeHandler}
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
					id="text-content"
					on:input={fontWeightHandler}
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
