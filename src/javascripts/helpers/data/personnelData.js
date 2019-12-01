import axios from 'axios';
import apiKeys from '../apiKeys.json';
// import 'firebase/auth';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPersonnelData = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/personnel.json`)
    .then((response) => {
      const demPersonnel = response.data;
      const personnel = [];
      Object.keys(demPersonnel).forEach((personId) => {
        demPersonnel[personId].id = personId;
        personnel.push(demPersonnel[personId]);
      });

      resolve(personnel);
    })
    .catch((error) => reject(error));
});

const CreateNewPersonnel = (newPersonnel) => axios.post(`${baseUrl}/personnel.json`, newPersonnel);

const updatePersonnel = (personId, updatedPersonnel) => axios.put(`${baseUrl}/personnel/${personId}.json`, updatedPersonnel);
// axios.get using ${personId} is going to grab the specific person we want to edit/update
const getPersonnelById = (personId) => axios.get(`${baseUrl}/personnel/${personId}.json`);

const deletePersonData = (id) => axios.delete(`${baseUrl}/personnel/${id}.json`);

export default {
  getPersonnelData,
  deletePersonData,
  CreateNewPersonnel,
  updatePersonnel,
  getPersonnelById,
};
