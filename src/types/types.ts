type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type CssVar = `var(--${string})`;

// Combine color types into a single type
export type CssColor = RGB | RGBA | HEX | CssVar;

// Define width and height constraints for styling
export type WidthAndHeightValue = "auto" | "100%" | `${number}px` | `${number}rem` | `${number}%`;

export type CssShadow = {
	x: string | number,
	y: string | number,
	distance: string | number,
	blur: string | number,
	color: string
}

export type CssBorder = {
	radius: string | number,
	width: string,
	color: string,
}

export type CssTypography = {
	fontFamily: string;
	fontSize: string | number;
	fontWeight: string | number;
	textAlign: string;
	letterSpacing: string;
	lineHeight: number;
	color: CssColor;
}

export type CssBaseLayout = {
	display: string;
	overflow: string;
	position: string;
}

// FLEX
export type CssFlexLayout = CssBaseLayout & {
	display: 'flex';
	justifyContent: "flex-start" | "flex-end" | "center" | "space-between" | "space-around";
	alignItems: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
	gap: string;
}

export type CssBox = {
	width: WidthAndHeightValue;
	height: WidthAndHeightValue;
	margin: { x: string, y: string};
	padding: { x: string, y: string};
	border: CssBorder;
}

export type CssBackground = {
	type: 'color' | 'gradient' | 'image';
	opacity: number;
	blur: number;
	backgroundColor: CssColor;
	backgroundSize: string;
	backgroundPosition: string;
	backgroundRepeat: string;
}

export type CssGradient = CssBackground & {
	type: 'gradient';
	gradientId: string;
	gradientName: string;
	gradientValue: string;
}

// Define possible component roles
export type ComponentRole = 'h1' 
	| 'h2' | 'h3' | 'h4' 
	| 'p'	 | 'button' | 'img' | 'div'

type Component = {
	id:					string;
	role:				ComponentRole;
}

export type ContainerElement = Component & {
	type: "container";
	children:	string[];
	design: {
		layout: CssBaseLayout | CssFlexLayout;
		background: CssBackground;
		box: CssBox;
	}
}

export type TextElement = Component & {
	content: string;
	design: {
		background: CssBackground;
		typography: CssTypography;
		box: CssBox;
	}
}

export type ButtonElement = Component & {
	content: string;
	settings: {
		innerHTML?: string;
		linkTo: string;
		openInNewTab: boolean;
	}
	design: {
		layout: CssFlexLayout;
		background: CssBackground;
		typography: CssTypography;
		box: CssBox;
		shadow?: CssShadow;
	}
}


export type ImageElement = Component & {
	type: "img";
	settings: {
		source: string;
		placeholder: boolean;
		placeholder_source?: string;
		altText: string;
		link: {} | { linkTo: string; openInNewTab: boolean };
	}
	design: {
		background: CssBackground;
		box: CssBox;
		shadow?: CssShadow;
	}
}
