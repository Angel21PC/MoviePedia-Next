import { auth, db, a } from "./index";

export async function checkProviderUser() {
  let user = auth.currentUser;
  let provider = undefined;
  if (user != null) {
    user.providerData.forEach(function (profile) {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);
      provider = profile.providerId;
    });
  }
  return provider;
}

export async function getProviderPhotoURL() {
  let user = auth.currentUser;
  let url = undefined;
  if (user != null) {
    user.providerData.forEach(function (profile) {
      url = profile.photoURL;
    });
  }
  return url;
}
