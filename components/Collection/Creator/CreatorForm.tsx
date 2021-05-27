import React, { FC, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useAuth } from "../../../firebase/AuthContext";
import Switch from "../../util/Switch";
import { Alert } from "react-bootstrap";
export interface CreatorFormProps {
  movies: any;
  shows: any;
}

const CreatorForm: React.SFC<CreatorFormProps> = ({ movies, shows }) => {
  const { pushNewCollection } = useAuth();
  const currentUser = useAuth();

  let quill;
  if (document) {
    quill = require("react-quill");
  }
  const ReactQuill = quill;
  const [value, setValue] = useState("");

  const [title, setTitle] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const change = (data: any) => {
    console.log(data.target.value);
    setTitle(data.target.value);
  };

  const send = async () => {
    let objArray = {
      movies: movies,
      tv: shows,
    };
    const response = await pushNewCollection(
      title,
      value,
      currentUser.currentUser.email,
      objArray,
      true
    );
    if (response === true) {
      setIsSend(true);
    }
  };
  return (
    <>
      {!isSend ? (
        <>
          <div>
            <Switch isOn={isOpen} handleToggle={() => setIsOpen(!isOpen)} />
          </div>
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
            <h3>Description</h3>
            <ReactQuill
              theme="bubble"
              value={value}
              onChange={(e) => {
                console.log(e);
                setValue(e);
              }}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-block create-account"
              onClick={send}
            >
              GO
            </button>
          </div>
        </>
      ) : (
        <div className="mt-3">
          <Alert className="mt-3" variant="success">
            Send
          </Alert>
        </div>
      )}
    </>
  );
};

export default CreatorForm;
