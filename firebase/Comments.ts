import { auth, db, a } from "./index";
import { v1 as uuidv1 } from "uuid";

async function ConsultaID() {
  let result = undefined;
  try {
    const docRef = db.collection("profile").doc(auth.currentUser.uid);
    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          console.log({ aaaaaaaaaaaaaaaaa: data });
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

export async function getCommentsM(id) {
  let response = undefined;

  try {
    const docRef = db.collection("comments_M").doc(id.toString());
    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          response = data;
        } else {
          console.log("No such document!");
          db.collection("comments_M").doc(id.toString()).set({
            comments: [],
          });
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  } catch {
    // db.collection("comments_M").doc(id.toString()).set({
    //     comments:[],
    //   });
  }

  return response;
}

export async function pushNewCommentsM(
  id: number | string,
  text: string,
  user_email: string
) {
  const today = new Date();
  const user = await ConsultaID();
  const comb = [id, text, user_email, today];
  // const id_coment = uuidv5(comb,uuidv5.URL);

  const id_coment = uuidv1();

  const dataComent = {
    text: text,
    id_coment: id_coment,
    user: user,
    date: today,
  };
  const newComent = {
    data: dataComent,
    userLikes: [],
  };
  if (auth.currentUser !== null) {
    try {
      const docRef = db.collection("comments_M").doc(id.toString());
      await docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            docRef.update({
              comments: a.firestore.FieldValue.arrayUnion({ newComent }),
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
}

export async function commentLike(
  id_film: number | string,
  commentLike: string
) {
  let response = undefined;
  try {
    const docRef = db.collection("comments_M").doc(id_film.toString());
    const user_giveLike = await ConsultaID();
    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          let result = doc.data();
          let num_likes = 0;

          result.comments?.map((c) => {
            if (c.newComent.data.id_coment == commentLike) {
              response = "c";

              let nuestro_user_fue_encontrado = false;
              c.newComent.userLikes?.map((u) => {
                if (u === user_giveLike) {
                  nuestro_user_fue_encontrado = true;
                }
                response = nuestro_user_fue_encontrado;
              });
              if (nuestro_user_fue_encontrado === false) {
                //añadir like
                docRef.update({
                  comments: a.firestore.FieldValue.arrayRemove({
                    newComent: c.newComent,
                  }),
                });
                c.newComent.userLikes.push(user_giveLike);

                docRef.update({
                  comments: a.firestore.FieldValue.arrayUnion({
                    newComent: c.newComent,
                  }),
                });
                response = true;
              } else {
                //eliminar like
                docRef.update({
                  comments: a.firestore.FieldValue.arrayRemove({
                    newComent: c.newComent,
                  }),
                });
                const index = c.newComent.userLikes.indexOf(user_giveLike);
                if (index > -1) {
                  c.newComent.userLikes.splice(index, 1);
                }
                docRef.update({
                  comments: a.firestore.FieldValue.arrayUnion({
                    newComent: c.newComent,
                  }),
                });
                response = false;
              }
            }
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("F:", error);
      });
  } catch (e) {
    console.log(e);
  }
  return response;
}

//tv
export async function getCommentsTV(id) {
  let response = undefined;

  try {
    const docRef = db.collection("comments_TV").doc(id.toString());
    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          response = data;
        } else {
          console.log("No such document!");
          db.collection("comments_TV").doc(id.toString()).set({
            comments: [],
          });
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  } catch {
    // db.collection("comments_M").doc(id.toString()).set({
    //     comments:[],
    //   });
  }

  return response;
}
export async function pushNewCommentsTV(
  id: number | string,
  text: string,
  user_email: string
) {
  const today = new Date();
  const user = await ConsultaID();
  const comb = [id, text, user_email, today];
  // const id_coment = uuidv5(comb,uuidv5.URL);

  const id_coment = uuidv1();

  const dataComent = {
    text: text,
    id_coment: id_coment,
    user: user,
    date: today,
  };
  const newComent = {
    data: dataComent,
    userLikes: [],
  };
  if (auth.currentUser !== null) {
    try {
      const docRef = db.collection("comments_TV").doc(id.toString());
      await docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            docRef.update({
              comments: a.firestore.FieldValue.arrayUnion({ newComent }),
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
}
export async function commentLikeTV(
  id_film: number | string,
  commentLike: string
) {
  let response = undefined;
  try {
    const user_giveLike = await ConsultaID();
    const docRef = db.collection("comments_TV").doc(id_film.toString());

    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          let result = doc.data();
          let num_likes = 0;

          result.comments?.map((c) => {
            if (c.newComent.data.id_coment == commentLike) {
              response = "c";

              let nuestro_user_fue_encontrado = false;
              c.newComent.userLikes?.map((u) => {
                if (u === user_giveLike) {
                  nuestro_user_fue_encontrado = true;
                }
                response = nuestro_user_fue_encontrado;
              });
              if (nuestro_user_fue_encontrado === false) {
                //añadir like
                docRef.update({
                  comments: a.firestore.FieldValue.arrayRemove({
                    newComent: c.newComent,
                  }),
                });
                c.newComent.userLikes.push(user_giveLike);

                docRef.update({
                  comments: a.firestore.FieldValue.arrayUnion({
                    newComent: c.newComent,
                  }),
                });
                response = true;
              } else {
                //eliminar like
                docRef.update({
                  comments: a.firestore.FieldValue.arrayRemove({
                    newComent: c.newComent,
                  }),
                });
                const index = c.newComent.userLikes.indexOf(user_giveLike);
                if (index > -1) {
                  c.newComent.userLikes.splice(index, 1);
                }
                docRef.update({
                  comments: a.firestore.FieldValue.arrayUnion({
                    newComent: c.newComent,
                  }),
                });
                response = false;
              }
            }
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("F:", error);
      });
  } catch (e) {
    console.log(e);
  }
  return response;
}

export async function getEmailIDColl(id: string) {
  let response = undefined;
  let arr = "";
  console.log("DDD");
  console.log(`${"id."}${id}`);
  try {
    const docRef = await db
      .collection("profile")
      .where("collections_id.id", "==", id.toString())
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          arr = doc.data().email.email;
        });
        response = arr;
        console.log(arr);
      });
  } catch (error) {
    console.log(error);
  }

  return response;
}
