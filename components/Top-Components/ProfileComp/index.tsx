import { useEffect, useState } from "react";

//const
import { USER_TABS } from "./const";

//components
import { Row, Container, Col } from "react-bootstrap";

//componentes-p
import FormEdit from "../../Min-Components/Form/Form_editData";
import TextEditor from "../../Min-Components/TextEditor/index";
import ProfileNav from "./ProfileNav";

export interface ProfileCompProps {}

const ProfileComp: React.SFC<ProfileCompProps> = () => {
  const [currentTab, setCurrentTab] = useState<string>(USER_TABS.COLLECTION);

  return (
    <Container className="containerr" fluid>
      <Row className="ml-3" xs={1} md={2}>
        <Col className="mt-5 pt-5 justify-content-center" xs lg="2">
          <ProfileNav onChange={setCurrentTab} />
        </Col>
        <Col className="justify-content-center p-0" xs lg="8">
          {currentTab === USER_TABS.COLLECTION ? (
            <div className="">
              <h1>Collection</h1>
            </div>
          ) : (
            <></>
          )}
          {currentTab === USER_TABS.COM_CRIT ? (
            <div>
              <h1>com crit</h1>
            </div>
          ) : (
            <></>
          )}
          {currentTab === USER_TABS.EDIT ? (
            <div>
              <FormEdit />
            </div>
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileComp;
