function handleSectionUnderTopEvents(underTopDOMNode) {}

/**
 * Create a <section class="under-top"></section> DOM element inside HTML,
 * then pass this DOM element into this function to render header
 * This function also call handleSectionUnderTopEvents() to handle all related events
 * @param {DOM Element} underTopDOMNode
 */
function renderSectionUnderTop(underTopDOMNode) {
  underTopDOMNode.innerHTML = `
    
  `;

  // Handle events
  handleSectionUnderTopEvents(underTopDOMNode);
}

export { renderSectionUnderTop };
