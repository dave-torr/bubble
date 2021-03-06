import {ProfileHead} from "../../components/profileComponents"
import {RestoMenu, DescripcionGeneral} from "../../components/restoComp"
import styles from "./../../styles/pages/restoProfile.module.css"

import { connectToDatabase } from "../../utils/mongodb";

function FNBProfile({ aProfile }){


  const restaurantVerifyer=(theRestType)=>{
    if(theRestType==="fineDining"){
      return "/ fine dining"
    } else if(theRestType==="fastFood"){
      return "/ fast Food"
    } else if(theRestType==="patisserie"){
      return "/ Patisserie & Cafe"
    } else if(theRestType==="bar"){
      return "/ Bar, Drinks & Snacks"
    }
  }



  return(
    <>
      <div  className={styles.restoProfile}>
        <ProfileHead
          aProfile={aProfile}
        />
        <div className={styles.breadCrumbs}>
          <div>/ food and beverage {restaurantVerifyer(aProfile.businessType.subType)} </div>
        </div>

        <DescripcionGeneral 
          aProfile={aProfile}
        />

        {aProfile.resturantMenu? 
        <><RestoMenu 
            aMenu={aProfile.resturantMenu}
          />
        </>:<>
          Menu is not Online Yet!
        </>}

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      </div>
    </>
  )
}




export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const { db } = await connectToDatabase();

  const profiles = await db
    .collection("fandb")
    .find({})
    .toArray();
  
  const restoOpts = JSON.parse(JSON.stringify(profiles))

  // Get the paths we want to pre-render based on restoOpts
  const paths = restoOpts.map((post) => ({
    params: { slug: post.profileURL },
  }))

  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
export async function getStaticProps(context) {
  // const res = await fetch('http://localhost:3000/api/resto/fetchRestoData')

  const { db } = await connectToDatabase();

  const profiles = await db
    .collection("fandb")
    .find({})
    .toArray();
  
  const restoOpts = JSON.parse(JSON.stringify(profiles))
  let aProfile = restoOpts.find(elem =>( elem.profileURL === context.params.slug) )
  return {
    props: {
      aProfile
    },
    revalidate: 100, // In seconds
  }
}


export default FNBProfile;