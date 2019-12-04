import $ from 'jquery';
import firebase from 'firebase';
import './personnel.scss';
import utilities from '../../helpers/utilities';
import personnelData from '../../helpers/data/personnelData';

const displayCrew = () => {
  let domString = '<h1>Personnel</h1>';
  const user = firebase.auth().currentUser;
  if (user !== null) {
    domString += '<div class="text-center"><button id="add-new-personnel" class="btn add-button" data-toggle="modal" data-target="#exampleModal">ADD NEW PERSONNEL</button></div>';
  }
  personnelData.getPersonnelData()
    .then((personnel) => {
      domString += '<div class="container">';
      domString += '<div class="row">';
      personnel.forEach((person) => {
        // eslint-disable-next-line no-use-before-define
        domString += personnelCardBuilder(person);
      });
      domString += '</div></div>';
      utilities.printToDom('personnel', domString);
      // eslint-disable-next-line no-use-before-define
      $(document.body).on('click', '#add-new-personnel', newPersonnelDetails);
      // eslint-disable-next-line no-use-before-define
      $(document.body).on('click', '.edit-personnel', updatePersonnelValues);
      // eslint-disable-next-line no-use-before-define
      $('#personnel').on('click', '.delete-personnel', deletePersonOnClick);
    })
    .catch((error) => console.error(error));
};

const personnelCardBuilder = (person) => {
  let domString = '';
  const user = firebase.auth().currentUser;
  if (user !== null) {
    domString += `
      <div class="card card-body personnel-card text-center" style=" width: 20em; max-width: 500px; height: 100%; margin: 2em;">
        <button id="${person.id}" data-boardID="${person.id}" class="btn delete-button delete-personnel" style="margin-right:0; margin-left: auto; width: 2em; font-weight:bold;">X</button>
        <img src="${person.personImg}" class="card-img-top personImage" style="width: 100%; height: auto;" alt="...">
        <br>
        <h5 class="card-title"> ${person.name}</h5>
          <p class="card-text">Sector: ${person.sectorId}</p>
          <p class="card-text">Weapon: ${person.weaponId}</p>
          <button id="${person.id}" class="btn edit-personnel">EDIT</button>
      </div>
    `;
  } else {
    domString += `
      <div class="card card-body personnel-card text-center" style=" width: 20em; max-width: 500px; height: 100%; margin: 2em;">
        <img src="${person.personImg}" class="card-img-top personImage" style="width: 100%; height: auto;" alt="...">
        <br>
        <h5 class="card-title"> ${person.name}</h5>
          <p class="card-text">Sector: ${person.sectorId}</p>
          <p class="card-text">Weapon: ${person.weaponId}</p>
      </div>
    `;
  }
  return domString;
};

const createPersonModal = (personnel) => {
  const domString = `
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">${personnel.id ? 'Update Personnel' : 'Add New Personnel'}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
          </div>
          <div class="modal-body">
            <form id="Add New Personnel">
            <div class="form-group">
              <label for="name-id">Name</label>
              <input type="text" class="form-control" id="name-id" value="${personnel.name ? personnel.name : ''}" placeholder="Enter Name">
            </div>
            <div class="form-group">
              <label for="sector-id">Sector</label>
              <input type="text" class="form-control" id="sector-id" value="${personnel.sectorId ? personnel.sectorId : ''}" placeholder="Enter Sector">
            </div>
            <div class="form-group">
              <label for="weapon-id">Weapon</label>
              <input type="text" class="form-control" id="weapon-id" value="${personnel.weaponId ? personnel.weaponId : ''}" placeholder="Enter Weapon">
            </div>
            <div class="form-group">
              <label for="image-url">Image Url</label>
              <input type="text" class="form-control" id="image-url" value="${personnel.personImg ? personnel.personImg : ''}" placeholder="Enter Image">
            </div>
            </form>
            </div>
            <div class="modal-footer" id="${personnel.id}">
          <button type="button" class="btn btn-dark" data-dismiss="modal" id="close-button">Close</button>
          <button type="button" class="btn btn-dark" id="${personnel.id ? 'update' : 'submit'}">Save</button>
        </div>
      </div>
    </div>
  </div>
  `;
  return domString;
};

const newPersonnelDetails = (personnel) => {
  let domString = '';
  domString += createPersonModal(personnel);
  utilities.printToDom('exampleModal', domString);
  // eslint-disable-next-line no-use-before-define
  $('#submit').click(addNewPersonnel);
};

const addNewPersonnel = (e) => {
  e.stopImmediatePropagation();
  const newPersonnel = {
    personImg: $('#image-url').val(),
    name: $('#name-id').val(),
    sectorId: $('#sector-id').val(),
    weaponId: $('#weapon-id').val(),
  };
  personnelData.CreateNewPersonnel(newPersonnel)
    .then(() => {
      $('#exampleModal').modal('hide');
      displayCrew();
    })
    .catch((error) => console.error(error));
};

const editedPersonnel = (e) => {
  e.stopImmediatePropagation();
  const personId = e.target.parentNode.id;
  const updatedPersonnel = {
    personImg: $('#image-url').val(),
    name: $('#name-id').val(),
    sectorId: $('#sector-id').val(),
    weaponId: $('#weapon-id').val(),
  };
  personnelData.editPersonnel(personId, updatedPersonnel)
    .then(() => {
      $('#exampleModal').modal('hide');
      displayCrew();
    })
    .catch((error) => console.error(error));
};

const updatePersonnelValues = (e) => {
  personnelData.getPersonnelById(e.target.id)
    .then((response) => {
      $('#exampleModal').modal('show');
      response.id = e.target.id;
      newPersonnelDetails(response);
      $('#update').click(editedPersonnel);
    });
};

const deletePersonOnClick = (e) => {
  e.preventDefault();
  const { personId } = e.target.id;
  personnelData.deletePersonData(e.target.id)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      displayCrew(personId);
    })
    .catch((error) => console.error(error));
};

const clickCrew = () => {
  $('#personnelLink').click(displayCrew);
};

export default { clickCrew, displayCrew };
