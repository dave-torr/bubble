import React, { useEffect, useState } from 'react';
import Image from "next/image"

import Dialog from '@material-ui/core/Dialog';
import { withStyles  } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import styles from "./../styles/componets/clientCart.module.css"

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export function ClientCartDialog(props){

    const [aCart, setACart] = useState([])
    useEffect(()=>{
        setACart(...props.clientCart)
    },[props.clientCart])

    console.log(aCart)

    return(
    <>
    {props.user&&<>
        <Dialog open={props.open} onClose={()=>props.onClose(false)}> 
            <div className={styles.generalCartCont}>
            <div className={styles.cartTitle}>
                Tu carrito de compras! </div>
        
            </div>
        </Dialog>
    </>}
    </>
    )
}