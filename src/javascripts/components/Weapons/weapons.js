import $ from 'jquery';
// import firebase from 'firebase/app';
// import 'firebase/auth';

import weaponsData from '../../helpers/data/weaponsData';

import './weapons.scss';
import utilities from '../../helpers/utilities';

const showDeets = (e) => {
  e.preventDefault();
  const clickedWeapon = e.target.id;
  let string = '';
  weaponsData.getOneWeapon(clickedWeapon)
    .then((weppen) => {
      string += `<div class="row no-gutters">
        <div class="col-md-6">
          <img id="${weppen.id}" src="${weppen.img}" class="card-img" alt="${weppen.name}">
        </div>
      <div class="col-md-6">
        <div class="card-body">
          <h5 class="card-title">${weppen.name}</h5>
          <p class="card-text">${weppen.isActive ? 'Active' : 'Inactive'}</p>
          <p class="card-text">Crew of ${weppen.teamSize}</p>
          <p class="card-text">Type: ${weppen.type}</p>
        </div>
      </div>
    </div>`;
      utilities.printToDom(`${clickedWeapon}-card`, string);
    })
    .catch((error) => console.error(error));
};

const showTheWeapons = (e) => {
  e.preventDefault();
  $('#dashboard').addClass('hide');
  weaponsData.getWeapons()
    .then((weppens) => {
      let domString = '<h1>Armory</h1>';
      domString += '<div class="row">';
      weppens.forEach((weppen) => {
        domString += `
        <div class="col-sm-6">
          <div class="card mb-3" id="${weppen.id}-card">
            <div class="card-body">
            <img id="${weppen.id}" src="${weppen.img}" class="card-img" alt="${weppen.name}">
            </div>
          </div>
        </div>
        `;
      });
      domString += '</div>';
      utilities.printToDom('weapons', domString);
      $('#weapons').on('click', '.card-img', showDeets);
    })
    .catch((error) => console.error(error));
};

const clickWeapons = () => {
  $('#weapons-button').click(showTheWeapons);
};

export default { clickWeapons };
