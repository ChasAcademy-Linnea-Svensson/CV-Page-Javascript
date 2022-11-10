const popUp = document.querySelectorAll('.pop-up'),
      modal = document.querySelector('.modal'),
      modalBackground = document.querySelector('.modal-col1'),
      modalText = document.querySelector('.modal-text'),
      exit = document.querySelector('.exit-modal'),
      modalContainer = document.querySelector('.modal-container'),
      modalBtnGitHub = document.querySelector('.modal-btn:first-child'),
      modalBtnSecond = document.querySelector('.modal-btn:last-child'),
      meowmory = 2,
      cvPage = 1;

async function getRepo() {
  const response = await fetch('https://api.github.com/users/ChasAcademy-Linnea-Svensson/repos');

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.log(response.status);
  }
}

popUp.forEach((pop, index) => {
  pop.addEventListener('click', () => {
    if (index == 0){
      getRepo().then(repo => {
        modalBtnGitHub.href = repo[meowmory].html_url;
        console.log(repo[meowmory]);
        modalBtnSecond.href = 'https://chasacademy-linnea-svensson.github.io/Meowmory/';

        modalText.innerHTML = `
        <h5>${repo[meowmory].name}</h5>
        <p>${repo[meowmory].description}</p>
        `;
      })
    } else {
      getRepo().then(repo => {
        console.log(repo[cvPage]);
      })
    }

    console.log(index);
    toggleModal();
  })
});

// exit.addEventListener('click', () => {
//   toggleModal();
// });

click(exit);
click(modal);

modalContainer.addEventListener('click', (e) => {
  e.stopImmediatePropagation();
})

function toggleModal() {
  modal.classList.toggle('hide-modal');
}

function click(name) {
  return name.addEventListener('click', () => {
    toggleModal();
    modalText.innerHTML = '';
  })
}