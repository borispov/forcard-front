import type { StyleProperties } from "../../types/components";

let getBackgroundStyle = (bgObject: any) => {
	let r: string;
	if (bgObject.type === "color") {
		r = `background-color: ${bgObject.color};`;
		if (bgObject.opacity) {
			r += `opacity: ${bgObject.opacity};\n`;
		}
	}
	return r;
};

//  UGLY sorry.
let getSpaceStyle = (spaceObject: {
	margin: { y: string; x: string } | {};
	padding: { y: string; x: string } | {};
}) => {
	let r = "";

	for (const [k, v] of Object.entries(spaceObject)) {
		if (Object.hasOwn(v, "x") && v["x"]) {
			r += `${k}-inline: ${v["x"]};\n`;
		}

		if (Object.hasOwn(v, "y") && v["y"]) {
			r += `${k}-block: ${v["y"]};\n`;
		}
	}
	return r;
};

let getContainerStyle = (displayObject: {
	display: string | '';
	direction: string | '';
}) => {
	let r = "";
	r += `display: ${displayObject.display || 'block'};\n`;
	if (displayObject.direction) {
		r += `flex-direction: ${displayObject.direction};\n`
	}
	return r;
}

// Show UP
export function getStyles(type: string, stylesObject: StyleProperties) {
	let r = "";
	let a = Object.entries(stylesObject);

	if (type == "text" || type == "button") {
		for (const [k, v] of a) {
			if (k == "space") {
				r += getSpaceStyle(v) + "\n";
			} else {
				r += `${k}: ${v};\n`;
			}
		}
		return r;
	}

	if (type == "container" && stylesObject.display ) {
		console.log("got a display object")
		r += getContainerStyle(stylesObject.display);
	}

	// encapsulate DIV settings
	r += getBackgroundStyle(stylesObject.background) + "\n";
	for (const [k, v] of a) {
		if (k == "space") {
			r += getSpaceStyle(v) + "\n";
		}
	}
	return r;
}
