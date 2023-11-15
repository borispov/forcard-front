<script>
	import FieldGroup from "../FieldGroup.svelte";

	export let value;
	export let settingName;
	export let suffix = undefined;
	export let indicator = undefined;
	$: indicatorValue = (!indicator && value) || indicator;

	const fieldSettings = {
		width: {
			labelFor: "box-width",
			label: "Width", // display
			alignLabel: "center",
		},
		height: {
			labelFor: "box-height",
			label: "Height", // display
			alignLabel: "center",
		},
		margin: {
			labelFor: "box-margin",
			label: "Margins", // display
			alignLabel: "center",
		},
		padding: {
			labelFor: "box-padding",
			label: "Paddings", // display
			alignLabel: "center",
		},
		border: {
			labelFor: "box-border",
			label: "Border", // display
			alignLabel: "center",
		},
		shadow: {
			labelFor: "box-border",
			label: "Border", // display
			alignLabel: "center",
		},
	};

	const inputSettings = {
		width: {
			type: "range",
			name: "box-width",
			min: "0",
			step: "1",
			max: "7",
		},
		height: {
			type: "range",
			name: "box-height",
			min: "-0.5",
			step: "0.025",
			max: "1",
		},
		margin: {
			name: "text-align",
			type: "range",
			step: "1",
			min: "0",
			max: "2",
			list: "markers",
		},
		padding: {
			name: "font-weight",
			type: "range",
			step: "1",
			min: "0",
			max: "2",
		},
		borer: {
			name: "line-height",
			type: "range",
			step: "10",
			min: "100",
			max: "200",
		},
	};
</script>

<FieldGroup {...fieldSettings[settingName]} indicator={indicatorValue} {suffix}>
	<input bind:value {...inputSettings[settingName]} />
</FieldGroup>
