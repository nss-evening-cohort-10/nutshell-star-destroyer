import axios from 'axios';
import apiKeys from '../apiKeys.json';
import 'firebase/auth';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const sectorsDataBySectorId = (sectorId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/sectors.json?orderBy="sectorId"&equalTo="${sectorId}"`)
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

export default { sectorsDataBySectorId };
