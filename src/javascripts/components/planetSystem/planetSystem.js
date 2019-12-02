// import $ from 'jquery';
import firebase from 'firebase';
import utilities from '../../helpers/utilities';
import systemData from '../../helpers/data/planetSystemData';

const singleSystemCard = (system) => {
  let domString = '';
  const user = firebase.auth().currentUser;
  if (user != null) {
    domString += `
          <div id="${system.id}" class="card systemCard card-body text-center" style=" width: 20em; max-width: 500px; height: 100%; margin: 2em;">
             <button class="btn delete-button delete-food"  id="${system.id}" style="margin-right:0; margin-left: auto; width: 2em; color:#1c69b1; font-weight:bold;">X</button>
             <img src="${system.planetaryImg}" class="card-img-top" style="width: 100%; height: auto;" alt="..."/>
             <br>
             <h5 class="card-title" id="food">${system.name}</h5>
              <p>Size: ${system.size}</p>
              <p>Ally?: ${system.isAlly}</p>
              <p>${system.info}</p>
              <button type="button" class="btn edit-food" data-toggle="modal" data- 
               target="#exampleModal" id="${system.id}" style="background-color: #1c69b1; color: white;">
                  Edit
               </button>
          </div>`;
  } else {
    domString += `
        <div id="${system.id}" class="card foodCard card-body text-center" style=" width: 20em; max-width: 500px; height: 100%; margin: 2em;">
           <img src="${system.planetaryImg}" class="card-img-top" style="width: 100%; height: auto;" alt="..."/>
           <br>
           <h5 class="card-title" id="food">${system.name}</h5>
           <p>Size: ${system.size}</p>
           <p>Ally?: ${system.isAlly}</p>
           <p>${system.info}</p>
        </div>`;
  }
  return domString;
};

const createSystemCards = () => {
  let domString = '<h1 class="text-center">Planetary Systems</h1>';
  const user = firebase.auth().currentUser;
  if (user != null) {
    // eslint-disable-next-line max-len
    domString += '<div class="text-center"><button type="button" id="add-new-food" class="btn btn-success" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" style="margin-left: 10px; color: white;">Add New Planetary System</button></div>';
  }
  domString += '<div id="systemDivs" class="d-flex flex-wrap">';
  systemData.getSystems()
    .then((systems) => {
      systems.forEach((system) => {
        domString += singleSystemCard(system);
      });
      domString += '</div>';
      utilities.printToDom('systemModule', domString);
    })
    .catch((error) => console.error(error));
};

export default { createSystemCards };
