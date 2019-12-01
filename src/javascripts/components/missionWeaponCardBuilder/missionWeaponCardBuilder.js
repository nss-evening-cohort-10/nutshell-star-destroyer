import './missionWeaponCardBuilder.scss';
import firebase from 'firebase';

const singleMissionWeaponCard = (weapon) => {
  let domString = '';
  const user = firebase.auth().currentUser;
  if (user != null) {
    domString += `
          <div id="${weapon.id}" class="card weaponCard card-body text-center" style=" width: 20em; max-width: 500px; height: 100%; margin: 2em; bg-#000000">
          <button class="btn delete-button delete-weapon"  id="${weapon.id}" style="margin-right:0; margin-left: auto; width: 2em; font-weight:bold;">X</button>
             <img src="${weapon.img}" class="card-img-top" style="width: 100%; height: auto;" alt="..."/>
             <br>
             <h5 class="card-title" id="weapon">${weapon.name}</h5>
              <p class="card-text">Crew of ${weapon.teamSize}</p>
              <p class="card-text">Use: ${weapon.type}</p>
          </div>`;
  } else {
    domString += `
        <div id="${weapon.id}" class="card weaponCard card-body text-center" style=" width: 20em; max-width: 500px; height: 100%; margin: 2em;">
           <img src="${weapon.img}" class="card-img-top" style="width: 100%; height: auto;" alt="..."/>
           <br>
           <h5 class="card-title" id="weapon">${weapon.name}</h5>
            <p class="card-text">Crew of ${weapon.teamSize}</p>
            <p class="card-text">Use: ${weapon.type}</p>
        </div>`;
  }
  return domString;
};

export default { singleMissionWeaponCard };
