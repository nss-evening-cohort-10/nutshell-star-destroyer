import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

import googlebutton from './google.png';
import utilities from '../../helpers/utilities';
import weapons from '../Weapons/weapons';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const loginButton = () => {
  const domString = `<button id="google-auth" class="btn btn-success">
  <img src="${googlebutton}" class="loginBtn" />
  </button>`;
  utilities.printToDom('auth', domString);
  $('#google-auth').click(signMeIn);
};

weapons.displayWeapons();

export default { loginButton };
