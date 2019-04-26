import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyAq6Rq7aqaAfVQAUxp9WWjFbvyrwoMnekQ",
  authDomain: "rn-tech-chat.firebaseapp.com",
  databaseURL: "https://rn-tech-chat.firebaseio.com",
  projectId: "rn-tech-chat",
  storageBucket: "rn-tech-chat.appspot.com",
  messagingSenderId: "478151848835"
};
const fire = firebase.initializeApp(config);

export default fire;
