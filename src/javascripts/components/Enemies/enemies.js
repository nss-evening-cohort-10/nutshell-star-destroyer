import $ from 'jquery';
import enemyData from '../../helpers/data/enemyData';
import enemyCard from './EnemyCard/enemyCard';
import utilities from '../../helpers/utilities';


const addNewEnemy = (e) => {
  e.preventDefault();
  const newEnemy = {
    name: $('#enemyName').val(),
    imageUrl: $('#enemyImage').val(),
    baseSector: $('#enemySector').val(),
    LKL: $('#enemyLKL').val(),
    isDead: $('#enemyDead').val(),
    isCaptured: $('#enemyCaptured').val(),
  };
  console.log(newEnemy);
  enemyData.makeEnemy(newEnemy)
    .then(() => {
      $('#newEnemyModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      enemiesBuilder();
    })
    .catch((error) => console.log(error));
};

const deleteFromDatabase = (e) => {
  e.preventDefault();
  const enemyToDelete = e.target.id.split('enemy-')[1];
  console.log(enemyToDelete);
  enemyData.deleteEnemy(enemyToDelete)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      enemiesBuilder();
    })
    .catch((error) => console.error(error));
};


const enemiesBuilder = () => {
  enemyData.getAllEnemies()
    .then((enemies) => {
      let domString = '<h1>Enemies</h1>';
      domString += '<button id="addNewEnemyBtn" type="button" class="btn btn-primary" data-toggle="modal" data-target="#newEnemyModal">Add New Enemy</button>';
      domString += '<div class="row">';
      enemies.forEach((enemy) => {
        domString += enemyCard.makeEnemyCard(enemy);
      });
      domString += '</div>';
      utilities.printToDom('enemiesPage', domString);
      $('#add-new-enemy').click(addNewEnemy);
      $('.deleteEnemy').on('click', deleteFromDatabase);
    })
    .catch((error) => console.error(error));
};

const clickForEnemies = () => {
  $('#enemiesLink').click(enemiesBuilder);
};

export default { clickForEnemies };
