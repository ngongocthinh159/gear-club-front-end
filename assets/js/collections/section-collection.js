import { products } from '../mock-data/mock-data.js';
import { fetchData } from '../commons/fetch.js';
import { numberWithCommas } from '../commons/ultils.js';

const MAX_VALUE = 200000000;
const MIN_VALUE = 0;
const DEFAULT_FROM_VALUE = 0;
const DEFAULT_TO_VALUE = 200000000;
const SORT_TYPE = {
  A_TO_Z: 'aToZ',
  Z_TO_A: 'zToA',
  INCREASING_PRICE: 'increasingPrice',
  DECREASING_PRICE: 'decreasingPrice',
  NEWEST_TO_OLDEST: 'newestToOldest',
  OLDEST_TO_NEWEST: 'oldestToNewest',
};
const DEFAULT_SORT_TYPE = SORT_TYPE.A_TO_Z;

// Refs
const toggleFilterContainerLabels = document.querySelectorAll(
  '.collection__filter-bar-item-label'
);
const toggleFilterContainerInputs = document.querySelectorAll(
  '.collection__filter-bar-item-input'
);
const brandList = document.querySelector('.collection__brand-list');
const categoryList = document.querySelector('.collection__category-list');
const priceContainer = document.querySelector('.collection__price-container');

// Toggle filter container appropriately
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

// Handle click outside the filter container/list => Hide filter
document.body.addEventListener('click', () => {
  toggleFilterContainerInputs.forEach((toggleFilterContainerInput) => {
    toggleFilterContainerInput.checked = false;
  });
});

// Handle click inside filter container/list => Still show filter
brandList.addEventListener('click', (e) => {
  e.stopPropagation();
});
categoryList.addEventListener('click', (e) => {
  e.stopPropagation();
});
priceContainer.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Setup range slider
let myRange = null;
function setupRangeSlider() {
  myRange = $('.js-range-slider')
    .ionRangeSlider({
      type: 'double',
      min: MIN_VALUE,
      max: MAX_VALUE,
      from: DEFAULT_FROM_VALUE,
      to: DEFAULT_TO_VALUE,
      grid: true,
      skin: 'flat',
      onStart: function (data) {},
      onChange: function (data) {},
      onFinish: function (data) {
        rerenderProductList();

        // Add applied filter item to DOM
        if (
          myRange.result.from !== DEFAULT_FROM_VALUE ||
          myRange.result.to !== DEFAULT_TO_VALUE
        ) {
          const appliedFilterUl = document.querySelector(
            '.collection__applied-filter-list'
          );
          const priceAppliedFilterItem = document.createElement('li');

          priceAppliedFilterItem.className = 'collection__aplied-filter-item';
          priceAppliedFilterItem.innerHTML = `
          <label
            class="collection__aplied-filter-label collection__aplied-filter-label-price-range"
          >
            ${
              numberWithCommas(myRange.result.from) +
              'đ - ' +
              numberWithCommas(myRange.result.to) +
              'đ'
            }<i class="bi bi-x"></i>
          </label>
        `;

          const prevPriceFilter = document.querySelector(
            '.collection__aplied-filter-item:has(.collection__aplied-filter-label-price-range)'
          );
          if (prevPriceFilter) appliedFilterUl.removeChild(prevPriceFilter);
          appliedFilterUl.appendChild(priceAppliedFilterItem);
        }
      },
    })
    .data('ionRangeSlider');
}
setupRangeSlider();

// Handle filter trigger
/**
 * Search for all filter trigger, attach an click event listener
 * Every time click => Trigger rerender
 */
function handleFilterTrigger() {
  const filterTriggers = [
    ...document.querySelectorAll('[data-filter-trigger]'),
  ];
  filterTriggers.forEach((filterTrigger) => {
    filterTrigger.addEventListener('change', () => {
      rerenderProductList();
    });
  });
}

/**
 * Fetch all products from current collection to get all brands and category
 * Update DOM filter according to the URL
 * Call rerender function (after have the DOM filter setup)
 */
function firstFetch() {
  fetchData('URL without params to get all possible filter', (products) => {
    const brands = new Set();
    const categories = new Set();

    products.forEach((product) => {
      brands.add(product.brand.toLowerCase());
      categories.add(product.category.toLowerCase());
    });

    // Render branch list
    const brandListUl = document.querySelector('.collection__brand-list');
    const brandHTMLs = [];
    for (const brand of brands.values()) {
      brandHTMLs.push(`
        <li class="collection__brand-item">
          <label
            class="collection__brand-item-label"
            for="${brand}-toggler-input"
          >
            <input
              type="checkbox"
              id="${brand}-toggler-input"
              data-brand="${brand}"
              hidden
              data-filter-trigger
            />
            ${brand} (<span>5</span>)
          </label>
        </li>
      `);
    }
    brandListUl.innerHTML = brandHTMLs.join('');

    // Render category list
    const categoryListUl = document.querySelector('.collection__category-list');
    const categoryHTMLs = [];
    for (const category of categories.values()) {
      categoryHTMLs.push(`
        <li class="collection__category-item">
          <label
            class="collection__category-item-label"
            for="${category}-toggler-input"
          >
            <input
              type="checkbox"
              id="${category}-toggler-input"
              data-category="${category}"
              hidden
              data-filter-trigger
            />
            ${category} (<span>5</span>)
          </label>
        </li>
      `);
    }
    categoryListUl.innerHTML = categoryHTMLs.join('');

    // Handle filter trigger (brand select, category select)
    handleFilterTrigger();

    // Update DOM filter according to query URL
    updateFilterAccordingToURL();

    // Generate applied filter list
    generateAppliedFilterList(brands, categories);

    // After have DOM filter setup => Rerender to get product list
    rerenderProductList();
  });
}
firstFetch();

