import React, { FC, useEffect, useState } from "react";
import { useAuth } from "../../../firebase/AuthContext";
export interface CriticListProps {
  id: string;
}

const CriticList: FC<CriticListProps> = ({ id }) => {
  const { getCritics } = useAuth();
  const [critics, setCritics] = useState([]);
  useEffect(() => {
    //get comments
    async function criticsData() {
      const response = await getCritics(id);
      console.log("aqui");
      console.log(response);
      let orderDate = response?.critics?.sort(
        (a, b) => a.newComent.data.date - b.newComent.data.date
      );
      setCritics(orderDate);
    }
    criticsData();
  }, []);
  return (
    <div className="border-1 rounded">
      <div className="p-2 border-1">
        {critics?.map((com) => (
          <div dangerouslySetInnerHTML={{ __html: com.html }}></div>
        ))}
      </div>
      <div className="mt-2 d-flex">
        <div></div>
      </div>
    </div>
  );
};

export default CriticList;
