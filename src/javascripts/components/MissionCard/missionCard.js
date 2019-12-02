import './missionCard.scss';
import firebase from 'firebase';

const makeMissionCard = (mission) => {
  let domString = '';
  const user = firebase.auth().currentUser;
  domString += `
  <div class="card mission" id="${mission.id}">
  <div class="card-body text-center" ${mission.id}>
  <h1 class="card-title">Mission: ${mission.missionTitle}</h1>
  <img class="missionPics" src="${mission.missionImg}">
  <button id="${mission.id}" class="btn btn-danger viewMission">View Details</button>
  </div>
  <div id="missionBtns">`;
  if (user != null) {
    domString += `
        <button id="${mission.id}" class="btn btn-danger deleteMission">Delete</button>
        <button id="${mission.id}" class="btn btn-secondary editMission" type="button" data-toggle="modal" data-target="#newMissionModal">Edit</button>`;
    domString += '</div>';
  }
  return domString;
};

const missionModalBuilder = (mission) => {
  const domString = `<div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Mission Info</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
        <div class="form-group">
        <label for="missionTitle">Name</label>
        <input type="text" class="form-control" id="missionTitle" placeholder="Mission" value="${mission.missionTitle ? mission.missionTitle : ''}">
      </div>
      <div class="form-group">
      <label for="missionImg">Target Photo</label>
      <input type="text" class="form-control" id="missionImg" placeholder="Target Image" value="${mission.Img ? mission.Img : ''}">
    </div>
        </form>
      </div>
      <div class="modal-footer" id="${mission.id}">
      <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
      <button type="button" class="btn" id="${mission.id ? 'edit' : 'save'}">Save</button>
    </div>
  </div>
</div>
</div>`;
  return domString;
};
export default { makeMissionCard, missionModalBuilder };
