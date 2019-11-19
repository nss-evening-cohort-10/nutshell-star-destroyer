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
      $('newEnemyModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      enemiesBuilder();
    })
    .catch((error) => console.log(error));
};

const clickToAddNewEnemy = () => {
  $('#add-new-enemy').click(addNewEnemy);
};


const enemiesBuilder = () => {
  enemyData.getAllEnemies()
    .then((enemies) => {
      let domString = '<h1>Enemies</h1>';
      domString += '<button id="addNewEnemyBtn" type="button" class="btn btn-primary" data-toggle="modal" data-target="#newEnemyModal">Add New Enemy</button>';
      domString += `<div class="modal fade" id="newEnemyModal" tabindex="-1" role="dialog" aria-labelledby="newEnemyModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="newEnemyModalLabel">New Enemy</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="addAnEnemy">
          <div class="form-group">
            <label for="enemyName">Name</label>
            <input type="text" class="form-control" id="enemyName" placeholder="Enter Name">
          </div>
          <div class="form-group">
            <label for="enemyImage">Photo</label>
            <input type="number" class="form-control" id="enemyImage" placeholder="Enter Image Url">
          </div>
          <div class="form-group">
            <label for="enemySector">Base Sector</label>
            <input type="text" class="form-control" id="enemySector" placeholder="Enter Enemy Base Sector">
          </div>
          <div class="form-group">
              <label for="enemyLKL">Last Known Location</label>
              <input type="text" class="form-control" id="enemyLKL" placeholder="Enter Enemy's LKL">
          </div>
          <div class="form-group">
                <label for="enemyDead">Terminated</label>
                <input type="text" class="form-control" id="enemyDead">
          </div>
          <div class="form-group">
              <label for="enemyCaptured">Captured</label>
              <input type="text" class="form-control" id="enemyCaptured">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="add-new-enemy">Save changes</button>
      </div>
    </div>
  </div>
</div>`;
      domString += '<div class="row">';
      enemies.forEach((enemy) => {
        domString += enemyCard.makeEnemyCard(enemy);
      });
      domString += '</div>';
      utilities.printToDom('enemiesPage', domString);
      clickToAddNewEnemy();
    })
    .catch((error) => console.error(error));
};

const clickForEnemies = () => {
  $('#enemiesLink').click(enemiesBuilder);
};

export default { clickForEnemies };
