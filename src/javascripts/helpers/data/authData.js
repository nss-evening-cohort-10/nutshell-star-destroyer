import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import personnel from '../../components/Personnel/personnel';
import weapons from '../../components/Weapons/weapons';


const authDiv = $('#auth');
const dashboardDiv = $('#dashboard');
const logoutNavbar = $('#logout-button');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // someone is logged in; we should not see auth component
      dashboardDiv.removeClass('hide');
      logoutNavbar.removeClass('hide');
      authDiv.addClass('hide');
      personnel.displayCrew();
      weapons.createWeaponCard();
    } else {
      // nobody is logged in; we should not see boards
      dashboardDiv.addClass('hide');
      logoutNavbar.addClass('hide');
      authDiv.removeClass('hide');
      personnel.displayCrew();
      weapons.createWeaponCard();
    }
  });
};

export default { checkLoginStatus };
