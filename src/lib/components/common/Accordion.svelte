<script>
	import { fade } from "svelte/transition";

	/**
	 * @prop {string} label
	 * @param {string} label
	 */
	export let label;
	let isOpen = false;

	const handleAccordion = () => {
		isOpen = !isOpen;
	};
</script>

<div class="accordion">
	<button on:click={handleAccordion}> {label} </button>

	{#if true}
		<div
			class="accordion__item"
			style="--display: {isOpen ? 'block' : 'none'}"
			transition:fade
		>
			<slot />
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
	button {
		padding: var(--space-s) 0;
		border: none;
		outline: none;
		font-size: var(--step-1);
	}
</style>
