import React, { FC, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import style from "./Critic.module.scss";
import { useAuth } from "../../../firebase/AuthContext";
import { Button } from "react-bootstrap";
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
    console.log(data.target.value);
    setTitle(data.target.value);
  };

  const send = async () => {
    let newObj = {
      title: title,
      html: value,
    };
    console.log(newObj);
    const response = await pushNewCriticM(
      id,
      title,
      value,
      currentUser.currentUser.email
    );
    console.log(response);
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
            console.log(e);
            setValue(e);
          }}
        />
      </div>

      <div className="form-group">
        <Button
          type="submit"
          className="btn btn-block create-account"
          onClick={send}
        >
          GO
        </Button>
      </div>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: value }}></div>
    </>
  );
};

export default Critic;
