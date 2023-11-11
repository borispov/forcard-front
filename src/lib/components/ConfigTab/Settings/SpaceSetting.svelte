<script>
    import FieldGroup from "../FieldGroup.svelte";

    export let onlyMargin = false;
    export let margin
    export let padding

	const UI_STEPPED_VALUES = [
		"None",
		"2XS",
		"Extra Small",
		"Small",
		"Medium",
		"Large",
		"XL",
		"2XL",
		"3XL",
	];

	const setSpace = (spaceUnit, vec, val) => {
		if (spaceUnit === "margin") {
			margin[vec] = val;
		} else if (spaceUnit === "padding") {
			padding[vec] = val;
		}
	};


</script>

{#if onlyMargin}
    <div class="field-row">
        <div class="field-row repel">
            <label for="margin_vertical">X-Axis</label>
            <div class="indicator">
                {UI_STEPPED_VALUES[Number(margin.x)]}
            </div>
        </div>
        <div class="field-row repel">
            <label for="margin_horizontal">Y-Axis</label>
            <div class="indicator">
                {UI_STEPPED_VALUES[Number(margin.y)]}
            </div>
        </div>
    </div>
    <div class="field-row">
        <input
            value={margin.x}
            id="margin_vertical"
            name="margin_vertical"
            type="range"
            min="0"
            max="8"
            step="1"
            on:input={(e) => setSpace("margin", "x", e.currentTarget.value)}
        />
        <input
            value={margin.y}
            id="margin_horizontal"
            name="margin_horizontal"
            type="range"
            min="0"
            max="8"
            step="1"
            on:input={(e) => setSpace("margin", "y", e.currentTarget.value)}
        />
    </div>

    {:else}

    <FieldGroup label="Margins" labelFor="space" alignLabel="left">
        <div class="field-row">
            <div class="field-row repel">
                <label for="margin_vertical">X-Axis</label>
                <div class="indicator">
                    {UI_STEPPED_VALUES[Number(margin.x)]}
                </div>
            </div>
            <div class="field-row repel">
                <label for="margin_horizontal">Y-Axis</label>
                <div class="indicator">
                    {UI_STEPPED_VALUES[Number(margin.y)]}
                </div>
            </div>
        </div>
        <div class="field-row">
            <input
                value={margin.x}
                id="margin_vertical"
                name="margin_vertical"
                type="range"
                min="0"
                max="8"
                step="1"
                on:input={(e) => setSpace("margin", "x", e.currentTarget.value)}
            />
            <input
                value={margin.y}
                id="margin_horizontal"
                name="margin_horizontal"
                type="range"
                min="0"
                max="8"
                step="1"
                on:input={(e) => setSpace("margin", "y", e.currentTarget.value)}
            />
        </div>
        <!-- END OF MARGINS GROUP -->

        <!-- BEGINNING OF PADDINGS GROUP -->
        <FieldGroup marginTop="var(--space-s)" label="Pad" labelFor="padding">
            <div class="field-row">
                <div class="field-row repel">
                    <label for="padding_vertical">X-Axis</label>
                    <div class="indicator">
                        {UI_STEPPED_VALUES[Number(padding.x)]}
                    </div>
                </div>
                <div class="field-row repel">
                    <label for="padding_horizontal">Y-Axis</label>
                    <div class="indicator">
                        {UI_STEPPED_VALUES[Number(padding.y)]}
                    </div>
                </div>
            </div>
            <div class="field-row">
                <input
                    value={padding.x}
                    id="padding_vertical"
                    name="padding_vertical"
                    type="range"
                    min="0"
                    max="8"
                    step="1"
                    on:input={(e) => setSpace("padding", "x", e.currentTarget.value)}
                />
                <input
                    value={padding.y}
                    id="padding_horizontal"
                    name="padding_horizontal"
                    type="range"
                    min="0"
                    max="8"
                    step="1"
                    on:input={(e) => setSpace("padding", "y", e.currentTarget.value)}
                />
            </div>
            <!-- END OF PADDINGS GROUP -->
        </FieldGroup>
    </FieldGroup>
{/if}


<style>
	.field-row {
        margin-top: 8px;
		display: flex;
		--cluster-horizontal-alignment: center;
		justify-content: space-between;
        padding-inline: .125em;
		gap: var(--space-3xs);
	}

    .field-row ~ .field-row {
		padding-inline: 1em;
    }

	.field-row input {
		width: 65% !important;
	}

    .field-row label {
        font-size: 14px;
    }

	.field-row.repel {
		display: flex;
		width: 100%;
		padding-inline: 0.25em;
	}

	.indicator {
		font-size: var(--step--2);
	}
</style>