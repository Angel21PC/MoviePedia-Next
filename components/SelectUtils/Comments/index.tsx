import React, { FC } from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../firebase/AuthContext";
import {
  Toast,
  ToastBody,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

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
    pushNewCommentsM(id, nextComent);
  };
  useEffect(() => {
    //get comments
    async function comments() {
      const response = await getCommentsM(id);
      setComments(response.comments);
      console.log("mira aqui");
      console.log(response.comments);
    }
    comments();
  }, [nextComent]);

  return (
    <div className="border-1 rounded">
      <div className="p-2 border-1">
        {comments.map((com) => (
          <Toast>
            <Toast.Body>{com.text}</Toast.Body>
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
                Button
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
    </div>
  );
};

export default Comments;
