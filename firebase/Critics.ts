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
export async function getCritics(id_movie, id_critic) {
  let response = undefined;
  console.log(id_critic, id_movie);
  try {
    const docRef = db.collection("critica_M").doc(id_movie.toString());
    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          data.critics.map((c) =>
            c.newCritic.data.id_critic == id_critic.toString()
              ? (response = c)
              : c
          );
        } else {
          console.log("No such document!");
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
            userLikes: e.newCritic.userLikes,
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

  return response;
}

export async function pushNewCriticM(
  id: number | string,
  title: string,
  html: string,
  user_email: string
) {
  const today = new Date();
  const user = await ConsultaID();
  const id_critic = uuidv1();

  const dataCritic = {
    title: title,
    html: html,
    id_critic: id_critic,
    user: user,
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
            docRef.set({
              critics: a.firestore.FieldValue.arrayUnion({ newCritic }),
            });
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

export async function criticLike(id_film: number | string, criticLike: string) {
  let response = undefined;
  try {
    const user_giveLike = await ConsultaID();
    const docRef = db.collection("critica_M").doc(id_film.toString());

    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          let result = doc.data();
          let num_likes = 0;

          result.critics?.map((c) => {
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

//TV
export async function getCriticsTV(id_movie, id_critic) {
  let response = undefined;
  console.log(id_critic, id_movie);
  try {
    const docRef = db.collection("critica_TV").doc(id_movie.toString());
    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          data.critics.map((c) =>
            c.newCritic.data.id_critic == id_critic.toString()
              ? (response = c)
              : c
          );
        } else {
          console.log("No such document!");
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

export async function getMinCriticTV(id_film: string | number) {
  let response = undefined;
  let minArray = [];

  try {
    const docRef = db.collection("critica_TV").doc(id_film.toString());
    await docRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        data.critics.map((e) => {
          let objCritic = {
            title: e.newCritic.data.title,
            creator: e.newCritic.data.user,
            date: e.newCritic.data.date,
            id_critic: e.newCritic.data.id_critic,
            userLikes: e.newCritic.userLikes,
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

  return response;
}

export async function pushNewCriticTV(
  id: number | string,
  title: string,
  html: string,
  user_email: string
) {
  const today = new Date();
  const user = await ConsultaID();
  const id_critic = uuidv1();

  const dataCritic = {
    title: title,
    html: html,
    id_critic: id_critic,
    user: user,
    date: today,
  };
  const newCritic = {
    data: dataCritic,
    userLikes: [],
  };
  if (auth.currentUser !== null) {
    try {
      const docRef = db.collection("critica_TV").doc(id.toString());
      await docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            docRef.update({
              critics: a.firestore.FieldValue.arrayUnion({ newCritic }),
            });
          } else {
            docRef.set({
              critics: a.firestore.FieldValue.arrayUnion({ newCritic }),
            });
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

export async function criticLikeTV(
  id_film: number | string,
  criticLike: string
) {
  let response = undefined;
  try {
    const user_giveLike = await ConsultaID();
    const docRef = db.collection("critica_TV").doc(id_film.toString());

    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          let result = doc.data();
          let num_likes = 0;

          result.critics?.map((c) => {
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

export async function getListCriticsTV(id_film: number | string) {
  let response = undefined;
  try {
    const docRef = db.collection("critica_TV").doc(id_film.toString());

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
