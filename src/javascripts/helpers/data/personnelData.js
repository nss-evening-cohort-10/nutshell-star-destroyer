import axios from 'axios';
import apiKeys from '../apiKeys.json';
// import 'firebase/auth';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPersonnelData = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/personnel.json`)
    .then((response) => {
      console.log(response);
      const demPersonnel = response.data;
      console.log(demPersonnel);
      const personnel = [];
      Object.keys(demPersonnel).forEach((personId) => {
        console.log(personId);
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

const deletePersonData = (id) => axios.delete(`${baseUrl}/personnel/${id}.json`);

export default {
  getPersonnelData,
  deletePersonData,
  CreateNewPersonnel,
  updatePersonnel,
  getPersonnelById,
};
