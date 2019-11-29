import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllEnemies = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/enemies.json`)
    .then((response) => {
      // console.log(response.data);
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

const getEnemyById = (enemyId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/enemies/${enemyId}.json`)
    .then((enemyResponse) => {
      resolve(enemyResponse.data);
    })
    .catch((error) => reject(error));
});

const makeEnemy = (newEnemy) => axios.post(`${baseUrl}/enemies.json`, newEnemy);

const deleteEnemy = (enemyId) => axios.delete(`${baseUrl}/enemies/${enemyId}.json`);

const editEnemy = (enemyId, updatedEnemy) => axios.put(`${baseUrl}/enemies/${enemyId}.json`, updatedEnemy);

export default {
  getAllEnemies, makeEnemy, deleteEnemy, editEnemy, getEnemyById,
};
