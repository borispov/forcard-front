export type StyleProperty = { [key: string]: string | {} | number | { [key:string]: StyleProperty | string | number } };

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

export type TextElement = {
	fontSize: string;
	textAlign: string;
}

export type StyleProperties = {
	background: { 
		[key:string]: number | string 
	};
	display?: {
		type: string;
		display: string;
		direction: string;
	};
	space: {
		margin: { [key:string]: string } | {};
		padding: { [key:string]: string } | {};
	};
	height: string;
	width: 'auto' | number;
	border: CssBorder | {} ;
	shadow?: CssShadow;
}

export type Component = {
	type: string;
	role: string;
	content?: string;
	id: string;
	children?: { id: string }[];
	design: StyleProperties;
}
