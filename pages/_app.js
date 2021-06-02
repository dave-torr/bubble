import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

// TEST OUT PERFORMANCE ON LOAD WITH BOILERPLATE _APP AND WITH COPIED _APP HERE BELOW:


  // import '../styles/globals.css'
  // import { useEffect } from 'react'
  // import { useRouter } from 'next/router'
  // import * as gtag from '../lib/gtag'

  // function MyApp({ Component, pageProps }) {

  //   const router = useRouter()
  //   useEffect(() => {
  //     const handleRouteChange = (url) => {
  //       gtag.pageview(url)
  //     }
  //     router.events.on('routeChangeComplete', handleRouteChange)
  //     return () => {
  //       router.events.off('routeChangeComplete', handleRouteChange)
  //     }
  //   }, [router.events])

  //   return <Component {...pageProps} />
  // }

  // export default MyApp
