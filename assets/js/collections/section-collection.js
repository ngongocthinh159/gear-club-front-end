const toggleFilterContainerLabels = document.querySelectorAll(
  '.collection__filter-bar-item-label'
);
const toggleFilterContainerInputs = document.querySelectorAll(
  '.collection__filter-bar-item-input'
);
const brandList = document.querySelector('.collection__brand-list');
const typeList = document.querySelector('.collection__type-list');
toggleFilterContainerLabels.forEach((toggleFilterContainerLabel) => {
  toggleFilterContainerLabel.addEventListener('click', (e) => {
    e.stopPropagation();
    const inputInsideLabel = toggleFilterContainerLabel.querySelector(
      '.collection__filter-bar-item-input'
    );

    if (inputInsideLabel.checked)
      inputInsideLabel.checked = !inputInsideLabel.checked;
    else {
      toggleFilterContainerInputs.forEach((toggleFilterContainerInput) => {
        if (toggleFilterContainerInput !== inputInsideLabel) {
          toggleFilterContainerInput.checked = false;
        } else {
          toggleFilterContainerInput.checked = true;
        }
      });
    }
  });
});

document.body.addEventListener('click', () => {
  toggleFilterContainerInputs.forEach((toggleFilterContainerInput) => {
    toggleFilterContainerInput.checked = false;
  });
});
brandList.addEventListener('click', (e) => {
  e.stopPropagation();
});
typeList.addEventListener('click', (e) => {
  e.stopPropagation();
});
