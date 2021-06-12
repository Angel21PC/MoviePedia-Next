import React, { FC, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import style from "./Critic.module.scss";
import { useAuth } from "../../../../firebase/AuthContext";
import DOMPurify from "dompurify";
//butons
// @ts-ignore
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
//Notification
import { store } from "react-notifications-component";
export interface CriticProps {
  id: number | string;
}

const Critic: FC<CriticProps> = ({ id }) => {
  const { pushNewCriticM } = useAuth();
  const currentUser = useAuth();
  let quill;
  if (document) {
    quill = require("react-quill");
  }
  const ReactQuill = quill;
  const [value, setValue] = useState("");

  const [title, setTitle] = useState(null);

  const change = (data: any) => {
    //console.log(data.target.value);
    setTitle(data.target.value);
  };

  const send = async () => {
    let newObj = {
      title: title,
      html: value,
    };
    if (value.length > 20) {
      //console.log(newObj);
      const response = await pushNewCriticM(
        id,
        title,
        value,
        currentUser.currentUser.email
      ).then(
        store.addNotification({
          title: "Wonderful!",
          message: "Critic add correctly",
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOutUp"],
          dismiss: {
            duration: 2000,
            touch: true,
          },
        })
      );
      //console.log(response);
    } else {
      store.addNotification({
        title: "Sorry",
        message: "Your critic has to be more long",
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
    <>
      <div>
        <h3>Title</h3>
        <input
          type="text"
          className="form-control item"
          key="title"
          id="title"
          name="title"
          placeholder="Critic title"
          onChange={change}
        />
      </div>

      <div className="mt-4">
        <h3>Text</h3>
        <ReactQuill
          className={style.text}
          theme="bubble"
          value={value}
          onChange={(e) => {
            //console.log(e);
            setValue(e);
          }}
        />
      </div>

      <div className="form-group">
        <AwesomeButton type="primary" onPress={send}>
          GO
        </AwesomeButton>
      </div>
      <hr />
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }}
      ></div>
    </>
  );
};

export default Critic;
