import { db, a } from "./index";

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
//LIKES
export async function checkLikes_M(email, id) {
  const id_user_collection = await ConsultaID(email);
  let result = undefined;
  const docRef = db.collection("likes_M").doc(id_user_collection);

  await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        result = data.id_movie.find((e) => e.id === id);
        // console.log(result)
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  return result;
}

export async function saveLike_M(email, id) {
  const id_user_collection = await ConsultaID(email);
  console.log("mira aqui");
  return db
    .collection("likes_M")
    .doc(id_user_collection)
    .update({
      id_movie: a.firestore.FieldValue.arrayUnion({ id }),
    });
}

export async function deleteLike_M(email, id) {
  const id_user_collection = await ConsultaID(email);
  return db
    .collection("likes_M")
    .doc(id_user_collection)
    .update({
      id_movie: a.firestore.FieldValue.arrayRemove({ id }),
    });
}
