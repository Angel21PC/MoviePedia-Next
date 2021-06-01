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
  const [email, setEmail] = useState("");
  const { commentLikeTV, ConsultaID, getEmailIDColl } = useAuth();
  const currentUser = useAuth();

  let bool = false;
  useEffect(() => {
    const c = async () => {
      if (currentUser.currentUser !== null) {
        const id = await ConsultaID();
        com.newComent.userLikes?.map((user) =>
          user === id ? (bool = true) : bool
        );
        if (bool === true) {
          setH("heartcheck");
        }
      }
    };
    c();
    async function fetchEmail() {
      const eml = await getEmailIDColl(com.newComent.data.user);
      setEmail(eml);
    }
    fetchEmail();
  }, []);

  const like = async () => {
    console.log(com.newComent.data.id_coment);
    if (currentUser.currentUser !== null) {
      let response = await commentLikeTV(id_film, com.newComent.data.id_coment);

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
      <ToastHeader closeButton={false}> {email}</ToastHeader>
      <div className="d-flex w-100">
        <ToastBody className="w-100 d-flex">
          <div className="w-50 mr-5">{com.newComent.data.text}</div>

          <div className="d-flex">
            <h4 className="ml-3">{com.newComent?.userLikes.length}</h4>

            <FontAwesomeIcon
              id={h}
              className="icon fa-2x w-100"
              name="heart"
              icon={faHeart}
              onClick={() => like()}
            />
          </div>
        </ToastBody>
      </div>
    </Toast>
  );
};

export default CommentItem;
