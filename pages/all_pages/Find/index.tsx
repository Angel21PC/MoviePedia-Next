import { NextPage } from "next";
import { useRouter } from "next/router";
//components
import NavBar from "../../../components/Top-Components/NavBar/index";
import FindMovie from "../../../components/Min-Components/FindMovie/index";
export interface FindProps {
  id: string;
}

const Find: NextPage<FindProps> = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  return (
    <>
      <NavBar />
      <FindMovie id={id} />
      {/* Componente que muestre las peliculas */}
      {/* Componente que muestre las series */}
    </>
  );
};

export default Find;
