import React, { FC, useEffect, useState } from "react";
import { useAuth } from "../../../firebase/AuthContext";
export interface OneCriticProps {
  id_critic: string | number;
  id_movie: string | number;
}

const OneCritic: React.SFC<OneCriticProps> = ({ id_critic, id_movie }) => {
  const { getCritics } = useAuth();
  const currentUser = useAuth();

  const [data, setData] = useState({ title: "", html: "" });
  useEffect(() => {
    async function fetchDataCritic() {
      const response = await getCritics(id_movie, id_critic);
      setData(response.newCritic.data);
    }
    fetchDataCritic();
  }, []);

  return (
    <div>
      <div>
        <h3>{data?.title}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: data?.html,
          }}
        ></div>
      </div>
    </div>
  );
};

export default OneCritic;
