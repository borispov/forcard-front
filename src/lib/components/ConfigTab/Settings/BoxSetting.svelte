<script>
    import FieldGroup from "../FieldGroup.svelte";
    
    // letter-spacing-value
    export let value;
    export let settingName;
    export let suffix = undefined;

    const fieldSettings = {
        margin: {
            labelFor: "margin",
            label: "Margin", // display
            alignLabel: "left",
        },
        padding: {
            labelFor: "paddig",
            label: "Padding", // display
            alignLabel: "left",
        },
        letterSpacing: {
            labelFor: "letter-spacing",
            label: "Letter Spacing", // display
            alignLabel: "center",
        },
        lineHeight: {
            labelFor: "line-height",
            label: "Line Height", // display
            alignLabel: "center",
        },
        textAlign: {
            labelFor: "text-align",
            label: "Align Text", // display
            alignLabel: "center",
        }
    }

    const inputSettings = {
        margin: {
            type: "range",
            name: "font-size",
            min: "0",
            step: "1",
            max: "7",
        },
        padding: {
            type: "range",
            name: "letter-spacing",
            min: "-0.5",
            step: "0.025",
            max: "1",
        },
        textAlign: {
            name: "text-align",
            type: "range",
            step: "1",
            min: "0",
            max: "2",
            list: "markers",
        },
        fontWeight: {
            name: "font-weight",
            type: "range",
            step: "1",
            min: "0",
            max: "2",
        },
        lineHeight: {
            name: "line-height",
            type: "range",
            step: "10",
            min: "100",
            max: "200",
        }
    }

</script>

<FieldGroup
    {...fieldSettings[settingName]}
    indicator={value}
    suffix={suffix}
>
    <input
        bind:value={value}
        {...inputSettings[settingName]}
    />
</FieldGroup>