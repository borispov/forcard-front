<script>
	export let active = "element";
	export let removeHandler;

	let tabHandler = (e) => {
		let valu = e.currentTarget.getAttribute("data-name");
		active = valu;
	};
</script>

<div class="flow">
	<div class="tab repel" data-nowrap>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<section
			class={active == "element" ? "tab__item tab--active" : "tab__item"}
			on:click={tabHandler}
			tabindex="0"
			role="tab"
			data-name="element"
		>
			Element
		</section>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<section
			class={active == "design" ? "tab__item tab--active" : "tab__item"}
			tabindex="0"
			on:click={tabHandler}
			role="tab"
			data-name="design"
		>
			Design
		</section>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<section
			tabindex="0"
			on:click={tabHandler}
			class={active == "motion" ? "tab__item tab--active" : "tab__item"}
			data-name="motion"
			role="tab"
		>
			Motion
		</section>
	</div>
		<div class="mb-4 repel">
			<h3>{active}</h3>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-interactive-supports-focus -->
			<span role="button" aria-label="delete item" on:click={removeHandler}>
				<svg style="width: 28px; height: 28px;" fill="white" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 467.36"><path fill-rule="nonzero" d="M58.327 0h281.809c-12.343 13.848-23.287 27.375-32.932 40.444H58.327c-4.929 0-9.415 2.01-12.656 5.227a17.95 17.95 0 00-5.227 12.657v350.705c0 4.868 2.04 9.331 5.288 12.579 3.264 3.263 7.75 5.304 12.595 5.304h395.345c4.815 0 9.286-2.056 12.557-5.327 3.271-3.271 5.326-7.742 5.326-12.556V173.301A950.502 950.502 0 00512 155.387v253.646c0 15.995-6.611 30.592-17.173 41.154-10.562 10.562-25.159 17.173-41.155 17.173H58.327c-15.996 0-30.623-6.58-41.193-17.15C6.595 439.671 0 425.082 0 409.033V58.328c0-16.012 6.565-30.57 17.111-41.132l.084-.084C27.757 6.565 42.316 0 58.327 0zm178.36 158.589c6.833 7.054 14.49 15.285 22.63 24.334a902.98 902.98 0 0118.494-17.845c57.166-53.59 121.141-99.314 177.703-120.561 5.732-2.155 12.136.734 14.291 6.466a11.11 11.11 0 01-2.889 12.098c-23.515 25.09-50.562 51.51-78.786 79.077-29.148 28.475-59.565 58.197-87.904 88.117a1866.704 1866.704 0 0119.779 24.127c26.099 32.405 49.929 64.32 62.668 85.497 3.142 5.25 1.43 12.067-3.821 15.208a11.024 11.024 0 01-7.482 1.422l-34.888-4.425a11.06 11.06 0 01-7.451-4.318c-19.358-25.664-41.613-51.793-65.305-77.304-25.518 29.569-47.513 58.87-62.729 86.895-2.064 3.798-6.038 5.9-10.088 5.778l-47.62-.933c-6.115-.091-10.991-5.135-10.899-11.249a11.253 11.253 0 011.185-4.853c18.953-37.25 49.386-79.673 85.901-120.988-33.864-33.1-68.759-63.815-101.133-89.447-4.791-3.783-5.609-10.761-1.826-15.553a10.96 10.96 0 016.572-3.997c25.939-5.128 46.451-2.69 64.755 5.327 17.86 7.833 32.992 20.78 48.843 37.127z"/></svg>
			</span>
		</div>
</div>

<style>
	h3 {
		text-transform: capitalize;
		padding-left: var(--space-s);
	}
	* {
		cursor: pointer;
	}

	.tab {
		gap: var(--space-s);
	}

	.tab__item {
		padding: var(--space-2xs) var(--space-s);
	}

	.tab--active {
		background: var(--color-onyx);
	}

	.repel svg {
		margin-right: 2em;
	}
</style>
