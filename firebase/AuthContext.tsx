import React, { useContext, useState, useEffect } from "react"
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
        let result = '';
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
        let result = '';
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
        checkBookMark_M
    }

    return ( 
        <AuthContext.Provider value={value}>
      {!loading && children}
        </AuthContext.Provider>
     )
}