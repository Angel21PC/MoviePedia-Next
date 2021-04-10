import Head from 'next/head'
import styles from '../styles/Home.module.css'

//components
import AppLayout from '../components/AppLayout/index'
import NavBar from '../components/NavBar/index'

export default function Home() {
  return (
    <AppLayout>
      <NavBar />
    </AppLayout>
  )
}