function updateFilterAccordingToURL() {
  const availabilityCheckbox = document.querySelector(
    '#custom-switch__checkbox-availability'
  );
  let queryString = window.location.search;
  queryString = queryString.slice(1);

  let keyValueStrings = queryString.split('&');
  keyValueStrings.forEach((keyValueString) => {
    const temp = keyValueString.split('=');
    const key = temp[0];
    const value = temp[1];

    if (key === 'availability') {
      availabilityCheckbox.checked = value === 'true' ? true : false;
    }

    if (key === 'brands') {
      const brands = value.split(',');
      brands.forEach((brand) => {
        const currentBrandCheckbox = document.querySelector(
          `#${brand}-toggler-input`
        );
        currentBrandCheckbox.checked = true;
      });
    }

    if (key === 'categories') {
      const categories = value.split(',');
      categories.forEach((category) => {
        const currentCategoryCheckbox = document.querySelector(
          `#${category}-toggler-input`
        );
        currentCategoryCheckbox.checked = true;
      });
    }

    if (key === 'priceFrom') {
      myRange.update({
        from: value,
      });
    }

    if (key === 'priceTo') {
      myRange.update({
        to: value,
      });
    }

    if (key === 'sortType') {
      $('#collection__select-sort').val(value);
    }
  });
}

/**
 * Generate all potential applied filter, and CSS rule (show when checked)
 * @param {*} brands a Set
 * @param {*} categories a Set
 */
function generateAppliedFilterList(brands, categories) {
  const appliedFilterUl = document.querySelector(
    '.collection__applied-filter-list'
  );

  const HTMLs = [];
  let dynamicStyles = '';

  // Availability
  HTMLs.push(`
    <li class="collection__aplied-filter-item">
      <label
        class="collection__aplied-filter-label"
        for="custom-switch__checkbox-availability"
      >
        Còn hàng<i class="bi bi-x"></i>
      </label>
    </li>
  `);

  // Brands
  for (const brand of brands.values()) {
    HTMLs.push(`
      <li class="collection__aplied-filter-item">
        <label
          class="collection__aplied-filter-label"
          for="${brand}-toggler-input"
        >
          ${brand}<i class="bi bi-x"></i>
        </label>
      </li>
    `);

    dynamicStyles += `
      .collection__main-content:has(#${brand}-toggler-input:checked) .collection__aplied-filter-item label[for="${brand}-toggler-input"] {
        display: flex;
      }
    `;
  }

  // Category
  for (const category of categories.values()) {
    HTMLs.push(`
      <li class="collection__aplied-filter-item">
        <label
          class="collection__aplied-filter-label"
          for="${category}-toggler-input"
        >
          ${category}<i class="bi bi-x"></i>
        </label>
      </li>
    `);

    dynamicStyles += `
      .collection__main-content:has(#${category}-toggler-input:checked) .collection__aplied-filter-item label[for="${category}-toggler-input"] {
        display: flex;
      }
    `;
  }

  // Price range
  if (
    myRange.result.from !== DEFAULT_FROM_VALUE ||
    myRange.result.to !== DEFAULT_TO_VALUE
  ) {
    HTMLs.push(`
      <li class="collection__aplied-filter-item">
        <label
          class="collection__aplied-filter-label collection__aplied-filter-label-price-range"
        >
          ${
            numberWithCommas(myRange.result.from) +
            'đ - ' +
            numberWithCommas(myRange.result.to) +
            'đ'
          }<i class="bi bi-x"></i>
        </label>
      </li>
    `);
  }

  // Add dynamic stylesheet to HTML
  var styleSheet = document.createElement('style');
  styleSheet.innerText = dynamicStyles;
  document.head.appendChild(styleSheet);

  // Update DOM
  appliedFilterUl.innerHTML = HTMLs.join('');

  // Handle price range label click (reset price range)
  if (
    myRange.result.from !== DEFAULT_FROM_VALUE ||
    myRange.result.to !== DEFAULT_TO_VALUE
  ) {
    const priceRangeLabel = appliedFilterUl.querySelector(
      '.collection__aplied-filter-label-price-range'
    );
    priceRangeLabel.addEventListener('click', () => {
      myRange.update({
        from: DEFAULT_FROM_VALUE,
        to: DEFAULT_TO_VALUE,
      });
      priceRangeLabel.remove();
      rerenderProductList();
    });
  }
}

