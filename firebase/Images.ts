import { auth, db, a } from "./index";

export async function uploadImg(imageAsFile: any) {
  const currentUser = auth.currentUser.uid;
  //   let storageRef = a.storage().ref();
  //   let profileImg = storageRef.child(currentUser + "profile.jpg");
  //   let profileImgRef = storageRef.child(
  //     "profile/" + currentUser + "profile.jpg"
  //   );
  //   profileImgRef.put(image).then(function (snapshot) {
  //     console.log("Works!");
  //   });
  let storage = a.storage();
  console.log("start of upload");
  // async magic goes here...
  if (imageAsFile === "") {
    console.error(`not an image, the image file is a ${typeof imageAsFile}`);
  }
  const uploadTask = storage.ref(`/images/${currentUser}`).put(imageAsFile);
  //initiates the firebase side uploading
  uploadTask.on(
    "state_changed",
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      console.log(snapShot);
    },
    (err) => {
      //catches the errors
      console.log(err);
    },
    () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      storage
        .ref("images")
        .child(currentUser + imageAsFile.name)
        .getDownloadURL()
        .then((fireBaseUrl) => {
          return fireBaseUrl;
        });
    }
  );
}

export async function getImageUrl() {
  const currentUser = auth.currentUser.uid;
  let storage = a.storage();
  let url;
  await storage
    .ref("images")
    .child(currentUser)
    .getDownloadURL()
    .then((fireBaseUrl) => {
      url = fireBaseUrl;
    });

  return url;
}
