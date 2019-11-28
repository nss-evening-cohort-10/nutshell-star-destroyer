import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import weaponsData from '../../helpers/data/weaponsData';
import './weapons.scss';
import utilities from '../../helpers/utilities';

const displayWeapons = () => {
  $('#weapons-link').on('click', () => {

  });
};

const deleteWeapon = (e) => {
  e.preventDefault();
  const { weaponId } = e.target.id;
  weaponsData.deleteWeapon(e.target.id)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      createWeaponCard(weaponId);
    })
    .catch((err) => console.error(err));
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
      createWeaponCard(e);
    })
    .catch((error) => console.error(error));
};

const createWeaponCard = () => {
  const user = firebase.auth().currentUser;
  weaponsData.getAllWeapons()
    .then((weapons) => {
      let domString = '<h1 class="weapons-title text-#FFFFFF">Armory</h1>';
      if (user != null) {
        domString += '<button type="button" class="add-button btn ml-5"data-toggle="modal" data-target="#weaponsModal">ADD WEAPON</button>';
      }
      domString += '<div id="weapons-section" class="d-flex flex-wrap text-center offset-2">';
      weapons.forEach((weapon) => {
        if (user != null) {
          domString += `
        <div id="${weapon.id}" class="card weapon-card" style="width: 18rem;">
        <img src="${weapon.img}" class="card-img-top weapon-image" alt="${weapon.name}">
          <div class="card-body">
                <h5 class="card-title">${weapon.name}</h5>
                <p class="card-text">Crew of ${weapon.teamSize}</p>
                <p class="card-text">Use: ${weapon.type}</p>
                <button type="button" id="delete-${weapon.id}" class="btn delete-button" >DELETE</button>
                <button type="button" id="delete-${weapon.id}" class="btn edit-button" >EDIT</button>
             </div>
          </div>
        `;
        } else {
          domString += `
      <div id="${weapon.id}" class="card weapon-card" style="width: 18rem;">
      <img src="${weapon.img}" class="card-img-top weapon-image" alt="${weapon.name}">
      <div class="card-body">
      <h5 class="card-title">${weapon.name}</h5>
      <p class="card-text">Crew of ${weapon.teamSize}</p>
      <p class="card-text">Use: ${weapon.type}</p>
      </div>
      </div>
      `;
        }
      });
      domString += '</div>';
      utilities.printToDom('weaponsPage', domString);
      $('.delete-button').on('click', deleteWeapon);
      $('#weaponsModal').on('click', '#add-weapon-btn', makeNewWeapon);
    })
    .catch((error) => console.error(error));
};

const clickWeapons = () => {
  $('#weaponsLink').click(createWeaponCard);
};

export default { clickWeapons, displayWeapons, makeNewWeapon };
