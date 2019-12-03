import $ from 'jquery';
import firebase from 'firebase';
import './sectors.scss';
import utilities from '../../helpers/utilities';
import sectorsData from '../../helpers/data/sectorsData';

const displayAllSectors = () => {
  let domString = '<h1 class="text-center">Sectors</h1>';
  const user = firebase.auth().currentUser;
  if (user != null) {
    domString += '<div class="text-center"><button class="btn add-button" id="add-new-sector" data-toggle="modal" data-target="#exampleModal">ADD NEW SECTOR</button></div>';
  }
  domString += '<div id="sectors-section" class="d-flex flex-wrap">';
  sectorsData.getAllSectors()
    .then((sectors) => {
      sectors.forEach((sector) => {
        // eslint-disable-next-line no-use-before-define
        domString += sectorCardBuilder(sector);
      });
      domString += '</div>';
      utilities.printToDom('sectors', domString);
      // eslint-disable-next-line no-use-before-define
      $(document.body).on('click', '#add-new-sector', newSectorDetails);
      // eslint-disable-next-line no-use-before-define
      $(document.body).on('click', '.edit-sector', updateSectorValues);
      // eslint-disable-next-line no-use-before-define
      $(document.body).on('click', '.delete-sector', deleteSector);
    })
    .catch((error) => console.error(error));
};

const sectorCardBuilder = (sector) => {
  let domString = '';
  const user = firebase.auth().currentUser;
  if (user != null) {
    domString += `
    <div id="${sector.id}" class="card sectorCard card-body text-center" style=" width: 20em; max-width: 500px; height: 100%; margin: 2em;">
    <button class="btn delete-button delete-sector"  id="${sector.id}" style="margin-right:0; margin-left: auto; width: 2em; font-weight:bold;">X</button>
      <img src="${sector.sectorImg}" class="card-img-top" alt="..." style="width: 100%; height: auto;">
      <br>
      <h5 class="card-title" id="sector">${sector.name}</h5>
      <p class="card-text">${sector.info}</p>
      <p class="card-text"><small class="text-muted">${sector.size}</small></p>
      <button class="btn edit-sector" data-toggle="modal" data-target="#exampleModal" id="${sector.id}">EDIT</button>
    </div>`;
  } else {
    domString += `
    <div id="${sector.id}" class="card sectorCard card-body text-center" style=" width: 20em; max-width: 500px; height: 100%; margin: 2em;">
      <img src="${sector.sectorImg}" class="card-img-top" alt="..." style="width: 100%; height: auto;">
      <br>
      <h5 class="card-title" id="sector">${sector.name}</h5>
      <p class="card-text">${sector.info}</p>
      <p class="card-text"><small class="text-muted">${sector.size}</small></p>
    </div>`;
  }
  return domString;
};

const sectorModal = (sector) => {
  const domString = `
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addSectorDataModalTitle" >${sector.id ? 'Update Sector' : 'Add A New Sector'}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="sectorName" class="col-form-label">Sector Name:</label>
            <input type="text" class="form-control" id="sectorName" value="${sector.name ? sector.name : ''}">
          </div>
          <div class="form-group">
              <label for="sectorImage" class="col-form-label">Image URL:</label>
              <input type="text" class="form-control" id="sectorImage" value="${sector.sectorImg ? sector.sectorImg : ''}">
          </div>
          <div class="form-group">
              <label for="isAlly" class="col-form-label">Ally?:</label>
              <input type="text" class="form-control" id="isAlly" value="${sector.isAlly ? sector.isAlly : ''}">
          </div>
          <div class="form-group">
              <label for="parsecs" class="col-form-label">Parsecs:</label>
              <input type="text" class="form-control" id="parsecs" value="${sector.size ? sector.size : ''}">
          </div>
          <div class="form-group">
              <label for="info" class="col-form-label">Info:</label>
              <input type="text" class="form-control" id="info" value="${sector.info ? sector.info : ''}">
          </div>
        </form>
      </div>
      <div class="modal-footer" id="${sector.id}">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" id="close-button">Close</button>
        <button type="button" class="btn btn-primary" id="${sector.id ? 'update' : 'submit'}">Save</button>
      </div>
    </div>
  </div>
  `;
  return domString;
};

const newSectorDetails = (sector) => {
  let domString = '';
  domString += sectorModal(sector);
  utilities.printToDom('exampleModal', domString);
  // eslint-disable-next-line no-use-before-define
  $('#submit').click(addNewSector);
};

const addNewSector = (e) => {
  e.stopImmediatePropagation();
  const newData = {
    sectorImg: $('#sectorImage').val(),
    name: $('#sectorName').val(),
    isAlly: $('#isAlly').val(),
    size: $('#parsecs').val(),
    info: $('#info').val(),
  };
  sectorsData.createNewSector(newData)
    .then(() => {
      $('#exampleModal').modal('hide');
      displayAllSectors();
    })
    .catch((error) => console.error(error));
};

const editedSector = (e) => {
  e.stopImmediatePropagation();
  const editedSectorId = e.target.parentNode.id;
  const updatedSector = {
    sectorImg: $('#sectorImage').val(),
    name: $('#sectorName').val(),
    isAlly: $('#isAlly').val(),
    size: $('#parsecs').val(),
    info: $('#info').val(),
  };
  sectorsData.editSector(editedSectorId, updatedSector)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      displayAllSectors();
    })
    .catch((error) => console.error(error));
};

const updateSectorValues = (e) => {
  sectorsData.getSectorByID(e.target.id)
    .then((response) => {
      $('#exampleModal').modal('show');
      response.id = e.target.id;
      newSectorDetails(response);
      // eslint-disable-next-line no-use-before-define
      $('#update').click(editedSector);
    });
};

const deleteSector = (e) => {
  e.preventDefault();
  sectorsData.deleteSector(e.target.id)
    .then(() => {
    // eslint-disable-next-line no-use-before-define
      displayAllSectors();
    })
    .catch((error) => console.error(error));
};

$('#sectorsLink').on('click', displayAllSectors);

export default { displayAllSectors };
