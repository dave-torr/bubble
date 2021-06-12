import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import styles from "../styles/componets/restocomponents.module.css"

export function RestoCard(props){
    return(<> 
    
    </>)
}

export function RestoMenu(props){

    const aMenuSection = (section, expanded) =>{

            let aSectionItem = section.sectionItems.map((elem, i) =>
                <>
                    <div className={styles.eachMenuItemCont} key={i}>
                        <div className={styles.eachMenuItem} >
                            <div className={styles.itemData}>
                                <div className={styles.ItemName}> {elem.prodcutName} </div>
                                <div className={styles.ItemDescription}> {elem.description} </div>
                            </div>
                            <div className={styles.ItemPrice}>  
                                <div> ${elem.price}</div>
                                
                                <div> AddTocart</div>

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
                                    
                                    <div> AddTocart</div>

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
                                    
                                    <div> AddTocart</div>

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
                    {aMenuSection(elem)}
                </>)}
            </div>
        </div> 
    </>)
}