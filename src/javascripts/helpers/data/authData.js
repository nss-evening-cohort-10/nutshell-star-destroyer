import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import weapons from '../../components/Weapons/weapons';

const loginButton = $('#auth');
const logoutButton = $('#navbar-button-logout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // someone is logged in; we should not see auth component
      loginButton.addClass('hide');
      logoutButton.removeClass('hide');
      weapons.displayWeapons();
    } else {
      // nobody is logged in; we should not see boards
      loginButton.removeClass('hide');
      logoutButton.addClass('hide');
      weapons.displayWeapons();
    }
  });
};

export default { checkLoginStatus };
