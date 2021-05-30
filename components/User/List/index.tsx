//firebase
import { useAuth } from "../../../firebase/AuthContext";
import { useEffect, useState } from "react";
import { IListM } from "../../../types";

//components-p
import LstM from "../../List/ListMovie/index";
import LstTv from "../../List/ListTv/index";
//COMPONENTS
import { Tabs, Tab, Container } from "react-bootstrap";
import ListNav from "./ListNav";
import { LIST_TABS } from "./const";
import IntComGetData from "../../Collection/CollsById/index";

export interface ListMProps {
  dataM: IListM;
  dataTV: any;
  dataC: any;
}

const ListM: React.SFC<ListMProps> = ({ dataM, dataTV, dataC }) => {
  const [isPending, setIsPending] = useState(true); // variable para la pantalla de carga
  const [currentTab, setCurrentTab] = useState<string>(LIST_TABS.MOVIE);

  useEffect(() => {
    setIsPending(true);
    if (dataM != undefined) {
      setIsPending(false);
    }
  }, [dataM]);
  return (
    <Container>
      {isPending ? (
        <div className="load">
          <img
            src="https://rubico.com.mx/cultivandoelentendimiento_no_PHP/assets/img/demo/loader.gif"
            alt=""
          />
        </div>
      ) : (
        <>
          <ListNav onChange={setCurrentTab}></ListNav>
          {currentTab === LIST_TABS.MOVIE ? (
            <Tabs
              className="justify-content-center"
              defaultActiveKey="Pending"
              id="uncontrolled-tab-example"
            >
              <Tab eventKey="Liked" title="Liked">
                <h1>
                  Total:{" "}
                  {dataM?.Like?.map((movie) => {
                    return movie?.id_movie?.length;
                  })}
                </h1>
                {dataM?.Like?.map((movie) =>
                  movie?.id_movie?.map((id) => <LstM {...id} />)
                )}
              </Tab>
              <Tab eventKey="Pending" title="Pending">
                <h1>
                  Total:{" "}
                  {dataM?.Bookmark?.map((movie) => {
                    return movie?.id_movie?.length;
                  })}
                </h1>
                {dataM?.Bookmark?.map((movie) =>
                  movie?.id_movie?.map((id) => <LstM {...id} />)
                )}
              </Tab>
              <Tab eventKey="Watched" title="Watched">
                <h1>
                  Total:{" "}
                  {dataM?.Watch?.map((movie) => {
                    return movie?.list?.length;
                  })}
                </h1>
                {dataM?.Watch?.map((movie) =>
                  movie?.list?.map((id) => <LstM {...id} />)
                )}
              </Tab>
            </Tabs>
          ) : (
            <></>
          )}
          {currentTab === LIST_TABS.TV ? (
            <Tabs
              className="justify-content-center"
              defaultActiveKey="Pending"
              id="uncontrolled-tab-example"
            >
              <Tab eventKey="Liked" title="Liked">
                <h1>
                  Total:{" "}
                  {dataTV?.Like?.map((movie) => {
                    return movie?.id_movie?.length;
                  })}
                </h1>
                {dataTV?.Like?.map((movie) =>
                  movie?.id_movie?.map((id) => <LstTv {...id} />)
                )}
              </Tab>
              <Tab eventKey="Pending" title="Pending">
                <h1>
                  Total:{" "}
                  {dataTV?.Bookmark?.map((movie) => {
                    return movie?.id_movie?.length;
                  })}
                </h1>
                {dataTV?.Bookmark?.map((movie) =>
                  movie?.id_movie?.map((id) => <LstTv {...id} />)
                )}
              </Tab>
              <Tab eventKey="Watched" title="Watched">
                <h1>
                  Total:{" "}
                  {dataTV?.Watch?.map((movie) => {
                    return movie?.list?.length;
                  })}
                </h1>
                {dataTV?.Watch?.map((movie) =>
                  movie?.list?.map((id) => <LstTv {...id} />)
                )}
              </Tab>
            </Tabs>
          ) : (
            <></>
          )}
          {currentTab === LIST_TABS.COLLECTION ? (
            <div>
              {dataC.Bookmark.map((c) => (
                <IntComGetData Coll={c.id} />
              ))}
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </Container>
  );
};

export default ListM;
