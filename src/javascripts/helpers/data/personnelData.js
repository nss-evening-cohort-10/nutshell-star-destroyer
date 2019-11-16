import axios from 'axios';
import apiKeys from '../apiKeys.json';
import 'firebase/auth';
const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const personnelDataByPersonId = (personId) => new Promise((resolve, reject) => {
  axios.get(${baseUrl}/personnel.json?orderBy="personId"&equalTo="${personId}")
  .then((response) => {
  const demPersonnel= response.data;
  const personnel = [];
  Object.keys(demPersonnel).forEach((pId) => {
  demPersonnel[pId].id = pId;
  personnel.push(demPersonnel[pId]);
  });
  resolve(personnel);
  })
  .catch((error) => reject(error));
  });

