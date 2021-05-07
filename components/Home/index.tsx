import React, { FC } from "react";

import { useRouter } from "next/router";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { useState } from "react";

//style
import style from "./Home.module.scss";

export interface CasaProps {}

const Casa: FC<CasaProps> = () => {
  const router = useRouter();
  const [find, setFind] = useState(null);

  const change = (data: any) => {
    console.log(data.target.value);
    setFind(data.target.value);
  };

  const send = () => {
    if (find !== null && find !== "") {
      router.push({
        pathname: "/all_pages/Find",
        query: { id: find },
      });
    }
  };

  return (
    <>
      <div className={style.text}>
        <h1 className="mt-5 p-5">Welcome to MoviePedia</h1>
        <div className={style.from}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Seach"
              aria-label="Seach"
              aria-describedby="basic-addon2"
              onChange={change}
            />
            <InputGroup.Append>
              <Button variant="dark" onClick={send}>
                Button
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>

      <video className={style.myVideo} autoPlay loop muted id="myVideo">
        <source
          src="https://agoodmovietowatch.com/wp-content/uploads/firstreformed-1.mp4"
          type="video/mp4"
        />
      </video>
    </>
  );
};

export default Casa;
