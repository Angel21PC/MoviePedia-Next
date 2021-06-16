import React, { FC, useEffect, useState } from "react";
import { useAuth } from "../../../../firebase/AuthContext";
import DOMPurify from "dompurify";
export interface OneCriticProps {
  id_critic: string | number;
  id_movie: string | number;
}

const OneCritic: FC<OneCriticProps> = ({ id_critic, id_movie }) => {
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
          className="description"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data?.html),
          }}
        ></div>
      </div>
      <style jsx>{`
        .description {
          height: 100px;
          word-break: break-all;
          word-wrap: break-word;
        }
      `}</style>
    </div>
  );
};

export default OneCritic;
