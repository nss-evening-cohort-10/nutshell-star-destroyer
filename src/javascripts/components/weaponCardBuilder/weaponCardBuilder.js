import './weaponCardBuilder.scss';
import firebase from 'firebase';

const singleWeaponCard = (weapon) => {
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
              <button class="btn edit-button" id="${weapon.id}" >EDIT</button>
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

const weaponModal = () => {
  const domString = `<div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="weaponsModalLabel">New Weapon</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="weapon-name">Name</label>
            <input type="text" class="form-control" id="weapon-name" placeholder="Enter Name">
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
            <input type="number" class="form-control" id="team-size" placeholder="Enter Crew Size">
          </div>
          <div class="form-group">
            <label for="weapon-use">Use</label>
            <select class="form-control" id="weapon-use">
              <option>Enter type</option>
              <option value="ship-to-ship">Ship to ship</option>
              <option value="ground-assault">Ground Assault</option>
              <option value="personal">Personal</option>
            </select>
          </div>
          <div class="form-group">
            <label for="weapon-image-url">Image Url</label>
            <input type="text" class="form-control" id="weapon-image-url" placeholder="Enter image Url">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="add-weapon-btn">Save changes</button>
      </div>
    </div>
  </div>`;
  return domString;
};

export default { singleWeaponCard, weaponModal };
