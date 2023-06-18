<script>
	export let label, labelFor, classes, handler;
</script>

<div class={"[ field-group ]" + { ...classes }}>
	{#if label}
		<label for={labelFor}>{label}</label>
	{/if}

	{#if type == "select"}{/if}

	<slot />
</div>
