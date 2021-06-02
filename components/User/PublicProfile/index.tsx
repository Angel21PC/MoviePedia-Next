import React, { FC, useEffect, useState } from "react";

import { useAuth } from "../../../firebase/AuthContext";

import { Idatapublic } from "../../../types";

//components
import { Container, Row, Col, Image, Tabs, Tab } from "react-bootstrap";
import ListEyeMTV from "./eye/index";
export interface PublicProfileProps {
  id: string;
}

const PublicProfile: FC<PublicProfileProps> = ({ id }) => {
  console.log({ PROPS: id });

  const [bookmark, setBookmark] = useState<Idatapublic>([]);
  const [likes, setLikes] = useState<Idatapublic>([]);
  const [eye, setEye] = useState<Idatapublic>();

  const {
    getDataUser,
    editPublicData,
    updateNameandDescription,
    getBookmark_TVMovie,
    getLike_TVMovie,
    getEye_TVMovie,
  } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const response = await getDataUser(id);
      if (response != undefined) {
        if (response.Eye === true) {
          const listEye = await getEye_TVMovie(id);
          setEye(listEye);
        }
        if (response.Like === true) {
          const listLike = await getLike_TVMovie(id);
          setLikes(listLike);
        }
        if (response.Bookmark === true) {
          const listBookmark = await getBookmark_TVMovie(id);
          setBookmark(listBookmark);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div className="mt-3">
      <div>
        <div className="d-flex justify-content-center">
          <div className="justify-content-center">
            {/* <h3>{result?.response.data.title}</h3> */}
            {/* <M_B_F
              id={id}
              title={result?.response.data.title}
              userLikes={result?.userLikes}
            /> */}
            <hr />
            {/* <div
              dangerouslySetInnerHTML={{
                __html: result?.response?.data?.description,
              }}
            ></div> */}
          </div>
          {/* Image profile */}
          {/* <Image src={result?.url} alt="s" className="poster rounded" /> */}
        </div>
      </div>

      <Container fluid>
        <hr />
        {/* <ListEyeMTV Movie={eye.Movie} TV={eye.TV}></ListEyeMTV> */}
      </Container>
    </div>
  );
};

export default PublicProfile;
