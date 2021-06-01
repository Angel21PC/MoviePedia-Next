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

export async function uploadImgProfile(imageAsFile: any) {
  const currentUser = await ConsultaID();
  let storage = a.storage();
  console.log("start of upload");

  if (imageAsFile === "") {
    console.error(`not an image, the image file is a ${typeof imageAsFile}`);
  }
  const uploadTask = storage
    .ref(`/imagesProfile/${currentUser}`)
    .put(imageAsFile);

  uploadTask.on(
    "state_changed",
    (snapShot) => {
      console.log(snapShot);
    },
    (err) => {
      console.log(err);
    },
    () => {
      storage
        .ref("imagesProfile")
        .child(currentUser + imageAsFile.name)
        .getDownloadURL()
        .then((fireBaseUrl) => {
          return fireBaseUrl;
        });
    }
  );
}

export async function getImageUrlProfile() {
  const currentUser = await ConsultaID();
  let storage = a.storage();
  let url = "";

  await storage
    .ref("imagesProfile")
    .child(currentUser)
    .getDownloadURL()
    .then((fireBaseUrl) => {
      url = fireBaseUrl;
    });

  return url;
}

export async function getImageUser(email: string) {
  let storage = a.storage();
  let url;
  await storage
    .ref("imagesProfile")
    .child(email)
    .getDownloadURL()
    .then((fireBaseUrl) => {
      url = fireBaseUrl;
    });

  return url;
}

export async function getImageCollection(id_image: string) {
  let storage = a.storage();
  let url;
  await storage
    .ref("imagesCollections")
    .child(id_image)
    .getDownloadURL()
    .then((fireBaseUrl) => {
      url = fireBaseUrl;
    });

  return url;
}

export async function uploadImgCollection(imageAsFile: any, title: string) {
  const currentUser = auth.currentUser.email;
  let storage = a.storage();
  console.log("start of upload");

  if (imageAsFile === "") {
    console.error(`not an image, the image file is a ${typeof imageAsFile}`);
  }
  const uploadTask = storage
    .ref(`/imagesCollections/${currentUser + title}`)
    .put(imageAsFile);

  uploadTask.on(
    "state_changed",
    (snapShot) => {
      console.log(snapShot);
    },
    (err) => {
      console.log(err);
    }
  );
}
