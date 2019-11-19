import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

import weaponsData from '../../helpers/data/weaponsData';

import './weapons.scss';
import utilities from '../../helpers/utilities';

const showDeets = (e) => {
  e.preventDefault();
  const clickedWeapon = e.target.id;
  $('.deets').addClass('hide');
  $('.full-img').removeClass('hide');
  $(`#${clickedWeapon}-deets`).removeClass('hide');
  $(`#${clickedWeapon}-full-img`).addClass('hide');
};

const makeNewWeapon = (e) => {
  e.stopImmediatePropagation();
  const newWeapon = {
    name: $('#weapon-name').val(),
    isActive: $('#weapon-status').val(),
    teamSize: $('#team-size').val() * 1,
    type: $('weapon-use').val(),
    img: $('#weapon-image-url').val(),
  };
  weaponsData.addNewWeapon(newWeapon)
    .then(() => {
      $('#weaponsModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      showTheWeapons(e);
    })
    .catch((error) => console.error(error));
};

const showTheWeapons = (e) => {
  e.stopImmediatePropagation();
  const user = firebase.auth().currentUser;
  $('#dashboard').addClass('hide');
  weaponsData.getWeapons()
    .then((weppens) => {
      let domString = '<h1>Armory</h1>';
      if (user) {
        domString += '<button class="btn btn-outline-light" data-toggle="modal" data-target="#weaponsModal">Add Weapon</button>';
      }
      domString += '<div class="row"><div class="card-group">';
      weppens.forEach((weppen) => {
        domString += `
        <div class="col-sm-6">
          <div class="card mb-3" id="${weppen.id}-card">
            <div id="${weppen.id}-deets" class="row no-gutters deets hide">
              <div class="col-md-6">
                <img id="${weppen.id}" src="${weppen.img}" class="card-img" alt="${weppen.name}">
              </div>
              <div class="col-md-6">
                <div class="card-body">
                  <h5 class="card-title">${weppen.name}</h5>
                  <p class="card-text">${weppen.isActive ? 'Active' : 'Inactive'}</p>
                  <p class="card-text">Crew of ${weppen.teamSize}</p>
                  <p class="card-text">Use: ${weppen.type}</p>
                </div>
              </div>
            </div>
            <div id="${weppen.id}-full-img" class="card-body full-img">
            <img id="${weppen.id}" src="${weppen.img}" class="card-img" alt="${weppen.name}">
            </div>
          </div>
        </div>
        `;
      });
      domString += '</div></div>';
      domString += `
      <div class="modal fade" id="weaponsModal" tabindex="-1" role="dialog" aria-labelledby="weaponsModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="weaponsModalLabel">New Weapon</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="weapon-name">Name</label>
                  <input type="text" class="form-control" id="weapon-name" placeholder="Enter Name">
                </div>
                <div class="form-group">
                  <label for="weapon-status">Status</label>
                  <input type="number" class="form-control" id="weapon-status" placeholder="Enter Status">
                </div>
                <div class="form-group">
                  <label for="team-size">Crew</label>
                  <input type="number" class="form-control" id="team-size" placeholder="Enter Crew Size">
                </div>
                <div class="form-group">
                  <label for="weapon-use">Use</label>
                  <input type="number" class="form-control" id="weapon-use" placeholder="Enter Status">
                </div>
                <div class="form-group">
                  <label for="weapon-image-url">Image Url</label>
                  <input type="text" class="form-control" id="weapon-image-url" placeholder="Enter image Url">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="add-weapon-btn">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      `;
      utilities.printToDom('weaponsPage', domString);
      $('#weaponsPage').on('click', '.card-img', showDeets);
      $('#weaponsPage').on('click', '#add-weapon-btn', makeNewWeapon);
    })
    .catch((error) => console.error(error));
};

const clickWeapons = () => {
  $('#weaponsLink').click(showTheWeapons);
};

export default { clickWeapons, makeNewWeapon };
