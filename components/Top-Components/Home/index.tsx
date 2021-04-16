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
      <div className="text mt-5 ml-5">
        <h1 id="title">Welcome to MoviePedia</h1>
        <form className="from">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Seach"
              aria-label="Seach"
              aria-describedby="basic-addon2"
              onChange={change}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={send}>
                Button
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </form>
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
          color: white;
          z-index: 1;
          position: relative;
        }
        #title {
          font-size: 50px;
        }
      `}</style>
    </>
  );
};

export default Casa;
