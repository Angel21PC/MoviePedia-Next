import '../styles/globals.css'
import AppLayout from '../components/AppLayout/index'

//notificaciones
import ReactNotification from 'react-notifications-component';

//firebase
import { AuthProvider, ProtectRoute } from "../firebase/AuthContext";
import NavBar from "../components/NavBar/index";
function MyApp({ Component, pageProps }) {
  return (
    <AppLayout>
      <AuthProvider>
        <ReactNotification />
        <NavBar/>
        <Component {...pageProps} />
      </AuthProvider>
    </AppLayout>
  )
}

export default MyApp
