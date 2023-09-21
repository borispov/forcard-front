export type StyleProperty = { [key: string]: string | {} | number | { [key:string]: StyleProperty | string | number } };

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
	weight?: string;
}

export type CssSpace = {
	margin: { y: string, x: string } | {};
	padding: { y: string, x: string } | {};
}

export type StyleProperties = {
	background?: { 
		[key:string]: number | string 
	};
	display?: {
		type: string;
		display: string;
		direction: string;
	};
	space: CssSpace,
	spaceX?: {
		margin: { [key:string]: string } | {};
		padding: { [key:string]: string } | {};
	};
	height?: string;
	width?: 'auto' | number;
	border: CssBorder | {} ;
	shadow?: CssShadow;

	font?: CssFont;

	color?: string;

}

export type Component = {
	id: string;
	type: string;
	role: string;
	content?: string;
	children?: { id: string }[];
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
		space: CssSpace & {
			margin?: { y: string, x: string } | {};
		}
	}
}

export type ContainerElement = Component & {
	design: {
		content?: {
			align: string;
			margins: number|string;
			position: string;
			spacing: number|string;
			width: number|string;
		}
	}
}
