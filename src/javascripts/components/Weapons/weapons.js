import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

import weaponsData from '../../helpers/data/weaponsData';

import './weapons.scss';
import utilities from '../../helpers/utilities';

const showTheWeapons = (user) => {
  weaponsData.getweapons(user.uid)
    .then((weppens) => {
      let domString = '<h1>weapons</h1>';
      domString += '<div class="row">';
      weppens.forEach((weppen) => {
        domString += `
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${weppen.name}</h5>
              <p class="card-text">${weppen.description}</p>
              <form class="form-inline justify-content-between">
                <a href="#" class="btn btn-primary show-weapon" id="${weppen.id}">Show weapon</a>
                <a href="#" class="btn btn-danger delete-weapon" id="delete-${weppen.id}">Delete weapon</a>
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

export default { showTheWeapons };
