import React, { FC, useEffect, useState } from "react";

//Form
import { useForm } from "react-hook-form";

//validation
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//Notification
import { store } from "react-notifications-component";

//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Google, Facebook, Twitter } from "react-bootstrap-icons";

//firebase
import { useAuth } from "../../../firebase/AuthContext";

//next
import { useRouter } from "next/router";

import "react-quill/dist/quill.bubble.css";
import DOMPurify from "dompurify";

import { INewUser } from "../../../../types";
export interface FormEditProviderProps {}

const today = new Date();
const schema = yup.object().shape({
  username: yup.string().required(),
  phone_number: yup.string(),
  birth_date: yup.date().max(today),
  file: yup.mixed(),
});
const FormEditProvider: FC<FormEditProviderProps> = () => {
  //editor
  let quill;
  if (document) {
    quill = require("react-quill");
  }
  const ReactQuill = quill;
  const [value, setValue] = useState("");

  //firebase
  const { changeData, uploadImgProfile, getImageUrlProfile } = useAuth();
  const currentUser = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [url, setUrl] = useState(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: INewUser) => {
    try {
      //console.log(data);
      setLoading(true);
      await changeData(
        data.username,
        data.birth_date,
        data.phone_number,
        currentUser.currentUser.email,
        "",
        "",
        value
      );
      //console.log(data.file[0].name);
      if (data?.file[0]?.name) {
        let c = await uploadImgProfile(data.file[0]);
      }
      router.push("/");
    } catch (e) {
      //console.log(e);
      store.addNotification({
        title: "Fail!",
        message: "Fail to change data account",
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOutUp"],
        dismiss: {
          duration: 2000,
          touch: true,
        },
      });
    }
    setLoading(false);
  };

  return (
    <div className="registration-form">
      {/* <img src={url} style={{ height: 200, width: 200 }} alt="s" /> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-icon">
          <span>
            <i className="icon icon-user">
              <FontAwesomeIcon icon={faUser} />
            </i>
          </span>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control item"
            key="username"
            id="username"
            placeholder="Username"
            name="username"
            {...register("username")}
          />
          {errors?.username?.message && (
            <p className="text-danger">{errors?.username?.message}</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control item"
            key="phone_number"
            id="phone_number"
            name="phone_number"
            {...register("phone_number")}
            placeholder="Phone Number (if you want)"
          />
          {errors.phone_number?.message && (
            <p className="text-danger">{errors.phone_number?.message}</p>
          )}
        </div>
        <div className="form-group">
          <input
            type="date"
            className="form-control item"
            key="birth_date"
            id="birth_date"
            name="birth_date"
            {...register("birth_date")}
            placeholder="Birth Date"
          />
          {errors.birth_date?.message && (
            <p className="text-danger">{errors.birth_date?.message}</p>
          )}
        </div>
        <div className="form-group">
          <h4>Bio</h4>
          <ReactQuill
            className="text"
            theme="bubble"
            value={value}
            onChange={(e) => {
              //console.log(e);
              setValue(e);
            }}
          />
        </div>
        <div>
          <input
            type="file"
            key="file"
            id="file"
            name="file"
            {...register("file")}
          ></input>
        </div>

        <div className="form-group">
          <button
            disabled={loading}
            type="submit"
            className="btn btn-block create-account"
          >
            Edit Account
          </button>
        </div>
      </form>
      <style jsx>{`
        .registration-form {
          padding: 50px 0;
        }

        .registration-form form {
          background-color: #fff;
          max-width: 600px;
          margin: auto;
          padding: 50px 70px;
          border-radius: 30px;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
        }

        .registration-form .form-icon {
          text-align: center;
          background-color: #5891ff;
          border-radius: 50%;
          font-size: 40px;
          color: white;
          width: 100px;
          height: 100px;
          margin: auto;
          margin-bottom: 50px;
          line-height: 100px;
        }

        .registration-form .item {
          border-radius: 20px;
          margin-bottom: 25px;
          padding: 10px 20px;
        }

        .registration-form .create-account {
          border-radius: 30px;
          padding: 10px 20px;
          font-size: 18px;
          font-weight: bold;
          background-color: #5791ff;
          border: none;
          color: white;
          margin-top: 20px;
        }

        .registration-form .social-media {
          max-width: 600px;
          background-color: #fff;
          margin: auto;
          padding: 35px 0;
          text-align: center;
          border-bottom-left-radius: 30px;
          border-bottom-right-radius: 30px;
          color: #9fadca;
          border-top: 1px solid #9097a3;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.281);
        }

        .registration-form .social-icons {
          margin-top: 30px;
          margin-bottom: 16px;
        }

        .registration-form .social-icons a {
          font-size: 23px;
          margin: 0 15px;
          color: #5691ff;
          border: 1px solid;
          border-radius: 50%;
          width: 45px;
          display: inline-block;
          height: 45px;
          text-align: center;
          background-color: #fff;
          line-height: 45px;
        }

        .registration-form .social-icons a:hover {
          text-decoration: none;
          opacity: 0.6;
        }

        @media (max-width: 576px) {
          .registration-form form {
            padding: 50px 20px;
          }

          .registration-form .form-icon {
            width: 70px;
            height: 70px;
            font-size: 30px;
            line-height: 70px;
          }
        }
      `}</style>
    </div>
  );
};

export default FormEditProvider;
