import { auth, db, a } from "./index";

// id_collection{
//     userName: string
//     description: string
//     collections_created: bool getCollectionsEmail()
//     collections_saved: bool getCollectionSaved()

//     Bookmark: bool {
//     Like: bool           se hacen
//     Eye: bool }
// }

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

export async function getDataUser(id) {
  let response = undefined;
  const docRef = db.collection("Profile_Public").doc(id.toString());
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

//edit public
export async function editPublicData(obj: any) {
  let response = undefined;
  console.log(obj);
  try {
    let user = await ConsultaID();
    let data;
    const col = await db
      .collection("Profile_Public")
      .doc(user)
      .get()
      .then((doc) => {
        data = doc.data();
        console.log(doc.data());
      });
    const docRef = await db.collection("Profile_Public").doc(user).update({
      userName: data.userName,
      description: data.description,
      collections_created: data.collections_created,
      collections_saved: data.collections_saved,
      Bookmark: obj.Bookmark,
      Like: obj.Like,
      Eye: obj.Eye,
    });
    response = true;
  } catch (error) {
    console.log(error);
  }
  return response;
}

//edit user
export async function updateNameandDescription(uid) {
  let response = undefined;

  try {
    let user = await ConsultaID();
    let data;
    const col = await db
      .collection("profile")
      .doc(uid)
      .get()
      .then((doc) => {
        data = doc.data();
      });

    let data2;
    const col2 = await db
      .collection("Profile_Public")
      .doc(user)
      .get()
      .then((doc) => {
        data2 = doc.data();
      });
    console.log({ data: data, data2: data2 });
    const docRef = await db.collection("Profile_Public").doc(user).update({
      username: data.username.username,
      description: data.description.description,
      collections_created: data2.collections_created,
      collections_saved: data2.collections_saved,
      Bookmark: data2.Bookmark,
      Like: data2.Like,
      Eye: data2.Eye,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getBookmark_TVMovie(id_user_collection) {
  let response = undefined;
  try {
    let result = {
      Tv: [],
      Movie: [],
    };
    const bookmarkTV = db.collection("bookmark_TV").doc(id_user_collection);
    await bookmarkTV
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          result.Tv.push(data);
          //console.log(result)
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    const bookmarkMovie = db.collection("bookmark_M").doc(id_user_collection);
    await bookmarkMovie
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          result.Movie.push(data);
          //console.log(result)
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    response = result;
  } catch (error) {
    console.log(error);
  }
  return response;
}

export async function getLike_TVMovie(id_user_collection) {
  let response = undefined;
  try {
    let result = {
      Tv: [],
      Movie: [],
    };
    const likesTV = db.collection("likes_TV").doc(id_user_collection);
    await likesTV
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          result.Tv.push(data);
          //console.log(result)
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    const LikesMovie = db.collection("likes_M").doc(id_user_collection);
    await LikesMovie.get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          result.Movie.push(data);
          //console.log(result)
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    response = result;
  } catch (error) {
    console.log(error);
  }
  return response;
}

export async function getEye_TVMovie(id_user_collection) {
  let response = undefined;
  try {
    let result = {
      Tv: [],
      Movie: [],
    };
    const eyeTV = db.collection("eye_TV").doc(id_user_collection);
    await eyeTV
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          result.Tv.push(data);
          //console.log(result)
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    const eyeMovie = db.collection("eye_M").doc(id_user_collection);
    await eyeMovie
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          result.Movie.push(data);
          //console.log(result)
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    response = result;
  } catch (error) {
    console.log(error);
  }
  return response;
}

// export async function findUserbyName(name) {
//   let response = undefined;
//   const docRef = db
//     .collection("Profile_Public")
//     .where("username", "==", name.toSting());
//   await docRef
//     .get()
//     .then((doc) => {
//       if (doc.exists) {
//         const data = doc.data();
//         response = data;
//         console.log(result);
//       } else {
//         console.log("No such document!");
//       }
//     })
//     .catch((error) => {
//       console.log("Error getting document:", error);
//     });

//   return response;
// }
