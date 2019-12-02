import '../styles/main.scss';
import 'bootstrap';
import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys';
import auth from './components/Auth/auth';
import authData from './helpers/data/authData';
import ourNavbar from './components/OurNavbar/ourNavbar';
import sectors from './components/Sectors/sectors';
import enemies from './components/Enemies/enemies';
import personnelDisplay from './components/Personnel/personnel';
import weapons from './components/Weapons/weapons';
import missionData from './helpers/data/missionData';
import mission from './components/Mission/mission';


const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  auth.loginButton();
  ourNavbar.logoutEvent();
  sectors.displayAllSectors();
  enemies.clickForEnemies();
  personnelDisplay.clickCrew();
  weapons.clickWeapons();
  missionData.getAllMissions();
  mission.missionBuilder();
};

init();
