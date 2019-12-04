import './missionCard.scss';
import firebase from 'firebase';

const makeMissionCard = (mission) => {
  let domString = '';
  const user = firebase.auth().currentUser;
  if (user != null) {
    domString += `
    <div class="card card-body text-center mission" id="${mission.id}" style=" width: 20em; max-width: 500px; height: 100%; margin: 2em;">
      <button id="${mission.id}" class="btn delete-button deleteMission" style="margin-right:0; margin-left: auto; width: 2em; font-weight:bold;">X</button>
      <img class="missionPics" src="${mission.missionImg}" style="width: 100%; height: auto;" alt="...">
      <br>
      <h5 class="card-title">Mission: ${mission.missionTitle}</>
      <button id="${mission.id}" class="btn add-button viewMission">View Details</button>
      <br>
      <button id="${mission.id}" class="btn editMission" data-toggle="modal" data-target="#newMissionModal" style="width: 90%;">EDIT</button>
    </div>`;
  } else {
    domString += `
    <div class="card card-body text-center mission" id="${mission.id}" style=" width: 20em; max-width: 500px; height: 100%; margin: 2em;">
      <img class="missionPics" src="${mission.missionImg}" style="width: 100%; height: auto;" alt="...">
      <br>
      <h5 class="card-title">Mission: ${mission.missionTitle}</h5>
      <button id="${mission.id}" class="btn add-button viewMission">View Details</button>
    </div>`;
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
        <label for="missionTitle">Mission Name</label>
        <input type="text" class="form-control" id="missionTitle" placeholder="Mission" value="${mission.missionTitle ? mission.missionTitle : ''}">
      </div>
      <div class="form-group">
      <label for="missionImg">Target Photo</label>
      <input type="text" class="form-control" id="missionImg" placeholder="Target Image" value="${mission.missionImg ? mission.missionImg : ''}">
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
