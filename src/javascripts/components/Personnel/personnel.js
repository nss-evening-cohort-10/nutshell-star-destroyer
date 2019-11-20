import $ from 'jquery';
import './personnel.scss';
import personnelData from '../../helpers/data/personnelData';
import utilities from '../../helpers/utilities';

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
  // $('#personnel').on('click', '.delete', deletePersonnel);
};

const displayCrew = (e) => {
  e.preventDefault();
  personnelData.getPersonnelData()
    .then((personnel) => {
      let domString = '<h1>Personnel</h1>';
      domString += '<button id="add-personnel" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Add New Personnel</button>';
      domString += `<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id="add-new-personnel">Save changes</button>
          </div>
        </div>
        </div>
        </div>`;
      domString += '<div class="row">';
      personnel.forEach((person) => {
        domString += `
        <div class="col-md-6">
          <div class="card">
          <img src="${person.personImg}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title"> ${person.name}</h5>
              <p class="card-text">Sector: ${person.sectorId}</p>
              <p class="card-text">Weapon: ${person.weaponId}</p>
              <button id="edit-personnel-${person.id}" class="btn btn-primary edit">Edit</button>
              <button id="delete-personnel-${person.id}" class="btn btn-primary delete">Delete</button>
              </div>
              </div>
        </div>
        `;
      });
      domString += '</div>';
      utilities.printToDom('personnel', domString);
      clickAddNew();
      personnelEventListeners();
    })
    .catch((error) => console.error(error));
};

const updatePersonnel = (e) => {
  $('#exampleModalCenter').modal('show');
  const personId = e.target.id.split('edit-personnel-')[1];
  console.log(personId);
  personnelData.getPersonnelById(personId)
  // eslint-disable-next-line no-use-before-define
  // ??????????????????????????????????
    .then((person) => {
      displayCrew();
    })
    .catch((error) => console.error(error));
};

const clickCrew = () => {
  $('#personnelLink').click(displayCrew);
};

export default { clickCrew };
