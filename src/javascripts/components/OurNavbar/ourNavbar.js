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

const buttonClick = (e) => {
  e.preventDefault();
  const page = e.target.id;
  console.log(page);
  if (page === 'logoLink') {
    $('#enemiesPage').addClass('hide');
    $('#sectors').addClass('hide');
    $('#weaponsPage').addClass('hide');
    $('#personnel').addClass('hide');
    $('#homePage').removeClass('hide');
  } else if (page === 'personnelLink') {
    console.log('personnellllllll');
    $('#enemiesPage').addClass('hide');
    $('#sectors').addClass('hide');
    $('#weaponsPage').addClass('hide');
    $('#personnel').removeClass('hide');
    $('#homePage').addClass('hide');
  } else if (page === 'enemiesLink') {
    $('#sectors').addClass('hide');
    $('#weaponsPage').addClass('hide');
    $('#personnel').addClass('hide');
    $('#enemiesPage').removeClass('hide');
    $('#homePage').addClass('hide');
  } else if (page === 'weaponsLink') {
    $('#enemiesPage').addClass('hide');
    $('#sectors').addClass('hide');
    $('#personnel').addClass('hide');
    $('#weaponsPage').removeClass('hide');
    $('#homePage').addClass('hide');
  } else if (page === 'sectorsLink') {
    $('#enemiesPage').addClass('hide');
    $('#weaponsPage').addClass('hide');
    $('#personnel').addClass('hide');
    $('#sectors').removeClass('hide');
    $('#homePage').addClass('hide');
  }
};

$('#enemiesLink').click(buttonClick);
$('#sectorsLink').click(buttonClick);
$('#weaponsLink').click(buttonClick);
$('#personnelLink').click(buttonClick);
$('#logoLink').click(buttonClick);

export default { logoutEvent };
