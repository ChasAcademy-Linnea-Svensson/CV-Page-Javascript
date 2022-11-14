// About page pictureswap
const prev = document.querySelector('.prev'),
      next = document.querySelector('.next'),
      circles = document.querySelectorAll('.circle'),
      barDiv = document.querySelector('.line'),
      img = document.querySelector('.selfie-img-container');

let currentActive = 1;
let bar;

//Previous button
prev.addEventListener('click', () => {
  currentActive--;
  if (currentActive < 1) {
    currentActive = 1;
  }
  if (currentActive == 1) {
    prev.classList.add('disabled');
  }
  if (currentActive < circles.length) {
    next.classList.remove('disabled');
  }
  updateBar();
})

//Next button
next.addEventListener('click', () => {
  currentActive++;
  if (currentActive > circles.length) {
    currentActive = circles.length;
  }
  if (currentActive > 1) {
    prev.classList.remove('disabled');
  }
  if (currentActive == circles.length) {
    next.classList.add('disabled');
  }
  updateBar();
})

//Updates bar and sets background
function updateBar() {
  bar = (currentActive - 1)  / (circles.length - 1) * 100;
  barDiv.style.width = bar + '%';

  circles.forEach ((circle, index) => {
    if (index < currentActive) {
      circle.classList.add('circle-active');
    } else {
      circle.classList.remove('circle-active');
    }
  });

  img.style.background = `url('../img/About/${currentActive}.jpg') no-repeat center center/cover`;
}