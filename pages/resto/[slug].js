import {ProfileHead} from "../../components/profileComponents"
import {RestoMenu, DescripcionGeneral} from "../../components/restoComp"
import styles from "./../../styles/pages/restoProfile.module.css"

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

{console.log(aProfile)
}
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
  const res = await fetch('https://www.bubl.uno/api/resto/fetchRestoData')
  const restoOpts = await res.json()

  // Get the paths we want to pre-render based on restoOpts
  const paths = restoOpts.map((post) => ({
    params: { slug: post.profileURL },
  }))

  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
export async function getStaticProps({params}) {
  const res = await fetch('https://www.bubl.uno/api/resto/fetchRestoData')
  const restoOpts = await res.json()
  let aProfile = restoOpts.find(elem =>( elem.profileURL === params.slug) )
  return {
    props: {
      aProfile
    },
    revalidate: 100, // In seconds
  }
}
export default FNBProfile;