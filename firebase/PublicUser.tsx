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

  try {
    let user = await ConsultaID();
    let data;
    const col = await db
      .collection("Collections")
      .doc(user)
      .get()
      .then((doc) => {
        data = doc.data();
      });
    const docRef = await db
      .collection("Profile_Public")
      .doc(user)
      .update({
        userName: data.name,
        description: data.description,
        ...obj,
      });
    response = true;
  } catch (error) {
    console.log(error);
  }
  return response;
}

//edit user
export async function updateNameandDescription(
  name: string,
  description: string
) {
  let response = undefined;

  try {
    let user = await ConsultaID();
    let data;
    const col = await db
      .collection("Collections")
      .doc(user)
      .get()
      .then((doc) => {
        data = doc.data();
      });
    const docRef = await db
      .collection("Profile_Public")
      .doc(user)
      .update({
        userName: name,
        description: description,
        ...data,
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
    const LikesMovie = db.collection("Likes_M").doc(id_user_collection);
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
}
