<script lang="ts">
	import DivConfig from "./ConfigTab/DivConfig.svelte";
	import TextConfig from "./ConfigTab/TextConfig.svelte";
	// import ButtonConfig from "./ConfigTab/ButtonConfig.svelte";
	import type { Component, TextElement } from "../types/components";

	export let component: Component | TextElement | undefined;

	$: activePane = "";
</script>

<div class="config">
	{#if component}
		<!-- Render Settings For Container/Div Elements -->
		{#if component.type == "container"}
			<DivConfig bind:divConfig={component} />
		{/if}

		{#if component.type == "text"}
			<TextConfig bind:textConfig={component} />
		{/if}

		<!-- Render Settings For Text Elements -->
		{#if component.role === "p" || component.role === "h" || component.type == "text"}
			<ul>
				<li
					data-name="content"
					data-tooltip="תוכן"
					on:keydown={() => {}}
					on:click={() => (activePane = "content")}
				/>
				<li
					data-name="design"
					data-tooltip="עיצוב"
					on:keydown={() => {}}
					on:click={() => (activePane = "design")}
				/>
			</ul>
		{/if}

		<!-- Settings For Buttons -->
		{#if component && component.type === "button"}
			<ul>
				<li
					data-name="content"
					data-tooltip="תוכן"
					on:keydown={() => {}}
					on:click={() => (activePane = "content")}
				/>
				<li
					data-name="design"
					data-tooltip="עיצוב"
					on:keydown={() => {}}
					on:click={() => (activePane = "design")}
				/>
			</ul>

			<!-- <ButtonConfig /> -->
		{/if}
	{/if}
</div>

<style>
	ul {
		display: flex;
		flex-direction: row;
		list-style: none;
		justify-content: flex-start;
		margin: 0;
		padding: 0;
		background: rgba(14, 15, 25, 0.175);
	}

	ul li {
		padding: 1em;
		cursor: pointer;
	}

	ul li.active {
		background: rgba(53, 54, 66, 1);
	}

	section {
		padding: 2.25em 1.625em 0.5em 1.625em;
	}

	section.active {
		display: flex;
		flex-direction: column;
	}

	section h2 {
		text-transform: capitalize;
	}

	label {
		display: block;
		font-size: 18px;
		line-height: 1.6;
		margin-top: 10px;
		text-transform: capitalize;
	}

	input {
		padding: 6px 12px;
	}
</style>
