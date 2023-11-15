<script lang="ts">
	import type { z } from "zod";
	import ColorInput from "../../components/ColorInput.svelte";
	import ColorPicker from "svelte-awesome-color-picker";
	import FieldGroup from "./FieldGroup.svelte";
	import TypographySetting from "./Settings/TypographySetting.svelte";
	import SpaceSetting from "./Settings/SpaceSetting.svelte";

	import { TEXT_ALIGN_VALS } from "$lib/utils/UI-CONSTANTS";

	import type { CssSpaceUnit } from "../../../types/types";
	import { textSchema } from "$lib/schemas";
	import { getStyles } from "$lib/utils/parseStyles";
	import { stylesheetStore } from "$lib/sheetStore";

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

	type Text = z.infer<typeof textSchema>;

	export let textConfig: Text;

	$: textAlignmentIndicator =
		TEXT_ALIGN_VALS[Number(textConfig.design.typography.textAlign)];

	const setSpace = (spaceUnit: string, vec: string, val: string) => {
		if (spaceUnit === "margin") {
			textConfig.design.box.margin[vec as keyof CssSpaceUnit] = val;
		} else if (spaceUnit === "padding") {
			textConfig.design.box.padding[vec as keyof CssSpaceUnit] = val;
		}
	};

	$: {
		textConfig = textSchema.parse(textConfig);
		let t = textConfig.type + textConfig.id;
		let styles = getStyles("text", textConfig.design, "array");
		let payload = { t, styles };
		stylesheetStore?.dispatch("ADD_STYLES", payload);
	}
</script>

<section data-name="text-config" class="config-section flow">
	<div class="panel">
		<FieldGroup label="Content" alignLabel="center" labelFor="text-content">
			<input bind:value={textConfig.content} type="text" id="text-content" />
		</FieldGroup>

		<FieldGroup label="Color" alignLabel="center" labelFor="text-content">
			<ColorPicker
				bind:hex={textConfig.design.typography.color}
				isPopup={false}
				components={{ input: ColorInput }}
			/>
		</FieldGroup>
		<TypographySetting
			settingName="textAlign"
			bind:value={textConfig.design.typography.textAlign}
		/>
		<TypographySetting
			settingName="fontSize"
			bind:value={textConfig.design.typography.fontSize}
		/>
		<TypographySetting
			settingName="fontWeight"
			bind:value={textConfig.design.typography.fontWeight}
		/>
		<TypographySetting
			settingName="letterSpacing"
			bind:value={textConfig.design.typography.letterSpacing}
			suffix="em"
		/>
		<TypographySetting
			settingName="lineHeight"
			bind:value={textConfig.design.typography.lineHeight}
			suffix="%"
		/>

		<SpaceSetting
			bind:margin={textConfig.design.box.margin}
			bind:padding={textConfig.design.box.padding}
		/>

		<FieldGroup marginTop="var(--space-s)" label="Role" labelFor="role">
			<select bind:value={textConfig.role} id="role-select" class="field-row">
				<option value="h1">h1</option>
				<option value="h2">h2</option>
				<option value="h3">h3</option>
				<option value="p">p</option>
				<option value="span">span</option>
			</select>
		</FieldGroup>
	</div>
</section>

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

	.field-row.repel {
		display: flex;
		width: 100%;
		padding-inline: 0.25em;
	}

	.indicator {
		font-size: var(--step--2);
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
</style>
