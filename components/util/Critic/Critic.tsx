import React, { FC, useState } from "react";
import "react-quill/dist/quill.bubble.css";

export interface CriticProps {}

const Critic: FC<CriticProps> = () => {
  let quill;
  if (document) {
    quill = require("react-quill");
  }
  const ReactQuill = quill;
  const [value, setValue] = useState();

  const [title, setTitle] = useState(null);

  const change = (data: any) => {
    console.log(data.target.value);
    setTitle(data.target.value);
  };

  const send = () => {
    let newObj = {
      title: title,
      html: value,
    };
    console.log(newObj);
  };
  return (
    <>
      <input
        type="text"
        className="form-control item"
        key="title"
        id="title"
        name="title"
        placeholder="Critic title"
        onChange={change}
      />
      <ReactQuill
        theme="bubble"
        value={value}
        onChange={(e) => {
          console.log(e);
          setValue(e);
        }}
      />

      <div className="form-group">
        <button
          type="submit"
          className="btn btn-block create-account"
          onClick={send}
        >
          GO
        </button>
      </div>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: value }}></div>
    </>
  );
};

export default Critic;
