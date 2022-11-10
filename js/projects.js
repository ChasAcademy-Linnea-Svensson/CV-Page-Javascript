const gridContainer = document.querySelector('.portfolio-grid-container'),
      loading = document.querySelector('.loading');

//Add github id here to insert into project gridContainer
const gitProjects = [560837329, 558828247, 562138870];
let descArray = [],
    gitBtnArray = [],
    siteBtnArray = [];

loading.classList.toggle('hide');

//Creates an empty modal
function createEmptyModal() {
  const modal = `
  <div class="modal hide-modal">
    <div class="modal-container">
      <div class="exit-modal">X</div>
      <div class="modal-col1"></div>
      <div class="modal-col3">
        <div class="modal-text"></div>
        <div class="modal-btn-container">
          <a target="_blank" class="bg-light modal-btn github-btn">GitHub link</a>
          <a target="_blank" class="bg-light modal-btn site-btn">Go to site</a>
        </div>
      </div>
    </div>
    <div class="modal-col2" id="modal-previews">
      </div>
  </div>
  `;

  document.body.insertAdjacentHTML("afterbegin", modal);
  toggleModal();
}

function toggleModal() {
  const modal = document.querySelector('.modal');
  modal.classList.toggle('hide-modal');
}

//Creates a div for the project and sets the image
function createProjectDiv(nr, arr) {
  gridContainer.innerHTML += `
  <div class="project-box-container" id="${arr.name}">
    <h5>${arr.name}</h5>
    <div class="img-box box${nr}"></div>
  </div>
  `;

  let imgBox = document.querySelector(`.box${nr}`);
  imgBox.style.background = `
  url('https://raw.githubusercontent.com/ChasAcademy-Linnea-Svensson/${arr.name}/main/img/preview/1.png') no-repeat center center/cover
  `;

  descArray.push(arr.description);
  gitBtnArray.push(arr.html_url);
  siteBtnArray.push(`https://chasacademy-linnea-svensson.github.io/${arr.name}/`);
}

//Fetch github
async function fetchGithubApi() {
  const response = await fetch('https://api.github.com/users/ChasAcademy-Linnea-Svensson/repos');

  if (response.ok){
    gridContainer.innerHTML = '';
    const data = await response.json();

    return data;
  } else {
    console.log('Error');
  }
}

//Calling the fetch and then creates as many project divs as there is id:s in the project array
fetchGithubApi()
  .then(o => {
    o.forEach(arr => {
      for(let i = 0; i <= gitProjects.length; i++) {
        if (arr.id === gitProjects[i]){
          createProjectDiv(i + 1, arr);
        }
      }
    })
    loading.classList.toggle('hide');
    return o;
//Sets an eventlistener for each project that creates a modal on click
}).then((o) => {
  const projects = document.querySelectorAll('.project-box-container');
  projects.forEach((project, index) => {
    project.addEventListener('click', () => {
      createEmptyModal();
      const exit = document.querySelector('.exit-modal'),
            modal = document.querySelector('.modal'),
            modalContainer = document.querySelector('.modal-container'),
            preview = document.querySelector('#modal-previews'),
            modalImage = document.querySelector('.modal-col1'),
            modalDescription = document.querySelector('.modal-col3'),
            gitBtn = document.querySelector('.github-btn'),
            siteBtn = document.querySelector('.site-btn');

      //Set preview image
      for(let i = 0; i < 3; i++) {
        preview.innerHTML += `
        <div class="modal-prev ${project.getAttribute('id')}">
          <img src="https://raw.githubusercontent.com/ChasAcademy-Linnea-Svensson/${project.getAttribute('id')}/main/img/preview/${i + 1}.png">
        <div>
        `;
        modalImage.style.background = `url('https://raw.githubusercontent.com/ChasAcademy-Linnea-Svensson/${project.getAttribute('id')}/main/img/preview/1.png') no-repeat center center/cover`;
      }

      const modalPrev = document.querySelectorAll('.modal-prev');

      //Sets background if preview img is clicked
      modalPrev.forEach((prev, index) => {
        modalPrev[index].addEventListener('click', ()=> {
          modalImage.style.background = `url(${prev.firstElementChild.src}) no-repeat center center/cover`;
        });
      })

      // Set description
      modalDescription.insertAdjacentText("afterbegin",
        descArray[index]);

      //Set button links
      gitBtn.href = gitBtnArray[index];
      siteBtn.href = siteBtnArray[index];
            
      //Close down modal and remove from body
      exit.addEventListener('click', () => {
        toggleModal();
        exit.parentElement.parentElement.remove();
      })
      modal.addEventListener('click', () => {
        toggleModal();
        exit.parentElement.parentElement.remove();
      })
      modalContainer.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
      })
      preview.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
      })
    })
  })
});