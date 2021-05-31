import { useEffect, useState } from "react";

//const
import { USER_TABS } from "./const";

//components
import { Row, Container, Col } from "react-bootstrap";

//componentes-p
import FormEdit from "../../util/Form/Form_editData";
import ProfileNav from "./ProfileNav";
import IntComGetData from "../../Collection/CollsById/index";
//firebase
import { useAuth } from "../../../firebase/AuthContext";
export interface ProfileCompProps {}

const ProfileComp: React.SFC<ProfileCompProps> = () => {
  const [currentTab, setCurrentTab] = useState<string>(USER_TABS.COLLECTION);
  const currentUser = useAuth();
  const { getCollectionsEmail } = useAuth();

  const [collection, setCollection] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await getCollectionsEmail(currentUser.currentUser.email);
      console.log(response);
      setCollection(response);
    }
    fetchData();
  }, []);
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
              <div className="ml-5">
                {collection.map((c) => (
                  <IntComGetData Coll={c.id}></IntComGetData>
                ))}
              </div>
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
