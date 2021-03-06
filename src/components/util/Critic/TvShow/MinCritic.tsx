import React, { FC, useEffect, useState } from "react";
import { Toast, ToastBody, ToastHeader } from "react-bootstrap";
import Modal from "./Modal";
import OneCritic from "./OneCritic";
import { useAuth } from "../../../../firebase/AuthContext";
import { store } from "react-notifications-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
//butons
// @ts-ignore
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
export interface MinCriticProps {
  creator: string;
  date: any;
  title: string;
  id_critic: string;
  id_movie: string;
  userLikes: any;
}

const MinCritic: FC<MinCriticProps> = (props) => {
  const { creator, date, title, id_critic, id_movie, userLikes } = props;
  const { getUserNameIDColl, criticLikeTV, ConsultaID } = useAuth();

  const currentUser = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [show, setShow] = useState<boolean>(false);
  const [h, setH] = useState("heart");
  let bool = false;
  useEffect(() => {
    async function fetch() {
      const eml = await getUserNameIDColl(creator);
      setEmail(eml);
    }
    fetch();

    const consultaLike = async () => {
      if (currentUser.currentUser !== null) {
        const id = await ConsultaID();
        userLikes?.map((user) => (user === id ? (bool = true) : bool));

        if (bool === true) {
          setH("heartcheck");
          //console.log({ RESULT: true });
        }
      }
    };
    consultaLike();
  }, []);

  const like = async () => {
    //console.log("gg");
    if (currentUser.currentUser !== null) {
      let response = await criticLikeTV(id_movie, id_critic);

      if (response === true) {
        setH("heartcheck");
        // console.log("mira qui");
        // console.log(response);
      } else {
        setH("heart");
      }
      // console.log("mira aqui");
      // console.log(response);
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
  let dateReal = date.toDate().toDateString();

  return (
    <Toast key={title}>
      <ToastHeader closeButton={false}>
        <a
          className="text-link"
          onClick={() =>
            router.push({
              pathname: "/all_pages/PublicProfile",
              query: { id: creator },
            })
          }
        >
          {email}
        </a>

        <div className="ml-3">{dateReal}</div>
      </ToastHeader>
      <div className="d-flex w-100">
        <ToastBody className="w-100 d-flex">
          <div className="w-50 mr-5">{title}</div>
        </ToastBody>
        <div>
          <AwesomeButton type="primary" onPress={() => setShow(true)}>
            Open
          </AwesomeButton>
          <Modal show={show} onClose={() => setShow(false)}>
            <div className="p-3 mt-3">
              <div className="d-flex w-100">
                <div className="ml-2 mt-1">{userLikes?.length}</div>
                <FontAwesomeIcon
                  id={h}
                  className="icon fa-2x"
                  name="heart"
                  icon={faHeart}
                  onClick={() => like()}
                />
              </div>
              <br />
              <OneCritic id_critic={id_critic} id_movie={id_movie}></OneCritic>
            </div>
          </Modal>
        </div>
      </div>
    </Toast>
  );
};

export default MinCritic;
