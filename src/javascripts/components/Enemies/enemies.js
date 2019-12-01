import $ from 'jquery';
import firebase from 'firebase';
import enemyData from '../../helpers/data/enemyData';
import enemyCard from './EnemyCard/enemyCard';
import utilities from '../../helpers/utilities';

const addNewEnemy = (e) => {
  // e.preventDefault();
  e.stopImmediatePropagation();
  const newEnemy = {
    name: $('#enemyName').val(),
    imageUrl: $('#enemyImage').val(),
    baseSector: $('#enemySector').val(),
    LKL: $('#enemyLKL').val(),
  };
  enemyData.makeEnemy(newEnemy)
    .then(() => {
      $('#newEnemyModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      enemiesBuilder();
    })
    .catch((error) => console.error(error));
};

const deleteFromDatabase = (e) => {
  e.preventDefault();
  const enemyToDelete = e.target.id.split('enemy-')[1];
  console.error(enemyToDelete);
  enemyData.deleteEnemy(enemyToDelete)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      enemiesBuilder();
    })
    .catch((error) => console.error(error));
};

const newEnemyModal = (enemy) => {
  let domString = '';
  domString += enemyCard.enemyModal(enemy);
  utilities.printToDom('newEnemyModal', domString);
  $('#save').click(addNewEnemy);
};
// This function prints the enemy cards to the enemiesPage div in HTML  updated  by 11-29-19 raymond

const enemiesBuilder = () => {
  enemyData.getAllEnemies()
    .then((enemies) => {
      let domString = '<div  class="text-center" id="button-holder">';
      domString += '<h1>Enemies</h1>';
      const user = firebase.auth().currentUser;
      if (user != null) {
        domString += '<button id="addNewEnemyBtn" type="button" class="btn" data-toggle="modal" data-target="#newEnemyModal">Add New Enemy</button>';
        domString += '</div>';
      }
      enemies.forEach((enemy) => {
        domString += enemyCard.makeEnemyCard(enemy);
      });
      utilities.printToDom('enemiesPage', domString);
      $('#addNewEnemyBtn').click(newEnemyModal);
      $('.deleteEnemy').on('click', deleteFromDatabase);
    })
    .catch((error) => console.error(error));
};


const clickForEnemies = () => {
  $('#enemiesLink').click(enemiesBuilder);
};

export default { clickForEnemies };
