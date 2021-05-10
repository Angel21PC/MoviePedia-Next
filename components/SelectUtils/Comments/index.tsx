import React, { FC } from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../firebase/AuthContext";
import {
  Toast,
  ToastBody,
  InputGroup,
  FormControl,
  Button,
  ToastHeader,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark, faEye } from "@fortawesome/free-solid-svg-icons";

import style from "./Comments.module.scss";

export interface CommentsProps {
  id: string;
}

const Comments: FC<CommentsProps> = ({ id }) => {
  const { getCommentsM, pushNewCommentsM } = useAuth();

  const [comments, setComments] = useState([]);

  const [nextComent, setnextComent] = useState(null);

  const change = (data: any) => {
    console.log(data.target.value);
    setnextComent(data.target.value);
  };

  const send = () => {
    if (nextComent.length != 0) {
      pushNewCommentsM(id, nextComent);
    }
  };
  useEffect(() => {
    //get comments
    async function comments() {
      const response = await getCommentsM(id);
      setComments(response?.comments);
    }
    comments();
  }, [send]);

  return (
    <div className="border-1 rounded">
      <div className="p-2 border-1">
        {comments?.map((com) => (
          <Toast key={com.text}>
            <ToastHeader closeButton={false}>'s </ToastHeader>
            <div className="d-flex w-100">
              <ToastBody className="w-70">{com.text}</ToastBody>
              <FontAwesomeIcon
                className="icon fa-2x w-100"
                name="bookmark"
                icon={faHeart}
              />
            </div>
          </Toast>
        ))}
      </div>
      <div className="mt-2 d-flex">
        <div className={style.from}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="ei"
              aria-label="ei"
              aria-describedby="basic-addon2"
              onChange={change}
            />
            <InputGroup.Append>
              <Button variant="dark" onClick={send}>
                Send
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
    </div>
  );
};

export default Comments;
