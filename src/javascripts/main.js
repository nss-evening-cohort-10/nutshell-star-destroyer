import '../styles/main.scss';
import 'bootstrap';
import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/Auth/auth';
import authData from './helpers/data/authData';
import ourNavbar from './components/OurNavbar/ourNavbar';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  auth.loginButton();
  ourNavbar.logoutEvent();
};

init();
