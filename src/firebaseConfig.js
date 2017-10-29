import firebase from 'firebase'


var config = {
    apiKey: "AIzaSyDQe4Dp36lZIxRIVaWLWtdSyezBQySuiv4",
    authDomain: "react-e4ea1.firebaseapp.com",
    databaseURL: "https://react-e4ea1.firebaseio.com",
    projectId: "react-e4ea1",
    storageBucket: "react-e4ea1.appspot.com",
    messagingSenderId: "340532256758"
};

/*configure db
 * ==========================*/
var database = firebase.initializeApp(config);


/*third party login providers
 * ==========================*/
var googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/plus.login');
googleProvider.setCustomParameters({
  'login_hint': 'user@example.com'
});

export {database, googleProvider};
