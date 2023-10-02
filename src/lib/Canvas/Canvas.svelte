<script lang="ts">
	import { getStyles } from "$lib/utils/getStyles";
	import type { Component } from "../../types/components";
	import Wrapper from "./Wrapper.svelte";

	export let components: Component[];
	export let hoverHandler: Function;
	export let dragHandler: Function;
	export let dragStart: Function;

	// changed it to $ from being a regualr variable.
	$: childrenIds = components?.reduce((acc, component) => {
		return component.children ? [...acc, ...component.children] : acc 
	}, []);

	// Generate a string css-style.
	let findElementIndex = (id: string) => components.findIndex((c) => c.id == id);

</script>

<div id="root">
	{#each components as component, componentIndex(component)}
		<!-- This checks whether we got a COMPONENT or ID reference to the component -->
		{@const elementIndex = findElementIndex(component.id)}

		{#if component.children && !childrenIds.includes(component.id)}
			<Wrapper 
			 	dragStart={dragStart}
				component={component} 
				{components} 
				{hoverHandler} 
				parentIndex={componentIndex} 
				{dragHandler} />
		{/if}

		
		{#if !component.children && !childrenIds.includes(component.id) }
			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			<svelte:element 
				this={component.role} 
				data-id={component.id} 
				data-name="element" 
				on:focus|self={() => hoverHandler}
				on:mouseover|self={() => hoverHandler}
				on:mouseout={() => hoverHandler}
				on:click|self={() => hoverHandler}
				style={getStyles(component.type, component.design)}>
				{component.content}
			</svelte:element>
		{/if}
	{/each}
</div>