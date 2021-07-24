import PageDefault from '../components/pageDefault'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (<>
    <PageDefault>
      <Component {...pageProps} />
    </PageDefault>
    </>)
}

export default MyApp
