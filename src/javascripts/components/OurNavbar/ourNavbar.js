import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import auth from '../Auth/auth';

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

const buttonClick = (e) => {
  e.preventDefault();
  const page = e.target.id;
  if (page === 'logoLink') {
    $('#enemiesPage').addClass('hide');
    $('#sectors').addClass('hide');
    $('#weaponsPage').addClass('hide');
    $('#personnel').addClass('hide');
    $('#homePage').removeClass('hide');
    $('#systemModule').addClass('hide');
  } else if (page === 'personnelLink') {
    $('#enemiesPage').addClass('hide');
    $('#sectors').addClass('hide');
    $('#weaponsPage').addClass('hide');
    $('#personnel').removeClass('hide');
    $('#homePage').addClass('hide');
    $('#systemModule').addClass('hide');
  } else if (page === 'enemiesLink') {
    $('#sectors').addClass('hide');
    $('#weaponsPage').addClass('hide');
    $('#personnel').addClass('hide');
    $('#enemiesPage').removeClass('hide');
    $('#homePage').addClass('hide');
    $('#systemModule').addClass('hide');
  } else if (page === 'weaponsLink') {
    $('#enemiesPage').addClass('hide');
    $('#sectors').addClass('hide');
    $('#personnel').addClass('hide');
    $('#weaponsPage').removeClass('hide');
    $('#homePage').addClass('hide');
    $('#systemModule').addClass('hide');
  } else if (page === 'sectorsLink') {
    $('#enemiesPage').addClass('hide');
    $('#weaponsPage').addClass('hide');
    $('#personnel').addClass('hide');
    $('#sectors').removeClass('hide');
    $('#homePage').addClass('hide');
    $('#systemModule').addClass('hide');
  } else if (page === 'systemsLink') {
    $('#enemiesPage').addClass('hide');
    $('#weaponsPage').addClass('hide');
    $('#personnel').addClass('hide');
    $('#sectors').addClass('hide');
    $('#homePage').addClass('hide');
    $('#systemModule').removeClass('hide');
  }
};

$('#enemiesLink').click(buttonClick);
$('#sectorsLink').click(buttonClick);
$('#systemsLink').click(buttonClick);
$('#weaponsLink').click(buttonClick);
$('#personnelLink').click(buttonClick);
$('#logoLink').click(buttonClick);

export default { logoutEvent };
