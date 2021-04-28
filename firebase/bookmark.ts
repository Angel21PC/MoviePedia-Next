import { auth, db, a } from "./index";

async function ConsultaID() {
  let result = undefined;
  const docRef = db.collection("profile").doc(auth.currentUser.uid);
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


export async function checkBookMark_M(id) {
  const id_user_collection = await ConsultaID();
  let result = undefined;
  const docRef = db.collection("bookmark_M").doc(id_user_collection);

  await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        console.log(data)
        console.log(id)
        result = data.id_movie.find((e) => e.id === id);
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
    console.log('e'+result)
  return result;
}

export async function deleteBookMark_M(id) {
  const id_user_collection = await ConsultaID();
  return db
    .collection("bookmark_M")
    .doc(id_user_collection)
    .update({
      id_movie: a.firestore.FieldValue.arrayRemove({ id }),
    });
}

export async function saveBookMark_M(id) {
  const id_user_collection = await ConsultaID();
  return db
    .collection("bookmark_M")
    .doc(id_user_collection)
    .update({
      id_movie: a.firestore.FieldValue.arrayUnion({ id }),
    });
}
