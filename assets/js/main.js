const mainBackground = document.querySelector('#main-background__images');
const mainBackgroundImages = [...mainBackground.querySelectorAll('img')].map(image => ({src: image.getAttribute('src')}));
const vegasSettings = {
  slides: mainBackgroundImages,
  delay: 12000,
  overlay: 'https://cdnjs.cloudflare.com/ajax/libs/vegas/2.4.4/overlays/03.png',
  transition: 'fade',
  animation: 'random'
};
document.querySelector('#header__switch').addEventListener('click', ev => {
  document.querySelector('.component--header').classList.toggle('status--active-menu');
});
window.addEventListener('load', ev => {
  mainBackground.querySelectorAll('img').forEach(image => {
    image.remove();
  });
  $(mainBackground).vegas(vegasSettings);
  document.getElementById('component--intro').classList.remove('status--acitve');
  document.getElementById('component--app').classList.add('status--loaded');
});
window.addEventListener('resize', ev => {
  $(mainBackground).vegas('destroy');
  mainBackground.style.height = '';
  $(mainBackground).vegas(vegasSettings);
});
