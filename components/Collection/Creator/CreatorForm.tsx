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
export interface CreatorFormProps {
  movies: any;
  shows: any;
  close: () => void;
  reset: () => void;
}

const schema = yup.object().shape({
  title: yup.string().required(),
  file: yup.mixed().required(),
});

const CreatorForm: FC<CreatorFormProps> = ({ movies, shows, close, reset }) => {
  const { pushNewCollection, getCollections } = useAuth();
  const currentUser = useAuth();

  let quill;
  if (document) {
    quill = require("react-quill");
  }
  const ReactQuill = quill;
  const [value, setValue] = useState("");

  const [title, setTitle] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSend, setIsSend] = useState(false);

  let arrayIdMovie = [];
  let arrayIdShow = [];

  // const f = async () => {
  //   console.log(await getCollections());
  // };
  // f();

  const onSubmit = async (data: any) => {
    movies.map((e) => {
      arrayIdMovie.push(e.id);
    });

    shows.map((e) => {
      arrayIdShow.push(e.id);
    });

    let objArray = {
      movies: arrayIdMovie,
      tv: arrayIdShow,
    };
    console.log(data);
    try {
      const response = await pushNewCollection(
        data.title,
        value,
        currentUser.currentUser.email,
        objArray,
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

export default CreatorForm;
