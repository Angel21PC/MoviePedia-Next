import '../styles/globals.css'
import AppLayout from '../components/Top-Components/AppLayout/index'
//notificaciones
import ReactNotification from 'react-notifications-component';

function MyApp({ Component, pageProps }) {
  return (
    <AppLayout>
       <ReactNotification />
      <Component {...pageProps} />
    </AppLayout>
  )
}

export default MyApp
