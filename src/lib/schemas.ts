import { z } from "zod";


export const backgroundSchema = z.object({
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

export const typographySchema = z.object({
	fontFamily: z.string(),
	fontSize: z.string().or(z.number()),
	fontWeight: z.string().or(z.number()),
	textAlign: z.string().or(z.number()),
	letterSpacing: z.string().or(z.number()),
	lineHeight: z.string().or(z.number()),
	color: z.string(),
})

export const textSchema = z.object({
	id: z.string(),
	role: z.string(),
	type: z.literal("text"),
	content: z.string(),
	design: z.object({
		typography: typographySchema,
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
					borderStyle: z.string(),
				})
				.optional(),
		}),
		effects: z.object({
			dropShadow: dropShadowSchema,
		}),
	}),
});

export type Text = z.infer<typeof textSchema>;


const justifyContentSchema = z.union([
	z.literal("flex-start"),
	z.literal("flex-end"),
	z.literal("center"),
	z.literal("space-between"),
	z.literal("space-around"),
]);

const alignItemsSchema = z.union([
	z.literal("flex-start"),
	z.literal("center"),
	z.literal("flex-end"),
	z.literal("stretch"),
	z.literal("baseline"),
]);


export const containerConfig = z.object({
	id: z.string(),
	role: z.string(),
	type: z.literal("container"),
	children: z.array(z.string()),
	design: z.object({
		layout: z.object({
			display: z.literal("flex"),
			overflow: z.string().optional(),
			direction: z.union([z.literal("row"), z.literal("column")]),
			justifyContent: justifyContentSchema,
			alignItems: alignItemsSchema,
			gap: z.string(),
			wrap: z.string(),
		}),
		background: backgroundSchema,
		box: z.object({
			width: z.string(),
			height: z.string(),
			margin: z.object({ x: z.string(), y: z.string() }),
			padding: z.object({ x: z.string(), y: z.string() }),
			border: z.object({
				radius: z.number(),
				color: z.string(),
				width: z.string(),
			}),
		}),
		effects: z.object({
			dropShadow: dropShadowSchema,
		}),
	}),
});

export type Layout = z.infer<typeof containerConfig>;
