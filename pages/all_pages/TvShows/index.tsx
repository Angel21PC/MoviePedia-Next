import { NextPage } from "next";

//initialprops
import { URL, api_rutesTv } from "../../../firebase/config/rute_api";

//components
import NavBar from "../../../components/Top-Components/NavBar/index";
import Banner from "../../../components/Top-Components/Banner/index";
import Explorer from "../../../components/Top-Components/Explorer/index";

export interface TVProps {
  data: any;
}

const TV: NextPage<TVProps> = ({ data }) => {
  console.log(data);
  return (
    <>
      <NavBar />
      <Banner data={data} />
      <Explorer
        URL={URL}
        api_rutes={api_rutesTv}
        m_s={"/all_pages/Show_select"}
      />
    </>
  );
};

// TV.getInitialProps = async () => {
//   return fetch(URL + api_rutesTv.Popular)
//     .then((res) => res.json())
//     .then((response) => {
//       return response;
//     });
// };

// async function getStaticProps() {
//   return await fetch(URL + api_rutesTv.Popular)
//     .then((res) => res.json())
//     .then((response) => {
//       return response;
//     });
// }

export const getServerSideProps = async ({ req }) => {
  return await fetch(URL + api_rutesTv.Popular)
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
};

export default TV;
