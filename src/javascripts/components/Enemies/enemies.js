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

const getEnemyToUpdate = (e) => {
  console.log(e.target.id);
  const idOfEnemyToUpdate = e.target.id.split('enemy-enemy-')[1];
  console.log(idOfEnemyToUpdate);
  enemyData.getAllEnemies()
    .then((enemies) => {
      const enemiesToUpdate = enemies.filter((x) => x.id === `${idOfEnemyToUpdate}`);
      const enemyToUpdate = enemiesToUpdate[0];
      return enemyToUpdate;
    })
    .catch((error) => console.log(error));
};
const clickToUpdateEnemy = () => {
  // e.preventDefault();
  const actualEnemyToUpdate = getEnemyToUpdate();
  console.log(actualEnemyToUpdate);
  const changedEnemy = {
    name: $('#enemyName').val(),
    imageUrl: $('#enemyImage').val(),
    baseSector: $('#enemySector').val(),
    LKL: $('#enemyLKL').val(),
    isDead: $('#enemyDead').val(),
    isCaptured: $('#enemyCaptured').val(),
  };
  console.log(changedEnemy);
  // enemyData.editEnemy(`${actualEnemyToUpdate.id}`, changedEnemy)
  // .then(() => {
  // $('#newEnemyModal').modal('hide');
  // eslint-disable-next-line no-use-before-define
  // enemiesBuilder();
  // });
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
      $('.editEnemy').on('click', getEnemyToUpdate);
      $('#save-enemy-changes').on('click', clickToUpdateEnemy);
    })
    .catch((error) => console.error(error));
};

const clickForEnemies = () => {
  $('#enemiesLink').click(enemiesBuilder);
};

export default { clickForEnemies };
