import {ProfileHead} from "../../components/profileComponents"
import {RestoMenu} from "../../components/restoComp"

function FNBProfile({ aProfile }){

  return(
    <>
      <div style={{"height": "110vh" }}>
        <ProfileHead
          aProfile={aProfile}
        />
        {aProfile.resturantMenu? 
        <>
          <RestoMenu 
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
  const res = await fetch('http://localhost:3000/api/resto/fetchRestoData')
  const restoOpts = await res.json()

  // Get the paths we want to pre-render based on restoOpts
  const paths = restoOpts.map((post) => ({
    params: { slug: post.profileURL },
  }))

  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
export async function getStaticProps({params}) {
  const res = await fetch('http://localhost:3000/api/resto/fetchRestoData')
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