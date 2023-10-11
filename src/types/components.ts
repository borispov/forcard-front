export type CssWidth = string | number | 'auto';

export type LinkProps = {
	innerHTML?: string;
	linkTo: string;
	openInNewTab: boolean;
}

export type ButtonProps = {
	innerHTML?: string;
	linkTo: string;
	openInNewTab: boolean;
}

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type CssVar = `var(--${string})`;

export type CssColor = RGB | RGBA | HEX | CssVar;

export type CssBorder = {
	radius?: string | number,
	width?: string,
	color?: string,
}

export type CssShadow = {
	x: string | number,
	y: string | number,
	distance: string | number,
	blur: string | number,
	color: string
}

export type CssFont = {
	'font-size': string | number;
	'font-weight': string | number;
}

export type CssSpace = {
	margin: { y: string, x: string };
	padding: { y: string, x: string };
}

export type StyleProperties = {
	background?: { 
		[key:string]: number | string 
	};
	space: CssSpace,
	height?: string;
	width?: CssWidth;
	border: CssBorder | {} ;
	shadow?: CssShadow;
	color?: string;
	font?: CssFont;
	textAlign?: string;
}

export type ComponentType = 'button' | 'container' | 'text' | 'img' | 'p' | 'form'
export type ComponentRole = 
	'h1' | 'h2' | 'h3' | 'h4' |
	'p' | 'button' | 'img' | 'div'

export type CssTypography = {
	font: CssFont,
	textAlign: string;
	letterSpacing: string;
	lineHeight: number;
}

export type Component = {
	id: string;
	role: ComponentRole;
	content?: string;
	children?: string[];
	design: StyleProperties;
}

export type TextElement = Component & {
	type: "text" | "p";
	content: string;
	design: {
		font: CssFont;
		textAlign: string;
		letterSpacing: string;
		lineHeight: number | string;
		space: CssSpace;
	}
}

// maybe create a TypoGraphy property inside design?
// typography = {
// font, alignemnt, letterspacing, lineheight, etc..
// }
// access will be more READABLE
// design.typography
// and iterate over them in a single function.
// getTypography ...

export type ButtonElement = Component & {
	type: "button";
	content?: string;
	settings: ButtonProps;
	design: {
		font: CssFont;
		textAlign?: string;
		shadow?: CssShadow;
		border?: CssBorder;
		space: CssSpace;
	}
}

export type ContainerElement = Component & {
	type: "container";
	design: {
		display: {
			type: string;
			direction: string;
			align: string;
		};
		content?: {
			align: string;
			margins: number|string;
			position: string;
			spacing: number|string;
			width: number|string;
		}
	}
}

type ImageSettings = {
	type: "img";
	source: string;
	placeholder: boolean;
	placeholder_source?: string;
	altText: string;
	link: {} | LinkProps;
}

export type ImageElement = Component & {
	type: "img";
	settings: ImageSettings;
	design: {
		border?: CssBorder;
		width: string;
		height: string;
		shadow?: CssShadow;
		imgFilter: string;
		position: string;
	}
}


export type Components = (Component|ContainerElement|ButtonElement|TextElement)[]