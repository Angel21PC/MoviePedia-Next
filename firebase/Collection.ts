import { auth, db, a } from "./index";
import { v1 as uuidv1 } from "uuid";
import { uploadImgCollection, getImageCollection } from "./Images";
/* 
    id : {
        public: bool
        data: {
            title:
            description:
            arrayMovies:
            user:
            title:
            date:
        }
        usersLikes: []
    }
*/

export async function pushNewCollection(
  title: string,
  description: string,
  user_email: string,
  objArray: any,
  publicC: boolean,
  file: any
) {
  const currentUser = auth.currentUser.email;

  try {
    await uploadImgCollection(file, title);
  } catch (e) {
    console.log(e);
  }

  let response = undefined;
  const today = new Date();

  const id_Collection = uuidv1();

  const dataCollection = {
    title: title,
    description: description,
    objArray: objArray,
    user: user_email,
    date: today,
    imageName: currentUser + title,
  };
  const newCollection = {
    public: publicC,
    data: dataCollection,
    userLikes: [],
  };
  if (auth.currentUser !== null) {
    try {
      const docRef = db
        .collection("Collections")
        .doc(id_Collection.toString())
        .set(newCollection);

      response = true;
    } catch (e) {
      console.log(e);
    }
  }
  return response;
}

export async function deleteCollection(id_Collection: number | string) {
  db.collection("Collections").doc(id_Collection.toString()).delete();
}

export async function collectionLike(
  id_collection: number | string,
  user_giveLike: string
) {
  let response = undefined;
  if (auth.currentUser !== null) {
    try {
      const docRef = db.collection("Collections").doc(id_collection.toString());
      await docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            let result = doc.data();

            result.map((c) => {
              if (c.id === id_collection) {
                let nuestro_user_fue_encontrado = false;
                c.userLikes.map((u) => {
                  if (u === user_giveLike) {
                    nuestro_user_fue_encontrado = true;
                  }
                  response = nuestro_user_fue_encontrado;
                });
                if (nuestro_user_fue_encontrado === false) {
                  //añadir Like
                  docRef.update(a.firestore.FieldValue.arrayRemove(c));
                  c.userLikes.push(user_giveLike);
                  docRef.update(a.firestore.FieldValue.arrayUnion(c));
                  response = true;
                } else {
                  //elminar like
                  docRef.update(a.firestore.FieldValue.arrayRemove(c));
                  const index = c.userLikes.indexOf(user_giveLike);
                  if (index > -1) {
                    c.userLikes.splice(index, 1);
                  }
                  docRef.update(a.firestore.FieldValue.arrayUnion(c));
                  response = false;
                }
              }
            });
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    } catch (e) {
      console.log(e);
    }
  }
  return response;
}

export async function changeVisibility(
  id: number | string,
  id_collection: number | string
) {
  let response = undefined;
  if (auth.currentUser !== null) {
    try {
      const docRef = db.collection("Collections").doc(id_collection.toString());
      await docRef.get().then((doc) => {
        if (doc.exists) {
          let result = doc.data();
          if (result.public) {
            result.public = false;
          } else {
            result.public = true;
          }
          docRef.update(a.firestore.FieldValue.arrayRemove(result));

          docRef.update(a.firestore.FieldValue.arrayUnion(result));
          response = true;
        } else {
          console.log("No such document!");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export async function getCollectionByID(id_Collection: number | string) {
  let response = undefined;
  let urlImageCollection = undefined;

  try {
    const docRef = db.collection("Collections").doc(id_Collection.toString());
    await docRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        response = data;
      } else {
      }
    });
  } catch (error) {}

  const t = async () => {
    console.log({ response: response });
    return await getImageCollection(response.data.imageName);
  };
  urlImageCollection = await t();
  return { response: response, url: urlImageCollection };
}

export async function getCollections() {
  let response = undefined;
  let arr = [];

  try {
    const docRef = await db
      .collection("Collections")
      .where("public", "==", true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          arr.push({ id: doc.id, data: doc.data() });
        });
        response = arr;
        console.log(arr);
      });
  } catch (error) {
    console.log(error);
  }

  return response;
}

//
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

//options collection bookmark and like
export async function checkBookMarkCollection(id: number | string) {
  const id_user_collection = await ConsultaID();
  let result = undefined;
  const docRef = db.collection("Collections_Saved").doc(id_user_collection);

  await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        console.log(data);

        result = data.Bookmark.find((e) => e.id === id);
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  return result;
}

export async function deleteBookMarkCollection(id: number | string) {
  const id_user_collection = await ConsultaID();
  return db
    .collection("Collections_Saved")
    .doc(id_user_collection)
    .update({
      Bookmark: a.firestore.FieldValue.arrayRemove({ id }),
    });
}

export async function saveBookMarkCollection(id: number | string) {
  const id_user_collection = await ConsultaID();
  return db
    .collection("Collections_Saved")
    .doc(id_user_collection)
    .update({
      Bookmark: a.firestore.FieldValue.arrayUnion({ id }),
    });
}

//like
export async function checkLikesCollections(id: number | string) {
  const id_user_collection = await ConsultaID();
  let result = undefined;
  const docRef = db.collection("Collections_Saved").doc(id_user_collection);

  await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        result = data.Like.find((e) => e.id === id);
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  return result;
}

export async function saveLikesCollections(id: number | string) {
  const id_user_collection = await ConsultaID();

  return db
    .collection("Collections_Saved")
    .doc(id_user_collection)
    .update({
      Like: a.firestore.FieldValue.arrayUnion({ id }),
    });
}

export async function deleteLikesColletions(id: number | string) {
  const id_user_collection = await ConsultaID();
  return db
    .collection("Collections_Saved")
    .doc(id_user_collection)
    .update({
      Like: a.firestore.FieldValue.arrayRemove({ id }),
    });
}

export async function getCollectionSaved() {
  const id_user_collection = await ConsultaID();

  let response = undefined;
  const docRef = db
    .collection("Collections_Saved")
    .doc(id_user_collection.toString());
  await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        response = data;
        // console.log(result)
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  return response;
}
