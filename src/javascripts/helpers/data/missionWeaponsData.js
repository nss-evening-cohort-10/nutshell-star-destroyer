import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getMissionWeapons = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/missionWeapons.json`)
    .then((response) => {
      const demmissionWeapons = response.data;
      const missionWeapons = [];
      Object.keys(demmissionWeapons).forEach((fbId) => {
        demmissionWeapons[fbId].id = fbId;
        missionWeapons.push(demmissionWeapons[fbId]);
      });
      resolve(missionWeapons);
    })
    .catch((error) => reject(error));
});

export default { getMissionWeapons };
