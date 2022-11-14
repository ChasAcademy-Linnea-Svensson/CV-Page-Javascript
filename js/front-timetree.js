const frontUl = document.querySelector('.frontpage-timetree-skills');

async function fetchJson() {
  const response = await fetch('../json/skilltree.json');

  if (response.ok) {
    const data = await response.json();
    return data
  } else {
    console.log('error');
  }
}

fetchJson().then(skills => {
  front = 4;
  skills.forEach((skill, index) => {
    if(index % 2 === 0) {
      const li = `
        <li>
          <div class="bg-light div-right skilltree-skill">
            <div class="skill-info">
              <h4>${skill.year}: ${skill.skill}</h4>
              <p>${skill.description}</p>
            </div>
            <img src="${skill.img}" alt="skill-${skill.skill}">
          </div>
        </li>
      `;
      if(front > 0){
        frontUl.innerHTML += li;
        front--;
      }
    } else {
      const li = `
        <li>
          <div class="bg-light div-left skilltree-skill">
            <img src="${skill.img}" alt="skill-${skill.skill}">
            <div class="skill-info">
              <h4>${skill.year}: ${skill.skill}</h4>
              <p>${skill.description}</p>
            </div>
          </div>
        </li>
      `;
      if(front > 0){
        frontUl.innerHTML += li;
        front--;
      }
    }
  })
});