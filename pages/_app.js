import '../styles/globals.css'
import AppLayout from '../components/Top-Components/AppLayout/index'

//notificaciones
import ReactNotification from 'react-notifications-component';

//firebase
import { AuthProvider, ProtectRoute } from "../firebase/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AppLayout>
      <AuthProvider>
        <ReactNotification />
        <Component {...pageProps} />
      </AuthProvider>
    </AppLayout>
  )
}

export default MyApp
