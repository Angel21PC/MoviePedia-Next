import { auth, db, a } from "./index";

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
async function deleteData(collections_id) {
  //collections
  await db
    .collection("Collections")
    .where("data.user", "==", collections_id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        db.collection("Collections").doc(doc.id).delete();
      });
    });

  await db.collection("Collections_Saved").doc(collections_id).delete();
  //   //bookmark
  await db.collection("bookmark_M").doc(collections_id).delete();
  await db.collection("bookmark_TV").doc(collections_id).delete();
  //comments
  const docRef = await db.collection("comments_M");
  await docRef.get().then((doc) => {
    doc.docs.map(async (doc) => {
      const Com = await db.collection("comments_M").doc(doc.id);
      await Com.get().then((data) => {
        let result = data.data();
        if (data.exists) {
          result?.comments?.map((c) => {
            if (c.newComent.data.user == collections_id) {
              //   console.log("encontrado");
              Com.update({
                comments: a.firestore.FieldValue.arrayRemove({
                  newComent: c.newComent,
                }),
              });
            }
          });
        }
      });
    });
  });
  const docRef2 = await db.collection("comments_TV");
  await docRef2.get().then((doc) => {
    doc.docs.map(async (doc) => {
      const Com = await db.collection("comments_TV").doc(doc.id);
      await Com.get().then((data) => {
        let result = data.data();
        if (data.exists) {
          result?.comments?.map((c) => {
            if (c.newComent.data.user == collections_id) {
              //   console.log("encontrado");
              Com.update({
                comments: a.firestore.FieldValue.arrayRemove({
                  newComent: c.newComent,
                }),
              });
            }
          });
        }
      });
    });
  });
  //critics
  const docRefC = await db.collection("critica_M");
  await docRef.get().then((doc) => {
    doc.docs.map(async (doc) => {
      const Com = await db.collection("critica_M").doc(doc.id);
      await Com.get().then((data) => {
        let result = data.data();
        if (data.exists) {
          result?.critics?.map((c) => {
            if (c.newCritic.data.user == collections_id) {
              //   console.log("encontrado");
              Com.update({
                critics: a.firestore.FieldValue.arrayRemove({
                  newCritic: c.newCritic,
                }),
              });
            }
          });
        }
      });
    });
  });
  const docRefC2 = await db.collection("critica_TV");
  await docRefC2.get().then((doc) => {
    doc.docs.map(async (doc) => {
      const Com = await db.collection("critica_TV").doc(doc.id);
      await Com.get().then((data) => {
        let result = data.data();
        if (data.exists) {
          result?.critics?.map((c) => {
            if (c.newCritic.data.user == collections_id) {
              //   console.log("encontrado");
              Com.update({
                critics: a.firestore.FieldValue.arrayRemove({
                  newCritic: c.newCritic,
                }),
              });
            }
          });
        }
      });
    });
  });
  //eye
  await db.collection("eye_M").doc(collections_id).delete();
  await db.collection("eye_TV").doc(collections_id).delete();
  //like
  await db.collection("likes_M").doc(collections_id).delete();
  await db.collection("likes_TV").doc(collections_id).delete();
}

export async function deleteAccount() {
  let result = undefined;
  let collections_id = await ConsultaID();
  let uid = auth.currentUser.uid;
  try {
    await deleteData(collections_id)
      .then(async () => {
        await db.collection("profile").doc(uid).delete();
      })
      .then(async () => {
        await db.collection("Profile_Public").doc(uid).delete();
      })
      .then(async () => {
        await auth.currentUser.delete();
      });
  } catch (e) {
    console.log(e);
  }

  return result;
}
