import { useEffect, useState } from "react";
//request
import axios from "axios";
import { URL, api_rutes } from "../../../pages/all_pages/config/rute_api";

export interface VideoProps {}

const Video: React.SFC<VideoProps> = (props: any) => {
  const base_Url: string = "http://www.youtube.com/embed/";

  const [video, setVideo] = useState(null);

  console.log(props.id);
  useEffect(() => {
    //request para extraer el cast
    async function fetchDataViedo() {
      const request = await axios.get(URL + api_rutes.Video, {
        params: {
          id: props.id,
        },
      });
      setVideo(request.data.data);
      return request;
    }
    fetchDataViedo();
  }, []);

  return (
    <>
      <iframe
        src={`${base_Url}${video?.results[0]?.key}`}
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
