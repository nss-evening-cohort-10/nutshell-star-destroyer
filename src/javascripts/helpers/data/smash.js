import missionData from './missionData';
import enemyData from './enemyData';
import sectorData from './sectorsData';
import planetSystemData from './planetSystemData';

// import axios from 'axios';
// import apiKeys from '../apiKeys.json';
// import 'firebase/auth';

// const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getCompleteMission = (missionId) => new Promise((resolve, reject) => {
  const missionObj = {};
  missionData.getMissionById(missionId)
    .then((mission) => {
      console.log(mission);
      missionObj.missionTitle = mission.missionTitle;
      enemyData.getEnemyById(mission.enemyID)
        .then((enemy) => {
          console.log('test', enemy);
          missionObj.enemyID = enemy.id;
          planetSystemData.getSystemsById(enemy.systemId)
            .then((system) => {
              console.log('test2', system);
              missionObj.systemId = system.id;
              sectorData.getSectorByID(system.sectorId)
                .then((sector) => {
                  console.log('test3', sector);
                  missionObj.sector = sector.id;
                })
                .catch((error) => reject(error));
            });
        });
    });
});
export default { getCompleteMission };
