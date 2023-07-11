<script lang="ts">
	import { fade } from "svelte/transition";
	import { site } from "../lib/store.js";
	import Canvas from "../lib/Canvas/Canvas.svelte";
	import ConfigTab from "../lib/ConfigTab.svelte";

	let selectedComponentId = "0";
	function getComponentIndex(id: string): number {
		return $site.components.findIndex((comp) => comp.id === id);
	}
	$: selectedComponentIndex =
		selectedComponentId !== "0" && getComponentIndex(selectedComponentId);

	let addMenuOpened = false;
	let toggleAddMenu = () => (addMenuOpened = !addMenuOpened);

	// I WORK ON SELECTING ELEMENTS ----------->>>>>>>>>>>>>>>>>>>>>>>>
	let componentsHoverHandler = (e) => {
		// select clicked Element
		if (e.type == "click") {
			let elementId = e.target.getAttribute("data-id");
			selectedComponentId = elementId;

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

		// on hover effects
		if (e.type === "mouseenter" || e.type == "mouseover") {
			e.currentTarget.classList.add("hovered-element");
		}
		if (e.type === "mouseleave" || e.type == "mouseout") {
			e.target.classList.remove("hovered-element");
		}
	};

	const setElementId = (type, elementsList) => {
		const latestTypeId =
			elementsList.findLastIndex(
				(element) => element.type === type && element.id
			) || 0;

		return latestTypeId !== -1 ? latestTypeId + 1 : 1;
	};

	// TODO: Need to update default settings according to Component type
	// and settings
	const setDefaultProps = (elementType) => {
		return {
			type: elementType,
			content: elementType !== "img" && elementType,
			parent: "body",
			props: {
				styles: {
					margin: "0",
					background: (elementType == "div" && "#d3d3d3") || "#8f8f8f",
				},
				children: [],
			},
		};
	};

	// Elements are {TYPE, ID} pairs - convenience
	$: elements = $site.components.map((element) => [element.type, element.id]);

	function selectElementFromNavigation(element, id) {
		let selected =
			$site.components.findIndex((a) => a.type === element && a.id === id) ||
			-1;

		return $site.components[selected];
	}

	function addElement(element) {
		let e = setDefaultProps(element);
		e.id = setElementId(e.type, $site.components);
		$site.components = [...$site.components, e];
	}
</script>

<main class="layout u-grid">
	<div class="bar">
		<button on:click={toggleAddMenu}>Add +</button>
		{#if addMenuOpened}
			<div class="add-button-wrap" transition:fade>
				<button class="add-button" on:click={() => addElement("div")}>
					Add Div +
				</button>
				<button class="add-button" on:click={() => addElement("h1")}>
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

		<!-- todo: move this to a floating pane or something collapsible like in Elementor maybe? -->
		<div class="picked">
			<h2>Navigation:</h2>
			<ul>
				{#each elements as [el, id]}
					<li
						on:keydown={() => {}}
						on:click={() => selectElementFromNavigation(el, id)}
					>
						Element: {el}<span>></span>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<div style={$site.site.utopia}>
		<div
			class="canvas-site-wrapper"
			style={"max-width: " + $site.site.pageSettings.width + ";"}
		>
			<Canvas
				hoverHandler={componentsHoverHandler}
				components={$site.components}
			/>
		</div>
	</div>
</main>

<style>
	.canvas-site-wrapper {
		overflow-x: hidden;
	}
	.layout {
		background: var(--color-light);
		box-sizing: border-box;
	}

	.picked {
		display: inline-block;
	}

	.picked li {
		padding: 1em;
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
		border: 3px dotted rgb(99, 64, 213);
	}

	:global(.active-element) {
		border: 3px solid rgb(99, 64, 213);
	}
</style>
