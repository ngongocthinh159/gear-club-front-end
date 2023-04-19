// Handle UI toggle
const pannel1Togglers = document.querySelectorAll('[data-pannel-1-toggler]');
const pannel2Togglers = document.querySelectorAll('[data-pannel-2-toggler]');
const pannel3Openers = document.querySelectorAll('[data-pannel-3-opener]');
const pannel3Closers = document.querySelectorAll('[data-pannel-3-closer]');
const allPannelsCloseBtn = document.querySelector('[data-all-pannels-close]');
const navContainerOverlay = document.querySelector(
  '.header__nav-container-overlay'
);
const pannel1 = document.querySelector('#nav-pannel-1');
const pannel2 = document.querySelector('#nav-pannel-2');
const pannel3 = document.querySelector('#nav-pannel-3');
const searchTogglers = document.querySelectorAll('[data-search-toggler]');
const searchContainer = document.querySelector('.header__search-container');
pannel1Togglers.forEach((pannel1Toggler) => {
  pannel1Toggler.addEventListener('click', () => {
    pannel1.classList.toggle('header__nav-pannel--active');
  });
});

pannel2Togglers.forEach((pannel2Toggler) => {
  pannel2Toggler.addEventListener('click', () => {
    pannel2.classList.toggle('header__nav-pannel--active');
  });
});

pannel3Openers.forEach((pannel3Opener) => {
  pannel3Opener.addEventListener('click', () => {
    if (!pannel3.classList.contains('header__nav-pannel--active')) {
      pannel3.classList.add('header__nav-pannel--active');

      // TODO: Rerender the content inside pannel 3
    }
  });
});

pannel3Closers.forEach((pannel3Closer) => {
  pannel3Closer.addEventListener('click', (e) => {
    pannel3.classList.remove('header__nav-pannel--active');
  });
});

allPannelsCloseBtn.addEventListener('click', () => {
  pannel1.classList.remove('header__nav-pannel--active');
  pannel2.classList.remove('header__nav-pannel--active');
  pannel3.classList.remove('header__nav-pannel--active');
});

navContainerOverlay.addEventListener('click', () => {
  allPannelsCloseBtn.click();
});

searchTogglers.forEach((searchToggler) => {
  searchToggler.addEventListener('click', (e) => {
    searchContainer.classList.toggle('header__search-container--active');
  });
});

// When windows resize from tablet -> PC, remove active of pannel 1
let prevWidth = Number.POSITIVE_INFINITY;
window.addEventListener('resize', (e) => {
  if (prevWidth < 1023 && window.innerWidth >= 1023) {
    pannel1.classList.remove('header__nav-pannel--active');
  }

  prevWidth = window.innerWidth;
});

// Handle input searching
const searchInput = document.querySelector('.header__search-input');
let prevTimeout = null;
const DELAY_SEARCH_TIME = 500;
searchInput.addEventListener('input', (e) => {
  searchInput.classList.remove('header__search-input--search-done');
  if (!e.target.value) {
    searchInput.classList.remove('searching');
  } else {
    searchInput.classList.add('header__search-input--searching');
  }

  if (prevTimeout) clearTimeout(prevTimeout);
  prevTimeout = setTimeout(() => {
    // TODO: implement fetch data
    
    searchInput.classList.remove('header__search-input--searching');
    searchInput.classList.add('header__search-input--search-done');
  }, DELAY_SEARCH_TIME);
});
