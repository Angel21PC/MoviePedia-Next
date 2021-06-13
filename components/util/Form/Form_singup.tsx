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
import { Collapse } from "react-bootstrap";
import { INewUser } from "../../../types";
export interface FormSProps {}

const today = new Date();
const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
  email: yup.string().email().required(),
  phone_number: yup.string(),
  birth_date: yup.date().max(today),
  terms: yup
    .boolean()
    .required()
    .oneOf([true], "You must accept the terms and conditions"),
});

const FormS: FC<FormSProps> = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);
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
      await signup(data.email, data.password).then(
        saveData(data.username, data.birth_date, data.phone_number, data.email)
      );

      router.push("/all_pages/HomeMovies");
    } catch (e) {
      //console.log(e);
      store.addNotification({
        title: "Fail!",
        message: "Fail to create account",
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

  //firebase
  const {
    signup,
    saveData,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
  } = useAuth();
  const currentUser = useAuth();

  return (
    <div className="registration-form">
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
            type="password"
            className="form-control item"
            key="password"
            id="password"
            placeholder="Password"
            name="password"
            {...register("password")}
            pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
          />
          {errors.password?.message && (
            <p className="text-danger">{errors.password?.message}</p>
          )}
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control item"
            key="password2"
            id="password2"
            placeholder="Password again pls"
            name="password2"
            {...register("password2")}
            pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
          />
          {errors.password2?.message && (
            <p className="text-danger">{errors.password2?.message}</p>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control item"
            key="email"
            id="email"
            placeholder="Email"
            name="email"
            {...register("email")}
            pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
          />
          {errors.email?.message && (
            <p className="text-danger">{errors.email?.message}</p>
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
        <div className="form-group d-flex">
          <input
            className="mt-1"
            type="checkbox"
            key="terms"
            id="terms"
            name="terms"
            {...register("terms")}
            placeholder="terms"
          />
          <p className="ml-2 mb-2">
            Accept <a onClick={() => setOpen(!open)}>terms and conditions</a>
          </p>
        </div>
        <Collapse in={open} className="border">
          <div className="p-2 sea">
            These Terms of Use constitute a legally binding agreement made
            between you, whether personally or on behalf of an entity (“you”)
            and Termly Inc (“we,” “us” or “our”), concerning your access to and
            use of the MoviePodia website as well as any other media form, media
            channel, mobile website or mobile application related, linked, or
            otherwise connected thereto (collectively, the “Site”). You agree
            that by accessing the Site, you have read, understood, and agree to
            be bound by all of these Terms of Use. If you do not agree with all
            of these terms of use, then you are expressly prohibited from using
            the site and you must discontinue use immediately. Supplemental
            terms and conditions or documents that may be posted on the Site
            from time to time are hereby expressly incorporated herein by
            reference. We reserve the right, in our sole discretion, to make
            changes or modifications to these Terms of Use at any time and for
            any reason. We will alert you about any changes by updating the
            “Last updated” date of these Terms of Use, and you waive any right
            to receive specific notice of each such change. It is your
            responsibility to periodically review these Terms of Use to stay
            informed of updates. You will be subject to, and will be deemed to
            have been made aware of and to have accepted, the changes in any
            revised Terms of Use by your continued use of the Site after the
            date such revised Terms of Use are posted. The information provided
            on the Site is not intended for distribution to or use by any person
            or entity in any jurisdiction or country where such distribution or
            use would be contrary to law or regulation or which would subject us
            to any registration requirement within such jurisdiction or country.
            Accordingly, those persons who choose to access the Site from other
            locations do so on their own initiative and are solely responsible
            for compliance with local laws, if and to the extent local laws are
            applicable. The Site is intended for users who are at least 18 years
            old. Persons under the age of 18 are not permitted to use or
            register for the Site.
          </div>
        </Collapse>
        {errors.terms?.message && (
          <p className="text-danger">{errors.terms?.message}</p>
        )}
        <div className="form-group">
          <button
            disabled={loading}
            type="submit"
            className="btn btn-block create-account"
          >
            Create Account
          </button>
        </div>
      </form>
      <div className="social-media">
        <h5>Sign up with social media</h5>
        <div className="social-icons">
          <a>
            <Google
              onClick={() => {
                signInWithGoogle();
                router.push("/");
              }}
            ></Google>
          </a>
          <a>
            <Facebook></Facebook>
          </a>
          <a>
            <Twitter></Twitter>
          </a>
        </div>
      </div>
      <style jsx>{`
        .registration-form {
          padding: 50px 0;
        }

        .registration-form form {
          background-color: #fff;
          max-width: 600px;
          margin: auto;
          padding: 50px 70px;
          border-top-left-radius: 30px;
          border-top-right-radius: 30px;
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
        .sea {
          overflow: scroll;
          max-height: 400px;
          scroll-behavior: smooth;
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

export default FormS;
