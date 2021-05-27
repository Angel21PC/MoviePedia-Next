import { auth, db, a } from "./index";
import { v1 as uuidv1 } from "uuid";
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
  publicC: boolean
) {
  let response = undefined;
  const today = new Date();

  const id_Collection = uuidv1();

  const dataCollection = {
    title: title,
    description: description,
    objArray: objArray,
    user: user_email,
    date: today,
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
      const docRef = db.collection("critica_M").doc(id_collection.toString());
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
      const docRef = db.collection("critica_M").doc(id_collection.toString());
      await docRef.get().then((doc) => {
        if (doc.exists) {
        } else {
        }
      });
    } catch (error) {}
  }
}
