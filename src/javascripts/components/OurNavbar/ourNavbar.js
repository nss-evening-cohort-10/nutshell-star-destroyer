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
  if (page === 'logoLink') {
    $('#enemiesPage').addClass('hide');
    $('#sectors').addClass('hide');
    $('#weaponsPage').addClass('hide');
    $('#personnel').addClass('hide');
    $('#homePage').removeClass('hide');
    $('missions').addClass('hide');
  } else if (page === 'personnelLink') {
    $('#enemiesPage').addClass('hide');
    $('#sectors').addClass('hide');
    $('#weaponsPage').addClass('hide');
    $('#personnel').removeClass('hide');
    $('#homePage').addClass('hide');
    $('missions').addClass('hide');
  } else if (page === 'enemiesLink') {
    $('#sectors').addClass('hide');
    $('#weaponsPage').addClass('hide');
    $('#personnel').addClass('hide');
    $('#enemiesPage').removeClass('hide');
    $('#homePage').addClass('hide');
    $('missions').addClass('hide');
  } else if (page === 'weaponsLink') {
    $('#enemiesPage').addClass('hide');
    $('#sectors').addClass('hide');
    $('#personnel').addClass('hide');
    $('#weaponsPage').removeClass('hide');
    $('#homePage').addClass('hide');
    $('missions').addClass('hide');
  } else if (page === 'sectorsLink') {
    $('#enemiesPage').addClass('hide');
    $('#weaponsPage').addClass('hide');
    $('#personnel').addClass('hide');
    $('#sectors').removeClass('hide');
    $('#homePage').addClass('hide');
    $('missions').addClass('hide');
  } else if (page === 'missionsLink') {
    $('#enemiesPage').addClass('hide');
    $('#weaponsPage').addClass('hide');
    $('#personnel').addClass('hide');
    $('#sectors').addClass('hide');
    $('#homePage').addClass('hide');
    $('missions').removeClass('hide');
  }
};

$('#missionsLink').click(buttonClick);
$('#enemiesLink').click(buttonClick);
$('#sectorsLink').click(buttonClick);
$('#weaponsLink').click(buttonClick);
$('#personnelLink').click(buttonClick);
$('#logoLink').click(buttonClick);

export default { logoutEvent };
