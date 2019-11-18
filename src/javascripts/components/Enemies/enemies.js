import enemyData from '../../helpers/data/enemyData';
import enemyCard from './EnemyCard/enemyCard';
import utilities from '../../helpers/utilities';

// const getEmpireEnemies = () => {
// const empireEnemies = enemies.getAllEnemies();
// this function should get the array of enemies from enemyData.js
// console.log(empireEnemies);
// };

const enemiesBuilder = () => {
  // this function should display the array of enemies onto cards in the DOM
  enemyData.getAllEnemies()
    .then((enemies) => {
    // console.log('the enemies', enemies);
      let domString = '';
      enemies.forEach((enemy) => {
        domString += enemyCard.makeEnemyCard(enemy);
      });
      utilities.printToDom('enemiesSection', domString);
    });
  // .catch((error) => console.error(error));
};

export default { enemiesBuilder };
