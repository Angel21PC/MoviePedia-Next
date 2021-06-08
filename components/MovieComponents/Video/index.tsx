import React, { FC, useEffect, useState } from "react";
export interface VideoProps {
  data: any;
}

const Video: FC<VideoProps> = ({ data }) => {
  const base_Url: string = "https://www.youtube.com/embed/";

  console.log({ VIDEO: data });

  return (
    <>
      <iframe
        src={`${base_Url}${data?.results[0]?.key}`}
        className="video"
      ></iframe>
      <style jsx>{`
        .video {
          width: 100%;
          height: 250px;
        }
      `}</style>
    </>
  );
};

export default Video;
