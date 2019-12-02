import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import sectors from '../../components/Sectors/sectors';
import systems from '../../components/planetSystem/planetSystem';


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
      sectors.displayAllSectors();
      systems.createSystemCards();
    } else {
      // nobody is logged in; we should not see boards
      dashboardDiv.addClass('hide');
      logoutNavbar.addClass('hide');
      authDiv.removeClass('hide');
      sectors.displayAllSectors();
      systems.createSystemCards();
    }
  });
};

export default { checkLoginStatus };
