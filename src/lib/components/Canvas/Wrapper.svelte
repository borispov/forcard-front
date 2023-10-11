<script lang="ts">
	import type { Component } from "../../../types/components";
	import { getStyles } from "$lib/utils/getStyles";
	import { onMount } from "svelte";

	// props
	let latestContainerIndex: Number;
	export let parentIndex: number;
	export let component: Component;
	export let components: Component[];

	// handlers
	export let hoverHandler: Function;
	export let dragHandler: Function;
	export let dragStart: Function;

	// state
	let hoveringOverContainer = null;
	let hoveredElementIndex = null;

	// helpers
	let findElementIndex = (id: string) =>
		components.findIndex((c) => c.id == id);
	let getElementByIndex = (id: string) => components[findElementIndex(id)];

	onMount(() => {
		latestContainerIndex = findElementIndex(component.id);
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
	data-name="container"
	data-id={component.id}
	style={getStyles(component.type, component.design)}
	on:click|self={() => hoverHandler}
	on:drop|stopPropagation|preventDefault={(e) =>
		dragHandler(
			e,
			{ type: "element", hoveredElementIndex },
			latestContainerIndex
		)}
	on:mouseover|self={hoverHandler}
	on:mouseout={hoverHandler}
	on:click|self={hoverHandler}
	ondragover="return false"
>
	{#each component.children as childId, childIndexInContainer (childId)}
		{@const el = getElementByIndex(childId)}
		{@const elementIndex = findElementIndex(el.id)}

		{#if el && (el.type == "text" || el.type == "button" || el.type == "p")}
			<svelte:element
				this={el.role}
				data-id={childId}
				data-name={el.type}
				style={getStyles(el.type, el.design)}
				draggable={true}
				ondragover="return false"
				on:dragstart={(event) =>
					dragStart(
						event,
						latestContainerIndex,
						childIndexInContainer,
						elementIndex,
						el.id
					)}
				on:dragenter={() => (hoveredElementIndex = childIndexInContainer)}
				on:click|self={hoverHandler}
				on:mouseover|self={hoverHandler}
				on:mouseout={hoverHandler}
			>
				{el.content}
			</svelte:element>
		{:else if el.type == "img"}
			<svelte:element
				this={el.role}
				src={el.settings.source || el.settings.placeholder_source}
				alt={el.settings.altText}
				data-id={childId}
				data-name={el.type}
				style={getStyles(el.type, el.design)}
				draggable={true}
				ondragover="return false"
				on:dragstart={(event) =>
					dragStart(
						event,
						latestContainerIndex,
						childIndexInContainer,
						elementIndex,
						el.id
					)}
				on:dragenter={() => (hoveredElementIndex = childIndexInContainer)}
				on:click|self={hoverHandler}
				on:mouseover|self={hoverHandler}
				on:mouseout={hoverHandler}
			/>
		{:else if el && el.children}
			<svelte:self
				component={el}
				{components}
				{hoverHandler}
				{dragStart}
				{dragHandler}
				{parentIndex}
			/>
		{/if}
	{/each}
</div>
