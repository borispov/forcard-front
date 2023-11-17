<script lang="ts">
	// where should I generate the classes?
	import { fade } from "svelte/transition";
	import { site } from "$lib/newStore";
	import Canvas from "$lib/components/Canvas/Canvas.svelte";
	import ConfigTab from "$lib/components/ConfigTab/ConfigTab.svelte";
	import { servicesLayout } from "$lib/templates";

	import Bar from "$lib/components/Bar.svelte";
	import global from "$lib/styles/global.css";
	import type {
		ComponentType,
		ComponentRole,
		TemplateType,
	} from "$lib/schemas";
	import { stylesheetStore } from "$lib/sheetStore";

	import {
		populateTextDefaults,
		populateDivDefaults,
		populateBtnDefaults,
		populateImgDefaults,
		populateParagraphDefaults,
	} from "$lib/components/ConfigTab/defaultSettings.js";
	import { getStyles } from "$lib/utils/parseStyles";
	import { generateSelector, generateRule } from "$lib/utils/generateClasses";
	import { onMount } from "svelte";

	let selectedComponentId = $site.components[0].id;
	let dragStartContainer = null;
	let draggedComponentId = null;

	const getComponentIndex = (id: string): number => {
		return $site.components?.findIndex(
			(component) => Number(component.id) === Number(id)
		);
	};

	$: selectedComponentIndex =
		selectedComponentId && getComponentIndex(selectedComponentId);

	$: console.log(selectedComponentId);

	// The Magic Of element selection!
	let componentsHoverHandler = (e: MouseEvent) => {
		const target = e.currentTarget as HTMLElement;
		// select clicked Element
		if (e.type == "click") {
			selectComponentById(e);
		}
		// on hover effects
		document.querySelector(".tooltip")?.remove();

		// tooltip logic?!
		if (e.type === "mouseenter" || e.type == "mouseover") {
			let div = document.createElement("div");
			div.classList.add("tooltip");
			let styles = {
				position: "absolute",
				top: "-32px",
				left: "-1px",
				background: "rgb(40, 30, 66)",
				color: "white",
				height: "30px",
				width: "100px",
				padding: "0.5em 1em",
				fontSize: "12px",
			};

			for (const s in styles) {
				div.style[s] = styles[s];
			}

			const dataIdAttribute = e.target.getAttribute("data-name");
			div.innerHTML = dataIdAttribute;
			target.prepend(div);
			target.classList.add("hovered-element");
		}
		if (e.type === "mouseleave" || e.type == "mouseout") {
			target.classList.remove("hovered-element");
		}
	};

	// TODO: Refactor
	const selectComponentById = async (e: string | number | MouseEvent) => {
		// When adding a new element.
		if (typeof e !== "object") {
			let chosenElementId = e;
			setTimeout(() => {
				let query = `[data-id="${chosenElementId}"]`;
				document.querySelector(query).classList.add("active-element");
			}, 50);
		} else {
			// Selecting existing element & UPDATE selected element
			const targetElement = e.target as HTMLElement;
			selectedComponentId = targetElement.getAttribute("data-id");

			if (!targetElement.classList.contains("active-element")) {
				document.querySelectorAll(".active-element").forEach((el) => {
					el.classList.remove("active-element");
				});
				targetElement.classList.add("active-element");
			}
		}
	};

	// Check the latest element's ID and increment it.
	const setElementId = (elementsList: any) => {
		let lastElement = elementsList[elementsList.length - 1];
		return Number(lastElement.id) + 1;
	};

	const setDefaultProps = (
		elementType: ComponentType,
		elementRole?: ComponentRole
	) => {
		const prependedId = String(setElementId($site.components));

		switch (elementType) {
			case "button":
				return populateBtnDefaults(prependedId, elementRole);
			case "text":
				return populateTextDefaults(prependedId, elementRole);
			default:
			case "container":
				return populateDivDefaults(prependedId, elementRole);
			case "img":
				return populateImgDefaults(prependedId, elementRole);
			case "p":
				return populateParagraphDefaults(prependedId, elementRole);
		}
	};

	// check whether current selected element is a container
	const isContainer = (components: any, componentIndex: number | string) =>
		components[componentIndex]?.type === "container" ? true : false;

	const addElement = (type: ComponentType): void => {
		let e = setDefaultProps(type);
		$site.components = [...$site.components, e];
		const elementCss = getComponentStyles(e.id, e.type, e.design);
		console.log(elementCss);
		$stylesheetStore?.insertRule(elementCss);

		// CHECK if chosen element is a container that we can nest the newly added element into.
		if (
			selectedComponentIndex !== null &&
			isContainer($site.components, selectedComponentIndex)
		) {
			$site.components[selectedComponentIndex].children.push(e.id);
		} else {
			// add to root component
			$site.components[0].children.push(e.id);
		}

		// update SelectedComponent's ID
		selectedComponentId = String(e.id);
		selectComponentById(e.id);
	};

	const findId = (id, arr) => {
		return arr.findIndex((c) => c.id == id);
	};

	const addServicesTemplate = () => {
		var _tmpId = setElementId($site.components);

		// Great Logic. extract to a function and make templates!!!
		// Great time to use classnames to control elements uniformly.
		// caution; function is NOT recursive. cannot deal with 2 levels of
		// CONTAINERS!!!
		servicesLayout.forEach((c, i, a) => {
			if (c.children) {
				if (c.id.length > 3) {
					let prependedId = String(_tmpId);
					_tmpId++;
					servicesLayout[i].id = prependedId;
				}

				c.children.map((child, childId) => {
					console.log(child);
					let idInArray = findId(child, servicesLayout);
					console.log(idInArray);

					let newId = String(_tmpId);
					_tmpId++;
					servicesLayout[idInArray].id = newId;
					servicesLayout[i].children[childId] = newId;
				});
			}
		});

		$site.components = [...$site.components, ...servicesLayout];
		for (let serviceEl of servicesLayout) {
			const elementCss = getComponentStyles(
				serviceEl.id,
				serviceEl.type,
				serviceEl.design
			);
			$stylesheetStore?.insertRule(elementCss);
		}
	};

	// Currently CAN only remove a selected ITEM. In The Future Should Allow For Easier Deletions.
	const removeElement = (): void => {
		const id = selectedComponentId;

		$site.components.find((c, idx) => {
			let i = c.children?.findIndex((childId) => childId === id);
			if (i && i > -1) {
				console.log(i);
				console.log(`found child in container `);
				$site.components[idx].children = [
					...$site.components[idx].children.slice(0, i),
					...$site.components[idx].children.slice(i + 1),
				];

				$site.components = $site.components.filter((c) => c.id !== id);
			}
		});

		selectedComponentIndex = 0;
		selectedComponentId = "1";
	};

	// FIX: Id's are not Indexes! I probably don't need most of those arguments
	// TODO: Remove unused arguments
	const dragStart = (
		event,
		containerElementId,
		draggedElementId,
		childIndexInTree,
		elementId
	) => {
		// pass element's id (data-id) attribute
		const data = { elementId };
		event.dataTransfer.setData("text/plain", JSON.stringify(data));

		dragStartContainer = containerElementId;
		draggedComponentId = draggedElementId;
	};

	const dropHandler = (
		event: DragEvent,
		options: {
			type: string;
			hoveredElementIndex: number;
			childIndex: number;
			parentIndex: number;
		},
		newContainerId
	) => {
		// extract element id from the drag-drop event
		const json = event.dataTransfer.getData("text/plain");
		const data = JSON.parse(json);

		// If the change is within a container
		if (newContainerId === dragStartContainer) {
			let containerComponent = $site.components[dragStartContainer];
			let movedElement = containerComponent.children.splice(
				draggedComponentId,
				1
			)[0];
			containerComponent.children.splice(
				options.hoveredElementIndex,
				0,
				movedElement
			);
			$site.components[dragStartContainer] = containerComponent;
			return;
		}

		// container to append to
		const theParentElement = $site.components[newContainerId];
		theParentElement.children.splice(
			options.hoveredElementIndex + 1,
			0,
			data.elementId
		);

		// container to remove from
		const previousContainer = $site.components[dragStartContainer];
		previousContainer.children = previousContainer.children.filter(
			(id) => data.elementId !== id
		);

		// UPDATE
		$site.components[newContainerId] = theParentElement;
		$site.components[dragStartContainer] = previousContainer;
	};

	onMount(() => {
		// $stylesheet = new CSSStyleSheet();

		$site.components.map(({ id, type, design }) => {
			const style = getComponentStyles(id, type, design);
			$stylesheetStore?.insertRule(style);
		});
		document.adoptedStyleSheets.push($stylesheetStore);
	});

	const getComponentStyles = (id, type, designObject) => {
		const cssRules = getStyles(type, designObject);
		const selector = generateSelector(id, type);
		const style = generateRule(selector, cssRules);
		return style;
	};
</script>

<main class="layout u-grid">
	<Bar {addElement} {addServicesTemplate} />
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
			{dragStart}
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

	.sidebar {
		height: 100vh;
		overflow-y: scroll;
	}

	:global(.hovered-element) {
		position: relative;
		box-sizing: border-box;
		outline: dotted 1px orange;
	}

	:global(.active-element) {
		box-sizing: border-box;
		outline: solid 1px orange;
	}
</style>
