const ul = document.querySelector('.timetree-skills');

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
      ul.innerHTML += li;
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
      ul.innerHTML += li;
    }
  })
});