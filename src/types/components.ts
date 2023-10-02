export type StyleProperty = { [key: string]: string | {} | number | { [key:string]: StyleProperty | string | number } };

export type CssWidth = string | number | 'auto';

export type ButtonProps = {
	innerHTML?: string;
	linkTo: string;
	openInNewTab: boolean;
}

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
	'font-size'?: string;
	size?: string;
	family?: string;
	'font-weight'?: string;
}

export type CssSpace = {
	margin?: { y: string, x: string } | {};
	padding: { y: string, x: string } | {};
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
}

export type ComponentType = 'button' | 'container' | 'text' | 'img' | 'p' | 'form'
export type ComponentRole = 
	'h1' | 'h2' | 'h3' | 'h4' |
	'p' | 'button' | 'img' | 'div'

export type Component = {
	id: string;
	type: ComponentType;
	role: ComponentRole;
	content?: string;
	children?: string[];
	design: StyleProperties;
}

export type TextElement = Component & {
	content?: string;
	design: {
		font: CssFont;
		textAlign?: string;
	}
}

export type ButtonElement = Component & {
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

export type Components = (Component|ContainerElement|ButtonElement|TextElement)[]