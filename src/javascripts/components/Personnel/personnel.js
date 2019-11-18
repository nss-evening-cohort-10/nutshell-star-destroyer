import $ from 'jquery';
import './personnel.scss';
import personnelData from '../../helpers/data/personnelData';
import utilities from '../../helpers/utilities';


const displayCrew = () => {
  personnelData.personnelDataByPersonId('person4')
    .then((personnel) => {
      console.log(personnel);
      let domString = `
      <h1>Personnel</h1>
      `;
      personnel.forEach((person) => {
        domString += `
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Name ${person.name}</h5>
              <p class="card-text">Sector ${person.sector}</p>
              <p class="card-text">Weapon: ${person.weapon}</p>
            </div>
          </div>
        </div>
        `;
      });
      domString += '</div>';
      utilities.printToDom('printComponent', domString);
    })
    .catch((error) => console.error(error));
};

const clickCrew = () => {
  // $('#person-button').click(console.log('tacos'));
  $('#person-button').click(displayCrew);
};

export default { clickCrew };
