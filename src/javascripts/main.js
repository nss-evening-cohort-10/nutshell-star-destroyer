import '../styles/main.scss';
import 'bootstrap';
import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys';
import authData from './helpers/data/authData';
import ourNavbar from './components/OurNavbar/ourNavbar';


const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  ourNavbar.logoutEvent();
};

init();
