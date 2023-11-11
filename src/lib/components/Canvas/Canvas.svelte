<script lang="ts">
	import { generateSelector } from "$lib/utils/generateClasses";
	import { onMount } from "svelte";
	import Wrapper from "./Wrapper.svelte";

	export let components: any;
	export let hoverHandler: Function;
	export let dragHandler: Function;
	export let dragStart: Function;

	// changed it to $ from being a regualr variable.
	$: childrenIds = components?.reduce((acc, component) => {
		return component.children ? [...acc, ...component.children] : acc;
	}, []);

	let findElementIndex = (id: string) =>
		components.findIndex((c) => c.id == id);
</script>

<div id="root">
	{#each components as component, componentIndex (component)}
		<!-- This checks whether we got a COMPONENT or ID reference to the component -->
		{@const elementIndex = findElementIndex(component.id)}

		{#if component.children && !childrenIds.includes(component.id)}
			<Wrapper
				{dragStart}
				{component}
				{components}
				{hoverHandler}
				parentIndex={componentIndex}
				{dragHandler}
			/>
		{/if}

		{#if !component.children && !childrenIds.includes(component.id)}
			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			<svelte:element
				this={component.role}
				id={generateSelector(component.id, component.type).slice(1)}
				data-id={component.id}
				data-name="element"
				on:focus|self={() => hoverHandler}
				on:mouseover|self={() => hoverHandler}
				on:mouseout={() => hoverHandler}
				on:click|self={() => hoverHandler}
			>
				{component.content}
			</svelte:element>
		{/if}
	{/each}
</div>
