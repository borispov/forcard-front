<script lang="ts">
	import { generateSelector } from "$lib/utils/generateClasses";
	import { onMount } from "svelte";

	// props
	let latestContainerIndex: Number;
	export let parentIndex: number;
	export let component: any;
	export let components: any;

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
	let getElementByIndex = (id: string) => {
		return components[findElementIndex(id)];
	};

	onMount(() => {
		latestContainerIndex = findElementIndex(component.id);
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
	id={generateSelector(component.id, component.type).slice(1)}
	data-name="container"
	data-id={component.id}
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
				id={generateSelector(el.id, el.type).slice(1)}
				data-id={childId}
				data-name={el.type}
				draggable={true}
				ondragover="return false"
				on:dragsTart={(event) =>
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
				id={generateSelector(el.id, el.type).slice(1)}
				src={el.settings.source || el.settings.placeholder_source}
				alt={el.settings.altText}
				data-id={childId}
				data-name={el.type}
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
		{:else if el.type == "icon"}
			<span>ICON</span>
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
