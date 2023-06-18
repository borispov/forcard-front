<script>
	export let active = "element";

	let tabHandler = (e) => {
		let valu = e.currentTarget.getAttribute("data-name");
		active = valu;
	};
</script>

<div class="flow">
	<div class="tab repel" data-nowrap>
		<section
			class={active == "element" ? "tab__item tab--active" : "tab__item"}
			on:click={tabHandler}
			tabindex="0"
			role="tab"
			data-name="element"
		>
			Element
		</section>
		<section
			class={active == "design" ? "tab__item tab--active" : "tab__item"}
			tabindex="0"
			on:click={tabHandler}
			role="tab"
			data-name="design"
		>
			Design
		</section>
		<section
			tabindex="0"
			on:click={tabHandler}
			class={active == "motion" ? "tab__item tab--active" : "tab__item"}
			data-name="motion"
			role="tab"
		>
			Motion
		</section>
	</div>
	<h3>{active}</h3>
</div>

<style>
	h3 {
		text-transform: capitalize;
		padding-left: var(--space-s);
	}
	* {
		cursor: pointer;
	}

	.tab {
		gap: var(--space-s);
	}

	.tab__item {
		padding: var(--space-2xs) var(--space-s);
	}

	.tab--active {
		background: var(--color-onyx);
	}
</style>
