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
    getBookmark_TVMovie,
    getLike_TVMovie,
    getEye_TVMovie,
    getImageUser,
  } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const response = await getDataUser(id);
      console.log(response);
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
  console.log({ bookmark: bookmark, likes: likes, eye: eye });
  return (
    <div className="mt-3">
      <div>
        <div className="w-100 d-flex justify-content-center">
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
        {eye != undefined ? (
          <ListMTV Movie={eye?.Movie} TV={eye?.Tv} list={true} title="View" />
        ) : (
          <></>
        )}
        {bookmark != undefined ? (
          <ListMTV Movie={bookmark?.Movie} TV={bookmark?.Tv} title="Pending" />
        ) : (
          <></>
        )}
        {likes != undefined ? (
          <ListMTV Movie={likes?.Movie} TV={likes?.Tv} title="Liked" />
        ) : (
          <></>
        )}
      </Container>
    </div>
  );
};

export default PublicProfile;
