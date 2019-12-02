import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getSystems = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/planetSystem.json`)
    .then((response) => {
      const demSystems = response.data;
      const systems = [];
      Object.keys(demSystems).forEach((psId) => {
        demSystems[psId].id = psId;
        systems.push(demSystems[psId]);
      });
      resolve(systems);// Hard code to return systems
    })
    .catch((error) => reject(error));
});

export default { getSystems };
