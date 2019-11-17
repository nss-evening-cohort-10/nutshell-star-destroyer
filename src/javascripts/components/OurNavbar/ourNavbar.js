import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const authDiv = $('#auth');
const logoutButton = $('#logout-button');
const dashboardDiv = $('#dashboard');

const logoutEvent = () => {
  logoutButton.click((e) => {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        authDiv.removeClass('hide');
        logoutButton.addClass('hide');
        dashboardDiv.addClass('hide');
      })
      .catch((err) => console.error('You are still logged in', err));
  });
};

export default { logoutEvent };
