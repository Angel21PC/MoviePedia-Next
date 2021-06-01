import { useEffect, useState } from "react";

//const
import { USER_TABS } from "./const";

//components
import { Row, Container, Col } from "react-bootstrap";

//componentes-p
import FormEdit from "../../util/Form/Form_editData";
import ProfileNav from "./ProfileNav";
import IntComGetData from "../../Collection/CollsById/index";
import CollectionEdit from "../../Collection/Edit/index";
//firebase
import { useAuth } from "../../../firebase/AuthContext";
export interface ProfileCompProps {}

const ProfileComp: React.SFC<ProfileCompProps> = () => {
  const [currentTab, setCurrentTab] = useState<string>(USER_TABS.COLLECTION);
  const currentUser = useAuth();
  const { getCollectionsEmail, ConsultaID } = useAuth();

  const [collection, setCollection] = useState([]);
  const [c, setC] = useState([]);
  useEffect(() => {
    async function fetchData() {
      if (currentUser.currentUser.email != undefined) {
        console.log("e");
        try {
          const user = await ConsultaID();
          const response = await getCollectionsEmail(user);
          console.log(response);
          setCollection(response);
        } catch (e) {
          console.log(e);
        }
      }
    }
    fetchData();
  }, []);
  const edit = (data: any) => {
    setCurrentTab(USER_TABS.COM_CRIT);
    setC(data);
  };
  return (
    <Container className="containerr" fluid>
      <Row className="ml-3" xs={1} md={2}>
        <Col className="mt-5 pt-5 justify-content-center" xs lg="2">
          <ProfileNav onChange={setCurrentTab} />
        </Col>
        <Col className="justify-content-center p-0" xs lg="8">
          {currentTab === USER_TABS.COLLECTION ? (
            <div className="w-100">
              <h1>Collection</h1>

              <Row className="justify-content-between">
                {collection.map((c) => (
                  <div style={{ minWidth: "100%" }}>
                    <IntComGetData Coll={c.id}></IntComGetData>
                    <button onClick={() => edit(c)}>Edit</button>
                  </div>
                ))}
              </Row>
            </div>
          ) : (
            <></>
          )}
          {currentTab === USER_TABS.COM_CRIT ? (
            <div>
              <CollectionEdit data={c}></CollectionEdit>
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
