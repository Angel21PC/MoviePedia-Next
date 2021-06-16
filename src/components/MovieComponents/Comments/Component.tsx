import React, { FC } from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Toast, ToastBody, ToastHeader } from "react-bootstrap";
import style from "./Comments.module.scss";
import { useAuth } from "../../../firebase/AuthContext";
//Notification
import { store } from "react-notifications-component";
import { useRouter } from "next/router";
export interface CommentItemProps {
  com: any;
  id_film: string;
}

const CommentItem: FC<CommentItemProps> = ({ id_film, com }) => {
  const [h, setH] = useState("heart");
  const [email, setEmail] = useState("");
  const { commentLike, ConsultaID, getUserNameIDColl } = useAuth();
  const currentUser = useAuth();
  const router = useRouter();

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
    async function fetchEmail() {
      const eml = await getUserNameIDColl(com.newComent.data.user);
      setEmail(eml);
    }
    fetchEmail();
    c();
  }, []);

  const like = async () => {
    //console.log("gg");
    //console.log(com.newComent.data);
    if (currentUser.currentUser !== null) {
      let response = await commentLike(
        id_film,

        com.newComent.data.id_coment
      );

      if (response === true) {
        setH("heartcheck");
        //console.log("mira qui");
        //console.log(response);
      } else {
        setH("heart");
      }
      //console.log("mira aqui");
      //console.log(response);
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
  let dateReal = com.newComent.data.date.toDate().toDateString();
  return (
    <Toast key={com.text} className={style.text}>
      <ToastHeader closeButton={false}>
        <a
          className="text-link"
          onClick={() =>
            router.push({
              pathname: "/all_pages/PublicProfile",
              query: { id: com.newComent.data.user },
            })
          }
        >
          {email}
        </a>
        <div className="ml-3">{dateReal}</div>
      </ToastHeader>

      <div className="d-flex">
        <div className="w-100">
          <ToastBody>{com.newComent.data.text}</ToastBody>
        </div>
        <div className="mr-4 d-inline-flex">
          <div className="mt-1">{com.newComent?.userLikes.length}</div>
          <FontAwesomeIcon
            id={h}
            className="icon fa-2x"
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
