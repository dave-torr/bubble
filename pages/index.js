import Head from 'next/head'
import Image from 'next/image'
import {useState} from "react"
import styles from '../styles/pages/Home.module.css'

import {SignInPopUp, SingUpPopUp } from "./../components/authComponents"
import {NotificationTrayHome } from "./../components/notificationTray"

import {useUser} from "./../utils/auth/userHook"


import AssistantIcon from '@material-ui/icons/Assistant';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default function Home() {

  const [user, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState('');

  const [singUpController, setSignUpCont]=useState(false)
  const [singInController, setSignInCont]=useState(false)
  const [aHomeLikeController, setHomeLike]=useState(false)
  const [notificationTrayController, setNotificationTray]=useState(false)

  const [verificationCode, setVerificationCode]=useState("cucu")

// console.log(user.userName)

  // userUtils
  const nameExtractor=(user)=>{
    if(user){
      let extractedName= user.name.split(/(\s+)/)
      return(
        <>
          {extractedName[0]}
        </>
      )
    }
  }


  const homeHead=()=>{
    return(<>
      <Head>
        <title>bubl - Tu espacio</title>
        <meta name="description" content="Digital Local App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>)
  }

  const footerBTNs=()=>{
    return(
      <>
          {user?<>
            <div className={styles.authloggedInHomeBTNS}>
              <div className={styles.homeAuthBTN}
                onClick={async()=>{
                      await fetch('/api/auth/auth', {
                    method: 'DELETE',
                  });
                mutate(null);
            }}> Sign Out </div>
            </div>
          </>:<>
            <div className={styles.authHomeBTNS}>
              <div className={styles.homeAuthBTN} onClick={()=>{
                setSignInCont(true)
                }}> Sign In </div>
              <div className={styles.homeAuthBTN} onClick={()=>{
                setSignUpCont(true)
              }}> Sign up </div>
            </div>
          </>}
      </>
    )
  }
  const footerProfilePic=(user)=>{
      if(!user){
        return(
          <>
          <div style={{"display":"flex"}} className={styles.aHomeLikeCont}
          onClick={()=>{
            if(aHomeLikeController){setHomeLike(false)}
            else{setHomeLike(true)}
          }}>
            {aHomeLikeController? 
            <> 
            <div className={styles.aHomeLikeIcon}> <FavoriteIcon />  </div>
            </>:<>
            <div className={styles.aHomeLikeIcon}> <FavoriteBorderIcon />  </div>
            </>}
            <div className={styles.likeIconText}> digital local </div>
          </div>
          </>
        )
      } else if(user.profilePic){
        return(
          <>
            <div className={styles.nameAndProfilePicCont}>
              <div className={styles.profilePic}></div>
              <div className={styles.profileName}> {nameExtractor(user)} </div>
              <div className={styles.notificationNoneIcon}> <NotificationsNoneIcon /></div>
            </div>
          </>
        )
      } else {
        return(
          // Might be better to implement with some use Effect or another lighter verification, instead of ejecting html 
          <>
            <div style={{"display":"flex"}}>
              <div className={styles.notificationIcon} onClick={()=>setNotificationTray(true)}> <NotificationsIcon /></div>
              <div className={styles.profileName}> hola {nameExtractor(user)}! </div>
            </div>
          </>
        )
      }
  }
  const homeFooter=()=>{
    return(<>
      <footer className={styles.footer}>

        {footerProfilePic(user)}
        {footerBTNs()}

      </footer>
    </>)
  }




  return (
    <div className={styles.container}>
      {homeHead()}
      <main className={styles.main}>
        <div className={styles.titleMain}>
          bubl.uno - digital local
        </div>
      </main>
      <SignInPopUp 
        singInController={singInController}
        setSignInCont={setSignInCont}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}      
      />
      <SingUpPopUp 
        singUpController={singUpController}
        setSignUpCont={setSignUpCont}
      />
      <NotificationTrayHome
        user={user}
        open={notificationTrayController}
        onClose={setNotificationTray}

      />
      {homeFooter()}
    </div>
  )
}
