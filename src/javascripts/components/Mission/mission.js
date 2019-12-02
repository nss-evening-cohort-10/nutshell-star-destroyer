import $ from 'jquery';
import firebase from 'firebase';
import missionData from '../../helpers/data/missionData';
import missionCard from '../MissionCard/missionCard';
import utilities from '../../helpers/utilities';

const deleteAMission = (e) => {
  e.preventDefault();
  const { missionId } = e.target.id;
  missionData.deleteMission(e.target.id)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      missionBuilder(missionId);
    });
};

const addNewMission = (e) => {
  e.stopImmediatePropagation();
  const newMission = {
    missionTitle: $('#missionTitle').val(),
    missionImg: $('#missionImg').val(),
  };
  missionData.makeMission(newMission)
    .then(() => {
      $('#newEnemyModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      missionBuilder();
    });
};

const missionModal = (mission) => {
  let domString = '';
  domString += missionCard.missionModalBuilder(mission);
  utilities.printToDom('newEnemyModal', domString);
  $('#save').click(addNewMission);
};

const missionBuilder = () => {
  missionData.getAllMissions()
    .then((missions) => {
      let domString = '<div class="title text-center">';
      domString += '<h1> Missions </h1>';
      const user = firebase.auth().currentUser;
      if (user != null) {
        domString += '<button id="addNewMission" type="button" class="btn btn-danger" data-toggle="modal" data-target="#newEnemyModal">Add New Mission</button>';
        domString += '</div>';
      }
      domString += '<div id="all-missions">';
      missions.forEach((mission) => {
        domString += missionCard.makeMissionCard(mission);
      });
      domString += '</div>';
      utilities.printToDom('missions', domString);
      $('#missions').on('click', '.deleteMission', deleteAMission);
      $('#addNewMission').click(missionModal);
    })
    .catch((error) => console.error(error));
};

export default { missionBuilder };
