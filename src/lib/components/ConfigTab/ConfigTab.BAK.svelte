<script lang="ts">
	import ConfigHeader from "./ConfigHeader.svelte";
	import DivConfig from "./DivConfig.svelte";
	import TextConfig from "./TextConfig.svelte";
	import ButtonConfig from "./ButtonConfig.svelte";
	import ParagraphConfig from "./ParagraphConfig.svelte";
	import ImageConfig from "./ImageConfig.svelte";
	import type {
		ImageElement,
		ButtonElement,
		ContainerElement,
		TextElement,
	} from "../../../types/components";

	export let component:
		| TextElement
		| ButtonElement
		| ImageElement
		| ContainerElement;
	export let removeHandler: Function;
	export let siteSettings;

	$: activePane = "";
</script>

<div class="config">
	<ConfigHeader {removeHandler} />
	{#if component !== undefined}
		<!-- Render Settings For Container/Div Elements -->
		{#if component.type == "container"}
			<DivConfig bind:divConfig={component} />
		{/if}

		{#if component.type == "img"}
			<ImageConfig bind:imgConfig={component} />
		{/if}

		{#if component.type == "p"}
			<ParagraphConfig
				bind:textConfig={component}
				colors={siteSettings.colorScheme}
			/>
		{/if}

		{#if component.type == "button"}
			<ButtonConfig
				bind:buttonConfig={component}
				colors={siteSettings.colorScheme}
			/>
		{/if}

		{#if component.type == "text"}
			<TextConfig
				bind:textConfig={component}
				colors={siteSettings.colorScheme}
			/>
		{/if}

		<!-- Render Settings For Text Elements -->
		{#if component.type == "text"}
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
