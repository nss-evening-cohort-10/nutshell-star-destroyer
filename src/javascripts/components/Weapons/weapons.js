import $ from 'jquery';
// import firebase from 'firebase/app';
// import 'firebase/auth';

import weaponsData from '../../helpers/data/weaponsData';

import './weapons.scss';
import utilities from '../../helpers/utilities';

const showTheWeapons = (e) => {
  e.preventDefault();
  weaponsData.getWeapons()
    .then((weppens) => {
      let domString = '<h1>Weapons</h1>';
      domString += '<div class="row">';
      weppens.forEach((weppen) => {
        domString += `
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${weppen.name}</h5>
              <p class="card-text">${weppen.isActive ? 'Active' : 'Inactive'}</p>
              <p class="card-text">Crew of ${weppen.teamSize}</p>
              <p class="card-text">Type: ${weppen.type}</p>
              <form class="form-inline justify-content-between">
                <a href="#" class="btn btn-outline-light show-weapon" id="${weppen.id}">Show weapon</a>
                <a href="#" class="btn btn-outline-danger delete-weapon" id="delete-${weppen.id}">Delete weapon</a>
              </form>
            </div>
          </div>
        </div>
        `;
      });
      domString += '</div>';
      utilities.printToDom('weapons', domString);
    })
    .catch((error) => console.error(error));
};

const clickWeapons = () => {
  $('#weapons-button').click(showTheWeapons);
};

export default { clickWeapons };
