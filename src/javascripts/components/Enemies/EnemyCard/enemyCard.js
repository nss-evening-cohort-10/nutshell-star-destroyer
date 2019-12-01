import './enemyCard.scss';
import firebase from 'firebase';
// import sectorData from '../../../helpers/data/sectorsData';

const makeEnemyCard = (enemy) => {
  let domString = '';
  const user = firebase.auth().currentUser;
  domString += `
    <div class="card enemyCard" id="${enemy.id}">
      <div class="card-header">
        <h5 class="title">${enemy.name}</h5>
      </div>
      <div class="card-body">
        <img src="${enemy.imageUrl}" class="cardImg">
        <p>Base Sector: ${enemy.baseSector}</p>
        <p>Last Known Location: ${enemy.LKL}</p>
      </div>
      <div>`;
  if (user != null) {
    domString += `
        <button href="#" id="enemy-${enemy.id}" class="btn btn-danger deleteEnemy">Delete</button>
        <button href="#" id="enemy-enemy-${enemy.id}" class="btn btn-secondary editEnemy" type="button" data-toggle="modal" data-target="#newEnemyModal">Edit</button>`;
    domString += '</div>';
  }
  return domString;
};

const enemyModal = (enemy) => {
  const domString = `<div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Enemy Info</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
        <div class="form-group">
        <label for="enemyName">Name</label>
        <input type="text" class="form-control" id="enemyName" placeholder="Enter Name" value="${enemy.name ? enemy.name : ''}">
      </div>
      <div class="form-group">
      <label for="enemyImage">Photo</label>
      <input type="text" class="form-control" id="enemyImage" placeholder="Enter Image Url" value="${enemy.imageUrl ? enemy.imageUrl : ''}">
    </div>
          <div class="form-group">
          <label for="enemySector">Base Sector</label>
          <input type="text" class="form-control" id="enemySector" placeholder="Enter Enemy Base Sector" value="${enemy.baseSector ? enemy.baseSector : ''}">
        </div>
          <div class="form-group">
          <label for="enemyLKL">Last Known Location</label>
          <input type="text" class="form-control" id="enemyLKL" placeholder="Enter Enemy's LKL" value="${enemy.LKL ? enemy.LKL : ''}">
          </div>
        </form>
      </div>
      <div class="modal-footer" id="${enemy.id}">
      <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
      <button type="button" class="btn" id="${enemy.id ? 'edit' : 'save'}">Save</button>
    </div>
  </div>
</div>
</div>`;
  return domString;
};

export default { makeEnemyCard, enemyModal };
