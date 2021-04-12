import Head from 'next/head'
import styles from '../styles/Home.module.css'

//components
import AppLayout from '../components/Top-Components/AppLayout/index'
import NavBar from '../components/Top-Components/NavBar/index'

export default function Home() {
  return (
    <AppLayout>
      <NavBar />
    </AppLayout>
  )
}
