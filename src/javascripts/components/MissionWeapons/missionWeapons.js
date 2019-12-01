import firebase from 'firebase';
import './missionWeapons.scss';
import missionWeaponsData from '../../helpers/data/missionWeaponsData';
import missionWeaponCardBuilder from '../missionWeaponCardBuilder/missionWeaponCardBuilder';
import utilities from '../../helpers/utilities';

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
    })
    .catch((error) => console.error(error));
};
createMissionWeaponCard();
