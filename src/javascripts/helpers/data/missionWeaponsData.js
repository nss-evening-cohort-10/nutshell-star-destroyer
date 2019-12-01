import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getMissionWeapons = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/missionWeapons.json`)
    .then((response) => {
      const dosemissionWeapons = response.data;
      const missionWeapons = [];
      Object.keys(dosemissionWeapons).forEach((fbId) => {
        dosemissionWeapons[fbId].id = fbId;
        missionWeapons.push(dosemissionWeapons[fbId]);
      });
      resolve(missionWeapons);
    })
    .catch((error) => reject(error));
});

const getMissionWeaponById = (missionWeaponId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/missionWeapons/${missionWeaponId}.json`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

const addNewMissionWeapon = (newMissionWeapon) => axios.post(`${baseUrl}/missionWeapons.json`, newMissionWeapon);

const deleteMissionWeapon = (missionWeaponId) => axios.delete(`${baseUrl}/missionWeapons/${missionWeaponId}.json`);

export default {
  getMissionWeapons,
  getMissionWeaponById,
  addNewMissionWeapon,
  deleteMissionWeapon,
};
