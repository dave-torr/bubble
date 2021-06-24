import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import MapIcon from '@material-ui/icons/Map';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneForwardedIcon from '@material-ui/icons/PhoneForwarded';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';

import styles from "../styles/componets/restocomponents.module.css"

export function RestoCard(props){
    return(<> 
    
    </>)
}

export function DescripcionGeneral(props){

    const dayRangeDisplayer=(aTime)=>{
        const aWeek= ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        if(aTime.length>2){
            return aWeek[aTime[0]] + " - " + aWeek[aTime.length-1]
        } else {
            return aWeek[aTime[0]]
        }
    }
    const timeDisplayers=(aTime)=>{
        if(aTime % 1 ===0){
            if( 1 <= aTime  && aTime <= 12){
                return aTime + " am"
            } else {
                return aTime + " pm"
            }
        } else {
            if( 1 <= aTime  && aTime <= 12){
                return Math.floor(aTime) + ":30 am"
            } else {
                return Math.floor(aTime) + ":30 pm"
            }
        }
    }

    const dataGridItem = (anIcon, theData)=>{
        return(
            <>
                <div className={styles.aDataGridItem}>   
                    <div style={{"padding": "9px" }}> {anIcon} </div>
                    <div> {theData} </div>
                </div>
            </>
        )
    }
    const openingTimes=(theData)=>{
        let anOpeningTimeListing = theData.map((elem, i)=><>
            <div className={styles.eachOPTimeCont} key={i}> 
                <div className={styles.eachOpTimeRange}> {dayRangeDisplayer(elem.dayRange)}: </div>
                <div className={styles.eachOpTime}> {timeDisplayers(elem.opens)} - {timeDisplayers(elem.closes)} </div>
                {elem.opens2&&<>
                    <div className={styles.eachOpTime}> &nbsp;|| {timeDisplayers(elem.opens2)} - {timeDisplayers(elem.closes2)} </div></>}                
            </div>
        </>)
        return(
            <>
                <div className={styles.openingTimesCont}>
                    <AccessTimeIcon /> &nbsp; &nbsp;
                    <div>
                        {anOpeningTimeListing}
                    </div>
                </div>
            </>
        )
    }

    return(
        <>
            <div className={styles.menuGeneralCont} >
                <div className={styles.aMenuTitle}> 
                    Descripcion General
                </div>
                <div className={styles.DataGrid}>
                    {/* {dataGridItem(<LocationOnIcon />, "Direccion" )}  */}
                    {dataGridItem(<MapIcon />, "Abrir en GMaps" )} 
                    {dataGridItem(<PhoneForwardedIcon />, 2233555 )} 
                    {dataGridItem(<RestaurantMenuIcon />, "Dine -In || Take Away || Delivery" )} 
                    </div>
                    {openingTimes(props.aProfile.operationTimes)}
                <div className={styles.generalRestoDescription}>
                    Aliqua non magna minim laborum. Aliqua voluptate tempor minim reprehenderit sint culpa fugiat officia laboris minim. Id adipisicing dolore aliquip cillum dolore velit laboris deserunt dolor deserunt veniam non.
                </div>

            </div> 
        </>
    )
}

export function RestoMenu(props){

    const aMenuSection = (section, expanded) =>{

            let aSectionItem = section.sectionItems.map((elem, i) =>
                <>
                    <div className={styles.eachMenuItemCont} key={i}>
                        <div className={styles.eachMenuItem} >
                            <div className={styles.itemData}>
                                <div className={styles.ItemName}> {elem.prodcutName} </div>
                                {elem.description&&<>
                                <div className={styles.ItemDescription}> {elem.description} </div> </>}
                            </div>
                            <div className={styles.ItemPrice}>  
                                <div> ${elem.price}</div>
                                
                                <div className={styles.shoppingCartIcon}> <AddShoppingCartIcon /> </div>

                            </div>
                        </div>
                    {elem.variant&&<>
                        <div className={styles.variantCont}>
                            <div className={styles.eachMenuVar} >                            
                                <div className={styles.itemData}>
                                    <div className={styles.varDescription}> {elem.variant.varDescription} </div>
                                </div>
                                <div className={styles.ItemPrice}>  
                                    <div> ${elem.variant.varPrice}</div>
                                    
                                    <div className={styles.shoppingCartIcon}> <AddShoppingCartIcon /> </div>

                                </div>
                            </div>
                        </div>
                    </>}
                    {elem.variant2&&<>
                        <div className={styles.variantCont}>
                            <div className={styles.eachMenuVar} >                            
                                <div className={styles.itemData}>
                                    <div className={styles.varDescription}> {elem.variant2.varDescription} </div>
                                </div>
                                <div className={styles.ItemPrice}>  
                                    <div> ${elem.variant2.varPrice}</div>
                                    
                                    <div className={styles.shoppingCartIcon}> <AddShoppingCartIcon /> </div>

                                </div>
                            </div>
                        </div>
                    </>}
                    </div>
                </>
            )

        return(
            <>
                <Accordion defaultExpanded={expanded}>
                    <div className={styles.accordionHead}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        {section.menuSection}
                    </AccordionSummary></div>
                    <AccordionDetails><div className={styles.accordionContent}>
                        {aSectionItem}

                    </div></AccordionDetails>
                </Accordion>            
            </>
        )
    }
    return(<>

        <div className={styles.menuGeneralCont} >

            <div className={styles.aMenuTitle}> 
                Menu Digital
            </div>
            <div className={styles.aMenuDisp}> 
                {props.aMenu.map((elem, i)=><>
                    {aMenuSection(elem, i)}
                </>)}
            </div>
        </div> 
    </>)
}