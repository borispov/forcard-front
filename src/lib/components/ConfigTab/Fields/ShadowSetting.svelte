<script>
	import FieldGroup from "../FieldGroup.svelte";
	import ColorPicker from "svelte-awesome-color-picker";
	import ColorInput from "$lib/components/ColorInput.svelte";
	import ColorWrapper from "$lib/components/common/ColorWrapper.svelte";

	export let dropShadow;

	let isOpen = false;

	const defaultSettings = {
		offset: {
			min: "-12",
			step: "1",
			max: "12",
		},
		blur: {
			min: "0",
			max: "15",
			step: "0.5",
		},
	};

	const handleAccordion = () => {
		console.log("h");
		isOpen = !isOpen;
	};
</script>

<div class="accordion">
	<button on:click={handleAccordion}> Shadow </button>
	{#if isOpen}
		<div class="accordion__item" style="--display: {isOpen ? 'block' : 'none'}">
			<FieldGroup labelFor="shadow" group transition>
				<!-- OFFSET SHADOW -->
				<div class="field-row">
					<div class="field-row repel">
						<label class="field-label" for="vertical-shadow">Vertical</label>
						<span>{dropShadow.vertical}</span>
					</div>
					<div class="field-row repel">
						<label class="field-label" for="vertical-shadow">Horizontal</label>
						<span>{dropShadow.horizontal}</span>
					</div>
				</div>
				<div class="field-row">
					<input
						{...defaultSettings.offset}
						type="range"
						bind:value={dropShadow.vertical}
					/>
					<input
						{...defaultSettings.offset}
						type="range"
						bind:value={dropShadow.horizontal}
					/>
				</div>
				<!-- BLUR & SPREAD -->
				<div class="field-row">
					<div class="field-row repel">
						<label class="field-label" for="blur-shadow">Blur</label>
						<span>{dropShadow.blur}</span>
					</div>
					<div class="field-row repel">
						<label class="field-label" for="spread-shadow">Spread</label>
						<span>{dropShadow.spread}</span>
					</div>
				</div>
				<div class="field-row">
					<input
						type="range"
						{...defaultSettings.blur}
						bind:value={dropShadow.blur}
					/>
					<input
						type="range"
						{...defaultSettings.blur}
						bind:value={dropShadow.spread}
					/>
				</div>
				<div class="field-row">
					<label class="field-label" for="color-shadow">Shadow Color</label>
					<ColorPicker
						isPopup
						bind:hex={dropShadow.color}
						name="shadow"
						canChangeMode={false}
						components={{
							wrapper: ColorWrapper,
							input: ColorInput,
						}}
					/>
				</div>
			</FieldGroup>
		</div>
	{/if}
</div>

<style>
	.accordion {
		border-top: 1px solid white;
	}
	.accordion__item {
		display: var(--display);
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

	.color-picker {
		--picker-z-index: 9;
		--picker-width: 300px;
		z-index: -1 !important;
		background: black !important;
	}

	button {
		padding: var(--space-s) 0;
		border: none;
		outline: none;
		font-size: var(--step-1);
	}
</style>
