import React, { FC } from "react";

import { useEffect, useState, useLayoutEffect } from "react";

//comp-p
import CollectionFinder from "../Finder/index";
import SelectedMovies from "../Selector/Selected";
import EditForm from "./EditForm";
//components
import { Container, Row, Col, Button } from "react-bootstrap";
import Modal from "./Modal/index";
import Selc from "./ListSelects";
import SelcTv from "./ListSelectsTv";
//Notification
import { store } from "react-notifications-component";
import axios from "axios";

// @ts-ignore
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
export interface CollectionEditProps {
  data: any;
}
const base_Url: string = "https://image.tmdb.org/t/p/original/";
const CollectionEdit: FC<CollectionEditProps> = ({ data }) => {
  const d = data;
  console.log(d.data.data.objArray.movies);
  const [movies, setMovies] = useState(d.data.data.objArray.movies);
  const [shows, setShow] = useState(d.data.data.objArray.tv);

  const collectionM = (id: number | string) => {};
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const deleteM = (movie: any) => {
    if (movie.id != undefined) {
      setMovies(movies.filter((item) => item.id !== movie.id));
      setShow(shows.filter((item) => item.id !== movie.id));
      console.log(movies);
    } else {
      setMovies(movies.filter((item) => item !== movie));
      setShow(shows.filter((item) => item !== movie));
      console.log(movies);
    }
  };

  const reset = () => {
    setMovies([]);
    setShow([]);
    store.addNotification({
      title: "Wonderful!",
      message: "Collection add correctly",
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
  };
  let arr = [];
  useEffect(() => {
    console.log({ movie: movies, shows: shows });
  }, [deleteM, movies]);

  console.log("render");

  return (
    <Container fluid>
      <Row>
        <Col xs lg="5">
          <div className="mt-4">
            <div className="d-flex justify-content-center">
              <AwesomeButton
                type="primary"
                disabled={movies.length > 0 || shows.length > 0 ? false : true}
                className="btn btn-block create-account"
                onPress={() => setIsOpen(true)}
              >
                Edit
              </AwesomeButton>
              <Modal show={isOpen} onClose={() => setIsOpen(false)}>
                <EditForm
                  movies={movies}
                  shows={shows}
                  close={() => setIsOpen(false)}
                  reset={reset}
                  data={data}
                />
              </Modal>
            </div>
            <Row xs={2} md={4}>
              {movies?.map((m) =>
                m.id != undefined ? (
                  <Selc id={m.id} deleteMovies={deleteM} />
                ) : (
                  <Selc id={m} deleteMovies={deleteM} />
                )
              )}
              {shows?.map((m) =>
                m.id != undefined ? (
                  <SelcTv id={m.id} deleteMovies={deleteM} />
                ) : (
                  <SelcTv id={m} deleteMovies={deleteM} />
                )
              )}
            </Row>
          </div>
        </Col>

        <Col lg="7">
          <CollectionFinder
            getMovies={setMovies}
            getShow={setShow}
            m={movies}
            s={shows}
          />
        </Col>
      </Row>
      <style jsx>{`
        .actor_poster {
          object-fit: cover;
          max-height: 200px;

          transition: transform 450ms;
          border-radius: 10px;
          -webkit-box-shadow: 0 5px 5px 0 rgba(80, 79, 79, 0.3);
          box-shadow: 0 5px 5px 0 rgba(19, 18, 18, 0.3);
          margin-top: 5vh;
          margin-left: 1vw;
        }
        .create-account {
          border-radius: 30px;
          padding: 10px 20px;
          font-size: 18px;
          font-weight: bold;
          background-color: #5791ff;
          border: none;
          color: white;
          margin-top: 20px;
        }
      `}</style>
    </Container>
  );
};

export default CollectionEdit;
