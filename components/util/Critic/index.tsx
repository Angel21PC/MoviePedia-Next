import React, { FC, useState } from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export interface CriticProps {}

const Critic: FC<CriticProps> = () => {
  let quill;
  if (document) {
    quill = require("react-quill");
  }
  const ReactQuill = quill;
  const [value, setValue] = useState();

  return (
    <>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={(e) => {
          console.log(e);
          setValue(e);
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: value }}></div>
    </>
  );
};

export default Critic;
