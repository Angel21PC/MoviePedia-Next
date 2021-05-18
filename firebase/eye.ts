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

export async function checkEye_M(id) {
  const id_user_collection = await ConsultaID();
  let listConvert = {
    toFirestore: function () {
      return {
        id: id,
      };
    },
    fromFirestore: function (snapshot, options) {
      const data = snapshot.data(options);
      return data;
    },
  };

  let check = undefined;
  await db
    .collection("eye_M")
    .doc(id_user_collection)
    .withConverter(listConvert)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let result = doc.data();

        console.log(id);
        result.list?.map((m) => {
          console.log(m);
          if (m.id === id) {
            console.log("mmmmmmmmmmmmm");
            check = m;
          }
        });
      }
    });

  return check;
}

export async function deleteEye_M(id) {
  const id_user_collection = await ConsultaID();
  let listConvert = {
    toFirestore: function () {
      return {
        id: id,
      };
    },
    fromFirestore: function (snapshot, options) {
      const data = snapshot.data(options);
      return data;
    },
  };

  return db
    .collection("eye_M")
    .doc(id_user_collection)
    .withConverter(listConvert)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let result = doc.data();
        let check = undefined;

        result.list?.map((m) => {
          if (m.id === id) {
            check = m;
          }
        });

        console.log(check);
        if (check !== undefined) {
          db.collection("eye_M")
            .doc(id_user_collection)
            .update({
              list: a.firestore.FieldValue.arrayRemove(check),
            });
        }
      }
    });
}

export async function saveEye_M(id, date, genres, release_date, title) {
  const id_user_collection = await ConsultaID();
  let listConvert = {
    toFirestore: function () {
      return {
        id: id,
        date: date,
        genre: genres,
        release_date: release_date,
        title: title,
      };
    },
    fromFirestore: function (snapshot, options) {
      const data = snapshot.data(options);
      return data;
    },
  };

  return db
    .collection("eye_M")
    .doc(id_user_collection)
    .withConverter(listConvert)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let result = doc.data();
        let check = false;

        result.list?.map((m) => {
          if (m.id === id) {
            check = true;
          }
        });

        if (check == false) {
          console.log("entro ");
          db.collection("eye_M")
            .doc(id_user_collection)
            .update({
              list: a.firestore.FieldValue.arrayUnion({
                id,
                date,
                genres,
                release_date,
                title,
              }),
            });
        }
      }
    });
}
//tv

export async function checkEye_TV(id) {
  const id_user_collection = await ConsultaID();
  let listConvert = {
    toFirestore: function () {
      return {
        id: id,
      };
    },
    fromFirestore: function (snapshot, options) {
      const data = snapshot.data(options);
      return data;
    },
  };

  let check = undefined;
  await db
    .collection("eye_TV")
    .doc(id_user_collection)
    .withConverter(listConvert)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let result = doc.data();

        console.log(id);
        result.list?.map((m) => {
          console.log(m);
          if (m.id === id) {
            console.log("mmmmmmmmmmmmm");
            check = m;
          }
        });
      }
    });

  return check;
}

export async function deleteEye_TV(id) {
  const id_user_collection = await ConsultaID();
  let listConvert = {
    toFirestore: function () {
      return {
        id: id,
      };
    },
    fromFirestore: function (snapshot, options) {
      const data = snapshot.data(options);
      return data;
    },
  };

  return db
    .collection("eye_TV")
    .doc(id_user_collection)
    .withConverter(listConvert)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let result = doc.data();
        let check = undefined;

        result.list?.map((m) => {
          if (m.id === id) {
            check = m;
          }
        });

        console.log(check);
        if (check !== undefined) {
          db.collection("eye_TV")
            .doc(id_user_collection)
            .update({
              list: a.firestore.FieldValue.arrayRemove(check),
            });
        }
      }
    });
}

export async function saveEye_TV(id, date) {
  const id_user_collection = await ConsultaID();
  let listConvert = {
    toFirestore: function () {
      return {
        id: id,
        date: date,
      };
    },
    fromFirestore: function (snapshot, options) {
      const data = snapshot.data(options);
      return data;
    },
  };

  return db
    .collection("eye_TV")
    .doc(id_user_collection)
    .withConverter(listConvert)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let result = doc.data();
        let check = false;

        result.list?.map((m) => {
          if (m.id === id) {
            check = true;
          }
        });

        if (check == false) {
          console.log("entro ");
          db.collection("eye_TV")
            .doc(id_user_collection)
            .update({
              list: a.firestore.FieldValue.arrayUnion({ id, date }),
            });
        }
      }
    });
}
