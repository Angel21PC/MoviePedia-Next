import React, { FC, useEffect, useState } from "react";
import { useAuth } from "../../../firebase/AuthContext";

import Modal from "./Modal";
import Critic from "./Critic";
import MinCritic from "./MinCritic";

export interface CriticListProps {
  id: string;
}

const CriticList: FC<CriticListProps> = ({ id }) => {
  const { getCritics, getMinCritic } = useAuth();
  const currentUser = useAuth();

  const [critics, setCritics] = useState([]);
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    //get comments
    async function criticsData() {
      const response = await getMinCritic(id);
      let orderDate = response?.sort((a, b) => a.date - b.date);
      setCritics(orderDate);
    }
    criticsData();
  }, []);
  return (
    <div className="border-1 rounded">
      <div className="p-2 border-1">
        {critics?.map((cri) => (
          <div key={cri.title}>
            <MinCritic {...cri} />
          </div>
        ))}
      </div>
      <div className="mt-2 d-flex">
        <div>
          <button onClick={() => setShow(true)}>Open Editor</button>
          <Modal show={show} onClose={() => setShow(false)}>
            <div className="p-3 mt-3">
              <Critic id={id} />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CriticList;
