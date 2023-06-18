export const GLOBAL_STYLES = `
	* {
		margin: 0;
	}

	html {
		box-sizing: border-box;
	}

	body {
		line-height: var(--lh150);
		font-size: var(--step-0);
		min-height: 100vh;
	}

	h1 {
		font-size: var(--step-4);
	}
	h2 {
		font-size: var(--step-3);
	}
	h3 {
		font-size: var(--step-2);
	}
	h4,h5,h6 { font-size: var(--step-1); }
`

export const COLOR_SCHEME = `
	:root {
		--color-light: #ffffff;  
		--color-dark: #1a1a1a;
		--background: var(--color-light);
		--text-color: var(--color-dark);
		--color-mid: #191919;
		--color-mid-glare: #b3b3b3;
		--color-primary: #F4BF3C;
		--color-accent: #C4605E;
		--subheadings-color: var(--color-dark);
	}
`
