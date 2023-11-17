<script>
    import ColorPicker from "svelte-awesome-color-picker";
    import ColorInput from "$lib/components/ColorInput.svelte";
    import FieldGroup from "../FieldGroup.svelte";

    export let border;

    const defaultSettings = {
        offset: {
            min: "-12",
            step: "1",
            max: "12",
        },
        blur: {
            min: "0",
            max: "15",
            step: "0.5",
        },
    };

    const handleBorderChange = (e, borderProp) => {
        switch (borderProp) {
            case "color":
                const val = e.detail.hex;
                border.color = val;
                break;
            case "width":
                border.width = e.target.value;
                break;
            case "style":
                border.style = e.target.value;
                break;
            default:
                break;
        }
    };
</script>

<!-- START OF BORDER LOGIC -->
<FieldGroup label="Border" labelFor="border">
    <div class="field-row">
        <label class="field-label" for="border-color">Color</label>
        <ColorPicker
            isPopup={false}
            on:input={(e) => handleBorderChange(e, "color")}
            hex={border.color}
            components={{ input: ColorInput }}
        />
    </div>

    <div class="field-row">
        <label class="field-label" for="border-color">Width</label>
        <input
            type="range"
            min="0"
            max="6"
            on:input={(e) => handleBorderChange(e, "width")}
            value={border.width}
        />
    </div>

    <div class="field-row">
        <label class="field-label" for="border-style">Style</label>
        <select
            on:input={(e) => handleBorderChange(e, "style")}
            value={border.style}
            name="border-style"
            id="border-style"
        >
            <option value="solid">Solid</option>
            <option value="dotted">Dotted</option>
        </select>
    </div>
</FieldGroup>
<FieldGroup
    label="Border Radius"
    labelFor="border-radius"
    indicator={border.radius}
>
    <input
        id="border-radius"
        name="border-radius"
        type="range"
        min="0"
        max="1.25"
        step="0.25"
        bind:value={border.radius}
    />
</FieldGroup>

<!-- END OF BORDER LOGIC -->

<style>
    .field-row {
        display: flex;
        --cluster-horizontal-alignment: center;
        justify-content: space-between;
        padding-inline: 1em;
        gap: var(--space-3xs);
    }

    .field-row input {
        width: 65%;
    }
</style>
