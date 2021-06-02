import React, { FC, useEffect, useState } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import { useRouter } from "next/router";
//firebase
import { useAuth } from "../../../firebase/AuthContext";
export interface ItemFlipProps {
  data: any;
}

const ItemFlip: FC<ItemFlipProps> = ({ data }) => {
  console.log(data);
  const router = useRouter();
  const [image, setImage] = useState();
  const { getImageCollection } = useAuth();
  useEffect(() => {
    async function fetchImage() {
      console.log(data.data.nameImage);
      const response = await getImageCollection(data.data.data.imageName);
      setImage(response);
      console.log(response);
    }
    fetchImage();
  }, []);

  const redirect = () => {
    router.push({
      pathname: "/all_pages/Collection_select",
      query: { id: data.id },
    });
  };
  return (
    <>
      <Flippy
        className="w-100 h-100 cardFlip "
        flipOnHover={false} // default false
        flipOnClick={true} // default false
        flipDirection="horizontal" // horizontal or vertical
        // if you pass isFlipped prop component will be controlled component.
        // and other props, which will go to div
      >
        <FrontSide
          className="poster2"
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundImage: `url(
                "${image}"
            )`,
          }}
        >
          <div className="text-light">{data.data.data.title}</div>
        </FrontSide>
        <BackSide
          style={{
            borderRadius: "10px",
            backgroundColor: "#175852",
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: data.data.data.description,
            }}
          ></div>
          <div className="d-flex justify-content-center fixed-bottom mb-2">
            <button
              className="btn btn-block create-account"
              onClick={() => redirect()}
            >
              Open
            </button>
          </div>
        </BackSide>
      </Flippy>
      <style jsx>{`
        .create-account {
          width: 80%;
          border-radius: 30px;
          padding: 10px 20px;
          font-size: 18px;
          font-weight: bold;
          background-color: #5791ff;
          border: none;
          color: white;
          margin-top: 20px;
        }
        .text {
          margin-top: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; /* number of lines to show */
          -webkit-box-orient: vertical;
        }
      `}</style>
    </>
  );
};

export default ItemFlip;
