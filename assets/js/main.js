const getClosestBySelector = (element, selector) => {
  for (;element && element !== document;element = element.parentNode) {
    if (element.matches(selector)) return element;
  }
  return null;
}

let screenWidth = document.querySelector('html').offsetHeight;
let headerHeight = document.querySelector('#section--header').offsetHeight;
const mainBackgroundElement = document.querySelector('#main-background__images');
const mainBackgroundImages = [...mainBackgroundElement.querySelectorAll('img')].map(image => ({src: image.getAttribute('src')}));
const vegasSettings = {
  slides: mainBackgroundImages,
  delay: 12000,
  overlay: 'https://cdnjs.cloudflare.com/ajax/libs/vegas/2.4.4/overlays/03.png',
  transition: 'fade',
  animation: 'random'
};
window.addEventListener('load', ev => {
  mainBackgroundElement.querySelectorAll('img').forEach(image => {
    image.remove();
  });
  $(mainBackgroundElement).vegas(vegasSettings);
  document.getElementById('component--intro').classList.remove('status--acitve');
  document.getElementById('component--app').classList.add('status--loaded');
});
window.addEventListener('scroll', ev => {
  if(window.scrollY >= headerHeight) {
    document.querySelector('#section--header').classList.add('theme--fixed');
  }
  if(!window.scrollY) {
    document.querySelector('#section--header').classList.remove('theme--fixed');
  }
});
window.addEventListener('resize', ev => {
  if (document.querySelector('html').offsetHeight != screenWidth) {
    screenWidth = document.querySelector('html').offsetHeight;
    headerHeight = document.querySelector('#section--header').offsetHeight
    $(mainBackgroundElement).vegas('destroy');
    mainBackgroundElement.style.height = '';
    $(mainBackgroundElement).vegas(vegasSettings);
  }
});
window.addEventListener('click', ev => {
  if(getClosestBySelector(ev.target, '#header__switch')) {
    document.querySelector('.component--header').classList.toggle('status--active-menu');
  }
  if(getClosestBySelector(ev.target, '.search__tabs__label')) {
    let label = getClosestBySelector(ev.target, '.search__tabs__label');
    let labels = getClosestBySelector(ev.target, '.search__tabs__labels');
    let boxes = getClosestBySelector(ev.target, '.search__tabs').querySelector('.search__tabs__boxes');
    [...labels.querySelectorAll('.search__tabs__label.status--active')].forEach(label => {
      label.classList.remove('status--active');
    });
    [...boxes.querySelectorAll('.search__tabs__box.status--active')].forEach(box => {
      box.classList.remove('status--active');
    });
    label.classList.add('status--active');
    console.log([...labels.querySelectorAll('.search__tabs__label')].indexOf(label));
    [...boxes.querySelectorAll('.search__tabs__box')][[...labels.querySelectorAll('.search__tabs__label')].indexOf(label)].classList.add('status--active');
  }
  if(getClosestBySelector(ev.target, '.properties__item__images li')) {
    let li = getClosestBySelector(ev.target, '.properties__item__images li');
    let ul = getClosestBySelector(ev.target, '.properties__item__images ul');
    [...ul.querySelectorAll('li.status--active')].forEach(li => {
      li.classList.remove('status--active');
    });
    li.classList.add('status--active');
    let image = getClosestBySelector(li, '.properties__item__header').querySelector('.properties__item__image img');
    image.setAttribute('src', li.querySelector('img').getAttribute('src'));
  }
});