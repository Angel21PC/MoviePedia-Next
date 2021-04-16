import { useRouter } from "next/router";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { useState } from "react";

export interface CasaProps {}

const Casa: React.SFC<CasaProps> = () => {
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
      <div className="text ml-3">
        <h1 id="title" className="mt-5 p-5">
          Welcome to MoviePedia
        </h1>
        <div className="from">
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

      <video className="videoTag" autoPlay loop muted id="myVideo">
        <source
          src="https://agoodmovietowatch.com/wp-content/uploads/firstreformed-1.mp4"
          type="video/mp4"
        />
      </video>
      <style jsx>{`
        #myVideo {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          top: 0;
          z-index: 0;
          left: 0;
          right: 0;
        }
        .text {
          martgin-top: 100px;
          color: white;
          z-index: 1;
          position: relative;
        }
        #title {
          font-size: 50px;
        }
        .from {
          width: 300px;
        }
      `}</style>
    </>
  );
};

export default Casa;
