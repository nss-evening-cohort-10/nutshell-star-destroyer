import $ from 'jquery';
import firebase from 'firebase';
import enemyData from '../../helpers/data/enemyData';
import enemyCard from './EnemyCard/enemyCard';
import utilities from '../../helpers/utilities';

// let currentEditId = '';


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

// const getEnemyToUpdate = (e) => {
//   const idOfEnemyToUpdate = e.target.id.split('enemy-enemy-')[1];
//   enemyData.getEnemyById(idOfEnemyToUpdate)
//     .then((actualEnemyToUpdate) => {
//       console.log(actualEnemyToUpdate);
//       currentEditId = actualEnemyToUpdate.id;
//       $('#enemyName').val(actualEnemyToUpdate.name);
//       $('#enemyImage').val(actualEnemyToUpdate.imageUrl);
//       $('#enemySector').val(actualEnemyToUpdate.baseSector);
//       $('#enemyLKL').val(actualEnemyToUpdate.LKL);
//       $('#enemyDead').val(actualEnemyToUpdate.isDead);
//       $('#enemyCaptured').val(actualEnemyToUpdate.isCaptured);
//     });
// };

// const clickToUpdateEnemy = (e) => {
//   // e.preventDefault();
//   const changedEnemy = {
//     name: $('#enemyName').val(),
//     imageUrl: $('#enemyImage').val(),
//     baseSector: $('#enemySector').val(),
//     LKL: $('#enemyLKL').val(),
//     isDead: $('#enemyDead').val(),
//     isCaptured: $('#enemyCaptured').val(),
//   };
//   console.log(e);
//   console.log(changedEnemy);
//   enemyData.editEnemy(`${currentEditId}`, changedEnemy)
//     .then(() => {
//       $('#newEnemyModal').modal('hide');
//       // eslint-disable-next-line no-use-before-define
//       enemiesBuilder();
//     });
// };

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
      $('#save-new-enemy').click(addNewEnemy);
      $('.deleteEnemy').on('click', deleteFromDatabase);
      // $('.editEnemy').on('click', getEnemyToUpdate);
      // $('#save-enemy-changes').on('click', clickToUpdateEnemy);
    })
    .catch((error) => console.error(error));
};


const clickForEnemies = () => {
  $('#enemiesLink').click(enemiesBuilder);
};

export default { clickForEnemies };
