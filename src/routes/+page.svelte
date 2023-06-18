<script>
	import { fade } from "svelte/transition";
	import { site } from "../lib/store.js";
	import Canvas from "../lib/Canvas/Canvas.svelte";
	import ConfigTab from "../lib/ConfigTab.svelte";
	import DivConfig from "../lib/ConfigTab/DivConfig.svelte";

	let currentSelected = "";

	let addMenuOpened = false;

	let toggleAddMenu = () => (addMenuOpened = !addMenuOpened);

	const setElementId = (type, elementsList) => {
		const latestTypeId =
			elementsList.findLastIndex(
				(element) => element.type === type && element.id
			) || 0;

		return latestTypeId !== -1 ? latestTypeId + 1 : 1;
	};

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

	function selectElement(element, id) {
		currentSelected =
			$site.components.findIndex((a) => a.type === element && a.id === id) ||
			currentSelected;
		return currentSelected;
	}

	function setHeadingLevel(e) {
		let value = e.target.value;
		$site.components[currentSelected].type = "h" + value;
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
		<DivConfig divConfig={$site.components[0]} />
		<!-- <ConfigTab type="div" /> -->

		<div class="picked">
			<h2>Selected Elements:</h2>
			<ul>
				{#each elements as [el, id]}
					<li on:keydown={() => {}} on:click={() => selectElement(el, id)}>
						Element: {el}<span>></span>
					</li>
				{/each}
			</ul>
		</div>

		<div class="config">
			<p>Element Configurations:</p>
			{#if typeof $site.components[currentSelected] == "object"}
				<p>Element: {$site.components[currentSelected].type}</p>

				<p>Element ID: {$site.components[currentSelected].id}</p>

				<p>Parent: {$site.components[currentSelected].parent}</p>

				<!-- Select Parent  -->
				<div class="label-wrap">
					<label for="parent">Select Parent: </label>
					<select
						name="parent"
						id="parent-select"
						bind:value={$site.components[currentSelected].parent}
					>
						<option value="body">body</option>
						{#each $site.components as el}
							<option value={`#${el.type}-${el.id}`}
								>{`#${el.type}-${el.id}`}</option
							>
						{/each}
					</select>
				</div>

				<label for="content">Text: </label>
				<input
					bind:value={$site.components[currentSelected].content}
					name="content"
				/>

				<label for="color">Color: </label>
				<input
					on:change={(e) => {
						if ($site.components[currentSelected].props.styles) {
							$site.components[currentSelected].props.styles["color"] =
								e.target.value;
						}
					}}
					name="color"
				/>

				{#if $site.components[currentSelected].type[0] === "h"}
					<label for="font-size">Font Size: </label>
					<input
						on:change={(e) => {
							if ($site.components[currentSelected].props.styles) {
								$site.components[currentSelected].props.styles["font-size"] =
									e.target.value;
							}
						}}
						name="font-size"
					/>
				{/if}

				<label for="class">Class: </label>
				<input
					bind:value={$site.components[currentSelected].props.class}
					name="class"
				/>

				{#if $site.components[currentSelected].type[0] === "h"}
					<label for="level">Heading Level: </label>
					<select
						name="level"
						id="level"
						on:change={setHeadingLevel}
						bind:value={$site.components[currentSelected].props.level}
					>
						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3}>3</option>
						<option value={4}>4</option>
						<option value={5}>5</option>
						<option value={6}>6</option>
					</select>
				{/if}
			{/if}
		</div>
	</div>
	<Canvas components={$site.components} />
</main>

<style>
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

	.config {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.label-wrap {
		display: flex;
	}

	label {
		display: inline-block;
	}

	select {
		width: 50px;
		display: inline-block;
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
</style>
