<script lang="ts">
	import Header from "./Header.svelte";

	type spaceType = "margin" | "padding" | "gutter";

	let setMargins = (val: string, vec: string) => {
		divConfig.design.margin[vec] = val;
	};

	let setPaddings = (val: string, vec: string) => {
		divConfig.design.padding[vec] = val;
	};

	let spaceHandler = (type: spaceType, vec: string, val: string) => {
		type === "margin" && setMargins(val, vec);
		type === "padding" && setPaddings(val, vec);
	};

	export let id: string;

	let files: File;

	let backgroundSettings = {
		isBackground: false,
		isImage: false,
		isColor: false,
		isGradient: false,
	};

	let onSelect = () => {
		console.log("selecting...");
		backgroundSettings = { ...backgroundSettings, isBackground: true };
	};

	let onFileSelect = (e) => {
		// TODO: Check/Validate File Size Is below a certain threshold
		let image = e.target.files[0];
		let reader = new FileReader(image);
		reader.readAsDataURL(image);
		reader.onload = (e) => (files[0] = e.target.result);
	};

	const divConfig = {
		id: "div-" + id,
		type: "container",
		children: [
			{
				ids: [],
				align: "auto",
				spacer: false, // do I need this? maybe .flow class
			},
		],
		design: {
			media: {
				image: {
					assetId: "",
					css: {
						parallax: false,
						position: "center",
						size: "fit",
						sizevalue: 25,
						colorBG: "",
					},
				},
			},
			background: {
				blur: 0,
				type: "image",
				color: "#fff",
				opacity: 1,
				gradient: {
					data: "",
				},
			},
			overlay: {
				style: "color",
				color: "#730D0DC0",
				gradient: {
					data: "",
				},
			},

			// BORDERS
			border: {
				style: "solid",
				width: 1,
				top: 0,
				bottom: 0,
				right: 0,
				left: 0,
			},

			borderRadius: 0,

			margin: 0,
			// margin: { x: 0, y: 0 } // This way we can adhere to the Utopia
			// convention and still easily set separately block and inline
			// paddings and margins rather than for the whole BOX only.

			// padding: { x: 0, y: 0 }
			padding: 0,
			height: "auto",
			width: "auto",

			dropShadow: {
				x: 0,
				y: 0,
				distance: 0,
				blur: 0,
				color: "rgba(0,0,0,0.16)",
			},

			// Used to align the contents within the <div>
			content: {
				align: "start",
				margins: 0.125,
				position: "center",
				spacing: 1,
				width: 50,
			},
		},
		// for later
		animation: {
			onvisible: {
				delay: 0,
				intensity: 5,
				replay: false,
				speed: 1000,
				style: "none",
			},
		},
		mobile: {},
	};
</script>

<section data-name="div-config" class="config-section flow">
	<Header />

	<div class="panel">
		<!-- make it a component Field Group -->
		<div class="[ field-group flow ] [ flex ]">
			<!-- BEGINNING OF BACKGROUND GROUP -->
			<div class="field">
				<label for="div-design_bg_style">Background</label>
				<select
					id="div-design_bg_style"
					on:select={() => (backgroundSettings.isBackground = true)}
				>
					<option value="none">None</option>
					<option value="standard">Color</option>
					<option value="gradient">Gradient</option>
					<option value="image">Image</option>
				</select>

				<!-- render fields based on user's select  -->
				{#if backgroundSettings.isBackground}
					{#if backgroundSettings.isImage}
						<div class="[ field-group flow ]">
							<div class="field">
								<div class="thumbnail" />
								<input
									bind:files
									type="file"
									style="display: none"
									accept="image/jpeg, image/png, image/jpg"
									on:change={(e) => onFileSelect(e)}
								/>
							</div>
						</div>
					{/if}
				{/if}
			</div>

			<div class="[ field-group ]">
				<!-- BEGINNING OF MARGINS GROUP -->
				<label for="">Margins</label>
				<div class="field-row repel">
					<label for="margin_vertical">X-Axis</label>
					<div class="indicator">0</div>
				</div>
				<div class="[ field-group ]">
					<input
						id="margin_vertical"
						name="margin_vertical"
						type="range"
						min="-3"
						max="6"
						step="1"
						on:change={(e) =>
							spaceHandler("margin", "x", e.currentTarget.value)}
					/>
				</div>
				<div class="[ field-group ]">
					<label for="margin_horizontal">Y-Axis</label>
					<div class="indicator">0</div>
					<input
						id="margin_horizontal"
						name="margin_horizontal"
						type="range"
						min="-3"
						max="6"
						step="1"
						on:change={(e) =>
							spaceHandler("margin", "y", e.currentTarget.value)}
					/>
				</div>
				<!-- END OF MARGINS GROUP -->
			</div>

			<!-- BEGINNING OF PADDING GROUP -->
			<div class="[ field-group ]">
				<label for="">Padding</label>
				<div class="[ field-group ]">
					<label for="padding_vertical">X-Axis</label>
					<div class="indicator">0</div>
					<input
						id="padding_vertical"
						name="padding_vertical"
						type="range"
						min="-3"
						max="6"
						step="1"
						on:change={(e) =>
							spaceHandler("margin", "x", e.currentTarget.value)}
					/>
				</div>
				<div class="[ field-group ]">
					<label for="padding_horizontal">Y-Axis</label>
					<div class="indicator">0</div>
					<input
						id="padding_horizontal"
						name="padding_horizontal"
						type="range"
						min="-3"
						max="6"
						step="1"
						on:change={(e) =>
							spaceHandler("margin", "y", e.currentTarget.value)}
					/>
				</div>
				<!-- END OF PADDING GROUP -->
			</div>
		</div>
	</div>
</section>

<style>
	.config-section {
		--flow-space: var(--space-s-l);
	}

	.panel {
		padding-inline: var(--space-m);
	}

	label {
		display: inline-block;
		font-size: 1rem;
		font-weight: bold;
		margin: 0 0 1em;
		color: var(--color-light);
	}

	.thumbnail {
		height: 12em;
		cursor: pointer;
		overflow: hidden;
		border-radius: 12px;
		background-color: rgb(0, 0, 0);
	}

	select {
		padding-right: 3em;
		text-overflow: ellipsis;
		height: 3em;
		background-repeat: no-repeat;
		background-size: 1.5em;
		background-position: calc(100% - 0.75em) center;
		background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Ctitle%3Edown-arrow%3C%2Ftitle%3E%3Cg%20fill%3D%22%23000000%22%3E%3Cpath%20d%3D%22M10.293%2C3.293%2C6%2C7.586%2C1.707%2C3.293A1%2C1%2C0%2C0%2C0%2C.293%2C4.707l5%2C5a1%2C1%2C0%2C0%2C0%2C1.414%2C0l5-5a1%2C1%2C0%2C1%2C0-1.414-1.414Z%22%20fill%3D%22%23CACACA%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E");
		width: 100%;
	}

	.field-group {
		display: flex;
		flex-wrap: wrap;
		padding-bottom: var(--space-m);
		width: 100%;
	}

	.field-group > * {
		width: 100%;
	}

	.field {
		flex-shrink: 1;
		flex-grow: 1;
		position: relative;
		vertical-align: top;
	}

	.field-row {
		width: 80%;
	}
</style>
