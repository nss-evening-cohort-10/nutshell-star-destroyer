import './enemyCard.scss';

const makeEnemyCard = (enemy) => {
  let domString = '';
  if (enemy.id) {
    domString += `
    <div class="card enemyCard">
    <h5 class="title">${enemy.name}</h5>
    <img src="${enemy.imageUrl}" class="cardImg" height="400px" width= "400px" alt="...">
    <div class="card-body">
    <button href="#" id="enemy-${enemy.id}" class="btn btn-danger deleteEnemy">Delete</button>
    </div>
    </div>
    `;
  }
  return domString;
};

export default { makeEnemyCard };
