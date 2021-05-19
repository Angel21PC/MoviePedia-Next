import React, { FC } from "react";
import { Tabs, Tab } from "react-bootstrap";
import GraphTv from "./TvStats";
import Graph from "./MovieStats";
export interface StatsProps {}

const Stats: FC<StatsProps> = () => {
  return (
    <Tabs
      className="justify-content-center mt-4"
      defaultActiveKey="Movie"
      id="uncontrolled-tab-example"
    >
      <Tab eventKey="TV" title="TV">
        <div className="comentarios_container mt-4  ">
          <h4>TV</h4>
          <GraphTv />
        </div>
      </Tab>
      <Tab eventKey="Movie" title="Movie">
        <div className="comentarios_container mt-4  ">
          <h4>Movie</h4>
          <Graph />
        </div>
      </Tab>
    </Tabs>
  );
};

export default Stats;
