import gradients from "../global/gradients.json";

// maybe store pre-made gradients in a json file?
type Color = string;

type HexColor = Color;

const API = `https://coolors.co/gradient-maker/`;

// Up to 3 colors
const generateGradientCss = (direction = 'right', colors: string[]) => (
	`background: ${colors[0]};
	background: -webkit-linear-gradient(${direction}, ${[...colors].reverse().join(", ")});
	background: linear-gradient(${direction}, ${[...colors].reverse().join(", ")});
	`
)

const detectColor = (color: HexColor) => {

	if (color[0] !== "#") {
	 	return "" // Freaing PANIC over this! crash the system
	}
	const [hue, sat, lgt] = hexToHsl(color);

	if ((lgt / 100) < 0.2) return 'Blacks';
	if ((lgt / 100) > 0.85) return 'Whites';

	if ((sat / 100) < 0.20) return 'Grays';

	if (hue < 30) return 'Reds';
	if (hue < 60) return 'Oranges';
	if (hue < 90) return 'Yellows';
	if (hue < 150) return 'Greens';
	if (hue < 210) return 'Cyans';
	if (hue < 270) return 'Blues';
	if (hue < 330) return 'Magentas';

	return 'Reds';
}

export const gradientsChoice = (color: string, id = '') => {

	if (id) {
		console.log('here is a CSS for your chosen Magnificent Gradient: \n');
		let cssGradient = generateGradientCss('right', gradients[id].colors)
		console.log(cssGradient);
		return cssGradient
	}
	return ''

	// let colorOfChoice = detectColor(color);
	//
	// let matchedGradients = gradients.filter(gradient => {
	// 	for (let i = 0; i < gradient.colors.length; i++) {
	// 		if (detectColor(gradient.colors[i]) === colorOfChoice) {
	// 			return true
	// 		}
	// 	}
	// 	return false
	// });
	//
	// return matchedGradients
}



const hexToHsl = (H: Color) => {

	let r: string | number | any = 0;
	let g: string | number | any = 0;
	let b: string | number | any = 0;

	r = 0, g = 0, b = 0;

	if (H.length == 4) {
			r = "0x" + H[1] + H[1];
			g = "0x" + H[2] + H[2];
			b = "0x" + H[3] + H[3];
	} else if (H.length == 7) {
			r = "0x" + H[1] + H[2];
			g = "0x" + H[3] + H[4];
			b = "0x" + H[5] + H[6];
	}

	r /= 255;
	g /= 255;
	b /= 255;
 let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

	return [h, s, l]
  // return "hsl(" + h + "," + s + "%," + l + "%)";
}
