function handleSectionTrendingProduct3Events(trendProd3DOMNode) {}

/**
 * Create a <section class="trend-prod-3"></section> DOM element inside HTML,
 * then pass this DOM element into this function to render header
 * This function also call handleSectionTrendingProduct3Events() to handle all related events
 * @param {DOM Element} trendProd3DOMNode
 */
function renderSectionTrendingProduct3(trendProd3DOMNode) {
  trendProd3DOMNode.innerHTML = `

  `;

  // Handle events
  handleSectionTrendingProduct3Events(trendProd3DOMNode);
}

export { renderSectionTrendingProduct3 };
