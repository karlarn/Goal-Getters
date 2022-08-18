import firebase from "firebase/app";
import "firebase/auth";

const _apiUrl = "/api/userprofile";

// returns firebase token id from getToken then does a fetch to find it in the DB then returns a completed response. 
const _doesUserExist = (firebaseUserId) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/DoesUserExist/${firebaseUserId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => resp.ok));
};

// gets the firebase user id token then does a post with the token to create a new user with a userProfile object that is passed in  
const _saveUser = (userProfile) => {
  return getToken().then((token) =>
    fetch(_apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userProfile)
    }).then(resp => resp.json()));
};


// can be called with no arguments to access the default app's Auth service or as firebase.auth(app) to access the Auth service associated with a specific app
export const getToken = () => firebase.auth().currentUser.getIdToken();

// Asynchronously signs in using an email and password.
export const login = (email, pw) => {
  return firebase.auth().signInWithEmailAndPassword(email, pw)
    .then((signInResponse) => _doesUserExist(signInResponse.user.uid))
    .then((doesUserExist) => {
      if (!doesUserExist) {

        // If we couldn't find the user in our app's database, we should logout of firebase
        logout();

        throw new Error("Something's wrong. The user exists in firebase, but not in the application database.");
      }
    }).catch(err => {
      console.error(err);
      throw err;
    });
};

// Part of firebase library. Signs users out
export const logout = () => {
  firebase.auth().signOut()
};

// Uses firebase library to create a new user
export const register = (userProfile, password) => {
  return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
    .then((createResponse) => _saveUser({
      ...userProfile,
      firebaseUserId: createResponse.user.uid
    }));
};

// Adds an observer for changes to the user's sign-in state
export const onLoginStatusChange = (onLoginStatusChangeHandler) => {
  firebase.auth().onAuthStateChanged((user) => {
    onLoginStatusChangeHandler(!!user);
  });
};

// fetch call to return a logged in user object
export const getCurrentUserId = () => {
  return getToken().then((token) => {
    return fetch(_apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(
          "An unknown error occurred while trying to get user.",
        )
      }

    })
  })

}