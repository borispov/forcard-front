<script>
	export let label, labelFor;
	export let alignLabel = "start";
	export let marginTop = "var(--space-l)";
	export let margins = "var(--space-3xs)";
	export let indicator = null;
	export let suffix = null;
	export let group = false;
</script>

<div
	style="--align: {alignLabel}; --marginTop: {marginTop};"
	class="[ field-group ] flow"
>
	{#if label}
		<div class="label-wrapper">
			<label class="field-label" for={labelFor}>
				{label}
				{#if indicator !== null}
					<span>
						{indicator}
						{#if typeof suffix == "string"}
							{" " + suffix}
						{/if}
					</span>
				{/if}
			</label>
			<slot name="state-btn" />
		</div>
	{/if}
	{#if group}
		<main>
			<slot />
		</main>
	{:else}
		<slot />
	{/if}
</div>

<style>
	.label-wrapper {
		display: flex;
		justify-content: space-between;
		margin-top: var(--marginTop);
		margin-bottom: var(--space-xs);
		padding-inline: var(--space-2xs);
		align-items: baseline;
	}
	main {
		border: dotted 1px rgba(255, 255, 255, 0.18);
		padding: 0 0.75em 0.5em 0.75em;
		align-items: baseline;
	}

	.field-label {
		display: flex;
		justify-content: space-between;
		width: 100%;
		color: var(--text-light);
		font-size: var(--step--2);
		text-align: var(--align);
	}

	span {
		font-size: 14px;
		padding-right: 1em;
	}
</style>
