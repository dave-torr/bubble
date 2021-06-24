import { connectToDatabase } from "../../utils/mongodb"

import Link from "next/link"


function RestoPage({restoOpts}){


    const eachRestoCard = (aResto)=>{
        return(
            <>
                <div className={styles.aRestoCard }>  </div>
            </>
        )
    }

    return(
        <>
            <ul>
            {restoOpts.map((elem) => (
                <Link href={`/resto/${elem.profileURL}`} ><li>{elem.profileName}</li></Link> 
            ))}
            </ul>
        </>
    )
}


export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const profiles = await db
    .collection("fandb")
    .find({})
    .toArray();
  
  const restoOpts = JSON.parse(JSON.stringify(profiles))
  return {
    props: {
      restoOpts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 100, // In seconds
  }
}

export default RestoPage