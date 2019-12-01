import firebase from 'firebase';
import $ from 'jquery';
import './personnel.scss';

import personnelData from '../../helpers/data/personnelData';
import utilities from '../../helpers/utilities';

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

const addNewPersonnel = () => {
  const newPersonnel = {
    personImg: $('#image-url').val(),
    name: $('#name-id').val(),
    sectorId: $('#sector-id').val(),
    weaponId: $('#weapon-id').val(),
  };
  personnelData.CreateNewPersonnel(newPersonnel)
    .then(() => {
      $('#exampleModalCenter').modal('hide');
      // eslint-disable-next-line no-use-before-define
      displayCrew();
    })
    .catch((error) => console.error(error));
};

const clickAddNew = () => {
  $('#add-new-personnel').click(addNewPersonnel);
};

const personnelEventListeners = () => {
  // eslint-disable-next-line no-use-before-define
  $('#personnel').on('click', '.edit', updatePersonnel);
  $('#personnel').on('click', '.delete-personnel', deletePersonOnClick);
};

const displayCrew = () => {
  const user = firebase.auth().currentUser;
  personnelData.getPersonnelData()
    .then((personnel) => {
      let domString = '<h1>Personnel</h1>';
      if (user !== null) {
        domString += '<button id="add-personnel" class="btn btn-dark" data-toggle="modal" data-target="#exampleModalCenter">Add New Personnel</button>';
      }
      domString += `
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">Add New Personnel</h5>
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
          <input type="text" class="form-control" id="sector-id" placeholder="Enter Sector">
          </div>
        <div class="form-group">
          <label for="weapon-id">Weapon</label>
          <input type="text" class="form-control" id="weapon-id" placeholder="Enter Weapon">
        </div>
        <div class="form-group">
        <label for="image-url">Image</label>
          <input type="text" class="form-control" id="image-url" placeholder="Enter Image">
        </div>
        </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-dark" id="add-new-personnel">Save changes</button>
        </div>
      </div>
      </div>
      </div>`;
      domString += '<div class="container">';
      domString += '<div class="row">';
      personnel.forEach((person) => {
        if (user !== null) {
          domString += `
          <div class="col-md-6">
            <div class="card personnel-card">
              <img src="${person.personImg}" class="card-img-top personImage" alt="...">
              <div class="card-body">
                <h5 class="card-title"> ${person.name}</h5>
                <p class="card-text">Sector: ${person.sectorId}</p>
                <p class="card-text">Weapon: ${person.weaponId}</p>
                <button id="edit-personnel-${person.id}" class="btn btn-dark edit">Edit</button>
                <button id="${person.id}" data-boardID="${person.id}" class="btn btn-dark delete-personnel">Delete</button>
              </div>
            </div>
          </div>
          `;
        } else {
          domString += `
          <div class="col-md-6">
            <div class="card personnel-card">
              <img src="${person.personImg}" class="card-img-top personImage" alt="...">
              <div class="card-body">
                <h5 class="card-title"> ${person.name}</h5>
                <p class="card-text">Sector: ${person.sectorId}</p>
                <p class="card-text">Weapon: ${person.weaponId}</p>
              </div>
            </div>
          </div>
          `;
        }
      });
      domString += '</div></div>';
      utilities.printToDom('personnel', domString);
      clickAddNew();
      personnelEventListeners();
    })
    .catch((error) => console.error(error));
};

const updatePersonnel = (e) => {
  $('#exampleModalCenter').modal('show');
  const personId = e.target.id.split('edit-personnel-')[1];
  personnelData.getPersonnelById(personId)
  // eslint-disable-next-line no-use-before-define
  // ??????????????????????????????????
    .then(() => {
      // displayCrew();
    })
    .catch((error) => console.error(error));
};

const clickCrew = () => {
  $('#personnelLink').click(displayCrew);
};

export default { clickCrew, displayCrew };
