<script>
    import FieldGroup from "../FieldGroup.svelte";
    
    // letter-spacing-value
    export let settingValue
    
    const defaultSettings = {
        min: "0",
        step: "1",
        max: "7",
    }
    
</script>

<FieldGroup
    label="Font Size"
    alignLabel="center"
    labelFor="font-size"
    indicator={settingValue}
>
<input
    type="range"
    name="font-size"
    bind:value={settingValue}
    {...defaultSettings}
/>
</FieldGroup>