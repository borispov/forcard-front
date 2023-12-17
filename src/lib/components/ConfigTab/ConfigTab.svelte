<script lang="ts">
	// TODO:
	// ADD Form elements to be configurable
	import ConfigHeader from "./ConfigHeader.svelte";
	import ContainerConfig from "./ContainerConfig.svelte";
	import TextCfg from "./TextCfg.svelte";
	import ButtonConfig from "./ButtonConfig.svelte";
	import ParagraphConfig from "./ParagraphConfig.svelte";
	import ImageConfig from "./ImageConfig.svelte";

	export let component: any;
	export let removeHandler: Function;
	export let siteSettings: any;

	$: activePane = "";
</script>

<div class="config">
	<ConfigHeader {removeHandler} />
	{#if component !== undefined}
		{#if component.type == "container"}
			<ContainerConfig bind:divConfig={component} />
			<!-- <DivConfig bind:divConfig={component} /> -->
		{/if}

		{#if component.type == "img"}
			<ImageConfig bind:imgConfig={component} />
		{/if}

		{#if component.type == "text"}
			<TextCfg bind:textConfig={component} />
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

		<!-- {#if component.type == "text"} -->
		<!-- 	<TextConfig -->
		<!-- 		bind:textConfig={component} -->
		<!-- 		colors={siteSettings.colorScheme} -->
		<!-- 	/> -->
		<!-- {/if} -->

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
</style>
