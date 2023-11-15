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
	hover: z.object({
		backgroundColor: z.string().optional(),
	})
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
	hover: z.object({
		color: z.string().optional(),
	})
})

export const textDesignSchema = z.object({
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
				width: z.string().or(z.number()),
				style: z.string(),
			})
			.optional(),
	}),
	effects: z.object({
		dropShadow: dropShadowSchema,
	}),
})

export const textSchema = z.object({
	id: z.string(),
	role: z.string(),
	type: z.literal("text"),
	content: z.string(),
	design: textDesignSchema
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

const layoutSchema = z.object({
	display: z.literal("flex"),
	overflow: z.string().optional(),
	direction: z.union([z.literal("row"), z.literal("column")]),
	justifyContent: justifyContentSchema,
	alignItems: alignItemsSchema,
	gap: z.string(),
	wrap: z.string(),
})

const boxSchema = z.object({
	width: z.string(),
	height: z.string(),
	margin: z.object({ x: z.string(), y: z.string() }),
	padding: z.object({ x: z.string(), y: z.string() }),
	border: z.object({
		radius: z.number(),
		color: z.string(),
		width: z.string().or(z.number()),
		style: z.string(),
	}),
})

export const imageSchema = z.object({
	id: z.string(),
	role: z.string(),
	type: z.literal("img"),
	design: z.object({
		box: boxSchema,
		effects: z.object({
			dropShadow: dropShadowSchema,
		}),
	}),
})

export const containerDesignSchema = z.object({
	layout: layoutSchema,
	background: backgroundSchema,
	box: boxSchema,
	effects: z.object({
		dropShadow: dropShadowSchema,
	}),
})

export const containerSchema = z.object({
	id: z.string(),
	role: z.string(),
	type: z.literal("container"),
	children: z.array(z.string()),
	design: containerDesignSchema,
});

export const buttonDesignSchema = z.object({
	layout: layoutSchema,
	typography: typographySchema,
	background: backgroundSchema,
	box: boxSchema,
	effects: z.object({
		dropShadow: dropShadowSchema,
	}),
})

export const buttonSchema = z.object({
	id: z.string(),
	role: z.string(),
	type: z.literal("button"),
	content: z.string(),
	settings: z.object({
		linkTo: z.string(),
		openInNewTab: z.boolean(),
	}),
	design: buttonDesignSchema,
});


export type Layout = z.infer<typeof containerSchema>;

export type ComponentType = "button" | "p" | "container" | "text" | "form" | "img"

export type ComponentRole = 'h1' 
	| 'h2' | 'h3' | 'h4' 
	| 'p'	 | 'button' | 'img' | 'div'

export interface Component {
	id: string;
	role: ComponentRole;
}
