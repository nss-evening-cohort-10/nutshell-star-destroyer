import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

import weaponsData from '../../helpers/data/weaponsData';

import './weapons.scss';
import utilities from '../../helpers/utilities';

const deleteWeapon = (e) => {
  e.stopImmediatePropagation();
  const weaponIdToDelete = e.target.id.split('delete-')[1];

  weaponsData.deleteWeapon(weaponIdToDelete)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      showTheWeapons(e);
    })
    .catch((err) => console.error(err));
};

const showDeets = (e) => {
  e.preventDefault();
  const clickedWeapon = e.target.id;
  $('.deets').addClass('hide');
  $('.full-img').removeClass('hide');
  $(`#${clickedWeapon}-deets`).removeClass('hide');
  $(`#${clickedWeapon}-full-img`).addClass('hide');
};

const makeNewWeapon = (e) => {
  e.stopImmediatePropagation();
  const isCurrentWeaponActive = ($('#weapon-status').val() === 'true');
  const newWeapon = {
    name: $('#weapon-name').val(),
    isActive: isCurrentWeaponActive,
    teamSize: $('#team-size').val() * 1,
    type: $('#weapon-use').val(),
    img: $('#weapon-image-url').val(),
  };
  weaponsData.addNewWeapon(newWeapon)
    .then(() => {
      $('#weaponsModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      showTheWeapons(e);
    })
    .catch((error) => console.error(error));
};

const showTheWeapons = (e) => {
  e.stopImmediatePropagation();
  const user = firebase.auth().currentUser;
  $('#dashboard').addClass('hide');
  weaponsData.getWeapons()
    .then((weppens) => {
      let domString = '<h1>Armory</h1>';
      if (user) {
        domString += '<button class="btn btn-outline-light" data-toggle="modal" data-target="#weaponsModal">Add Weapon</button>';
      }
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
                  <button class="btn btn-outline-danger delete-weapon" id="delete-${weppen.id}">Delete</button>
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
      utilities.printToDom('weaponsPage', domString);
      $('#weaponsPage').on('click', '.delete-weapon', deleteWeapon);
      $('#weaponsPage').on('click', '.card-img', showDeets);
      $('#weaponsModal').on('click', '#add-weapon-btn', makeNewWeapon);
    })
    .catch((error) => console.error(error));
};

const clickWeapons = () => {
  $('#weaponsLink').click(showTheWeapons);
};

export default { clickWeapons, makeNewWeapon };
