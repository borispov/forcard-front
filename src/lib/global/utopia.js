// Type Scale
// https://utopia.fyi/type/calculator?c=320,16,1.2,1440,20,1.25,6,2,&s=0.75%7C0.5%7C0.25,1.5%7C2%7C3%7C4%7C6,s-l&g=s,m,xl,12
// Space Scale
// https://utopia.fyi/space/calculator?c=320,16,1.2,1440,20,1.25,6,2,&s=0.75%7C0.5%7C0.25,1.5%7C2%7C3%7C4%7C6,s-l&g=s,m,xl,12

export const UTOPIA_DEFAULT = `
	--space-3xs: clamp(0.25rem, calc(0.23rem + 0.09vw), 0.31rem);
	--space-2xs: clamp(0.50rem, calc(0.46rem + 0.18vw), 0.63rem);
	--space-xs: clamp(0.75rem, calc(0.70rem + 0.27vw), 0.94rem);
	--space-s: clamp(1.00rem, calc(0.93rem + 0.36vw), 1.25rem);
	--space-m: clamp(1.50rem, calc(1.39rem + 0.54vw), 1.88rem);
	--space-l: clamp(2.00rem, calc(1.86rem + 0.71vw), 2.50rem);
	--space-xl: clamp(3.00rem, calc(2.79rem + 1.07vw), 3.75rem);
	--space-2xl: clamp(4.00rem, calc(3.71rem + 1.43vw), 5.00rem);
	--space-3xl: clamp(6.00rem, calc(5.57rem + 2.14vw), 7.50rem);
	--step--2: clamp(0.69rem, calc(0.66rem + 0.15vw), 0.80rem);
	--step--1: clamp(0.83rem, calc(0.79rem + 0.24vw), 1.00rem);
	--step-0: clamp(1.00rem, calc(0.93rem + 0.36vw), 1.25rem);
	--step-1: clamp(1.20rem, calc(1.10rem + 0.52vw), 1.56rem);
	--step-2: clamp(1.44rem, calc(1.29rem + 0.73vw), 1.95rem);
	--step-3: clamp(1.73rem, calc(1.52rem + 1.02vw), 2.44rem);
	--step-4: clamp(2.07rem, calc(1.79rem + 1.40vw), 3.05rem);
	--step-5: clamp(2.49rem, calc(2.11rem + 1.90vw), 3.82rem);
	--step-6: clamp(2.99rem, calc(2.48rem + 2.55vw), 4.77rem);
	--lh100: 100%;
	--lh120: 120%;
	--lh140: 140%;
	--lh150: 150%;
	--lh160: 160%;
	--padding-horizontal: var(--space-s);
`


export const UTOPIA_DEFAULT_2 = `
  :root {
		--space-3xs: clamp(0.25rem, calc(0.23rem + 0.09vw), 0.31rem);
		--space-2xs: clamp(0.50rem, calc(0.46rem + 0.18vw), 0.63rem);
		--space-xs: clamp(0.75rem, calc(0.70rem + 0.27vw), 0.94rem);
		--space-s: clamp(1.00rem, calc(0.93rem + 0.36vw), 1.25rem);
		--space-m: clamp(1.50rem, calc(1.39rem + 0.54vw), 1.88rem);
		--space-l: clamp(2.00rem, calc(1.86rem + 0.71vw), 2.50rem);
		--space-xl: clamp(3.00rem, calc(2.79rem + 1.07vw), 3.75rem);
		--space-2xl: clamp(4.00rem, calc(3.71rem + 1.43vw), 5.00rem);
		--space-3xl: clamp(6.00rem, calc(5.57rem + 2.14vw), 7.50rem);
	}

	:root {
		--step--2: clamp(0.69rem, calc(0.66rem + 0.15vw), 0.80rem);
		--step--1: clamp(0.83rem, calc(0.79rem + 0.24vw), 1.00rem);
		--step-0: clamp(1.00rem, calc(0.93rem + 0.36vw), 1.25rem);
		--step-1: clamp(1.20rem, calc(1.10rem + 0.52vw), 1.56rem);
		--step-2: clamp(1.44rem, calc(1.29rem + 0.73vw), 1.95rem);
		--step-3: clamp(1.73rem, calc(1.52rem + 1.02vw), 2.44rem);
		--step-4: clamp(2.07rem, calc(1.79rem + 1.40vw), 3.05rem);
		--step-5: clamp(2.49rem, calc(2.11rem + 1.90vw), 3.82rem);
		--step-6: clamp(2.99rem, calc(2.48rem + 2.55vw), 4.77rem);
	}

	:root {
		--lh100; 100%;
		--lh120; 120%;
		--lh140; 140%;
		--lh150; 150%;
		--lh160; 160%;
	}

	:root {
		--padding-horizontal: var(--space-s);
	}

`
