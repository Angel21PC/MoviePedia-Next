import React, { useContext, useState, useEffect } from "react"
import { IListM } from "../types";
import { auth, db, a } from "./index";

const AuthContext = React.createContext(null);

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState<any>();
    const [loading, setLoading] = useState(true);

    function saveData(username, birth_date, phone, email){
     
        //Likes
        db.collection("likes_M").doc(email).set({
            id_movie:{}
        })

        //Bookmark
        db.collection("bookmark_M").doc(email).set({
            id_movie:{}
        })

        //datos de perfil
        return db.collection("profile").doc(email).set({
            email: {email},
            username: {username},
            birth_date: {birth_date},
            phone: {phone}
        })
    }

    async function checkLikes_M(email, id){
        let result = undefined;
        const docRef = db.collection("likes_M").doc(email);

        await docRef.get().then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                result = data.id_movie.find(e=> e.id === id)
                // console.log(result)
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        return result
    }

    function saveLike_M(email, id){

        return db.collection("likes_M").doc(email).update({
            id_movie: a.firestore.FieldValue.arrayUnion({id})
        })
    }

    function deleteLike_M(email, id){

        return db.collection("likes_M").doc(email).update({
            id_movie: a.firestore.FieldValue.arrayRemove({id})
        })
    }

    async function checkBookMark_M(email, id){
        let result = undefined;
        const docRef = db.collection("bookmark_M").doc(email);

        await docRef.get().then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                result = data.id_movie.find(e=> e.id === id)
                console.log(result)
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        return result
    }

    function deleteBookMark_M(email, id){

        return db.collection("bookmark_M").doc(email).update({
            id_movie: a.firestore.FieldValue.arrayRemove({id})
        })
    }

    function saveBookMark_M(email, id){
        return db.collection("bookmark_M").doc(email).update({
            id_movie: a.firestore.FieldValue.arrayUnion({id})
        })
    }
    
    //USER
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    //GOOGLE
    const googleProvider = new a.auth.GoogleAuthProvider()
    const signInWithGoogle = () => {
      auth.signInWithPopup(googleProvider).then((res) => {
        console.log(res.user)

        const docRef = db.collection("profile").doc(res.user.email);

        docRef.get().then((doc) => {
            if (doc.exists) {
               
            } else {
                saveData(res.user.displayName, '', '', res.user.email);
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
      

      }).catch((error) => {
        console.log(error.message)
      })
    }

    //Facebook
    const facebookProvider = new a.auth.FacebookAuthProvider()
    const signInWithFacebook = () => {
      auth.signInWithPopup(facebookProvider).then((res) => {
        console.log(res.user)

        //falta el save
      }).catch((error) => {
        console.log(error.message)
      })
    }

    //Twitter
    const twitterProvider = new a.auth.TwitterAuthProvider()
    const signInWithTwitter = () => {
      auth.signInWithPopup(twitterProvider).then((res) => {
        console.log(res.user)
        //falta el save
        
      }).catch((error) => {
        console.log(error.message)
      })
    }

    function logout() {
        return auth.signOut()
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user)
          setLoading(false)
        })
    
        return unsubscribe
    }, [])

    async function getListMovies(email){

        let result: IListM = {
            Bookmark: [],
            Like:[]
        };

        const bookmark = db.collection("bookmark_M").doc(email);
        const likes = db.collection("likes_M").doc(email);

        await bookmark.get().then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                result.Bookmark.push(data);
                console.log(result)
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        await likes.get().then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                result.Like.push(data);
                console.log(result)
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        return result
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
        signInWithTwitter
    }

    return ( 
        <AuthContext.Provider value={value}>
      {!loading && children}
        </AuthContext.Provider>
     )
}