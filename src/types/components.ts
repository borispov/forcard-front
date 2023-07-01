export type StyleProperty = { [key: string]: string | {} | number | { [key:string]: StyleProperty | string | number } };

export type StyleProperties = {
	background: { 
		[key:string]: number | string 
	};
	display?: {
		display: string;
		direction: string;
	};
	space: {
		margin: { [key:string]: string } | {};
		padding: { [key:string]: string } | {};
	};
	height: "";
	width: "";
	border: any;
}

export type Component = {
	type: string;
	role: string;
	content?: string;
	id: string;
	children?: { id: string }[];
	design: StyleProperties;
}
