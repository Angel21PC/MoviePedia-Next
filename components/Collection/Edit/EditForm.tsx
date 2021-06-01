import React, { FC, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useAuth } from "../../../firebase/AuthContext";
import Switch from "../../util/Switch";
import { Alert, Container, Row, Col, Button } from "react-bootstrap";

/*
t
guardar -> Collections id random, GUARDA IMG EMAIL+TITLE
collections_Saved:
  ID_USER: {

    B[id]
    L[id]
  } 

  SE PUEDE EDITAR ¿?



  fALTA
  Criticas _> como verla(min ready, falta un modal o page)
  Collections _> como verla{
    si es dueño {
      cambiar estado publico, 
      eliminar, 
      ¿editar?
    }
    sino {
      bookmark:
      Like:
      Valorar:
    }
  Perfil publico:


*/

//Form
import { useForm } from "react-hook-form";

//validation
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export interface EditFormProps {
  movies: any;
  shows: any;
  close: () => void;
  reset: () => void;
  data: any;
}

const EditForm: FC<EditFormProps> = ({ movies, shows, close, reset, data }) => {
  const id = data.id;
  const seudonimo = data.data.data.title;
  const text = data.data.data.description;
  const isPublic = data.data.public;
  const { pushNewCollection, getCollections, editCollection } = useAuth();
  const currentUser = useAuth();
  const schema = yup.object().shape({
    title: yup.string().required().default(seudonimo),
    file: yup.mixed().required(),
  });

  let quill;
  if (document) {
    quill = require("react-quill");
  }
  const ReactQuill = quill;
  const [value, setValue] = useState(text);

  const [isOpen, setIsOpen] = useState(isPublic);
  const [isSend, setIsSend] = useState(false);

  let arrayIdMovie = [];
  let arrayIdShow = [];

  const onSubmit = async (data: any) => {
    movies.map((e) => {
      e.id != undefined ? arrayIdMovie.push(e.id) : arrayIdMovie.push(e);
    });

    shows.map((e) => {
      e.id != undefined ? arrayIdShow.push(e.id) : arrayIdShow.push(e);
    });

    let objArray = {
      movies: arrayIdMovie,
      tv: arrayIdShow,
    };
    console.log({ objArray: objArray });
    try {
      const response = await editCollection(
        id,
        objArray,
        data.title,
        value,
        isOpen,
        data.file[0]
      );
      if (response === true) {
        setIsSend(true);
      }
      reset();
      close();
    } catch (error) {
      console.log(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      {!isSend ? (
        <div className="registration-form mt-3 p-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex">
              <h4 className="mt-2 mr-5">Public</h4>
              <Switch isOn={isOpen} handleToggle={() => setIsOpen(!isOpen)} />
            </div>
            <div>
              <h3>Title</h3>
              <input
                type="text"
                className="form-control item"
                key="title"
                id="title"
                name="title"
                value={seudonimo}
                placeholder="Critic title"
                {...register("title")}
              />
            </div>

            <div className="mt-4">
              <h3>Description</h3>
              <div className="p-4 blog">
                <ReactQuill
                  theme="bubble"
                  value={value}
                  onChange={(e) => {
                    console.log(e);
                    setValue(e);
                  }}
                />
              </div>
            </div>
            <div className="mt-3">
              <h3>Image</h3>
              <input
                type="file"
                key="file"
                id="file"
                name="file"
                {...register("file")}
              ></input>
            </div>
            <div className="form-group mt-3">
              <button type="submit" className="btn btn-block create-account">
                GO
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="mt-3">
          <Alert className="mt-3" variant="success">
            Send
          </Alert>
        </div>
      )}
      <style jsx>{`
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
        .blog {
          border-radius: 5px;
          border-style: solid;
          border-width: 2px;
        }
      `}</style>
    </>
  );
};

export default EditForm;
