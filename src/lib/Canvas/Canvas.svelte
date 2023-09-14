<script lang="ts">
  import { getStyles } from "$lib/utils/getStyles";
	import type { Component } from "../../types/components";
	import Wrapper from "./Wrapper.svelte";

	export let components: Component[];
	export let hoverHandler: any;

	let childrenIds = components?.reduce((acc, component) => {
		if (component.children) {
			return acc.concat(component.children.map((child) => child.id));
		}
		return acc;
	}, []);

	let renderedComponentIds: string[] = [];

	// Generate a string css-style.
	let findElementIndex = (id: string) => {
		return components.findIndex((c) => c.id == id);
	};

	// is it necessary to pull the component?
	// I can just register the rendered component's ID and return the component itself. Why search it again?
	let getElementByIndex = (id: string) => {
		renderedComponentIds.push(id);
		return components[findElementIndex(id)];
	};

</script>

<div id="root">
	{#each components as component}
		{@const el =
			component.type !== undefined ? component : getElementByIndex(component.id)}

		{#if el.children && !childrenIds.includes(el.id)}
			<Wrapper component={el} {components} {childrenIds} {hoverHandler} />
		{/if}

		{#if !el.children && !childrenIds.includes(el.id) }
			<svelte:element 
				this={el.role} 
				data-id={el.id} 
				data-name="element" 
				style={getStyles(el.type, el.design)}>
				{el.content}
			</svelte:element>
		{/if}
	{/each}
</div>