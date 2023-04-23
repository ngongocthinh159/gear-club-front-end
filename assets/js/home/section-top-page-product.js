function handleSectionTopPageProductEvents(topPageProductDOMNode) {}

/**
 * Create a <section class="top-page-prod"></section> DOM element inside HTML,
 * then pass this DOM element into this function to render header
 * This function also call handleSectionTopPageProductEvents() to handle all related events
 * @param {DOM Element} topPageProductDOMNode
 */
function renderSectionUnderTop(topPageProductDOMNode) {
  topPageProductDOMNode.innerHTML = `

  `;

  // Handle events
  handleSectionTopPageProductEvents(topPageProductDOMNode);
}

export { renderSectionUnderTop };
