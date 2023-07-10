<script lang="ts">
	import type { Component } from "../../types/components";
	import { getStyles } from "$lib/utils/getStyles";

	export let component;
	export let components: Component[];
	export let hoverHandler: any;

	export let childrenIds: string[];

	// Generate a string css-style.
	let findElementIndex = (id: string) => {
		return components.findIndex((c) => c.id == id);
	};

	let getElementByIndex = (id: string) => {
		return components[findElementIndex(id)];
	};
</script>

<div
	data-name="container"
	data-id={component.id}
	style={getStyles(component.type, component.design)}
	on:focus|self={hoverHandler}
	on:mouseover|self={hoverHandler}
	on:mouseout={hoverHandler}
	on:click|self={hoverHandler}
>
	{#each component.children as c}
		{@const el = getElementByIndex(c.id)}

		{#if el && (el.type == "text" || el.type == "button")}
			<svelte:element
				this={el.role}
				data-id={c.id}
				data-name="element"
				style={getStyles(el.type, el.design)}
				on:mouseenter={hoverHandler}
				on:mouseleave={hoverHandler}
				on:click|self={hoverHandler}
			>
				{el.content}
			</svelte:element>
		{:else if el && el.children}
			<svelte:self component={el} {components} {hoverHandler} />
		{/if}
	{/each}
</div>
