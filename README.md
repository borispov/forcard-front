
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

1. Add a width setting on container elements - DONE
2. Make it responsive/centered by default.
3. Code Text Element Configuration element for side-panel - PARTIALLY
   DONE.
3. Code Button Element Configuration element for side-panel



## Thoughts
Maybe instead of changing CSS values directly, change the root variables
instead? so, for example change a variable called --alignment, rather
than setting align-items: flex-start; individually.


## 2/10/2023

Things have gotten pretty complex as soon as I started manipulating the component tree. Especially, in the drag-n-drop implementation, everything is leaking. Changes to one element change other elements, too. 

Triggering an ondrop event passed around data that isn't related to the exact component that triggers the actual event.

I have posted a question on Reddit and Discord and I started to use structuredCopy when mutating the array of components.
I also received some comments that I probably have something wrong in the way I store everything.

### Attempt to solve
children's array include objects with ID prop. maybe I should just let that be an array.
I start by removing the ID property children's 

### UPDATE
It did not solve the issue.
StopPropagation did.