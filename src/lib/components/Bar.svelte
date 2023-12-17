<script>
	import { fade } from "svelte/transition";

	/**
	 * addElement function adds elements to the components' store
	 * @type {function}
	 */
	export let addElement;
	export let addServicesTemplate;
	export let addFormTemplate;

	const openGlobalSettings = () => {};
	const openPublishSettings = () => {};

	let addMenuOpened = false;
	let settingsMenuOpened = false;

	/**
	 * @param {string} some
	 */
	let toggleAddMenu = (some) => (addMenuOpened = !addMenuOpened);

	let toggleSettingsMenu = () => (settingsMenuOpened = !settingsMenuOpened);
</script>

<div class="bar">
	<button class="bar__button" on:click={toggleSettingsMenu}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="add-icon-svg"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
			/>
		</svg>
	</button>
	<button class="bar__button" on:click={toggleAddMenu}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="add-icon-svg"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M12 4.5v15m7.5-7.5h-15"
			/>
		</svg>
	</button>

	{#if settingsMenuOpened}
		<div class="settings-button-wrap" transition:fade>
			<button
				class="add-button float-menu-item"
				on:click={() => openGlobalSettings()}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="menu-svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
				Page
			</button>
			<button
				class="add-button float-menu-item"
				on:click={() => openPublishSettings()}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="menu-svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525"
					/>
				</svg>
				Publish
			</button>
		</div>
	{/if}

	{#if addMenuOpened}
		<div class="add-button-wrap" transition:fade>
			<button
				class="add-button float-menu-item"
				on:click={() => addFormTemplate()}
			>
				Form
			</button>
			<button
				class="add-button float-menu-item"
				on:click={() => addServicesTemplate()}
			>
				<svg
					class="menu-svg"
					xmlns="http://www.w3.org/2000/svg"
					height="1em"
					viewBox="0 0 448 512"
					><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
						d="M384 80c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16H384zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"
					/>
				</svg>
				Services
			</button>
			<button
				class="add-button float-menu-item"
				on:click={() => addElement("container")}
			>
				<svg
					class="menu-svg"
					xmlns="http://www.w3.org/2000/svg"
					height="1em"
					viewBox="0 0 448 512"
					><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
						d="M384 80c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16H384zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"
					/>
				</svg>
				Container
			</button>
			<button
				class="add-button float-menu-item"
				on:click={() => addElement("text")}
			>
				<svg
					class="menu-svg"
					xmlns="http://www.w3.org/2000/svg"
					height="1em"
					viewBox="0 0 448 512"
					><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
					<path
						d="M0 64C0 46.3 14.3 32 32 32H80h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H112V208H336V96H320c-17.7 0-32-14.3-32-32s14.3-32 32-32h48 48c17.7 0 32 14.3 32 32s-14.3 32-32 32H400V240 416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H368 320c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V272H112V416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V240 96H32C14.3 96 0 81.7 0 64z"
					/></svg
				>
				Heading
			</button>
			<button
				class="add-button float-menu-item"
				on:click={() => addElement("button")}
			>
				<svg
					class="menu-svg"
					xmlns="http://www.w3.org/2000/svg"
					height="1em"
					viewBox="0 0 384 512"
					><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
						d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"
					/></svg
				>
				Button
			</button>
			<button
				class="add-button float-menu-item"
				on:click={() => addElement("p")}
			>
				<svg
					class="menu-svg"
					xmlns="http://www.w3.org/2000/svg"
					height="1em"
					viewBox="0 0 448 512"
					><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
						d="M288 64c0 17.7-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32H256c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
					/></svg
				>
				Paragraph
			</button>
			<button
				class="add-button float-menu-item"
				on:click={() => addElement("img")}
			>
				<svg
					class="menu-svg"
					xmlns="http://www.w3.org/2000/svg"
					height="1em"
					viewBox="0 0 512 512"
					><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
						d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
					/></svg
				>
				Image
			</button>
		</div>
	{/if}
</div>

<style>
	.add-button-wrap {
		position: absolute;
		top: 150%;
		right: 0;
		display: flex;
		flex-direction: column;
		justify-content: justify-content;
		align-items: flex-start;
		background: rgb(40, 30, 66);
	}

	.add-button-wrap::before {
		content: "";
		position: absolute;
		top: -12px;
		right: 25%;
		width: 12px;
		height: 12px;
		background: inherit;
		clip-path: polygon(50% 0, 100% 100%, 0 100%);
	}

	.settings-button-wrap {
		position: absolute;
		top: 150%;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: justify-content;
		align-items: flex-start;
		background: rgb(40, 30, 66);
	}

	.settings-button-wrap::before {
		content: "";
		position: absolute;
		top: -12px;
		left: 25%;
		width: 12px;
		height: 12px;
		background: inherit;
		clip-path: polygon(50% 0, 100% 100%, 0 100%);
	}

	button {
		cursor: pointer;
		width: 100px;
		margin: 5px 0;
		background: rgb(40, 30, 66);
		border: none;
		color: white;
	}

	.bar {
		z-index: 2;
		position: absolute;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		top: 1%;
		right: 1%;
		padding: 0 10px;
		border-radius: var(--space-3xs);
		background: rgb(40, 30, 66);
	}

	.bar__button {
		background: rgb(40, 30, 66);
		border: none;
		color: white;
	}

	.add-icon-svg {
		width: 26px;
		height: 26px;
	}

	.menu-svg {
		width: 32px;
		height: 32px;
	}

	.float-menu-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--space-s);
		padding: var(--space-3xs) var(--space-xs);
		font-weight: 400;
		width: 100%;
	}

	.add-button-wrap svg {
		fill: #d4d4d4;
	}

	.add-button {
		padding-left: var(--space-2xs);
		padding-right: var(--space-m);
	}
	.add-button:hover {
		background: rgb(80, 60, 126);
	}
</style>
