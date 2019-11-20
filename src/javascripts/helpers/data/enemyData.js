import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllEnemies = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/enemies.json`)
    .then((response) => {
      const enemiesResults = response.data;
      const enemies = [];
      Object.keys(enemiesResults).forEach((enemyId) => {
        enemiesResults[enemyId].id = enemyId;
        enemies.push(enemiesResults[enemyId]);
      });
      resolve(enemies);
    })
    .catch((error) => reject(error));
});

const makeEnemy = (newEnemy) => axios.post(`${baseUrl}/enemies.json`, newEnemy);

const deleteEnemy = (enemyId) => axios.delete(`${baseUrl}/enemies/${enemyId}.json`);

export default { getAllEnemies, makeEnemy, deleteEnemy };
