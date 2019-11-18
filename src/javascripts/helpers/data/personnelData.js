import axios from 'axios';
import apiKeys from '../apiKeys.json';
import 'firebase/auth';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const personnelDataByPersonId = (personId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/personnel.json?orderBy="personId"&equalTo="${personId}"`)
    .then((response) => {
      const demPersonnel = response.data;
      const personnel = [];
      Object.keys(demPersonnel).forEach((pId) => {
        demPersonnel[pId].id = pId;
        // let's make a new id on it called pId and shove it in there. Then we're pushing
        personnel.push(demPersonnel[pId]);
        // this should now give you back an array with one person
      });

      resolve(personnel);
    })
    .catch((error) => reject(error));
});

export default { personnelDataByPersonId };
