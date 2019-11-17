import enemyData from '../../helpers/data/enemyData';

// const getEmpireEnemies = () => {
// const empireEnemies = enemies.getAllEnemies();
// this function should get the array of enemies from enemyData.js
// console.log(empireEnemies);
// };

const enemiesBuilder = () => {
  // this function should display the array of enemies onto cards in the DOM
  enemyData.getAllEnemies()
    .then((enemies) => {
      console.log('the enemies', enemies);
    // let domString = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
    //  Add Board
    // </button>`;
    // domString += '<div id="boardSection" class="d-flex flex-wrap">';
    // enemies.forEach((enemy) => {
    // domString += enemyCard.makeEnemyCard(enemyCard);
    // });
    // domString += '</div>';
    // utilities.printToDom('boards', domString);
    });
  // .catch((error) => console.error(error));
};

export default { enemiesBuilder };
