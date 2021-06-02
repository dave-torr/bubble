import Head from 'next/head'
import Image from 'next/image'
import {useState} from "react"
import styles from '../styles/pages/Home.module.css'

import {SingUpPopUp } from "./../components/authComponents"

import {useUser} from "./../utils/auth/userHook"


export default function Home() {

  const [user, { mutate }] = useUser();
  const [singUpController, setSignUpCont]=useState(false)

  const homeHead=()=>{
    return(<>
      <Head>
        <title>bubl - Tu espacio</title>
        <meta name="description" content="Digital Local App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>)
  }
  const homeFooter=()=>{
    return(<>
      <footer className={styles.footer}>
          {user?<>
            <div className={styles.authHomeBTNS}>
              <div> Sign Out </div>
            </div>
          </>:<>
            <div className={styles.authHomeBTNS}>
              <div> Sign In </div>
              <div onClick={()=>{
                setSignUpCont(true)
              }}> Sign up </div>
            </div>
          </>}
          
      </footer>
    </>)
  }

  return (
    <div className={styles.container}>
      {homeHead()}
      <main className={styles.main}>
        buble app - tu espacio
      </main>
      <SingUpPopUp 
        singUpController={singUpController}
        setSignUpCont={setSignUpCont}
      />
      {homeFooter()}
    </div>
  )
}
