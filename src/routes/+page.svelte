<script lang="ts">
	// TODO;
	// Change Function Namings, it's very confusing atm.
	import { fade } from "svelte/transition";
	import { site } from "../lib/store.js";
	import Canvas from "../lib/Canvas/Canvas.svelte";
	import ConfigTab from "../lib/ConfigTab.svelte";

	import { populateTextDefaults, populateDivDefaults } from "$lib/ConfigTab/defaultSettings.js";
	import type { Component, TextElement } from "../types/components.js";

	let selectedComponentId = "0";
	function getComponentIndex(id: string): number {
		return $site.components.findIndex((comp) => Number(comp.id) === Number(id));
	}
	$: selectedComponentIndex =
		selectedComponentId !== "0" && getComponentIndex(selectedComponentId);


	let addMenuOpened = false;
	let toggleAddMenu = () => (addMenuOpened = !addMenuOpened);

	// I WORK ON SELECTING ELEMENTS ----------->>>>>>>>>>>>>>>>>>>>>>>>
	let componentsHoverHandler = (e) => {
		// select clicked Element
		if (e.type == "click") {
			selectComponentById(e)
		}

		// on hover effects
		if (e.type === "mouseenter" || e.type == "mouseover") {
			e.currentTarget.classList.add("hovered-element");
		}
		if (e.type === "mouseleave" || e.type == "mouseout") {
			e.target.classList.remove("hovered-element");
		}
	};

	const selectComponentById = async (e) => {
		let chosenElementId;
		let el;

		if (typeof e !== 'object') {
			chosenElementId = e;
			setTimeout(() => {
				let query = `[data-id="${chosenElementId}"]`
				el = document.querySelector(query);
				el.classList.add("active-element");
				selectedComponentId = String(chosenElementId)
			}, 250);
		} else {
			el = e;
			selectedComponentId = e.target.getAttribute("data-id");
			if (!e.target.classList.contains("active-element")) {
				e.target.classList.add("active-element");

				// remove previously selected element
				document.querySelectorAll(".active-element").forEach((el) => {
					const isActive =
						Number(el.getAttribute("data-id")) != Number(selectedComponentId);
					isActive && el.classList.remove("active-element");
				});
			}
		}

	}

	// Let's check the latest element's ID and increment it.
	const setElementId = (type, elementsList) => {

		let lastElement = elementsList[elementsList.length - 1];
		return Number(lastElement.id) + 1;

		const latestTypeId =
			elementsList.findLastIndex(
				(element) => element.type === type && element.id
			) || 0;

		return latestTypeId + 1;
		// return latestTypeId !== -1 ? latestTypeId + 1 : 1;
	};

	// TODO: Need to update default settings according to Component type
	// and settings
	const setDefaultProps = (elementType: string, elementRole?: string): Component | TextElement => {
		const prependedId = setElementId(elementType, $site.components);

		let elementToRender;

		switch (elementType) {
			case 'text':
				elementToRender = populateTextDefaults(prependedId, elementRole);
				break;
			case 'container':
				elementToRender = populateDivDefaults(prependedId, elementRole)
				break;
			default:
				break;
		}
		console.log(elementToRender)
		return elementToRender
	};

	// Elements are {TYPE, ID} pairs - convenience - do I need this?!
	$: elements = $site.components.map((element) => [element.type, element.id]);

	// check whether current selected element is a container 
	// depends on $site
	const isElementContainer = () => {


		if (selectedComponentIndex == undefined) return false

		const result = $site.components[selectedComponentIndex]?.type == 'container' 
			? true
			: false

		console.log(result)

		return result;

	}


	const addElementToComponents = (el) => {
	}

	// TODO: Work on adding an element
	function addElement(element) {

		console.log(selectedComponentIndex)

		let e = setDefaultProps(element);
		// add the new element to the global element array
		$site.components.push(e)

		// CHECK if chosen element is a container that we can nest the newly added element into.
		if (selectedComponentIndex !== undefined && isElementContainer()) {
			$site.components[selectedComponentIndex].children.push({ id: e.id})
		}

		selectedComponentId = String(e.id)
		selectComponentById(e.id)
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
		<!-- <DivConfig bind:divConfig={$site.components[0]} /> -->
		{#if selectedComponentId != "0"}
			<ConfigTab
				bind:component={$site.components[selectedComponentIndex]}
				siteSettings={$site.site}
			/>
		{/if}
	</div>

	<div style={$site.site.utopia} class="canvas-site-wrapper">
		<Canvas
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
		outline: solid 1px orange;
	}

	:global(.active-element) {
		box-sizing: border-box;
		outline: solid 1px orange;
	}
</style>
