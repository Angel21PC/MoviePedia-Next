import { profile } from "node:console";
import { auth, db, a } from "./index";

export async function uploadImg(image: any) {
  console.log(image);
  const currentUser = auth.currentUser.uid;
  let storageRef = a.storage().ref();
  let profileImg = storageRef.child(currentUser + "profile.jpg");
  let profileImgRef = storageRef.child(
    "profile/" + currentUser + "profile.jpg"
  );
  profileImgRef.put(image).then(function (snapshot) {
    console.log("Works!");
  });
}
