//firebase
import { useAuth } from "../../../firebase/AuthContext";
import { useEffect, useState } from "react";
import { IListM } from "../../../types";

//components-p
import LstM from "../../Min-Components/ListMovie/index";

//COMPONENTS
import { Tabs, Tab, Container } from "react-bootstrap";

export interface ListMProps {}

const ListM: React.SFC<ListMProps> = (data: IListM) => {
  const [isPending, setIsPending] = useState(true); // variable para la pantalla de carga
  console.log(data);

  useEffect(() => {
    setIsPending(true);
    if (data.Bookmark != undefined) {
      setIsPending(false);
    }
  }, [data]);
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
        <Tabs
          className="justify-content-center"
          defaultActiveKey="Pending"
          id="uncontrolled-tab-example"
        >
          <Tab eventKey="Liked" title="Liked">
            {data?.Like?.map((movie) =>
              movie?.id_movie.map((id) => <LstM {...id} />)
            )}
          </Tab>
          <Tab eventKey="Pending" title="Pending">
            {data?.Bookmark?.map((movie) =>
              movie?.id_movie.map((id) => <LstM {...id} />)
            )}
          </Tab>
          <Tab eventKey="Watched" title="Watched">
            {data?.Watch?.map((movie) =>
              movie?.list.map((id) => <LstM {...id} />)
            )}
          </Tab>
        </Tabs>
      )}
    </Container>
  );
};

export default ListM;
