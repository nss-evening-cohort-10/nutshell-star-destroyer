import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllMissions = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/missions.json`)
    .then((response) => {
      console.log(response.data);
      const daMissions = response.data;
      const missions = [];
      Object.keys(daMissions).forEach((fbId) => {
        daMissions[fbId].id = fbId;
        missions.push(daMissions[fbId]);
      });
      resolve(missions);
    })
    .catch((error) => reject(error));
});

export default { getAllMissions };
