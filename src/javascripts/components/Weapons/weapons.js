import $ from 'jquery';
// import firebase from 'firebase/app';
// import 'firebase/auth';

import weaponsData from '../../helpers/data/weaponsData';

import './weapons.scss';
import utilities from '../../helpers/utilities';

const showDeets = (e) => {
  e.preventDefault();
  const clickedWeapon = e.target.id;
  $('.deets').addClass('hide');
  $('.full-img').removeClass('hide');
  $(`#${clickedWeapon}-deets`).removeClass('hide');
  $(`#${clickedWeapon}-full-img`).addClass('hide');
};

const showTheWeapons = (e) => {
  e.stopImmediatePropagation();
  $('#dashboard').addClass('hide');
  weaponsData.getWeapons()
    .then((weppens) => {
      let domString = '<h1>Armory</h1>';
      domString += '<div class="row"><div class="card-group">';
      weppens.forEach((weppen) => {
        domString += `
        <div class="col-sm-6">
          <div class="card mb-3" id="${weppen.id}-card">
            <div id="${weppen.id}-deets" class="row no-gutters deets hide">
              <div class="col-md-6">
                <img id="${weppen.id}" src="${weppen.img}" class="card-img" alt="${weppen.name}">
              </div>
              <div class="col-md-6">
                <div class="card-body">
                  <h5 class="card-title">${weppen.name}</h5>
                  <p class="card-text">${weppen.isActive ? 'Active' : 'Inactive'}</p>
                  <p class="card-text">Crew of ${weppen.teamSize}</p>
                  <p class="card-text">Use: ${weppen.type}</p>
                </div>
              </div>
            </div>
            <div id="${weppen.id}-full-img" class="card-body full-img">
            <img id="${weppen.id}" src="${weppen.img}" class="card-img" alt="${weppen.name}">
            </div>
          </div>
        </div>
        `;
      });
      domString += '</div></div>';
      utilities.printToDom('weapons', domString);
      $('#weapons').on('click', '.card-img', showDeets);
    })
    .catch((error) => console.error(error));
};

const clickWeapons = () => {
  $('#weapons-button').click(showTheWeapons);
};

export default { clickWeapons };
