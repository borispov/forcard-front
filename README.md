
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


## 08/10/2023.
Working on color swatches and picking text colors, I think it would be
a great idea to make a feature for creating a color palette.

I think it'd be a kind of a Modal wizard, something VERY simple yet
comprehensive for most essential use cases.

A good example: [Svelte](https://svelte.dev/repl/c049d685a16e442fa11281909cb5dac4?version=3.38.2)

## UPDATE 11/10/2023
Working on this project is my therapy. My escapism.

I hav added paddings and margins on most elements, 
added line height and letter spacing on text elements and need to check
image has it too.

### TODO: Config Changes -- 
I must extract configuration fields into separate components - it'll
much easier to compose and change configuration settings from one
element to another.


### TODO:
implement ctx -- for deleting elements. access the index of each
element's container to remove it from container's children


# UPDATE 11.11.2023

I have opted for CSSOM completely for handling CSS and especially pseudo
elements. this has proven to be a very challenging task for myself.
I can easily manage drawing the initial styles of pre-loaded components.
However, upon change, it gets more challenging.

How to update individual CSS values without rewriting the whole
stylesheet upon every single change? updating font-size to 1rem
shouldn't cause a regeneration of the entire stylesheet, right?

CSSOM's API exposes small number of methods to allow us to construct and
modify stylesheets programatically. However, it feels like a lot of work
is still needed to achieve a convenient state. For instance, insertRule
method doesn't simply insert a css rule, it overrides any existing rules
for a selector. replaceSync replaces the whole stylesheet. What then?

Well, iterating over the stylesheet's CSS RULES, namely, the registered
selectors, we can loop over the elemnts and when we get to a desired
element, we can append styles to it like we would traditionally:

```javascript
// old way
element.style[cssProperty] = cssPropertyValue
// CSSOM way...
element.style[cssProperty] = cssPropertyValue
```

The difference is what element really represents. We can get via
`document.getElementById...` like we're all familiar with, and we can
iterate of a stylesheet. For example:

```
let a = document.adoptedStylesheets[0].cssRules
for ( const sel of a) {
    sel.style....
}
```

## Svelte Challenges
HOWEVER, how can I know which property to update without updating whole
component's styles everytime?

I have found a solution. A trick. A hack using JavaScript's Proxy API.
It feels hacky and messy, I need to write a lot of logic because of
this.

For example, the gradient background colors, have various settings like
position for each color, premade gradients, etc.
I'd like to recalculate the whole gradient upon every change, which
requires the whole gradient object's information. It's not naturally
available in the Proxy, I can easily get the propety and value that are
being changed, not the whole context.

It feels right that I'm re-writing a lot of code and features taking
important things in mind, but it's a bit frustrating knowing I might be
making bad decisions which will require an important rewrite again...

# UPDATE 12.11.2023

I decided: to fuck with it.
Let's recreate a whole selector's css with EVERY change.
Why not? I don't have to rewrite a ton of logic to handle and 'parse'
various css changes.



# UPDATE: 17.11.23
Great results, I added a premade services section, need to implement
ICONS next I think. Afterwards I'll work on forms.
I think FORMS will take a lot of effort to make it right. lots of
possibilities too.

- I am proud I found a solution, although not the best but OK for now.
- I couldn't figure out how to generate correct Id's for a bulk of
    components so that they can relate to each other and adhere to the
    general ID hierarchy of existing components. So, I found a simple
    fix using a temporary variable that I increment and so on.

    ```javascript
        const addServicesTemplate = () => {
		var _tmpId = setElementId($site.components);

		// caution; function is NOT recursive. cannot deal with 2 levels of
		// CONTAINERS!!!
		servicesLayout.forEach((c, i, a) => {
			if (c.children) {
				if (c.id.length > 3) {
					let prependedId = String(_tmpId);
					_tmpId++;
					servicesLayout[i].id = prependedId;
				}

				c.children.map((child, childId) => {
					console.log(child);
					let idInArray = findId(child, servicesLayout);
					console.log(idInArray);

					let newId = String(_tmpId);
					_tmpId++;
					servicesLayout[idInArray].id = newId;
					servicesLayout[i].children[childId] = newId;
				});
			}
		});

	};
    ```
