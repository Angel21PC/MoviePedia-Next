import { auth, db, a } from "./index";
import { v1 as uuidv1 } from "uuid";

export async function getCritics(id) {
  let response = undefined;
  try {
    const docRef = db.collection("critica_M").doc(id.toString());
    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          response = data;
        } else {
          console.log("No such document!");
          db.collection("critica_M").doc(id.toString()).set({
            critics: [],
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

export async function getMinCritic(id_film: string | number) {
  let response = undefined;
  let minArray = [];

  if (auth.currentUser !== null) {
    try {
      const docRef = db.collection("critica_M").doc(id_film.toString());
      await docRef.get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          data.critics.map((e) => {
            let objCritic = {
              title: e.newCritic.data.title,
              creator: e.newCritic.data.user,
              date: e.newCritic.data.date,
              id_critic: e.newCritic.data.id_critic,
            };
            minArray.push(objCritic);
          });
          response = minArray;
        } else {
          console.log("No such document!");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  return response;
}

export async function pushNewCriticM(
  id: number | string,
  title: string,
  html: string,
  user_email: string
) {
  const today = new Date();

  const id_critic = uuidv1();

  const dataCritic = {
    title: title,
    html: html,
    id_critic: id_critic,
    user: auth.currentUser.email,
    date: today,
  };
  const newCritic = {
    data: dataCritic,
    userLikes: [],
  };
  if (auth.currentUser !== null) {
    try {
      const docRef = db.collection("critica_M").doc(id.toString());
      await docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            docRef.update({
              critics: a.firestore.FieldValue.arrayUnion({ newCritic }),
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

export async function criticLike(
  id_film: number | string,
  user_giveLike: string,
  criticLike: string
) {
  let response = undefined;
  try {
    const docRef = db.collection("critica_M").doc(id_film.toString());

    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          let result = doc.data();
          let num_likes = 0;

          result.comments?.map((c) => {
            if (c.newCritic.data.id_critic == criticLike) {
              response = "c";

              let nuestro_user_fue_encontrado = false;
              c.newCritic.userLikes?.map((u) => {
                if (u === user_giveLike) {
                  nuestro_user_fue_encontrado = true;
                }
                response = nuestro_user_fue_encontrado;
              });
              if (nuestro_user_fue_encontrado === false) {
                //añadir like
                docRef.update({
                  critics: a.firestore.FieldValue.arrayRemove({
                    newCritic: c.newCritic,
                  }),
                });
                c.newCritic.userLikes.push(user_giveLike);

                docRef.update({
                  critics: a.firestore.FieldValue.arrayUnion({
                    newCritic: c.newCritic,
                  }),
                });
                response = true;
              } else {
                //eliminar like
                docRef.update({
                  comments: a.firestore.FieldValue.arrayRemove({
                    newCritic: c.newCritic,
                  }),
                });
                const index = c.newCritic.userLikes.indexOf(user_giveLike);
                if (index > -1) {
                  c.newCritic.userLikes.splice(index, 1);
                }
                docRef.update({
                  comments: a.firestore.FieldValue.arrayUnion({
                    newCritic: c.newCritic,
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

export async function getListCritics(id_film: number | string) {
  let response = undefined;
  try {
    const docRef = db.collection("critica_M").doc(id_film.toString());

    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          let result = doc.data();
          let arrayCritics = [];
          result.critics?.map((c) => {
            let newMinCritic = {
              ...c.newCritic.data.user,
              ...c.newCritic.data.title,
            };
            arrayCritics.push(newMinCritic);
          });
          response = arrayCritics;
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
