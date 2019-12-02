// import $ from 'jquery';
import firebase from 'firebase';
import missionData from '../../helpers/data/missionData';
import missionCard from '../MissionCard/missionCard';
import utilities from '../../helpers/utilities';

const missionBuilder = () => {
  missionData.getAllMissions()
    .then((missions) => {
      let domString = '<h1 class="title"> Missions </h1>';
      const user = firebase.auth().currentUser;
      if (user != null) {
        domString += '<button id="addNewMission" type="button" class="btn" data-toggle="modal" data-target="#newEnemyModal">Add New Mission</button>';
      }
      domString += '<div id="all-missions" class="d-flex">';
      missions.forEach((mission) => {
        domString += missionCard.makeMissionCard(mission);
      });
      domString += '</div>';
      utilities.printToDom('missions', domString);
    })
    .catch((error) => console.error(error));
};

export default { missionBuilder };
