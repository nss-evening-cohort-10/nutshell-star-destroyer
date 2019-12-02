import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import auth from '../Auth/auth';
import weapons from '../Weapons/weapons';

const loginButton = $('#auth');
const logoutButton = $('#navbar-button-logout');


const logoutEvent = () => {
  logoutButton.click((e) => {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
      }).catch((err) => console.error('You are still logged in', err));
  });
  loginButton.click((e) => {
    e.preventDefault();
    auth.signMeIn();
  });
};

const attachEvents = () => {
  weapons.displayWeapons();
};

export default { logoutEvent, attachEvents };
