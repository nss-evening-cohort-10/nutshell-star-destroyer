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

const getSectorByID = (id) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/sectors/${id}.json`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

const createNewSector = (newData) => axios.post(`${baseUrl}/sectors.json`, newData);

const deleteSector = (sectorID) => axios.delete(`${baseUrl}/sectors/${sectorID}.json`);

const editSector = (id, updatedSector) => axios.put(`${baseUrl}/sectors/${id}.json`, updatedSector);

export default {
  getAllSectors,
  createNewSector,
  deleteSector,
  getSectorByID,
  editSector,
};
