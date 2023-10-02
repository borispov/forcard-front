<script lang="ts">
	// TODO;
	import { fade } from "svelte/transition";
	import { site } from "$lib/store";
	import Canvas from "$lib/Canvas/Canvas.svelte";
	import ConfigTab from "$lib/components/ConfigTab/ConfigTab.svelte";

	import { populateTextDefaults, populateDivDefaults, populateBtnDefaults } from "$lib/components/ConfigTab/defaultSettings.js";
	import type { ComponentType, TextElement, ContainerElement, ButtonElement, ComponentRole } from "../types/components.js";

	let selectedComponentId = null;
	let dragStartContainer = null;
	let draggedComponentId = null;

	const getComponentIndex = (id:string): number => {
		return $site.components?.findIndex((component) => Number(component.id) === Number(id));
	}

	$: selectedComponentIndex = selectedComponentId && getComponentIndex(selectedComponentId);

	let addMenuOpened = false;
	let toggleAddMenu = () => (addMenuOpened = !addMenuOpened);

	// The Magic Of element selection!
	let componentsHoverHandler = (e: MouseEvent) => {
		const target = e.currentTarget as HTMLElement;
		// select clicked Element
		if (e.type == "click") {
			selectComponentById(e)
		}
		// on hover effects
		if (e.type === "mouseenter" || e.type == "mouseover") {
			target.classList.add("hovered-element");
		}
		if (e.type === "mouseleave" || e.type == "mouseout") {
			target.classList.remove("hovered-element");
		}
	};

	// TODO: Refactor
	const selectComponentById = async (e:string|number|MouseEvent) => {

		// When adding a new element.
		if (typeof e !== 'object') {
			let chosenElementId = e;
			setTimeout(() => {
				let query = `[data-id="${chosenElementId}"]`
				document.querySelector(query).classList.add("active-element")
			}, 50);
		} else {
			// Selecting existing element & UPDATE selected element
			const targetElement = e.target as HTMLElement;
			selectedComponentId = targetElement.getAttribute("data-id");

			if (!targetElement.classList.contains("active-element")) {
				document.querySelectorAll(".active-element").forEach((el) => { el.classList.remove("active-element")});
				targetElement.classList.add("active-element");
			}
		}

	}

	// Check the latest element's ID and increment it.
	const setElementId = (elementsList) => {
		let lastElement = elementsList[elementsList.length - 1];
		return Number(lastElement.id) + 1;
	};

	const setDefaultProps = (elementType: ComponentType, elementRole?: ComponentRole): TextElement | ButtonElement | ContainerElement => {
		const prependedId = String(setElementId($site.components));

		switch (elementType) {
			case 'button':
				return populateBtnDefaults(prependedId, elementRole);
			case 'text':
				return populateTextDefaults(prependedId, elementRole);
			case 'container':
				return populateDivDefaults(prependedId, elementRole)
			default:
				break;
		}
	};

	// check whether current selected element is a container 
	const isContainer = (components, componentIndex) => components[componentIndex]?.type === 'container' ? true : false

	const addElement = (type: ComponentType): void => {
		let e = setDefaultProps(type);

		// make a deep copy of components' array and append to it.
		// Spread operator doesn't solve this issue
		let componentsClone = structuredClone($site.components);
		$site.components = [...componentsClone, e]

		// CHECK if chosen element is a container that we can nest the newly added element into.
		if (selectedComponentIndex && isContainer($site.components, selectedComponentIndex)) {
			$site.components[selectedComponentIndex].children.push( e.id )
		}

		// update SelectedComponent's ID
		selectedComponentId = String(e.id)
		selectComponentById(e.id)
	}

	// Currently CAN only remove a selected ITEM. In The Future Should Allow For Easier Deletions.
	const removeElement = (): void => {
		const id = selectedComponentId
		$site.components = $site.components.filter(c => c.id !== id)
		selectedComponentIndex = null
		selectedComponentId = null
	}

	// FIX: Id's are not Indexes! I probably don't need most of those arguments
	// TODO: Remove unused arguments
	const dragStart = (event, containerElementId, draggedElementId, childIndexInTree, elementId) => {
		// pass element's id (data-id) attribute
		const data = { elementId }
		event.dataTransfer.setData('text/plain', JSON.stringify(data))

		dragStartContainer = containerElementId;
		draggedComponentId = draggedElementId;
	}

	const dropHandler = (
		event:DragEvent, 
		options: {
			type: string, 
			hoveredElementIndex: number, 
			childIndex: number,
			parentIndex: number, 
		},
		newContainerId
	) => {

		// extract element id from the drag-drop event
		const json = event.dataTransfer.getData("text/plain");
		const data = JSON.parse(json);

		// If the change is within a container
		if (newContainerId === dragStartContainer) {
			let containerComponent = $site.components[dragStartContainer];
			let movedElement = containerComponent.children.splice(draggedComponentId, 1)[0]
			containerComponent.children.splice(options.hoveredElementIndex, 0, movedElement)
			$site.components[dragStartContainer] = containerComponent
			return;
		}

		// container to append to
		const theParentElement = $site.components[newContainerId]
		theParentElement.children.splice(options.hoveredElementIndex + 1, 0, data.elementId )
		
		// container to remove from
		const previousContainer = $site.components[dragStartContainer]
		previousContainer.children = previousContainer.children.filter(( id ) => data.elementId !== id)

		// UPDATE
		$site.components[newContainerId] = theParentElement
		$site.components[dragStartContainer] = previousContainer
	}

