<script lang="ts">
	// IMPORTS
	import Switch from "$lib/components/common/Switch.svelte";
	import type { ButtonElement } from "../../../types/components";

	export let buttonConfig: ButtonElement;
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

	$: fsIndicator = UI_STEPPED_TEXT_SIZES[buttonConfig.design.font["font-size"]];
	$: fwIndicator = UI_STEPPED_TEXT_WEIGHTS[buttonConfig.design.font["font-weight"]] || "Default";
	$: borderOn = true;

	$: backgroundColor = null

	let colorIndicator = buttonConfig.design.color;

	const changeBorderRadius = (val: number) => {
		console.log("changing to val: ", val)
		buttonConfig.design.border.radius = val
	}

    function updateButtonConfig(event) {
        const { name, value, type, checked } = event.target;

        if (type === "checkbox") {
        buttonConfig[name] = checked;
        } else {
        buttonConfig[name] = value;
        }
    }

	// todo: accomplish text alignemnt
	const textAlignmentHandler = (e: any) => {
		const { value } = e.target;
	};

	// HOW TO FETCH DEFAULT COLORS FROM CSS VARIABLES??
	// SITE's GENERAL SETTINGS..?
	const onColorSelect = (e: any) => {
		const { value } = e.target;
		buttonConfig.design.color = value;
	};
</script>

<section data-name="text-config" class="config-section flow">
	<div class="panel">
		<!-- BEGINNING OF INNER HTML GROUP -->
		<div class="[ field-group ]">
			<label for="text-content">Content</label>
			<input bind:value={buttonConfig.content} type="text" id="text-content" />
		</div>

			<label for="linkTo">Link To:</label>
			<input
				type="text"
				id="linkTo"
				name="linkTo"
				bind:value={buttonConfig.settings.linkTo}
				on:input={updateButtonConfig}
			/>

			<label>
				<input
				type="checkbox"
				id="openInNewTab"
				name="openInNewTab"
				bind:checked={buttonConfig.settings.openInNewTab}
				on:change={updateButtonConfig}
				/>
				Open in New Tab
			</label>

			<!-- BEGINNING OF FONT SIZE GROUP -->
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
					bind:value={buttonConfig.design.font["font-size"]}
					name="text-content"
				/>
			</div>

		<div class="[ field-group flow ] [ flex ]">
			<!-- BEGINNING OF FONT WEIGHT GROUP -->
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
					bind:value={buttonConfig.design.font["font-weight"]}
					name="text-content"
				/>
			</div>
		</div>

		{#if colors}
			<div class="[ field-group flow ] [ flex ]">
				<!-- BEGINNING OF COLORS GROUP -->
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
										console.log("WE SWITCHED OFF")
										buttonConfig.design.border.radius = ''
									}
								}}
							/>
						</div>
					</div>

					{#if borderOn}
						<div class="repel border-icons">
							<button on:click={() => changeBorderRadius(0)} style="border-radius: 0;">0</button>
							<button on:click={() => changeBorderRadius(1)} style="border-radius: .25em;">0.25</button>
							<button on:click={() => changeBorderRadius(2)} style="border-radius: .5em;">0.5</button>
							<button on:click={() => changeBorderRadius(3)} style="border-radius: .75em;">0.75</button>
							<button on:click={() => changeBorderRadius(4)} style="border-radius: 9999px;">100%</button>
						</div>
					{/if}

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

	.border-icons {
		font-size: 12px;
		gap: 0;
	}

	.border-icons button {
		border-radius: .25em;
		background-color: var(--color-onyx);
		padding: 0 var(--space-xs);
	}

	.border-icons button:hover {
		background-color: var(--button-background);
		color: inherit;
		border-radius: .25em;
	}

</style>