// Get current filter state
function getFilterStateFromDOMElements() {
  const filterState = {
    availability: false,
    brands: [],
    categories: [],
    priceRange: {
      from: DEFAULT_FROM_VALUE,
      to: DEFAULT_TO_VALUE,
    },
    sortType: DEFAULT_SORT_TYPE,
  };
  const availabilityCheckbox = document.querySelector(
    '#custom-switch__checkbox-availability'
  );
  const brandCheckboxes = document.querySelectorAll('[data-brand]');
  const categoryCheckboxes = document.querySelectorAll('[data-category]');
  const sortSelect = document.querySelector('#collection__select-sort');

  // Get filter state
  filterState.availability = availabilityCheckbox.checked;
  brandCheckboxes.forEach((brandCheckbox) => {
    if (brandCheckbox.checked) {
      filterState.brands.push(brandCheckbox.dataset.brand);
    }
  });
  categoryCheckboxes.forEach((categoryCheckbox) => {
    if (categoryCheckbox.checked) {
      filterState.categories.push(categoryCheckbox.dataset.category);
    }
  });
  if (myRange.result.to !== 0) {
    filterState.priceRange.from = myRange.result.from;
    filterState.priceRange.to = myRange.result.to;
  }
  filterState.sortType = sortSelect.options[sortSelect.selectedIndex].value;

  return filterState;
}

/**
 * ?collectionId=1&availability=true&brands=filco,keychron&categories=keyboard,mouse&priceFrom=21428571&priceTo=166964286&sortType=increasingPrice
 * @param {object} filterState
 * @returns string is the query string
 */
function updateQueryURL(filterState) {
  const collectionId = getCurrentCollectionId();

  let QUERY_URL = `?collectionId=${collectionId}`;
  QUERY_URL += `&availability=${filterState.availability}`;
  if (filterState.brands.length !== 0) {
    QUERY_URL += `&brands=${filterState.brands.join(',')}`;
  }
  if (filterState.categories.length !== 0) {
    QUERY_URL += `&categories=${filterState.categories.join(',')}`;
  }
  QUERY_URL += `&priceFrom=${filterState.priceRange.from}&priceTo=${filterState.priceRange.to}`;
  QUERY_URL += `&sortType=${filterState.sortType}`;
  history.replaceState(null, null, QUERY_URL);
  return QUERY_URL;
}

function getCurrentCollectionId() {
  let temp = window.location.search.slice(1);
  let keyValueStrings = temp.split('&');
  let collectionId = null;
  keyValueStrings.forEach((keyValueString) => {
    let temp2 = keyValueString.split('=');
    let key = temp2[0];
    let value = temp2[1];
    if (key === 'collectionId') {
      collectionId = Number(value);
    }
  });

  return collectionId;
}

/**
 * This function will trarvese the DOM tree to get all the filter state getFilterStateFromDOMElements();
 * After get the filter state => Update QUERY URL
 * Fetch data with filter then render it into the tree
 */
function rerenderProductList() {
  const filterState = getFilterStateFromDOMElements();
  const QUERY_URL = updateQueryURL(filterState);
  const productListUl = document.querySelector('.collection__product-list');

  // Skeleton loading
  productListUl.innerHTML = getSkeletionLoading();

  // Update product list
  fetchData('URL with query params', (products) => {
    productListUl.innerHTML = `
      <div class="row">
        ${products
          .map((product) => {
            return `
              <div class="col l-3 m-3 c-6">
                <li class="collection__product-item mb-32">
                  <div class="product-card">
                    <a href="" class="product-card__link">
                      <div class="product-card__img-wrapper">
                        <img
                          class="product-card__img product-card__main-img"
                          src="${product?.imgs[0]}"
                          alt="Hot product image"
                        />

                        <img
                          class="product-card__img product-card__hover-img"
                          src="${product?.imgs[1]}"
                          alt="Hot product image"
                        />
                      </div>

                      <p class="product-card__name">
                        ${product.name}
                      </p>
                    </a>

                    <button
                      class="btn btn-primary product-card__add-cart-btn"
                      data-product-id
                      data-add-to-cart-btn
                    >
                      + Thêm
                    </button>

                    <div class="product-card__sold-out">Hết hàng</div>

                    <p class="product-card__price">${product.price}</p>
                  </div>
                </li>
              </div>
            `;
          })
          .join('')}
      </div>
    `;
  });
}

function getSkeletionLoading() {
  const HTMLs = [];
  HTMLs.push('<div class="row">');

  for (var i = 0; i < 12; i++) {
    HTMLs.push(`
      <div class="col l-3 m-3 c-6">
        <li class="collection__product-item">
          <div class="product-card">
            <a href="" class="product-card__link">
              <div class="skeleton" style="height: 260px"></div>

              <p class="product-card__name">
                <div class="skeleton" style="height: 24px; width: 70%"></div>
              </p>
            </a>

            <div class="product-card__sold-out">Hết hàng</div>

            <p class="product-card__price">
              <div class="skeleton" style="height: 24px; width: 20%"></div>
            </p>
          </div>
        </li>
      </div>
    `);
  }

  HTMLs.push('</div>');

  return HTMLs.join('');
}
