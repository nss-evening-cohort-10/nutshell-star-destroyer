import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import missionData from './missionData';
import mission from '../../components/Mission/mission';
import enemies from '../../components/Enemies/enemies';
import personnel from '../../components/Personnel/personnel';
import sectors from '../../components/Sectors/sectors';
import systems from '../../components/planetSystem/planetSystem';
import weapons from '../../components/Weapons/weapons';

const loginButton = $('#auth');
const logoutButton = $('#navbar-button-logout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // someone is logged in; we should not see auth component
      loginButton.addClass('hide');
      logoutButton.removeClass('hide');
      weapons.createWeaponCard();
      sectors.displayAllSectors();
      systems.createSystemCards();
      missionData.getAllMissions();
      mission.missionBuilder();
      enemies.enemiesBuilder();
      personnel.displayCrew();
    } else {
      // nobody is logged in; we should not see boards
      loginButton.removeClass('hide');
      logoutButton.addClass('hide');
      weapons.createWeaponCard();
      sectors.displayAllSectors();
      systems.createSystemCards();
      missionData.getAllMissions();
      mission.missionBuilder();
      enemies.enemiesBuilder();
      personnel.displayCrew();
    }
  });
};

export default { checkLoginStatus };
