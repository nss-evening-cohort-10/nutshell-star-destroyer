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
    $('#enemiesPage').style.display = 'none';
    $('#sectors').style.display = 'none';
    $('#weaponsPage').style.display = 'none';
    $('#personnel').style.display = 'none';
  } else if (page === 'personnelLink') {
    $('#enemiesPage').style.display = '';
    $('#sectors').style.display = 'none';
    $('#weaponsPage').style.display = 'none';
  } else if (page === 'enemiesLinks') {
    $('#sectors').style.display = 'none';
    $('#weaponsPage').style.display = 'none';
    $('#personnel').style.display = 'none';
  } else if (page === 'weaponsLink') {
    $('#enemiesPage').style.display = '';
    $('#sectors').style.display = 'none';
    $('#personnel').style.display = 'none';
  } else if (page === 'sectorsLink') {
    $('#enemiesPage').style.display = '';
    $('#weaponsPage').style.display = 'none';
    $('#personnel').style.display = 'none';
  }
};

$('#enemiesPage').click(buttonClick);
$('#sectors').click(buttonClick);
$('#weaponsPage').click(buttonClick);
$('#personnel').click(buttonClick);

export default { logoutEvent };
