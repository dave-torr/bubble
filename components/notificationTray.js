import React, { useEffect } from 'react';
import {useState} from "react"
import Dialog from '@material-ui/core/Dialog';
import Image from "next/image"

import { withStyles  } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import styles from "./../styles/componets/notificationTray.module.css"


let initialProfilePics = [
    "galapagosPenguin2.png",
    "galapagosFurSeaLion.png",
    "spectacledBear.png",
]

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export function NotificationTrayHome(props){

    const [userUpdate, setUserUpdate] = useState()
    const [profileSetUpStep, setProfileSetUpStep] =useState(0)

    useEffect(()=>{
        setUserUpdate({...props.user})
    },[props.user])

    const [profilePicIndex, setImageIndex]= useState()

    const animalSpeciesVeryfier=(theAnimal)=>{
        if(theAnimal===initialProfilePics[0]){
            return(<>Speniscus mendiculus</>)
        } else if(theAnimal===initialProfilePics[1]){
            return(<>Arctocephalus galapagoensis</>)
        } else if(theAnimal===initialProfilePics[2]){
            return(<>Tremarctos ornatus</>)
        }
    }
    const animalNameVeryfier=(theAnimal)=>{
        if(theAnimal===initialProfilePics[0]){
            return(<>Pinguino de <br></br>Galapagos</>)
        } else if(theAnimal===initialProfilePics[1]){
            return(<>Lobo Marino <br></br>de 2 Pelos</>)
        } else if(theAnimal===initialProfilePics[2]){
            return(<>oso <br></br> andino</>)
        }
    }
    const acceptPic = async(userUpdate)=>{
        console.log(userUpdate)
        let stringifiedUser=JSON.stringify(userUpdate)
        const res = await fetch("/api/auth/editUser", {
            method: "post",
            body: stringifiedUser
        })
        const userEditAPI = await res.json()
        if(userEditAPI){
            setProfileSetUpStep(0)
        }
    }
    const profilePicAdder = (theUser)=>{
        if(!theUser.profilePic){

            let eachProfilePicOption=initialProfilePics.map((elem,i)=><>
                <div className={styles.eachAnimalIcon} id={i} onClick={()=>{
                    let thePicString = "/assets/userIcons/" + elem
                    let splicedNotifArr = 
                    setUserUpdate({
                        ...userUpdate,
                        "profilePic": thePicString,
                        "picUpdate": true
                    })
                    setImageIndex(i)
                }}> 
                    <Image 
                        src={`/assets/userIcons/${elem}`}
                        width={120}
                        height={120}
                        alt={`An Icon Option: ${elem}`}
                    />
                    <HtmlTooltip title={<>
                        <div style={{"fontFamily": "Times New Roman", "fontSize":"1.7em", "fontStyle": "italic"}}>
                            {animalSpeciesVeryfier(elem)}
                            </div></>}>
                        <Button className={styles.eachAnimalName}> {animalNameVeryfier(elem)} </Button>
                    </HtmlTooltip>
                </div>
            </>)

            return(
                <>
                    {userUpdate.profilePic===null?<>
                        <div className={styles.picNotificationIntro}>
                            Escoge una imagen de perfil
                        </div>
                        <div className={styles.animalIconContainer}>
                            {eachProfilePicOption}
                        </div>
                        <div className={styles.picNotificationIntro}>
                            O sube una aqui:
                        </div>
                        <div className={styles.picNotificationIntro}>
                            Photo Upload BTN
                        </div>
                    </>:<>
                        <div className={styles.acceptPicCont}>
                        <div style={{"width": "80%" }}> Tu Perfil: </div>
                        <span className={styles.profileMini} > 
                            <div className={styles.pickedIcon}>
                            {userUpdate.profilePic&&<>
                            <Image 
                                src={userUpdate.profilePic}
                                width={120}
                                height={120}
                                alt="A Picked User Icon"
                                />
                            </>}
                            </div>
                            <div className={styles.userName}> {userUpdate.name} </div>
                        </span>
                            <div className={styles.profileAcceptBTN} onClick={()=>acceptPic(userUpdate)}> Aceptar! </div>
                            <div className={styles.profileAcceptSubtxt}> Recuerda! Podras cambiar la imagen a cualquier momento despues </div>
                        </div>
                    </>}
                </>
            )
        }
    }

    const aNotificationDisp=(notif, nofiKey)=>{
        if(notif==="profilePic"){
            return(<>
                <div className={styles.profileNotifCont} onClick={()=>{
                    setProfileSetUpStep("profilePic")
                    let NotifArr = [...props.user.notifications]
                    let splicedNotifArr= NotifArr.splice(nofiKey, 1)
                    setUserUpdate({
                        ...userUpdate,
                        "notifications": NotifArr
                    })
                }}>
                    <div className={styles.profNotifText}>
                        <div className={styles.profNotiTitle}> Añade una imagen de perfil! </div>
                        <div className={styles.profNotiSubTitle}> Completa tu perfil 1/5   </div>
                    </div>
                    <div className={styles.profileNotifIcon}>
                        <PersonOutlineIcon /> </div> 
                </div>
            </>)
        } else if(notif==="address"){
            return(<>
                <div className={styles.profileNotifCont}>
                    <div className={styles.profNotifText}>
                        <div className={styles.profNotiTitle}> Completa tus datos de ubicación! </div>
                        <div className={styles.profNotiSubTitle}> Completa tu perfil 2/5   </div>
                    </div>
                    <div className={styles.profileNotifIcon}>
                        <LocationSearchingIcon /> </div> 
                </div>
            </>)
        } else if(notif==="foodLikes"){
            return(<>
                <div className={styles.profileNotifCont}>
                    <div className={styles.profNotifText}>
                        <div className={styles.profNotiTitle}> Avisanos tus gustos de comida </div>
                        <div className={styles.profNotiSubTitle}> Completa tu perfil 3/5   </div>
                    </div>
                    <div className={styles.profileNotifIcon}>
                        <LocalDiningIcon /> </div> 
                </div>
            </>)
        } else if(notif==="eventLikes"){
            return(<>
                <div className={styles.profileNotifCont}>
                    <div className={styles.profNotifText}>
                        <div className={styles.profNotiTitle}> Que tipo de eventos te gustan? </div>
                        <div className={styles.profNotiSubTitle}> Completa tu perfil 4/5   </div>
                    </div>
                    <div className={styles.profileNotifIcon}>
                        <EventSeatIcon /> </div> 
                </div>
            </>)
        } else if(notif==="pictureLikes"){
            return(<>
                <div className={styles.profileNotifCont}>
                    <div className={styles.profNotifText}>
                        <div className={styles.profNotiTitle}> Dale un 'me gusta' a tus fotos favoritas! </div>
                        <div className={styles.profNotiSubTitle}> Completa tu perfil 5/5   </div>
                    </div>
                    <div className={styles.profileNotifIcon}>
                        <CropOriginalIcon /> </div> 
                </div>
            </>)
        } else {
            return(<>
                <div >
                    {notif}
                </div>
            </>)
        }
    }

    let eachNotification;
    if(props.user){
        eachNotification = props.user.notifications.map((elem, i)=><>
            {aNotificationDisp(elem, i)}
        </>)
    }

    const notifdisplayer=()=>{
        return(<>
            <div className={styles.notiContTitle}> Tus notificaciones! </div>  
            <div className={styles.notificationsGenCont}>
                {eachNotification}
            </div>
        </>)
    }

    const onBoardingProfilePic =()=>{
        return(
            <>
                {profilePicAdder(props.user)}
            </>
        )
    }
    const onBoardingNavi=()=>{
        return(
            <>
                <div onClick={()=>{
                    setProfileSetUpStep(0)
                    setUserUpdate({...props.user})}} 
                className={styles.onBoNaviBackBTN}> <ArrowBackIosIcon/> </div>
            </>
        )
    }

    return(
    <>
    {props.user&&<>
        <Dialog open={props.open} onClose={()=>props.onClose(false)}> 

            {profileSetUpStep===0&&<>
                {notifdisplayer()}</>}
            {profileSetUpStep!=0&&<>
                {onBoardingNavi()}</>}
            {profileSetUpStep==="profilePic"&&<>
                {onBoardingProfilePic()}</>}
        
        </Dialog>
    </>}
    </>
    )
}