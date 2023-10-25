<script>
	export let options;
	export let userSelected;
	export let fontSize;
	export let flexDirection;

	const uniqueID = Math.floor(Math.random() * 100);

	const slugify = (str = "") =>
		str.toLowerCase().replace(/ /g, "-").replace(/\./g, "");

	console.log(userSelected);
</script>

<div
	role="radiogroup"
	class="radio-wrapper"
	aria-labelledby={`label-${uniqueID}`}
	style="font-size: {fontSize}px; flex-direction: {flexDirection}"
	id={`group-uniqueID`}
>
	{#each options as { value, label, icon }}
		<input
			class="visually-hidden"
			type="radio"
			id={slugify(label)}
			bind:group={userSelected}
			{value}
		/>
		<label for={slugify(label)}>
			{#if icon}
				<svelte:component this={icon} width={"36px"} height={"22px"} />
			{/if}
			{label}
		</label>
	{/each}
</div>

<style>
	.radio-wrapper {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		width: 100%;
	}

	.radio-wrapper input[type="radio"] {
		opacity: 0;
		display: none;
	}

	.radio-wrapper label {
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		font-size: var(--space-xs);
		border-radius: 12px;
		padding: 1em 0.5em;
	}

	.radio-wrapper label:hover {
		background: #28282833;
	}

	.radio-wrapper input[type="radio"]:focus + label {
		box-shadow: 0 0 8px var(--accent-color, #28282844);
	}

	.radio-wrapper input[type="radio"]:checked + label {
		color: var(--color-primary);
	}
</style>
