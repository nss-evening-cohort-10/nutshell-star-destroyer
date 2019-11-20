import './enemyCard.scss';
// import sectorData from '../../../helpers/data/sectorsData';

const makeEnemyCard = (enemy) => {
  let domString = '';
  if (enemy.id) {
    domString += `
    <div class="card enemyCard">
      <div class="card-header">
        <h5 class="title">${enemy.name}</h5>
      </div>
      <div class="card-body">
        <img src="${enemy.imageUrl}" class="cardImg" height="400px" width= "400px" alt="...">
        <p>Base Sector: ${enemy.baseSector}</p>
        <p>Last Known Location: ${enemy.LKL}</p>
        <p>Dead: ${enemy.isDead}</p>
        <p>Captured: ${enemy.isCaptured}</p>
      </div>
      <div class="card-footer">
        <button href="#" id="enemy-${enemy.id}" class="btn btn-danger deleteEnemy">Delete</button>
        <button href="#" id="enemy-enemy-${enemy.id}" class="btn btn-secondary editEnemy" type="button" data-toggle="modal" data-target="#newEnemyModal">Edit</button>
      </div>
    </div>
    </div>
    `;
  }
  return domString;
};

export default { makeEnemyCard };
