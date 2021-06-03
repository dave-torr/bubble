import React, { useEffect } from 'react';
import {useState} from "react"
import Dialog from '@material-ui/core/Dialog';
import Image from "next/image"
import { CircularProgress, StylesProvider } from '@material-ui/core';
import { withStyles,  } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

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
    useEffect(()=>{
        setUserUpdate({...props.user})
    },[])

    const [profilePicIndex, setImageIndex]= useState()

const stylesVeryfier=(theUser)=>{
    if(theUser.profilePic==="galapagosPenguin2.png"){
        return styles.activeAnimalIcon
    } else if(theUser.profilePic==="galapagosFurSeaLion.png"){
        return styles.activeAnimalIcon
    } else if(theUser.profilePic==="spectacledBear.png"){
        return styles.activeAnimalIcon
    } else {
        return styles.inactiveAnimalIcon
    }
}


console.log(userUpdate)

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
    const profilePicAdder = (theUser)=>{
        if(!theUser.profilePic){

            let eachProfilePicOption=initialProfilePics.map((elem,i)=><>

                <div className={styles.eachAnimalIcon} id={i} onClick={()=>{
                    let thePicString = "/assets/userIcons/" + elem
                    setUserUpdate({
                        ...userUpdate,
                        "profilePic": thePicString
                    })
                    setImageIndex(i)
                }}> 
                    <Image 
                        src={`/assets/userIcons/${elem}`}
                        width={120}
                        height={120}
                        alt={`An Icon Option: ${elem}`}
                    />
                    <HtmlTooltip
                        title={
                            <>
                                <div style={{"fontFamily": "Times New Roman", "fontSize":"1.7em", "fontStyle": "italic"
                                 }}>
                                    {animalSpeciesVeryfier(elem)}
                                </div>

                            </>
                        }
                    >
                    <Button className={styles.eachAnimalName}> {animalNameVeryfier(elem)} </Button>
                    </HtmlTooltip>
                </div>
            </>)

            return(
                <>
                    <div className={styles.animalIconContainer}>
                        {eachProfilePicOption}
                    </div>   
                </>
            )
        }
    }


    const profilePicIntro=()=>{
        return(
            <>
                <div className={styles.picNotificationIntro}>
                    Escoge una imagen de perfil
                </div>
            </>
        )
    }


    return(
    <>
        {props.user&&<>
        <Dialog open={props.open} onClose={()=>props.onClose(false)}> 

            {profilePicIntro()}
            {profilePicAdder(props.user)}

        </Dialog>
        </>}
    </>
    )
}