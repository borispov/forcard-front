<script lang="ts">
	import type { Component } from "../../types/components";
	import { getStyles } from "$lib/utils/getStyles";

	export let component;
	export let components: Component[];

	export let childrenIds: string[];

	// Generate a string css-style.
	let findElementIndex = (id: string) => {
		return components.findIndex((c) => c.id == id);
	};

	let getElementByIndex = (id: string) => {
		return components[findElementIndex(id)];
	};
</script>

<div style={getStyles(component.type, component.design)}>
	{#each component.children as c}
		{@const el = getElementByIndex(c.id)}

		{#if el && (el.type == "text" || el.type == "button")}
			<svelte:element this={el.role} style={getStyles(el.type, el.design)}>
				{el.content}
			</svelte:element>
		{:else if el && el.children}
			<svelte:self component={el} {components} />
		{/if}
	{/each}
</div>
