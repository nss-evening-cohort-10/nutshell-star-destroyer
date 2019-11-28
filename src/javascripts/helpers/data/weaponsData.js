import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllWeapons = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/weapons.json`)
    .then((response) => {
      const demWeapons = response.data;
      const weapons = [];
      Object.keys(demWeapons).forEach((fbId) => {
        demWeapons[fbId].id = fbId;
        weapons.push(demWeapons[fbId]);
      });
      resolve(weapons);
    })
    .catch((error) => reject(error));
});

const getWeaponById = (weaponId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/weapons/${weaponId}.json`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

const addNewWeapon = (newWeapon) => axios.post(`${baseUrl}/weapons.json`, newWeapon);

const deleteWeapon = (weaponId) => axios.delete(`${baseUrl}/weapons/${weaponId}.json`);

export default {
  getAllWeapons, getWeaponById, addNewWeapon, deleteWeapon,
};
