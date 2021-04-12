import '../styles/globals.css'
import AppLayout from '../components/Top-Components/AppLayout/index'

function MyApp({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}

export default MyApp
