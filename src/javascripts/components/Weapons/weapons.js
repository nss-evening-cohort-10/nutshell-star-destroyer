import $ from 'jquery';
import firebase from 'firebase';
import './weapons.scss';
import weaponsData from '../../helpers/data/weaponsData';
import weaponCardBuilder from '../weaponCardBuilder/weaponCardBuilder';
import utilities from '../../helpers/utilities';

const displayWeapons = () => {
  $('#weaponsLink').on('click', () => {
    $('#weaponsPage').show();
    $('#enemiesPage').hide();
    $('#sectors').hide();
    $('#personnel').hide();
    $('#homePage').hide();
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

const addNewWeapon = (e) => {
  e.stopImmediatePropagation();
  const isCurrentWeaponActive = ($('#weapon-status').val() === 'true');
  const newWeapon = {
    name: $('#name').val(),
    isActive: isCurrentWeaponActive,
    teamSize: $('#team-size').val() * 1,
    type: $('#weapon-use').val(),
    img: $('#weapon-image-url').val(),
  };
  weaponsData.addNewWeapon(newWeapon)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      createWeaponCard();
    })
    .catch((error) => console.error(error));
};

const newWeaponInfo = (weapon) => {
  let domString = '';
  domString += weaponCardBuilder.weaponModal(weapon);
  utilities.printToDom('exampleModal', domString);
  $('#save').click(addNewWeapon);
};

const editWeaponInfo = (e) => {
  e.stopImmediatePropagation();
  const isCurrentWeaponActive = ($('#weapon-status').val() === 'true');
  const weaponid = e.target.parentNode.id;
  const updatedWeapon = {
    name: $('#name').val(),
    isActive: isCurrentWeaponActive,
    teamSize: $('#team-size').val() * 1,
    type: $('#weapon-use').val(),
    img: $('#weapon-image-url').val(),
  };
  weaponsData.updateWeapon(weaponid, updatedWeapon)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      createWeaponCard();
    })
    .catch((error) => console.error(error));
};

const updateAWeapon = (e) => {
  weaponsData.getWeaponById(e.target.id)
    .then((response) => {
      $('#exampleModal').modal('show');
      response.id = e.target.id;
      newWeaponInfo(response);
      $('#edit').click(editWeaponInfo);
    });
};

const createWeaponCard = () => {
  let domString = '<h1 class="text-center">Armory</h1>';
  const user = firebase.auth().currentUser;
  if (user != null) {
    domString += '<div class="text-center"><button class="btn add-button" id="add-new-weapon" data-toggle="modal" data-target="#exampleModal">ADD WEAPON</button></div>';
  }
  domString += '<div id="weapons-section" class="d-flex flex-wrap">';
  weaponsData.getAllWeapons()
    .then((weapons) => {
      weapons.forEach((weapon) => {
        domString += weaponCardBuilder.singleWeaponCard(weapon);
      });
      domString += '</div>';
      utilities.printToDom('weaponsPage', domString);
      // eslint-disable-next-line no-use-before-define
      $('#weaponsPage').on('click', '.delete-button', deleteWeapon);
      $('#add-new-weapon').on('click', newWeaponInfo);
      $('#weaponsPage').on('click', '.edit-button', updateAWeapon);
    })
    .catch((error) => console.error(error));
};


export default { createWeaponCard, displayWeapons };
