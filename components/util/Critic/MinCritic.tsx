import React, { FC, useEffect, useState } from "react";
import { Toast, ToastBody, ToastHeader, Button } from "react-bootstrap";
import Modal from "./Modal";
import OneCritic from "./OneCritic";
import { useAuth } from "../../../firebase/AuthContext";
export interface MinCriticProps {
  creator: string;
  date: any;
  title: string;
  id_critic: string;
  id_movie: string;
}

const MinCritic: FC<MinCriticProps> = (props) => {
  const { getEmailIDColl } = useAuth();
  const { creator, date, title, id_critic, id_movie } = props;
  const [email, setEmail] = useState("");
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    async function fetch() {
      const eml = await getEmailIDColl(creator);
      setEmail(eml);
    }
    fetch();
  }, []);
  return (
    <Toast key={title}>
      <ToastHeader closeButton={false}>{email}</ToastHeader>
      <div className="d-flex w-100">
        <ToastBody className="w-100 d-flex">
          <div className="w-50 mr-5">{title}</div>
        </ToastBody>
        <div>
          <Button onClick={() => setShow(true)}>Open</Button>
          <Modal show={show} onClose={() => setShow(false)}>
            <div className="p-3 mt-3">
              <OneCritic id_critic={id_critic} id_movie={id_movie}></OneCritic>
            </div>
          </Modal>
        </div>
      </div>
    </Toast>
  );
};

export default MinCritic;
