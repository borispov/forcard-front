<script>
	export let label, labelFor, classes;
</script>

<div class={"[ field-group ]" + { ...classes }}>
	{#if label}
		<label for={labelFor}>{label}</label>
	{/if}

	<slot />
</div>
