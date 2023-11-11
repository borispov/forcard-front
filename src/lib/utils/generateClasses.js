/**
 * 
 * @param {string} elementType 
 * @param {string} elementId 
 * @returns {string} A Selector
 */
export function generateSelector(id, type, state = null) {
    let baseSelector = '#' + type + id
    return state ? `${baseSelector}:${state}` : baseSelector
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