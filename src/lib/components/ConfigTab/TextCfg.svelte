<script lang="ts">
	import { z } from "zod";
	import Radio from "../../components/common/Radio.svelte";
	import ColorButton from "../../components/ColorButton.svelte";
	import ColorInput from "../../components/ColorInput.svelte";
	import ColorPicker from "svelte-awesome-color-picker";
	import FieldGroup from "./FieldGroup.svelte";

	import { getStyles } from "$lib/utils/parseStyles";

	import type {
		CssSpaceUnit,
		WidthAndHeightValue,
		CssText,
	} from "../../../types/types";

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

	const backgroundSchema = z.object({
		type: z.enum(["none", "color", "gradient", "image"]),
		opacity: z.number(),
		blur: z.number(),
		backgroundColor: z.string(),
		pattern: z.object({}),
		gradient: z.object({
			gradientStyle: z.string(),
			angle: z.number(),
			stops: z.array(
				z.object({ color: z.string(), position: z.string().optional() })
			),
			gradientId: z.string().optional(),
			gradientName: z.string().optional(),
			gradientValue: z.string().optional(),
		}),
	});

	const dropShadowSchema = z.object({
		vertical: z.number(),
		horizontal: z.number(),
		blur: z.number(),
		spread: z.number(),
		color: z.string(),
	});

	const textSchema = z.object({
		id: z.string(),
		role: z.string(),
		type: z.literal("text"),
		content: z.string(),
		design: z.object({
			typography: z.object({
				fontFamily: z.string(),
				fontSize: z.string().or(z.number()),
				fontWeight: z.string().or(z.number()),
				textAlign: z.string().or(z.number()),
				letterSpacing: z.string().or(z.number()),
				lineHeight: z.string().or(z.number()),
				color: z.string(),
			}),
			background: backgroundSchema,
			box: z.object({
				width: z.string(),
				height: z.string(),
				margin: z.object({ x: z.string(), y: z.string() }),
				padding: z.object({ x: z.string(), y: z.string() }),
				border: z
					.object({
						radius: z.number(),
						color: z.string(),
						width: z.string(),
					})
					.optional(),
			}),
			effects: z.object({
				dropShadow: dropShadowSchema,
			}),
		}),
	});

	type Text = z.infer<typeof textSchema>;

	const textExample = {
		type: "text",
		role: "h1",
		content: "What's Up Arik?",
		id: "2",
		design: {
			background: {
				type: "gradient",
				opacity: 1,
				blur: 0,
				backgroundColor: "#a9b1b1",
				pattern: {},
				gradient: {
					gradientStyle: "linear",
					angle: 0,
					stops: [
						{ color: "#b9387a", position: "" },
						{ color: "#89c89a", position: "" },
					],
				},
			},
			typography: {
				fontFamily: "inherit",
				color: "var(--text-color)",
				fontSize: "6",
				fontWeight: "1",
				textAlign: "center",
				letterSpacing: 0,
				lineHeight: 110,
			},
			box: {
				width: "100%",
				height: "auto",
				margin: { y: "0", x: "0" },
				padding: { y: "2", x: "0" },
			},
			effects: {
				dropShadow: {
					vertical: 0,
					horizontal: 0,
					blur: 0,
					spread: 0,
					color: "#0000000A",
				},
			},
		},
	} as Text;

	let textConfig: Text = textExample;
	$: textConfig = textSchema.parse(textConfig);

	$: getStyles("text", textConfig);
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
		<FieldGroup
			label="Alignment"
			alignLabel="center"
			labelFor="text-align"
			indicator={textConfig.design.typography.textAlign}
		>
			<input
				name="text-align"
				type="range"
				step="1"
				min="0"
				max="2"
				list="markers"
				bind:value={textConfig.design.typography.textAlign}
			/>
		</FieldGroup>
		<FieldGroup
			label="Font Size"
			alignLabel="center"
			labelFor="font-size"
			indicator={textConfig.design.typography.fontSize}
		>
			<input
				type="range"
				step="1"
				min="0"
				max="7"
				bind:value={textConfig.design.typography.fontSize}
				name="font-size"
			/>
		</FieldGroup>
		<FieldGroup
			label="Font Weight"
			alignLabel="center"
			labelFor="font-weight"
			indicator={textConfig.design.typography.fontWeight}
		>
			<input
				type="range"
				step="1"
				min="0"
				max="2"
				bind:value={textConfig.design.typography.fontWeight}
				name="font-weight"
			/>
		</FieldGroup>
		<FieldGroup
			label="Letter Spacing"
			alignLabel="center"
			labelFor="letter-spacing"
			indicator={textConfig.design.typography.letterSpacing}
			suffix="em"
		>
			<input
				type="range"
				step="0.025"
				min="-0.5"
				max="1"
				bind:value={textConfig.design.typography.letterSpacing}
				name="letter-spacing"
			/>
		</FieldGroup>
		<FieldGroup
			label="Line Height"
			alignLabel="center"
			labelFor="line-height"
			indicator={textConfig.design.typography.lineHeight}
			suffix="%"
		>
			<input
				type="range"
				step="10"
				min="100"
				max="200"
				bind:value={textConfig.design.typography.lineHeight}
				name="line-height"
			/>
		</FieldGroup>
	</div>
</section>

<style>
</style>
