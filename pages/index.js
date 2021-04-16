//components
import AppLayout from '../components/Top-Components/AppLayout/index'
import NavBar from '../components/Top-Components/NavBar/index'
import Casa from "../components/Top-Components/Home/index";


export default function Home() {
  return (
    <AppLayout> 
      <NavBar />
      <Casa />
    </AppLayout>
  )
}
