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

export default { makeEnemyCard };
