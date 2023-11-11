<script>
import FieldGroup from "../FieldGroup.svelte";

// letter-spacing-value
export let lsv

const defaultSettings = {
    min: "-0.5",
    step: "0.025",
    max: "1",
}

</script>

<FieldGroup
    label="Letter Spacing"
    alignLabel="center"
    labelFor="letter-spacing"
    indicator={lsv}
    suffix="em"
>
    <input
        type="range"
        name="letter-spacing"
        bind:value={lsv}
        {...defaultSettings}
    />
</FieldGroup>