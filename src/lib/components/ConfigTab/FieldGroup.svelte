<script>
	export let label, labelFor;
	export let alignLabel = "start";
	export let marginTop = "var(--space-l)";
	export let margins = "var(--space-3xs)";
	export let indicator = null;
	export let suffix = null;
</script>

<div
	style="--align: {alignLabel}; --marginTop: {marginTop};"
	class="[ field-group ] flow"
>
	{#if label}
		<label class="field-label" for={labelFor}>
			{label}
			{#if indicator !== null}
				<span>
					{indicator}
					{#if suffix !== null}
						{" " + suffix}
					{/if}
				</span>
			{/if}
		</label>
	{/if}
	<slot />
</div>

<style>
	.field-label {
		display: flex;
		justify-content: space-between;
		color: var(--text-light);
		margin-top: var(--marginTop);
		margin-bottom: var(--space-xs);
		font-size: var(--step--2);
		text-align: var(--align);
		padding-inline: var(--space-s);
	}

	span {
		font-size: 14px;
		padding-right: 1em;
	}
</style>
