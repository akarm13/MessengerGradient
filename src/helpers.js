/**
 * Generates a gradient using a color then darkens the same color by a certain percent to make a one color gradient.
 * 
 * @param {string} color A hexadecimal value for the first color of the gradient
 */
export function generateGradient(string) {
    let colors = JSON.parse(string);
    return `linear-gradient(135deg, #${colors[0]} 0%, #${colors[1]} 130%)`;
}

/**
 * Generates a style tag at the begining of the document to 
 * overide the styles that you select.
 * 
 * @param {string} styles A string consisting of the styles that you want to apply.
 */
export function injectStyles(styles) {
    var customStyles = document.createElement('style');
    customStyles.innerHTML = styles;
    document.documentElement.insertBefore(customStyles, null);
}

