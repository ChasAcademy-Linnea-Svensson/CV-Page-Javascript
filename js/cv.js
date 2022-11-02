const cvContainer = document.querySelector('.cv-container'),
      cvAddress = document.querySelector('.cv-address'),
      cvPhone = document.querySelector('.cv-phone'),
      cvEmail = document.querySelector('.cv-email'),
      cvLanguage = document.querySelector('.cv-language'),
      languageSkillBox = document.querySelector('.skill-boxes'),
      hobbyNameList = document.querySelector('#hobby-name'),
      hobbyIconList = document.querySelector('#hobby-icons'),
      cvSummary = document.querySelector('.cv-summary'),
      cvSkills = document.querySelector('.skills-list'),
      cvExperience = document.querySelector('.cv-experience'),
      cvEducation = document.querySelector('.cv-education'),
      certificationList = document.querySelector('.certification-list');

async function cv() {
  const response = await fetch('json/cv.json'),
        data = await response.json();

        return data;
}

cv().then(section => {
  //Contact section
  cvAddress.innerHTML = `
  <h5>Address:</h5>
  <p>${section.contact.address}</p>
  <p>${section.contact.postaddress}</p>
  `;

  cvPhone.innerHTML = `
  <h5>Phone:</h5>
  <p>${section.contact.phone}</p>
  `;

  cvEmail.innerHTML = `
  <h5>Email:</h5>
  <p>${section.contact.email}</p>
  `;

  //Language section
  section.languages.forEach((language, index) => {
    cvLanguage.innerHTML += `
    <p>${language.language}</p>
    `;
    languageSkillBox.innerHTML += `
    <div class="cv-container-box">
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
    </div>
    `;

    const boxes = document.querySelectorAll(`.cv-container-box:last-child .box`);
    let i = language.lvl;
    boxes.forEach(box => {
      if (i > 0) {
        box.classList.add('filled');
        i--;
      }
    })
  });
  
  //Hobbies section
  section.hobbies.forEach(hobby => {
    hobbyNameList.innerHTML += `
    <li>${hobby.hobby}</li>
    `;
    hobbyIconList.innerHTML += `
      <li><i class="${hobby.icon}"></i></li>
    `;
  });

  //Summary section
  cvSummary.innerHTML += section.summary.summary;

  //Skill section
  section.skills.forEach(skill => {
    cvSkills.innerHTML += `
      <li class="bg-lighter">${skill.skill}</li>
    `;
  });

  //Experience section
  section.experience.forEach(job => {
    cvExperience.innerHTML += `
    <p><strong>${job.job}</strong> - <span>${job.year}</span></p>
    `;
  });

  //Education section
  section.education.forEach(school => {
    cvEducation.innerHTML += `
      <p><strong>${school.school}</strong> -<span> ${school.year}</span></p>
    `;
  });

  //Certification section
  section.certifications.forEach(certification => {
    let divs = '';

    for (i = certification.lvl; i > 0; i--){
      divs += '<div class="box-2 filled-2"></div>';
    }

    certificationList.innerHTML += `
      <li>
        <div class="box-round-top filled-2"></div>
        ${divs}
        <p>${certification.certification}</p>
      </li>
    `;
  })
}).catch(err => {
  cvContainer.innerHTML = '<h1>Something Went Wrong</h1><br/><h3>But you can still download the CV</h3>'
  cvContainer.style.flexDirection = 'column';
  cvContainer.style.alignItems = 'center';
});