import React, { FC, useEffect, useState } from "react";

//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark, faEye } from "@fortawesome/free-solid-svg-icons";

//firebase
import { useAuth } from "../../../firebase/AuthContext";

//Notification
import { store } from "react-notifications-component";

export interface M_B_FProps {
  movie: any;
}

const M_B_F: FC<M_B_FProps> = ({ movie }) => {
  //firebase
  const currentUser = useAuth();
  const {
    saveLike_M,
    checkLikes_M,
    deleteLike_M,
    saveBookMark_M,
    deleteBookMark_M,
    checkBookMark_M,
    checkEye_M,
    deleteEye_M,
    saveEye_M,
  } = useAuth();

  const [h, setH] = useState("heart");
  const [b, setB] = useState("bookmark");
  const [e, setE] = useState("eye");

  useEffect(() => {
    //checks
    async function c_heart() {
      if (currentUser.currentUser !== null) {
        let r = await checkLikes_M(movie.id);
        let bool = r === undefined ? (r = false) : (r = true);
        if (bool === true) {
          setH("heartcheck");
        }
      }
    }
    async function c_bookmark() {
      if (currentUser.currentUser !== null) {
        let r = await checkBookMark_M(movie.id);
        let bool = r === undefined ? (r = false) : (r = true);
        if (bool === true) {
          setB("bookmarkcheck");
        }
      }
    }

    async function c_eye() {
      if (currentUser.currentUser !== null) {
        let r = await checkEye_M(movie.id);
        let bool = r === undefined ? (r = false) : (r = true);
        if (bool === true) {
          setE("eyecheck");
        }
      }
    }

    const check = async () => {
      c_heart();
      c_bookmark();
      c_eye();
    };

    check();
  }, [checkLikes_M, currentUser.currentUser, checkBookMark_M]);

  async function handleSelect(e) {
    switch (e) {
      case "heart":
        await a_heart();
        break;
      case "bookmark":
        await a_bookmark();
        break;
      case "eye":
        await a_eye();
        break;
      default:
        break;
    }
  }

  async function a_heart() {
    if (currentUser.currentUser !== null) {
      let r = await checkLikes_M(movie.id);
      let bool = r === undefined ? (r = false) : (r = true);
      if (bool === true) {
        setH("heart");
        deleteLike_M(movie.id);
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
        saveLike_M(movie.id);
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
      let r = await checkBookMark_M(movie.id);
      let bool = r === undefined ? (r = false) : (r = true);
      if (bool === true) {
        setB("bookmark");
        deleteBookMark_M(movie.id);
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
        saveBookMark_M(movie.id);
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

  async function a_eye() {
    if (currentUser.currentUser !== null) {
      let r = await checkEye_M(movie.id);
      let bool = r === undefined ? (r = false) : (r = true);
      if (bool === true) {
        setE("eye");
        deleteEye_M(movie.id);
        store.addNotification({
          title: "Wonderful!",
          message: "Removed from the to watch list",
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
        setE("eyecheck");
        const today = new Date();
        //console.log(movie.title);
        saveEye_M(
          movie.id,
          today,
          movie.genres,
          movie.release_date,
          movie.title
        );
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

  return (
    <>
      <div className="d-flex">
        <h3>{movie?.title}</h3>
        <h5 className="ml-3 mt-1">({movie?.release_date.slice(0, 4)})</h5>
      </div>

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
      <FontAwesomeIcon
        className="icon fa-2x"
        id={e}
        name="eye"
        icon={faEye}
        onClick={() => handleSelect("eye")}
      />
    </>
  );
};

export default M_B_F;
