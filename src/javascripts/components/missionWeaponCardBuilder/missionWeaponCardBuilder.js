import './missionWeaponCardBuilder.scss';
import firebase from 'firebase';

const singleMissionWeaponCard = (weapon) => {
  let domString = '';
  const user = firebase.auth().currentUser;
  if (user != null) {
    domString += `
          <div id="${weapon.id}" class="card weaponCard card-body text-center" style=" width: 20em; max-width: 500px; height: 100%; margin: 2em; bg-#000000">
          <button class="btn delete-button delete-weapon"  id="${weapon.id}" style="margin-right:0; margin-left: auto; width: 2em; font-weight:bold;">X</button>
             <img src="${weapon.img}" class="card-img-top" style="width: 100%; height: auto;" alt="..."/>
             <br>
             <h5 class="card-title" id="weapon">${weapon.name}</h5>
              <p class="card-text">Crew of ${weapon.teamSize}</p>
              <p class="card-text">Use: ${weapon.type}</p>
          </div>`;
  } else {
    domString += `
        <div id="${weapon.id}" class="card weaponCard card-body text-center" style=" width: 20em; max-width: 500px; height: 100%; margin: 2em;">
           <img src="${weapon.img}" class="card-img-top" style="width: 100%; height: auto;" alt="..."/>
           <br>
           <h5 class="card-title" id="weapon">${weapon.name}</h5>
            <p class="card-text">Crew of ${weapon.teamSize}</p>
            <p class="card-text">Use: ${weapon.type}</p>
        </div>`;
  }
  return domString;
};

const missionWeaponModal = (weapon) => {
  const domString = `<div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Weapon</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" value="${weapon.name ? weapon.name : ''}">
          </div>
          <div class="form-group">
            <label for="weapon-status">Status</label>
            <select class="form-control" id="weapon-status">
              <option>Enter status</option>
              <option value=true>Active</option>
              <option value=false>Inactive</option>
            </select>
          </div>
          <div class="form-group">
            <label for="team-size">Crew</label>
            <input type="number" class="form-control" id="team-size" value="${weapon.teamSize ? weapon.teamSize : ''}">
          </div>
          <div class="form-group">
            <label for="weapon-use">Use</label>
            <select class="form-control" id="weapon-use">
              <option>Enter type</option>
              <option value="ship-to-ship">Ship to ship</option>
              <option value="ground-assault">Ground Assault</option>
              <option value="personal">Personal</option>
              <option value="transport">Troop-Transport</option>
            </select>
          </div>
          <div class="form-group">
            <label for="weapon-image-url">Image Url</label>
            <input type="text" class="form-control" id="weapon-image-url" value="${weapon.img ? weapon.img : ''}">
          </div>
        </form>
      </div>
      <div class="modal-footer" id="${weapon.id}">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" id="${weapon.id ? 'edit' : 'save'}"  class="btn btn-primary">Save</button>
      </div>
    </div>
  </div>`;
  return domString;
};

export default { singleMissionWeaponCard, missionWeaponModal };
