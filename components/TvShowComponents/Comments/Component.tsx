import React, { FC } from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Toast, ToastBody, ToastHeader } from "react-bootstrap";
import style from "./Comments.module.scss";
import { useAuth } from "../../../firebase/AuthContext";
//Notification
import { store } from "react-notifications-component";
export interface CommentItemProps {
  com: any;
  id_film: string;
}

const CommentItem: FC<CommentItemProps> = ({ id_film, com }) => {
  const [h, setH] = useState("heart");

  const { commentLikeTV } = useAuth();
  const currentUser = useAuth();

  let bool = false;
  useEffect(() => {
    const c = () => {
      if (currentUser.currentUser !== null) {
        com.newComent.userLikes?.map((user) =>
          user === currentUser.currentUser.email ? (bool = true) : bool
        );
        if (bool === true) {
          setH("heartcheck");
        }
      }
    };
    c();
  }, []);

  const like = async () => {
    console.log(com.newComent.data.id_coment);
    if (currentUser.currentUser !== null) {
      let response = await commentLikeTV(
        id_film,
        currentUser.currentUser.email,
        com.newComent.data.id_coment
      );

      if (response === true) {
        setH("heartcheck");
        console.log("mira qui");
        console.log(response);
      } else {
        setH("heart");
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

  return (
    <Toast key={com.text} className={style.text}>
      <ToastHeader closeButton={false}> {com.newComent.data.user}</ToastHeader>
      <div className="d-flex w-100">
        <ToastBody className="w-70">{com.newComent.data.text}</ToastBody>
        <div>
          {com.newComent?.userLikes.length}
          <FontAwesomeIcon
            id={h}
            className="icon fa-2x w-100"
            name="heart"
            icon={faHeart}
            onClick={() => like()}
          />
        </div>
      </div>
    </Toast>
  );
};

export default CommentItem;
