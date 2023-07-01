## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.


### Current Challenges

1. How to represent design :root values like var(--space-x);


### Solution to #1
Build a transformer helper that will represent values as STEPS, i.e
step 1, step 0 but store them as their actual values.
*OR* 
Just name them differently under the hood to begin with.

like this: 
```css
  :root {
    --space-0: clamp...
  ]
```

On the other hand, I'd like to MAYBE represent the values in different
languages, so it would make sense to have different representational
values - but not actual values.
