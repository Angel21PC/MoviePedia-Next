import { useEffect, useState } from "react";
import axios from "axios";

//Next
import Link from "next/link";

//componentes
import { Container, Row, Form, Button } from "react-bootstrap";

//component-p
import Poster from "../../Min-Components/Poster/index";
import Loading from "../../Top-Components/Loading/index";
export interface ExplorerProps {
  URL: string;
  api_rutes: any;
  m_s: string;
}

const Explorer: React.SFC<ExplorerProps> = (...props) => {
  console.log(props);

  return <></>;
};

export default Explorer;
