import $ from 'jquery';
import './sectors.scss';
import utilities from '../../helpers/utilities';
import sectorsData from '../../helpers/data/sectorsData';

const displaySectors = (e) => {
  e.preventDefault();
  sectorsData
    .sectorsDataBySectorId()
    .then((sectors) => {
      let domString = '';
      domString += `<div class="card mb-3" style="max-width: 540px;">
        <div class="row no-gutters">
        <div class="col-md-4">`;
      sectors.forEach((sector) => {
        domString += `<img src="${sector.Img}" class="card-img" alt="...">
        </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${sector.name}</h5>
              <p class="card-text">${sector.info}</p>
              <p class="card-text"><small class="text-muted">${sector.size}</small></p>
              <button type="button" class="btn btn-light" d="update">Update</button>
              <button type="button" class="btn btn-danger" id="delete">Delete</button>
            </div>
          </div>
        </div>
          `;
      });
      domString += '</div>';
      utilities.printToDom('#sectors', domString);
      // $('body').on('click', '#update', addSectorInfo);
      // $('body').on('click', '#delete', deleteSector);
    })
    .catch((error) => console.error(error));
};

$('.body').on('click', displaySectors);

export default { displaySectors };
