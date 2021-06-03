import { NextPage } from "next";
import { useRouter } from "next/router";

//components

import FindMovie from "../../../components/Find/FindMovie/index";
import FindShow from "../../../components/Find/FindShow/index";
//COMPONENTS
import { Tabs, Tab, Container } from "react-bootstrap";
export interface FindProps {
  id: string;
}

const Find: NextPage<FindProps> = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  return (
    <>
      <Container>
        <Tabs
          className="justify-content-md-center"
          defaultActiveKey="Movies"
          id="uncontrolled-tab-example"
        >
          <Tab eventKey="Movies" title="Movies">
            <FindMovie id={id} />
          </Tab>
          <Tab eventKey="Shows" title="TV Shows">
            <FindShow id={id} />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default Find;
