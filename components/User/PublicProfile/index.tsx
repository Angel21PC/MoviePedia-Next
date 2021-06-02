import React, { FC } from "react";
//components
import { Container, Row, Col, Image } from "react-bootstrap";

export interface PublicProfileProps {}

const PublicProfile: FC<PublicProfileProps> = (props: any) => {
  console.log({ PROPS: props });
  return (
    <div className="mt-3">
      <div>
        <div className="d-flex justify-content-center">
          <div className="justify-content-center">
            {/* <h3>{result?.response.data.title}</h3> */}
            {/* <M_B_F
              id={id}
              title={result?.response.data.title}
              userLikes={result?.userLikes}
            /> */}
            <hr />
            {/* <div
              dangerouslySetInnerHTML={{
                __html: result?.response?.data?.description,
              }}
            ></div> */}
          </div>
          {/* Image profile */}
          {/* <Image src={result?.url} alt="s" className="poster rounded" /> */}
        </div>
      </div>

      <Container fluid>
        <hr />
        <Row className="justify-content-between" lg={4} sm={2} xs={1}>
          {/* Colecciones ?, Lista de Guardados? */}
        </Row>
      </Container>
    </div>
  );
};

export default PublicProfile;
