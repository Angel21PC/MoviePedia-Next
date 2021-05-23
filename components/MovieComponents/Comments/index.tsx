import React, { FC } from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../firebase/AuthContext";
//Notification
import { store } from "react-notifications-component";
import {
  Toast,
  ToastBody,
  InputGroup,
  FormControl,
  Button,
  ToastHeader,
} from "react-bootstrap";

import style from "./Comments.module.scss";
import CommentItem from "./Component";
export interface CommentsProps {
  id: string;
}

const Comments: FC<CommentsProps> = ({ id }) => {
  const { getCommentsM, pushNewCommentsM, commentLike } = useAuth();
  const currentUser = useAuth();
  const [comments, setComments] = useState([]);

  const [nextComent, setnextComent] = useState(null);

  const change = (data: any) => {
    console.log(data.target.value);
    setnextComent(data.target.value);
  };

  const send = () => {
    if (currentUser.currentUser === null) {
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
    } else {
      try {
        if (nextComent.length != 0) {
          pushNewCommentsM(id, nextComent, currentUser.currentUser.email);
          store.addNotification({
            title: "Wonderful!",
            message: "Comment add correctly",
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
      } catch {
        store.addNotification({
          title: "Sorry",
          message: "Error",
          type: "danger",
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
    }
  };

  useEffect(() => {
    //get comments
    async function comments() {
      const response = await getCommentsM(id);
      let orderDate = response?.comments.sort((a,b)=>a.newComent.data.date - b.newComent.data.date);
      setComments(orderDate);
    }
    comments();
  }, [send]);

  const alert= <h3> You need to be login </h3>
  
  return (
    <div className="border-1 rounded">
      <div className="p-2 border-1">
        <div className={style.com}>
          {currentUser.currentUser === null ? alert :comments?.map((com) => (
          <CommentItem id_film={id} com={com} />
        ))}
       
        </div>
      
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
