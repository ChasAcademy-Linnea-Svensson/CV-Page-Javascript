const aboutDiv = document.querySelector('.frontpage-about'),
      timetreeDiv = document.querySelector('.frontpage-timetree-container'),
      portfolioDiv = document.querySelector('.frontpage-portfolio-container');

window.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop > 300) {
    aboutDiv.style.opacity = 1;
    aboutDiv.style.animation = 'scroll 2s forwards';
  } 
  if (document.documentElement.scrollTop > 900) {
    timetreeDiv.style.opacity = 1;
    timetreeDiv.style.animation = 'scroll 2s forwards';
  }
  if (document.documentElement.scrollTop > 1600) {
    portfolioDiv.style.opacity = 1;
    portfolioDiv.style.animation = 'scroll 2s forwards';
  }
});