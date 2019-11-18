import $ from 'jquery';
import './personnel.scss';
import personnelData from '../../helpers/data/personnelData';
import utilities from '../../helpers/utilities';


const displayCrew = (e) => {
  e.preventDefault();
  personnelData.getPersonnelData()
    .then((personnel) => {
      console.log(personnel);
      let domString = '<h1>Personnel</h1>';
      domString += '<button id="add-personnel">Add New Personnel</button>';
      domString += '<div class="row">';
      personnel.forEach((person) => {
        domString += `
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Name: ${person.name}</h5>
              <p class="card-text">Sector: ${person.sectorId}</p>
              <p class="card-text">Weapon: ${person.weaponId}</p>
            </div>
          </div>
        </div>
        `;
      });
      domString += '</div>';
      console.log(domString);
      utilities.printToDom('#personnel', domString);
    })
    .catch((error) => console.error(error));
};

const addNewPersonnel = () => {
  e.preventDefault();
  personnelData.CreateNewPersonnel()
};


const clickCrew = () => {
  // $('#person-button').click(console.log('tacos'));
  $('#person-button').click(displayCrew);
};

export default { clickCrew };
