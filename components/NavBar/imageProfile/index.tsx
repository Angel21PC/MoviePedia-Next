import React, { FC, useState } from "react";

//firebase
import { useAuth } from "../../../firebase/AuthContext";
import { Image } from "react-bootstrap";
export interface ImgProfileProps {}

const ImgProfile: FC<ImgProfileProps> = () => {
  const { getImageUrlProfile } = useAuth();
  const [url, setUrl] = useState(undefined);

  async function fetchData() {
    try {
      const response = await getImageUrlProfile();
      console.log(response);
      setUrl(response);
    } catch (e) {}
  }
  fetchData();

  return (
    <div>
      <Image
        src={`${url}`}
        alt="Profile"
        height="40px"
        width="40px"
        roundedCircle
      />
    </div>
  );
};

export default ImgProfile;
