import axios from 'axios';
import apiKeys from '../apiKeys.json';
import 'firebase/auth';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPersonnelData = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/personnel.json`)
    .then((response) => {
      const demPersonnel = response.data;
      const personnel = [];
      Object.keys(demPersonnel).forEach((personId) => {
        demPersonnel[personId].id = personId;
        // let's make a new id on it called pId and shove it in there. Then we're pushing
        personnel.push(demPersonnel[personId]);
        // this should now give you back an array with one person
      });

      resolve(personnel);
    })
    .catch((error) => reject(error));
});

// axios.post is allowing us to create
const CreateNewPersonnel = (newPersonnel) => axios.post(`${baseUrl}/personnel.json`, newPersonnel);
// axios.put is allowing us to update
const updatePersonnel = (personId, updatedPersonnel) => axios.put(`${baseUrl}/personnel/${personId}.json`, updatedPersonnel);
// axios.get using ${personId} is going to grab the specific person we want to edit/update
const getPersonnelById = (personId) => axios.get(`${baseUrl}/personnel/${personId}.json`);

const deletePersonData = (personId) => axios.delete(`${baseUrl}/personnel/${personId}.json`);

export default {
  getPersonnelData,
  CreateNewPersonnel,
  updatePersonnel,
  getPersonnelById,
  deletePersonData,
};
