import '../styles/main.scss';
import 'bootstrap';
import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys';
import authData from './helpers/data/authData';
import ourNavbar from './components/OurNavbar/ourNavbar';
import personnelDisplay from './components/Personnel/personnel';
import smash from './helpers/data/smash';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  ourNavbar.logoutEvent();
  personnelDisplay.clickCrew();
  smash.getCompleteMission('mission1').then((m) => { console.log(m); });
};

init();
