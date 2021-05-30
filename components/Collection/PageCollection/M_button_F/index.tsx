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
}

const M_B_F: FC<M_B_FProps> = ({ id, title }) => {
  //firebase
  const currentUser = useAuth();
  const {
    checkBookMarkCollection,
    deleteBookMarkCollection,
    saveBookMarkCollection,
    checkLikesCollections,
    saveLikesCollections,
    deleteLikesColletions,
  } = useAuth();
  const [h, setH] = useState("heart");
  const [b, setB] = useState("bookmark");

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

    const check = async () => {
      c_heart();
      c_bookmark();
    };

    check();
  }, [checkLikesCollections, currentUser.currentUser, checkBookMarkCollection]);

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
        setH("heart");
        deleteLikesColletions(id);
        store.addNotification({
          title: "Wonderful!",
          message: "Removed from the like list",
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
        setH("heartcheck");
        saveLikesCollections(id);
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

  async function a_bookmark() {
    if (currentUser.currentUser !== null) {
      let r = await checkBookMarkCollection(id);
      let bool = r === undefined ? (r = false) : (r = true);
      if (bool === true) {
        setB("bookmark");
        deleteBookMarkCollection(id);
        store.addNotification({
          title: "Wonderful!",
          message: "Removed from the likes list",
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
  return (
    <div className="d-flex">
      <h3>{title}</h3>
      <FontAwesomeIcon
        className="icon fa-2x"
        id={h}
        name="heart"
        icon={faHeart}
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
