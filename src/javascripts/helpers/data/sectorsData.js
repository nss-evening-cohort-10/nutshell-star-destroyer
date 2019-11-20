import axios from 'axios';
import apiKeys from '../apiKeys.json';
import 'firebase/auth';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllSectors = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/sectors.json`)
    .then((response) => {
      const demSectors = response.data;
      const sectors = [];
      Object.keys(demSectors).forEach((scId) => {
        demSectors[scId].id = scId;
        sectors.push(demSectors[scId]);
      });
      resolve(sectors);
    })
    .catch((error) => reject(error));
});

const createNewSector = (newData) => axios.post(`${baseUrl}/sectors.json`, newData);


export default { getAllSectors, createNewSector };
