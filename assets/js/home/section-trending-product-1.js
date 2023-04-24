function handleSectionTrendingProduct1Events(trendProd1DOMNode) {}

/**
 * Create a <section class="trend-prod-1"></section> DOM element inside HTML,
 * then pass this DOM element into this function to render header
 * This function also call handleSectionTrendingProduct1Events() to handle all related events
 * @param {DOM Element} trendProd1DOMNode
 */
function renderSectionTrendingProduct1(trendProd1DOMNode) {
  trendProd1DOMNode.innerHTML = `

  `;

  // Handle events
  handleSectionTrendingProduct1Events(trendProd1DOMNode);
}

export { renderSectionTrendingProduct1 };
