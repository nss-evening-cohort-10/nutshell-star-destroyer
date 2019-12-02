import './missionCard.scss';
import firebase from 'firebase';

const makeMissionCard = (mission) => {
  let domString = '';
  const user = firebase.auth().currentUser;
  domString += `
  <div class="card mission" id="${mission.id}">
  <div class="card-body text-center" ${mission.id}>
  <h1 class="card-title">Mission:${mission.missionTitle}</h1>
  <p class="card-text">Enenmy Target: ${mission.enemyID}</p>
  <p class="card-text">System: ${mission.systemID}</p>
  </div>
  <div>`;
  if (user != null) {
    domString += `
        <button id="${mission.id}" class="btn btn-danger deleteMission">Delete</button>
        <button id="${mission.id}" class="btn btn-secondary editMission" type="button" data-toggle="modal" data-target="#newMissionModal">Edit</button>`;
    domString += '</div>';
  }
  return domString;
};

export default { makeMissionCard };
