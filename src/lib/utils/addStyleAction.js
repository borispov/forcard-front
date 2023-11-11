import { stylesheetStore } from "$lib/sheetStore";

/**
 * @type {import('svelte/action')
 * .Action<HTMLInputElement, { selector: string, styles: string[] }>}
 */
export function addStyleAction(node, options) {

  function calc() {
    const { selector, styles } = options;

    // need to calculate css values here  before passing them ON to the
    // stylesheet store

    let [k,v] = styles
    let value = node.value

    styleMap.set(k, CSS.rem(value))
    stylesheetStore.dispatch('ADD_SINGLE_STYLE', { targetElement: selector, style: styles })

    // use:addStyleAction={{
    // 	selector: divConfig.type + divConfig.id,
    // 	styles: ["width", "15rem"],
    // }}

  }

  node.addEventListener('input', calc)

  return {

    update({ styles }) {
      options.styles = styles
    },
    destroy() {
      node.removeEventListener('input', calc)
    }
  }

}
