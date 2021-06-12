import React, { FC, useEffect, useState } from "react";

import { useAuth } from "../../../firebase/AuthContext";

import { Idatapublic } from "../../../types";

//components
import { Container, Row, Col, Image, Tabs, Tab } from "react-bootstrap";
import ListMTV from "./Row/index";
import IntComGetData from "../../Collection/CollsById/index";
export interface PublicProfileProps {
  id: string;
}

const PublicProfile: FC<PublicProfileProps> = ({ id }) => {
  //console.log({ PROPS: id });

  const [bookmark, setBookmark] = useState<Idatapublic>();
  const [likes, setLikes] = useState<Idatapublic>();
  const [eye, setEye] = useState<Idatapublic>();

  const [urlImage, setUrlImage] = useState(undefined);
  const [description, setDescription] = useState(undefined);

  const [collections, setCollections] = useState(undefined);
  const [collectionSaved, setCollectionSaved] = useState(undefined);
  const {
    getDataUser,
    getBookmark_TVMovie,
    getLike_TVMovie,
    getEye_TVMovie,
    getImageUser,
    getCollectionsEmailPublic,
    getCollectionSavedById,
  } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const response = await getDataUser(id);
      //console.log(response);
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
        if (response.collections_created === true) {
          const collec = await getCollectionsEmailPublic(id);
          setCollections(collec);
        }
        if (response.collections_saved === true) {
          const collSaved = await getCollectionSavedById(id);
          setCollectionSaved(collSaved);
        }
      }
    }
    fetchData();

    async function fetchImage() {
      const response = await getImageUser(id);
      if (response === undefined) {
        setUrlImage("/monkey_confused.jpg");
      } else {
        setUrlImage(response);
      }
    }
    fetchImage();
  }, []);
  //console.log({ bookmark: bookmark, likes: likes, eye: eye });
  return (
    <Container className="mt-3">
      <Container>
        <div className="w-100 d-flex justify-content-center">
          {urlImage != undefined ? (
            <Image
              src={`${urlImage}`}
              alt="Profile"
              height="100px"
              width="100px"
              roundedCircle
            />
          ) : (
            <></>
          )}
        </div>
        <hr />
        <div className="p-5">
          {description === "" ? (
            <p>This user dont have a description</p>
          ) : (
            <div
              className="text-center"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            ></div>
          )}
        </div>
        <hr />
      </Container>

      <Container fluid>
        <h4>Collections created by user</h4>
        <Row md={2}>
          {collections != undefined ? (
            collections?.map((c) => (
              <div>
                <IntComGetData Coll={c.id} />
              </div>
            ))
          ) : (
            <></>
          )}
        </Row>

        <hr />
        <h4>Collections saved by user</h4>
        {collectionSaved != undefined ? (
          collectionSaved.Bookmark?.map((c) => (
            <div>
              <IntComGetData Coll={c.id} />
            </div>
          ))
        ) : (
          <></>
        )}

        <hr />
        <h4>Collections liked by user</h4>
        {collectionSaved != undefined ? (
          collectionSaved.Like?.map((c) => (
            <div>
              <IntComGetData Coll={c.id} />
            </div>
          ))
        ) : (
          <></>
        )}

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
    </Container>
  );
};

export default PublicProfile;
