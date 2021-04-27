//components
import { Tabs, Tab, Container, Nav, NavLink } from "react-bootstrap";

//componentes-p
import FormEdit from "../../Min-Components/Form/Form_editData";
import TextEditor from "../../Min-Components/TextEditor/index";

export interface ProfileCompProps {}

const ProfileComp: React.SFC<ProfileCompProps> = () => {
  return (
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
  );
};

export default ProfileComp;
