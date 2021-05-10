import { auth, db, a } from "./index";

export async function getCommentsM(id) {
    let response = undefined; 
    try{
        const docRef = db.collection("comments_M").doc(id.toString());
        await docRef
        .get()
        .then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            response= data
        } else {
            console.log("No such document!");
        }
        })
        .catch((error) => {
        console.log("Error getting document:", error);
        });
    }catch{

        db.collection("comments_M").doc(id.toString()).set({
            comments:[],
          }); 
    }

  return response;
}

export async function pushNewCommentsM(id,text) {
  
    try{
        const docRef = db.collection("comments_M").doc(id.toString());
        await docRef
        .get()
        .then((doc) => {
        if (doc.exists) {
            docRef.update({
                comments: a.firestore.FieldValue.arrayUnion({text}),
              });
        } else {
            console.log("No such document!");
        }
        })
        .catch((error) => {
        console.log("Error getting document:", error);
        });
    }catch(e){
        console.log(e)
    }

}