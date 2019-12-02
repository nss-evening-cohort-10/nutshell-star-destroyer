import $ from 'jquery';
import firebase from 'firebase';
import './sectors.scss';
import utilities from '../../helpers/utilities';
import sectorsData from '../../helpers/data/sectorsData';

const displayAllSectors = () => {
  sectorsData
    .getAllSectors()
    .then((sectors) => {
      let domString = '';
      const user = firebase.auth().currentUser;
      if (user != null) {
        domString += '<div class="text-center"><button type="button" class="btn btn-outline-light" id="add-new-sector" data-toggle="modal" data-target="#addSectorDataModal">Add Data</button></div>';
      }
      domString += '<div id="sectors-section" class="d-flex flex-wrap">';
      sectors.forEach((sector) => {
        if (user != null) {
          domString += `<div class="card card-body col-sm-6" id="${sector.id}" style=" max-width: 600px; height: 100%; margin: 2em;">`;
          domString += `<button class="btn delete-button delete-sector"  id="${sector.id}" style="margin-right:0; margin-left: auto; width: 2em; color:red; font-weight:bold;">X</button>`;
          domString += `<h5 class="card-title">${sector.name}</h5>
            <p class="card-text">${sector.info}</p>
            <p class="card-text"><small class="text-muted">${sector.size}</small></p>
            <img src="${sector.sectorImg}" class="card-img-top" alt="..." style="width: 100%; height: auto;">
            <button type="button" class="btn btn-light edit-sector" data-toggle="modal" data-target="#addSectorDataModal" id="${sector.id}">Edit</button>
        </div>
      </div>
      `;
        } else {
          domString += `<div class="card card-body col-sm-6" id="${sector.id}" style=" max-width: 600px; height: 100%; margin: 2em;">`;
          domString += `<h5 class="card-title">${sector.name}</h5>
            <p class="card-text">${sector.info}</p>
            <p class="card-text"><small class="text-muted">${sector.size}</small></p>
            <img src="${sector.sectorImg}" class="card-img-top" alt="..." style="width: 100%; height: auto;"
        </div>
      </div>
      `;
        }
      });
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

const sectorModal = (sector) => {
  const domString = `
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addSectorDataModalTitle">Add A New Sector</h5>
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
        <button type="button" class="btn btn-primary" id="${sector.id ? 'update' : 'submit'}">Save Changes</button>
      </div>
    </div>
  </div>
  `;
  return domString;
};

const newSectorDetails = (sector) => {
  let domString = '';
  domString += sectorModal(sector);
  utilities.printToDom('addSectorDataModal', domString);
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
      $('#addSectorDataModal').modal('hide');
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
      $('#addSectorDataModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      displayAllSectors();
    })
    .catch((error) => console.error(error));
};

const updateSectorValues = (e) => {
  sectorsData.getSectorByID(e.target.id)
    .then((response) => {
      $('#addSectorDataModal').modal('show');
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
