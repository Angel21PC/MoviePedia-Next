import React, { FC, useEffect, useState } from "react";

//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark, faEye } from "@fortawesome/free-solid-svg-icons";

//firebase
import { useAuth } from "../../../../firebase/AuthContext";

//Notification
import { store } from "react-notifications-component";

export interface M_B_FProps {
  id: string | number;
  title: string;
  userLikes: any;
}

const M_B_F: FC<M_B_FProps> = ({ id, title, userLikes }) => {
  //firebase
  const currentUser = useAuth();
  const {
    checkBookMarkCollection,
    deleteBookMarkCollection,
    saveBookMarkCollection,
    checkLikesCollections,
    saveLikesCollections,
    deleteLikesColletions,
    ConsultaID,
    collectionLike,
  } = useAuth();
  const [h, setH] = useState("eye");
  const [b, setB] = useState("bookmark");
  const [e, setE] = useState("heart");

  const [cont, setCont] = useState(userLikes.length);

  let bool = false;

  useEffect(() => {
    //checks
    async function c_heart() {
      if (currentUser.currentUser !== null) {
        let r = await checkLikesCollections(id);
        let bool = r === undefined ? (r = false) : (r = true);
        if (bool === true) {
          setH("heartcheck");
        }
      }
    }
    async function c_bookmark() {
      if (currentUser.currentUser !== null) {
        let r = await checkBookMarkCollection(id);
        let bool = r === undefined ? (r = false) : (r = true);
        if (bool === true) {
          setB("bookmarkcheck");
        }
      }
    }

    const c = async () => {
      if (currentUser.currentUser !== null) {
        const id = await ConsultaID();
        userLikes?.map((user) => (user === id ? (bool = true) : bool));

        if (bool === true) {
          console.log(true);
          setE("heartcheck");
        }
      }
    };

    const check = async () => {
      c_heart();
      c_bookmark();
      c();
    };

    check();
  }, [
    checkLikesCollections,
    currentUser.currentUser,
    checkBookMarkCollection,
    userLikes,
  ]);

  const like = async () => {
    const id_user = await ConsultaID();

    if (currentUser.currentUser !== null) {
      let response = await collectionLike(id, id_user);
      if (response != false) {
        setE("heartcheck");
      } else {
        setE("heart");
      }
      console.log("mira aqui");
      console.log(response);
    } else {
      store.addNotification({
        title: "Sorry",
        message: "You need to be login",
        type: "info",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOutUp"],
        dismiss: {
          duration: 2000,
          touch: true,
        },
      });
    }
  };

  async function handleSelect(e) {
    switch (e) {
      case "heart":
        await a_heart();
        break;
      case "bookmark":
        await a_bookmark();
        break;

      default:
        break;
    }
  }
  async function a_heart() {
    if (currentUser.currentUser !== null) {
      let r = await checkLikesCollections(id);
      let bool = r === undefined ? (r = false) : (r = true);
      if (bool === true) {
        setH("eye");

        deleteLikesColletions(id);
        store.addNotification({
          title: "Wonderful!",
          message: "Removed from to watch list",
          type: "warning",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOutUp"],
          dismiss: {
            duration: 2000,
            touch: true,
          },
        });
      } else {
        setH("eyecheck");
        saveLikesCollections(id);
        store.addNotification({
          title: "Wonderful!",
          message: "Added to watch list",
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOutUp"],
          dismiss: {
            duration: 2000,
            touch: true,
          },
        });
      }
    } else {
      store.addNotification({
        title: "Sorry",
        message: "You need to be login",
        type: "info",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOutUp"],
        dismiss: {
          duration: 2000,
          touch: true,
        },
      });
    }
  }

  async function a_bookmark() {
    if (currentUser.currentUser !== null) {
      let r = await checkBookMarkCollection(id);
      let bool = r === undefined ? (r = false) : (r = true);
      if (bool === true) {
        setB("bookmark");
        deleteBookMarkCollection(id);
        store.addNotification({
          title: "Wonderful!",
          message: "Removed from the bookmark list",
          type: "warning",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOutUp"],
          dismiss: {
            duration: 2000,
            touch: true,
          },
        });
      } else {
        setB("bookmarkcheck");
        saveBookMarkCollection(id);
        store.addNotification({
          title: "Wonderful!",
          message: "Added to like list",
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOutUp"],
          dismiss: {
            duration: 2000,
            touch: true,
          },
        });
      }
    } else {
      store.addNotification({
        title: "Sorry",
        message: "You need to be login",
        type: "info",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOutUp"],
        dismiss: {
          duration: 2000,
          touch: true,
        },
      });
    }
  }
  console.log({ fifififi: userLikes });
  return (
    <div className="d-flex">
      <h3>{title}</h3>
      <p className="pl-3 mt-1 ml-3">{cont}</p>
      <FontAwesomeIcon
        className="icon fa-2x"
        icon={faHeart}
        id={e}
        name="heart"
        onClick={() => like()}
      />
      <FontAwesomeIcon
        className="icon fa-2x"
        id={h}
        name="eye"
        icon={faEye}
        onClick={() => handleSelect("heart")}
      />
      <FontAwesomeIcon
        className="icon fa-2x"
        id={b}
        name="bookmark"
        icon={faBookmark}
        onClick={() => handleSelect("bookmark")}
      />
    </div>
  );
};

export default M_B_F;
