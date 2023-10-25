type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type CssVar = `var(--${string})`;

// Combine color types into a single type
export type CssColor = RGB | RGBA | HEX | CssVar | 'inherit';

// Define width and height constraints for styling
export type WidthAndHeightValue = number | "auto" | "100%" | `${number}px` | `${number}rem` | `${number}%`;

export type CssSpaceUnit = {
	x: string;
	y: string;
}

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

export type CssBox = {
	width: WidthAndHeightValue;
	height: WidthAndHeightValue;
	margin: CssSpaceUnit;
	padding: CssSpaceUnit;
	border?: CssBorder;
}


export type CssBackground = {
	type: 'none' | 'color' | 'gradient' | 'image';
	opacity?: number;
	blur?: number;
}

export type CssBackgroundColor = CssBackground & {
	type: 'color';
	backgroundColor?: string;
}

export type CssBackgroundImage = CssBackground & {
	type: 'image';
	backgroundPosition: string;
	backgroundRepeat: string;
	backgroundSize: string;
	objectPosition: string;
	objectFit: string;
}

export type CssGradient = {
	gradientStyle: string;
	angle: number;
	gradientId?: string;
	gradientName?: string;
	gradientValue?: string;
	stops: {
		color: string; position?: string;
	}[];
}

export type CssAllBackgrounds = {
	type: 'none' | 'color' | 'gradient' | 'image';
	opacity: number;
	blur: number;
	backgroundColor: CssColor;
	pattern: {};
	gradient: CssGradient;
}

// Define possible component roles
export type ComponentRole = 'h1' 
	| 'h2' | 'h3' | 'h4' 
	| 'p'	 | 'button' | 'img' | 'div'

interface Component {
	id: string;
	role: ComponentRole;
}

export type CssBaseLayout = {
	display: string;
	overflow?: string;
	position?: string;
}

export interface CssFlexLayout {
	display: "flex";
	overflow?: string;
	direction: 'row' | 'column';
	justifyContent: "flex-start" | "flex-end" | "center" | "space-between" | "space-around";
	alignItems: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
	gap: string;
	wrap: string;
}

export type ContainerElement = Component & {
	type: "container";
	children:	string[];
	design: {
		layout: CssBaseLayout | CssFlexLayout;
		background: CssBackground | CssGradient;
		box: CssBox;
	}
}

export interface CssDiv {
	id: string;
	role: string;
	type: "container";
	children:	string[];
	design: {
		layout: CssFlexLayout;
		background: CssAllBackgrounds;
		box: CssBox;
	}
}

export interface CssText {
	id: string;
	role: string;
	type: "text";
	design: {
		typography: CssTypography;
		background: CssAllBackgrounds;
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
