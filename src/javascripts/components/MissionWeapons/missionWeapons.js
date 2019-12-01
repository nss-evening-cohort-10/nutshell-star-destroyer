import firebase from 'firebase';
import './missionWeapons.scss';
import missionWeaponsData from '../../helpers/data/missionWeaponsData';
import missionWeaponCardBuilder from '../missionWeaponCardBuilder/missionWeaponCardBuilder';
import utilities from '../../helpers/utilities';

const displayMissionWeapons = () => {
  // eslint-disable-next-line no-use-before-define
  $('#missionWeapons').click(createMissionWeaponCard);
};

const deleteMissionWeapon = (e) => {
  e.preventDefault();
  const { missionWeaponId } = e.target.id;
  missionWeaponsData.deleteMissionWeapon(e.target.id)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      createMissionWeaponCard(missionWeaponId);
    })
    .catch((err) => console.error(err));
};

const addNewMissionWeapon = (e) => {
  e.stopImmediatePropagation();
  const isCurrentWeaponActive = ($('#weapon-status').val() === 'true');
  const newMissionWeapon = {
    name: $('#name').val(),
    isActive: isCurrentWeaponActive,
    teamSize: $('#team-size').val() * 1,
    type: $('#weapon-use').val(),
    img: $('#weapon-image-url').val(),
  };
  missionWeaponsData.addNewMissionWeapon(newMissionWeapon)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      createMissionWeaponCard();
    })
    .catch((error) => console.error(error));
};

const newMissionWeaponInfo = (missionWeapon) => {
  let domString = '';
  domString += missionWeaponCardBuilder.missionWeaponModal(missionWeapon);
  utilities.printToDom('exampleModal', domString);
  $('#save').click(addNewMissionWeapon);
};

const createMissionWeaponCard = () => {
  let domString = '<h1 class="text-center">Mission Weapons</h1>';
  const user = firebase.auth().currentUser;
  if (user != null) {
    domString += '<div class="text-center"><button class="btn add-button" id="add-new-missionWeapon" data-toggle="modal" data-target="#exampleModal">ADD WEAPON</button></div>';
  }
  domString += '<div id="missionWeapons-section" class="d-flex flex-wrap">';
  missionWeaponsData.getMissionWeapons()
    .then((missionWeapons) => {
      missionWeapons.forEach((missionWeapon) => {
        domString += missionWeaponCardBuilder.singleMissionWeaponCard(missionWeapon);
      });
      domString += '</div>';
      utilities.printToDom('missionWeapons', domString);
      $('#missionWeaponsPage').on('click', '.delete-button', deleteMissionWeapon);
      $('#add-new-missionWeapon').on('click', newMissionWeaponInfo);
    })
    .catch((error) => console.error(error));
};

export default { displayMissionWeapons, addNewMissionWeapon };
