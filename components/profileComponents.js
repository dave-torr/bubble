import Image from "next/image"
import styles from  "./../styles/componets/profileComponents.module.css"

export function ProfileHead(props){

let theProfile = props.aProfile

    return(
        <>
            <header className={styles.ProfileHeadCont}>
                <div className={styles.profilePic}> 
                    <Image
                        src={theProfile.logoLocation}
                        width={180}
                        height={180}
                        alt={`Logo de: ${theProfile.profileName}`}
                    />
                </div>
                <div className={styles.profileName}> {theProfile.profileName} </div>

            </header>
        </>
    )
}