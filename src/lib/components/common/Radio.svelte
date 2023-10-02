<script>
	export let options;
	export let legend;
	export let userSelected = options[0].value;
	export let fontSize;
	export let flexDirection;

	const uniqueID = Math.floor(Math.random() * 100);

	const slugify = (str = "") =>
			str.toLowerCase().replace(/ /g, "-").replace(/\./g, "");
</script>

<div role="radiogroup"
	class="radio-wrapper"
	aria-labelledby={`label-${uniqueID}`}
	style="font-size: {fontSize}px; flex-direction: {flexDirection}"
	id={`group-${}uniqueID`}
	>

	<div class="legend" id={`label-${uniqueID}`}>
		{legend}
	</div>

	{#each options as { value, label }}
		<input 
			class="sr-only"
			type="radio"
			id={slugify(label)}
			bind:group={userSelected}
			value={value} />
		<label for={slugify(label)}> {label} </label>
	{/each

</div>

<style>

		input {

		}
</style>
