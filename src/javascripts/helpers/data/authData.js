import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';


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
    } else {
      // nobody is logged in; we should not see boards
      dashboardDiv.addClass('hide');
      logoutNavbar.addClass('hide');
      authDiv.removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
