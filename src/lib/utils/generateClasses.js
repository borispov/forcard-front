/**
 * 
 * @param {string|null} id - if null, we expect a STRING selector, i.e.
 * a pre-made selector
 * @param {string} type - type of element: text, container, button, form,
 * image, etc...
 * @param {string} pseudo - hover/focus/etc...
 * @param {string} stringSelector - a pre-made selector to by pass the
 * whole thing.
 * @returns {string} A Selector
 */
export function generateSelector(id, type, pseudo = null, stringSelector) {
    if (id === null) {
        return pseudo ? `${stringSelector}:${pseudo}` : stringSelector
    }
    let baseSelector = '#' + type + id
    return pseudo ? `${baseSelector}:${pseudo}` : baseSelector
}

/**
 * 
 * @param {string} elementId 
 * @param {string} elementType 
 * @param {string} cssRules 
 * @returns {string} A CSS Class
 */
export function generateRule(selector, cssRules) {
    return `${selector} {\n${cssRules}\n}`
}

export function generateHoverClass(elementId, elementType, cssRules) {
    return `${elementType + "_" + elementId}:hover {
        ${cssRules}
    }`
}

const selectors = [
    {
        componentId: '3',
        selector: "#text-03",
        css: "",
    },
    {
        componentId: '3',
        selector: "#text-03:hover",
        css: "",
    },
]