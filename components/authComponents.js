import {useState } from "react"

import Dialog from '@material-ui/core/Dialog';
import styles from "./../styles/componets/authComp.module.css"

export function SignInPopUp(props){
    return(
        <>
        </>
    )
}
export function SignOutPopUp(props){
    return(
        <>
            <Dialog open={props.singUpController} onClose={()=> props.setSignUpCont(false)}>
                <div className={styles.dialogContainer }>
                
                </div>
            </Dialog>
        </>
    )
}


export function SingUpPopUp(props){

    const [userSignUpObj, setUserSUObj]=useState({})

    const onSubmit=async(e)=>{

        e.preventDefault();
        console.log("cucu")
        console.log(userSignUpObj)
        let stringifiedUserSignUp= JSON.stringify(userSignUpObj)
        const res = await fetch("/api/auth/userSignUp", {
            method: "post",
            body: stringifiedUserSignUp
        })
        const signUpApi = await res.json()
        if(signUpApi){
            props.setSignUpCont(false)
        }
    }


    return(
        <>
        <Dialog open={props.singUpController} onClose={()=> props.setSignUpCont(false)}>
            <div className={styles.dialogContainer }> 
                <form onSubmit={(e)=>onSubmit(e)}>
                <label className={styles.aninputLabel} htmlFor="userName"> User Name:  </label>
                    <input
                        required
                        id="userName"
                        className={styles.anInput}
                        type="text"
                        onChange={(e)=>{
                            setUserSUObj({
                                ...userSignUpObj,
                                "name": e.target.value
                            })
                        }}
                    />
                    <br></br>

                <label className={styles.aninputLabel} htmlFor="email"> Email: </label>
                    <input
                        required
                        id="email"
                        className={styles.anInput}
                        type="email"
                        onChange={(e)=>{
                            setUserSUObj({
                                ...userSignUpObj,
                                "email": e.target.value
                            })
                        }}
                    />
                    <br></br>

                <label className={styles.aninputLabel} htmlFor="password"> Password: </label>
                    <input
                        required
                        id="password"
                        className={styles.anInput}
                        type="password"
                        minLength="8"
                        onChange={(e)=>{
                            setUserSUObj({
                                ...userSignUpObj,
                                "password": e.target.value
                            })
                        }}
                        
                    />
                    <br></br>
                    <div>
                    <input 
                        type="submit"
                        className={styles.submitBTN}
                        value="Sign In to bubl"
                    />
                    </div>
                </form>
            </div>
        </Dialog>
        </>
    )
}