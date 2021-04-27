import React, { useContext, useState, useEffect } from "react";
import { IListM } from "../types";
import { auth, db, a } from "./index";

import { v5 as uuidv5 } from "uuid";
import { checkLikes_M, saveLike_M, deleteLike_M } from "./likes";
import { checkBookMark_M, saveBookMark_M, deleteBookMark_M } from "./bookmark";
import { checkEye_M, saveEye_M, deleteEye_M } from "./eye";

const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  function saveData(username, birth_date, phone, email) {
    const id = uuidv5(email, uuidv5.URL);

    //Likes
    db.collection("likes_M").doc(id).set({
      id_movie: {},
    });

    //Bookmark
    db.collection("bookmark_M").doc(id).set({
      id_movie: {},
    });

    //Bookmark
    db.collection("eye_M").doc(id).set({
      list: [],
    });

    //datos de perfil
    return db.collection("profile").doc(email).set({
      email: { email },
      username: { username },
      birth_date: { birth_date },
      phone: { phone },
      collections_id: { id },
    });
  }

  async function ConsultaID(email) {
    let result = undefined;
    const docRef = db.collection("profile").doc(email);
    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          result = data.collections_id.id;
          // console.log(result)
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    console.log(result);
    return result;
  }

  //USER
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  //GOOGLE
  const googleProvider = new a.auth.GoogleAuthProvider();
  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        //console.log(res.user)

        const docRef = db.collection("profile").doc(res.user.email);

        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
            } else {
              saveData(res.user.displayName, "", "", res.user.email);
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //Facebook
  const facebookProvider = new a.auth.FacebookAuthProvider();
  const signInWithFacebook = () => {
    auth
      .signInWithPopup(facebookProvider)
      .then((res) => {
        console.log(res.user);

        //falta el save
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //Twitter
  const twitterProvider = new a.auth.TwitterAuthProvider();
  const signInWithTwitter = () => {
    auth
      .signInWithPopup(twitterProvider)
      .then((res) => {
        console.log(res.user);
        //falta el save
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  function logout() {
    return auth.signOut();
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function getListMovies(email) {
    const id_user_collection = await ConsultaID(email);
    let result: IListM = {
      Bookmark: [],
      Like: [],
      Watch: [],
    };

    const bookmark = db.collection("bookmark_M").doc(id_user_collection);
    const likes = db.collection("likes_M").doc(id_user_collection);
    const watch = db.collection("eye_M").doc(id_user_collection);

    await bookmark
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          result.Bookmark.push(data);
          //console.log(result)
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    await likes
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          result.Like.push(data);
          //console.log(result)
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    let listConvert = {
      toFirestore: function () {
        return {
          id: "",
          date: "",
        };
      },
      fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return data;
      },
    };

    await watch
      .withConverter(listConvert)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          result.Watch.push(data);
        }
      });

    return result;
  }

  const value = {
    currentUser,
    signup,
    saveData,
    login,
    logout,
    saveLike_M,
    checkLikes_M,
    deleteLike_M,
    saveBookMark_M,
    deleteBookMark_M,
    checkBookMark_M,
    getListMovies,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    checkEye_M,
    deleteEye_M,
    saveEye_M,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