</script>

<main class="layout u-grid">
	<div class="bar">
		<button on:click={toggleAddMenu}>Add +</button>
		{#if addMenuOpened}
			<div class="add-button-wrap" transition:fade>
				<button class="add-button" on:click={() => addElement("container")}>
					Add Div +
				</button>
				<button class="add-button" on:click={() => addElement("text")}>
					Add Heading +
				</button>
				<button class="add-button" on:click={() => addElement("button")}>
					Add Button +
				</button>
				<button class="add-button" on:click={() => addElement("p")}>
					Add Paragraph +
				</button>
				<button class="add-button" on:click={() => addElement("img")}>
					Add Image +
				</button>
			</div>
		{/if}
	</div>

	<div class="sidebar">
		{#if selectedComponentId && selectedComponentIndex !== null}
			<ConfigTab
				bind:component={$site.components[selectedComponentIndex]}
				siteSettings={$site.site}
				removeHandler={removeElement}
			/>
		{/if}
	</div>

	<div style={$site.site.utopia} class="canvas-site-wrapper">
		<Canvas
			dragHandler={dropHandler}
			dragStart={dragStart}
			hoverHandler={componentsHoverHandler}
			components={$site.components}
		/>
	</div>
</main>

<style>
	.canvas-site-wrapper {
		overflow-x: hidden;
		border: 1px solid rgba(0, 0, 0, 0.25);
		border-radius: 0.25em;
		flex: 1;
		max-width: 100%;
	}

	.layout {
		display: flex;
		background: var(--color-light);
		box-sizing: border-box;
		--grid-gutter: 0;
	}

	.add-button-wrap {
		display: flex;
		flex-direction: column;
		justify-content: justify-content;
		align-items: flex-start;
	}

	ul {
		margin: 0;
		padding: 0;
		border: 1px solid grey;
		padding: 2px;
	}

	ul li {
		list-style: none;
		margin: 5px 0;
		display: flex;
		justify-content: space-between;
		width: 150px;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 1px -1px 0 1px rgba(0, 0, 0, 0.8);
		padding: 5px 10px;
		border-radius: 4px;
		cursor: pointer;
	}

	button {
		cursor: pointer;
		width: 180px;
		padding: 5px 10px;
		margin: 5px 0;
		border-radius: 12px;
	}

	.sidebar {
		height: 100vh;
		overflow-y: scroll;
	}

	.bar {
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		top: 10%;
		right: 10%;

		padding: 6px 35px;
		border-radius: 24px;
		background: rgb(40, 30, 66);
	}

	.bar > button {
		background: rgb(40, 30, 66);
		border: none;
		color: white;
	}

	:global(.hovered-element) {
		box-sizing: border-box;
		outline: dotted 1px orange;
	}

	:global(.active-element) {
		box-sizing: border-box;
		outline: solid 1px orange;
	}
</style>
