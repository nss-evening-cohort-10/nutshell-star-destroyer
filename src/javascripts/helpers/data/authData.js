import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import missionData from './missionData';
import mission from '../../components/Mission/mission';
import enemies from '../../components/Enemies/enemies';


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
      missionData.getAllMissions();
      mission.missionBuilder();
      enemies.clickForEnemies();
    } else {
      // nobody is logged in; we should not see boards
      dashboardDiv.addClass('hide');
      logoutNavbar.addClass('hide');
      authDiv.removeClass('hide');
      missionData.getAllMissions();
      mission.missionBuilder();
      enemies.clickForEnemies();
    }
  });
};

export default { checkLoginStatus };
