import React, { FC, useState, useEffect } from "react";
//components
import { Container, Row, Col } from "react-bootstrap";
import Switch from "../Switch";
//Notification
import { store } from "react-notifications-component";
import { useAuth } from "../../../firebase/AuthContext";
export interface CheckPublicProps {}

const CheckPublic: FC<CheckPublicProps> = () => {
  const { getDataUser, editPublicData, ConsultaID } = useAuth();
  const [isOpenB, setIsOpenB] = useState(false);
  const [isOpenE, setIsOpenE] = useState(false);
  const [isOpenL, setIsOpenL] = useState(false);

  useEffect(() => {
    async function fetchDataPublicProfile() {
      const id = await ConsultaID();
      const response = await getDataUser(id);
      if (response != undefined) {
        if (response.Eye === true) {
          setIsOpenE(true);
        }
        if (response.Like === true) {
          setIsOpenL(true);
        }
        if (response.Bookmark === true) {
          setIsOpenB(true);
        }
      }
    }
    fetchDataPublicProfile();
    // console.log({ B: isOpenB, L: isOpenL, E: isOpenE });
  }, []);

  const updateInfo = async () => {
    let obj = {
      Bookmark: isOpenB,
      Like: isOpenL,
      Eye: isOpenE,
    };

    try {
      const response = await editPublicData(obj);
      store.addNotification({
        title: "Wonderful!",
        message: "Change success",
        type: "success",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOutUp"],
        dismiss: {
          duration: 2000,
          touch: true,
        },
      });
      //console.log(response);
    } catch (error) {
      //console.log(error);
    }
  };
  return (
    <div className="d-flex">
      <div className="mr-3">
        <p>Bookmark</p>
        <input
          type="checkbox"
          id="bookmark"
          checked={isOpenB}
          onClick={() => setIsOpenB(!isOpenB)}
        />
      </div>
      <div className="mr-3">
        <p>Liked</p>
        <input
          type="checkbox"
          id="like"
          checked={isOpenL}
          onClick={() => setIsOpenL(!isOpenL)}
        />
      </div>
      <div className="mr-3">
        <p>View</p>
        <input
          type="checkbox"
          id="view"
          checked={isOpenE}
          onClick={() => setIsOpenE(!isOpenE)}
        />
      </div>
      <div className="form-group">
        <button
          type="submit"
          className="btn btn-block create-account"
          onClick={() => updateInfo()}
        >
          Update Public Profile Data
        </button>
      </div>
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
      `}</style>
    </div>
  );
};

export default CheckPublic;
