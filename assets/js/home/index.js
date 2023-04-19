const pannel1Togglers = document.querySelectorAll('[data-pannel-1-toggler]');
const pannel2Togglers = document.querySelectorAll('[data-pannel-2-toggler]');
const pannel3Openers = document.querySelectorAll('[data-pannel-3-opener]');
const pannel3Closers = document.querySelectorAll('[data-pannel-3-closer]');
const allPannelsCloseBtn = document.querySelector('[data-all-pannels-close]');
const pannel1 = document.querySelector('#nav-pannel-1');
const pannel2 = document.querySelector('#nav-pannel-2');
const pannel3 = document.querySelector('#nav-pannel-3');
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

let prevWidth = Number.POSITIVE_INFINITY;
window.addEventListener('resize', (e) => {
  if (prevWidth < 1023 && window.innerWidth >= 1023) {
    pannel1.classList.remove('header__nav-pannel--active');
  }

  prevWidth = window.innerWidth;
});
