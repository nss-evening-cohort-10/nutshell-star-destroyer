import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './weapons.scss';
import utilities from '../../helpers/utilities';
import weaponsData from '../../helpers/data/weaponsData';
import weaponCardBuilder from '../weaponCardBuilder/weaponCardBuilder';


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
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      createWeaponCard();
    })
    .catch((error) => console.error(error));
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
      $('.delete-button').on('click', deleteWeapon);
      $('#weaponsModal').on('click', '#add-weapon-btn', makeNewWeapon);
    })
    .catch((error) => console.error(error));
};

const clickWeapons = () => {
  $('#weaponsLink').click(createWeaponCard);
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

export default { clickWeapons, makeNewWeapon };
