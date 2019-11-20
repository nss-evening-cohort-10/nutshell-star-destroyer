import $ from 'jquery';
import './sectors.scss';
import utilities from '../../helpers/utilities';
import sectorsData from '../../helpers/data/sectorsData';

const displayAllSectors = () => {
  sectorsData
    .getAllSectors()
    .then((sectors) => {
      let domString = '';
      domString += '<button type="button" class="btn btn-outline-light" id="addSectorData" data-toggle="modal" data-target="#addSectorDataModal">Add Data</button>';
      sectors.forEach((sector) => {
        domString += '<div class="card">';
        domString += '<div class="card-body">';
        domString += `<h5 class="card-title">${sector.name}</h5>
        <p class="card-text">${sector.info}</p>
        <p class="card-text"><small class="text-muted">${sector.size}</small></p>
      </div>
      <img src="${sector.sectorImg}" class="card-img-top" alt="...">
      <button type="button" class="btn btn-light" d="update">Update</button>
      <button type="button" class="btn btn-danger" id="delete">Delete</button>
          `;
      });
      domString += '</div>';
      utilities.printToDom('sectors', domString);
      // $('body').on('click', '#update', addSectorInfo);
      // $('body').on('click', '#delete', deleteSector);
    })
    .catch((error) => console.error(error));
};

const addNewSector = () => {
  const newData = {
    id: $('#sectorId').val(),
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

$('#sectorsLink').on('click', displayAllSectors);
$('#save-button').on('click', addNewSector);

export default { displayAllSectors };
