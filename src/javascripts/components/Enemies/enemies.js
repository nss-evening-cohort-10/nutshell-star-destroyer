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
    systemId: $('#enemySystem').val(),
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
  const enemyToDelete = e.target.id.split('delete-')[1];
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

const editEnemyInfo = (e) => {
  e.stopImmediatePropagation();
  const enemyId = $(e.target).parent().attr('id');
  const updatedEnemy = {
    name: $('#enemyName').val(),
    imageUrl: $('#enemyImage').val(),
    systemId: $('#enemySystem').val(),
    LKL: $('#enemyLKL').val(),
  };
  enemyData.editEnemy(enemyId, updatedEnemy)
    .then(() => {
      $('#newEnemyModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      enemiesBuilder();
    })
    .catch((error) => console.error(error));
};

const updateAEnemy = (e) => {
  const enemyId = e.target.id.split('edit-')[1];
  enemyData.getEnemyById(enemyId)
    .then((response) => {
      const enemyObj = response;
      $('#newEnemyModal').modal('show');
      enemyObj.id = enemyId;
      newEnemyModal(enemyObj);
      $('#edit').click(editEnemyInfo);
    });
};
// This function prints the enemy cards to the enemiesPage div in HTML  updated  by 11-29-19 raymond

const enemiesBuilder = () => {
  enemyData.getAllEnemies()
    .then((enemies) => {
      let domString = '<div  class="text-center" id="button-holder">';
      domString += '<h1>Enemies</h1>';
      const user = firebase.auth().currentUser;
      if (user != null) {
        domString += '<button id="addNewEnemyBtn" class="btn add-button" data-toggle="modal" data-target="#newEnemyModal">ADD NEW ENEMY</button>';
        domString += '</div>';
      }
      domString += '<div class="d-flex flex-wrap">';
      enemies.forEach((enemy) => {
        domString += enemyCard.makeEnemyCard(enemy);
      });
      domString += '</div>';
      utilities.printToDom('enemiesPage', domString);
      $('#addNewEnemyBtn').click(newEnemyModal);
      $('.deleteEnemy').on('click', deleteFromDatabase);
      $('#enemiesPage').on('click', '.editEnemy', updateAEnemy);
    })
    .catch((error) => console.error(error));
};

export default { enemiesBuilder };
