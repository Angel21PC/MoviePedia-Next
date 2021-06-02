import { auth, db, a } from "./index";
import { v1 as uuidv1 } from "uuid";
import { uploadImgCollection, getImageCollection } from "./Images";
import { resourceLimits } from "node:worker_threads";
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

async function ConsultaID() {
  let result = undefined;
  try {
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
  } catch (e) {}

  return result;
}

export async function pushNewCollection(
  title: string,
  description: string,
  user_email: string,
  objArray: any,
  publicC: boolean,
  file: any
) {
  const currentUser = auth.currentUser.email;
  const userId = await ConsultaID();
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
    user: userId,
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
            console.log(result);
            let nuestro_user_fue_encontrado = false;
            result.userLikes.map((u) => {
              if (u === user_giveLike) {
                nuestro_user_fue_encontrado = true;
              }
              response = nuestro_user_fue_encontrado;
            });
            if (nuestro_user_fue_encontrado === false) {
              //añadir Like

              result.userLikes.push(user_giveLike);

              response = true;
            } else {
              //elminar like

              const index = result.userLikes.indexOf(user_giveLike);
              if (index > -1) {
                result.userLikes.splice(index, 1);
              }

              response = false;
            }
            console.log({ userLike: result.userLikes });
            docRef.update({
              data: {
                date: result.data.date,
                objArray: result.data.objArray,
                description: result.data.description,
                title: result.data.title,
                imageName: result.data.imageName,
                user: result.data.user,
              },
              public: result.public,
              userLikes: result.userLikes,
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

export async function getCollectionsEmail(email: string) {
  let response = undefined;
  let arr = [];
  console.log(email);
  try {
    const docRef = await db
      .collection("Collections")
      .where("data.user", "==", email)
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

export async function editCollection(
  id: string,
  objArray: any,
  title: string,
  description: string,
  publicC: boolean,
  file: any
) {
  const currentUser = auth.currentUser.email;

  let response = undefined;
  let collectionData;
  const col = await db
    .collection("Collections")
    .doc(id)
    .get()
    .then((doc) => {
      collectionData = doc.data();
    });
  console.log(collectionData);
  try {
    if (file != undefined) {
      try {
        await uploadImgCollection(file, title);
      } catch (e) {
        console.log(e);
      }
      const docRef = db
        .collection("Collections")
        .doc(id)
        .update({
          data: {
            date: collectionData.data.date,
            objArray: objArray,
            description: description,
            title: title,
            imageName: currentUser + title,
            user: collectionData.data.user,
          },
          public: publicC,
          userLikes: collectionData.userLikes,
        });
    } else {
      const docRef = db
        .collection("Collections")
        .doc(id)
        .update({
          data: {
            date: collectionData.data.date,
            objArray: objArray,
            description: description,
            title: title,
            imageName: collectionData.data.imageName,
            user: collectionData.data.user,
          },
          public: publicC,
          userLikes: collectionData.userLikes,
        });
    }
  } catch (error) {
    console.log(error);
  }

  return response;
}

export async function removeCollection(id: string) {
  const docRef = await db.collection("Collections").doc(id).delete();
}

export async function getCollectionsByDate() {
  let response = undefined;
  let arr = [];

  try {
    const docRef = await db
      .collection("Collections")
      .where("public", "==", true)
      .orderBy("data.date")
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

export async function getCollectionsByLike() {
  let response = undefined;
  let arr = [];

  try {
    const docRef = await db
      .collection("Collections")
      .where("public", "==", true)
      .orderBy("userLikes", "asc")
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
