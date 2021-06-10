import React, { FC, useEffect, useState } from "react";

//const
import { USER_TABS } from "./const";

//components
import { Row, Container, Col, Button } from "react-bootstrap";

//componentes-p
import FormEdit from "../../util/Form/Form_editData";
import FormEditProvider from "../../util/Form/Form_editProvider";
import ProfileNav from "./ProfileNav";
import IntComGetData from "../../Collection/CollsById/index";
import CollectionEdit from "../../Collection/Edit/index";
import ModalDeleteCollection from "./ModalDeleteCollection";
import ModalDeleteAccount from "./ModalDeleteAccount";
import CheckPublic from "../../util/PublicData/index";

import { useRouter } from "next/router";
//firebase
import { useAuth } from "../../../firebase/AuthContext";
export interface ProfileCompProps {}

const ProfileComp: FC<ProfileCompProps> = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<string>(USER_TABS.COLLECTION);
  const currentUser = useAuth();
  const { getCollectionsEmail, ConsultaID, checkProviderUser } = useAuth();

  const [collection, setCollection] = useState([]);
  const [c, setC] = useState([]);
  const [reload, setReload] = useState("");
  const [provider, setProvider] = useState("");

  const p = () => {
    setReload("tus");
  };

  useEffect(() => {
    async function fetchData() {
      if (currentUser.currentUser.email != undefined) {
        console.log("e");
        try {
          const user = await ConsultaID();
          const response = await getCollectionsEmail(user);
          const providerData = await checkProviderUser();
          console.log(response);
          setCollection(response);
          setProvider(providerData);
        } catch (e) {
          console.log(e);
        }
      }
    }
    fetchData();
  }, [reload]);
  const edit = (data: any) => {
    setCurrentTab(USER_TABS.COM_CRIT);
    setC(data);
  };

  const deleteAccount = () => {
    router.push({
      pathname: "/",
    });
  };
  return (
    <Container className="containerr" fluid>
      <Row className="ml-3" xs={1} md={2}>
        <Col className="mt-5 pt-5 justify-content-center" xs lg="2">
          <ProfileNav onChange={setCurrentTab} />
        </Col>
        <Col className="p-0" xs lg="8">
          {currentTab === USER_TABS.COLLECTION ? (
            <div className="w-100">
              <h1>Collection</h1>
              <Row className="ml-4 justify-content-center w-100">
                {collection.map((c) => (
                  <div>
                    <IntComGetData Coll={c.id}></IntComGetData>
                    <div className="d-flex justify-content-center">
                      <Button className="mr-5" onClick={() => edit(c)}>
                        Edit
                      </Button>
                      <ModalDeleteCollection
                        id={c.id}
                        pilo={p}
                      ></ModalDeleteCollection>
                    </div>
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
            provider == "password" ? (
              <div>
                <FormEdit />
              </div>
            ) : (
              <div>
                <FormEditProvider />
              </div>
            )
          ) : (
            <></>
          )}
          {currentTab === USER_TABS.MORE ? (
            <Container>
              <div className="mt-5">
                <div className="border-1">
                  <CheckPublic />
                </div>
                <hr />
                <ModalDeleteAccount pilo={deleteAccount}></ModalDeleteAccount>
              </div>
            </Container>
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileComp;
