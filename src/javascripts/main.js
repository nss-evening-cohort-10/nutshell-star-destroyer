import '../styles/main.scss';
import 'bootstrap';
import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/Auth/auth';
import authData from './helpers/data/authData';
import ourNavbar from './components/OurNavbar/ourNavbar';
import weapons from './components/Weapons/weapons';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  auth.loginButton();
  ourNavbar.logoutEvent();
  weapons.clickWeapons();
};

init();
