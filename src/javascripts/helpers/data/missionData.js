import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllMissions = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/missions.json`)
    .then((response) => {
      const daMissions = response.data;
      const missions = [];
      Object.keys(daMissions).forEach((fbId) => {
        daMissions[fbId].id = fbId;
        missions.push(daMissions[fbId]);
      });
      resolve(missions);
    })
    .catch((error) => reject(error));
});

const getMissionById = (missionId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/missions/${missionId}.json`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

const makeMission = (newMission) => axios.post(`${baseUrl}/missions.json`, newMission);

const deleteMission = (missionId) => axios.delete(`${baseUrl}/missions/${missionId}.json`);

const updateMission = (missionId, updatedMission) => axios.put(`${baseUrl}/missions/${missionId}.json`, updatedMission);

export default {
  getAllMissions,
  makeMission,
  deleteMission,
  getMissionById,
  updateMission,
};
