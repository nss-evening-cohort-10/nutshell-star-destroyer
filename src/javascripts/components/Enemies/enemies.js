import $ from 'jquery';
import enemyData from '../../helpers/data/enemyData';
import enemyCard from './EnemyCard/enemyCard';
import utilities from '../../helpers/utilities';


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
  // console.log(newEnemy);
  enemyData.addEnemy(newEnemy)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      enemiesBuilder();
    });
  // .catch((error) => console.log(error));
};

const enemiesBuilder = () => {
  enemyData.getAllEnemies()
    .then((enemies) => {
      let domString = `<button id="addNewEnemyBtn" type="button" data-toggle="modal" data-target="#newEnemyModal"">
      Add New Enemy
    </button>`;
      domString += '<div id="boardSection" class="d-flex flex-wrap">';
      enemies.forEach((enemy) => {
        domString += enemyCard.makeEnemyCard(enemy);
      });
      domString += '</div>';
      utilities.printToDom('enemiesPage', domString);
      $('#addNewEnemyBtn').click(addNewEnemy);
    });
  // .catch((error) => console.error(error));
};

export default { enemiesBuilder };
