import React, { FC, useEffect, useState } from "react";

import { useAuth } from "../../../firebase/AuthContext";

import { Idatapublic } from "../../../types";

//components
import { Container, Row, Col, Image, Tabs, Tab } from "react-bootstrap";
import ListMTV from "./Row/index";
export interface PublicProfileProps {
  id: string;
}

const PublicProfile: FC<PublicProfileProps> = ({ id }) => {
  console.log({ PROPS: id });

  const [bookmark, setBookmark] = useState<Idatapublic>();
  const [likes, setLikes] = useState<Idatapublic>();
  const [eye, setEye] = useState<Idatapublic>();

  const [urlImage, setUrlImage] = useState(undefined);
  const [description, setDescription] = useState(undefined);

  const {
    getDataUser,
    editPublicData,
    updateNameandDescription,
    getBookmark_TVMovie,
    getLike_TVMovie,
    getEye_TVMovie,
    getImageUser,
  } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const response = await getDataUser(id);
      setDescription(response.description);
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

    async function fetchImage() {
      const response = await getImageUser(id);
      setUrlImage(response);
    }
    fetchImage();
  }, []);

  return (
    <div className="mt-3">
      <div>
        <div className="w-100 d-flex">
          <Image
            src={`${urlImage}`}
            alt="Profile"
            height="100px"
            width="100px"
            roundedCircle
          />
        </div>
        <hr />
        <div className="d-flex p-5">
          <div
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          ></div>
        </div>
      </div>

      <Container fluid>
        <hr />
        <ListMTV Movie={eye.Movie} TV={eye.TV} />
        <ListMTV Movie={bookmark.Movie} TV={bookmark.TV} />
        <ListMTV Movie={likes.Movie} TV={likes.TV} />
      </Container>
    </div>
  );
};

export default PublicProfile;
