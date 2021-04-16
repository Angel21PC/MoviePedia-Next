import { NextPage } from "next";
import { useRouter } from "next/router";
//components
import NavBar from "../../../components/Top-Components/NavBar/index";
import FindMovie from "../../../components/Min-Components/FindMovie/index";

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
      <NavBar />

      <Container>
        <Tabs
          className="justify-content-md-center"
          defaultActiveKey="Movies"
          id="uncontrolled-tab-example"
        >
          <Tab eventKey="Movies" title="Movies">
            <FindMovie id={id} />
          </Tab>
          <Tab eventKey="Shows" title="TV Shows"></Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default Find;
