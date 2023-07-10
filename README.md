
This is the Front End application of my humble website builder.

The front-end is currently being built using svelte. I quite like
svelte's functionality and the ability to render components recursively
using <svelte:self> and other friends...

The backend is built with Golang. I might link that here later on.

## Current Challenges

1. How to represent design :root values like var(--space-x);
SOLUTION: I currently use presentational values to show easy to read
values shown as indexes from 0 to 8, each internally is transformed to
a step in a space scale (based on https://Utopia.fyi). 

2. Add Child Elements on the user end, not internally.

Options:
a. user clicks on a container (body is the outermost, supposedly), then
a nav menu becomes available where a user can add various elements.

should the user be able to drag and drop? - more likely. but it's more
advanced functionally. should probably focus on core stuff first.
should the user change children/parents within settings panel?

## todo

1. Add a width setting on container elements
2. Make it responsive/centered by default.
3. Code Text Element Configuration element for side-panel
3. Code Button Element Configuration element for side-panel



## Thoughts
Maybe instead of changing CSS values directly, change the root variables
instead? so, for example change a variable called --alignment, rather
than setting align-items: flex-start; individually.
