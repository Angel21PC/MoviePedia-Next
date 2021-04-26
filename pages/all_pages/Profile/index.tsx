import { NextPage } from "next";
import { useRouter } from "next/router";
import Dante from "Dante2";
//components
import NavBar from "../../../components/Top-Components/NavBar/index";
import { Tabs, Tab, Container } from "react-bootstrap";

//componentes-p
import FormEdit from "../../../components/Min-Components/Form/Form_editData";
import TextEditor from "../../../components/Min-Components/TextEditor/index";

export interface ProfileProps {}
//firebase
import { useAuth } from "../../../firebase/AuthContext";

const Profile: NextPage<ProfileProps> = () => {
  const router = useRouter();
  const currentUser = useAuth();

  if (currentUser.currentUser !== null) {
    return (
      <>
        <NavBar />
        <h4>Hi {currentUser.currentUser.email} </h4>
        <Container className="mt-5">
          <Tabs
            className="justify-content-center"
            defaultActiveKey="Change Data"
            id="uncontrolled-tab-example"
          >
            <Tab eventKey="Liked" title="Change Data">
              <FormEdit />
            </Tab>
            <Tab eventKey="Pending" title="Commets and Critics">
              <TextEditor />
            </Tab>
            <Tab eventKey="Watched" title="Collections"></Tab>
          </Tabs>
        </Container>
      </>
    );
  } else {
    router.push("/");
    return <></>;
  }
};

export default Profile;
