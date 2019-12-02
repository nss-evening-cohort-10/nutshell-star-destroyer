import '../styles/main.scss';
import 'bootstrap';
import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys';
import authData from './helpers/data/authData';
import ourNavbar from './components/OurNavbar/ourNavbar';
import enemies from './components/Enemies/enemies';
import personnelDisplay from './components/Personnel/personnel';


const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  ourNavbar.logoutEvent();
  enemies.clickForEnemies();
  personnelDisplay.clickCrew();
};

init();
