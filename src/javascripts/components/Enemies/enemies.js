import enemyData from '../../helpers/data/enemyData';
import enemyCard from './EnemyCard/enemyCard';
import utilities from '../../helpers/utilities';

// const getEmpireEnemies = () => {
// const empireEnemies = enemies.getAllEnemies();
// this function should get the array of enemies from enemyData.js
// console.log(empireEnemies);
// };

const addNewEnemy = (e) => {
  e.stopImmediatePropagation();
  const newEnemy = {
    name: $('#enemyName').val(),
    imageUrl: $('#enemyImage').val(),
    baseSector: $('#enemySector').val(),
    LKL: $('#enemyLKL').val(),
    isDead: $('#enemyDead').val(),
    isCaptured: $('#enemyCaptured').val(),
  };
  console.log(newEnemy);
  enemyData.addEnemy(newEnemy)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      enemiesBuilder();
    });
  // .catch((error) => console.log(error));
};

const enemiesBuilder = () => {
  // this function should display the array of enemies onto cards in the DOM
  enemyData.getAllEnemies()
    .then((enemies) => {
    // console.log('the enemies', enemies);
      let domString = `<button type="button" id="addNewEnemyBtn" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Add Enemy
    </button>`;
      enemies.forEach((enemy) => {
        domString += enemyCard.makeEnemyCard(enemy);
      });
      utilities.printToDom('enemiesPage', domString);
      $('#addNewEnemyBtn').click(addNewEnemy);
    });
  // .catch((error) => console.error(error));
};

export default { enemiesBuilder };
