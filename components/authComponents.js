import {useState } from "react"
import {useUser} from "./../utils/auth/userHook"

import Dialog from '@material-ui/core/Dialog';
import { CircularProgress } from '@material-ui/core';

import styles from "./../styles/componets/authComp.module.css"


export function SignInPopUp(props){

    const [user, { mutate }] = useUser();
    const [submitUser, setSubmitUser]=useState(false)


    const logInSubmit= async(e)=>{
        setSubmitUser(true)
        e.preventDefault();
            const body = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            };

        const res = await fetch('/api/auth/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (res.status === 200) {
        const userObj = await res.json();
            mutate(userObj);
            props.setSignInCont(false)
        } else {
            props.setErrorMsg('Incorrect username or password. Try again!');
            setSubmitUser(false)
        }
    }

    return(
        <>
            <Dialog open={props.singInController} onClose={()=> {
                props.setSignInCont(false)
            setSubmitUser(false)}}>
                <div className={styles.dialogContainer }>
                    <form onSubmit={(e)=>logInSubmit(e)}
                    className={styles.signInForm}>

                    <div className={styles.signInModalTitle}> 
                    sign in to bubl.app</div>

                    {props.errorMsg ? <p style={{ color: 'red' }}>{props.errorMsg}</p> : null}
                    <label htmlFor="email">
                        <input
                        className={styles.logInInput}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Email address"
                        />
                    </label>
                    <label htmlFor="password">
                        <input
                        className={styles.logInInput}
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                        />
                    </label>

                    {submitUser?<>
                    <div style={{display:"flex", width:"100%", justifyContent:"center", flexDirection:"row" }}>
                    <CircularProgress color="primary" /></div> 
                    </>:<>
                    <button className={styles.logInBtn} type="submit">Sign In</button>
                    </>}
                </form>
                </div>
            </Dialog>
        </>
    )
}

export function SignOutPopUp(props){
    return(
        <>
            <Dialog open={props.singUpController} onClose={()=> props.setSignUpCont(false)}>
                <div className={styles.dialogContainer }>
                    Sign Out Dialog
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
