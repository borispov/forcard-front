<script lang="ts">
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

	let getElementByIndex = (id: string) => {
		renderedComponentIds.push(id);
		return components[findElementIndex(id)];
	};

	$: console.log(renderedComponentIds);
</script>

{#each components as component}
	{@const el =
		component.type !== undefined ? component : getElementByIndex(component.id)}

	{#if el.children && !childrenIds.includes(el.id)}
		<Wrapper component={el} {components} {childrenIds} {hoverHandler} />
	{/if}
{/each}

<style>
	section {
		border: 1px solid red;
	}
</style>
