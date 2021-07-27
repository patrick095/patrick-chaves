import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import LeftBar from '../leftBar'
import styles from './PageDefault.module.css'
import LeftBarStyles from '../leftBar/LeftBar.module.css'


export default function PageDefault({children}) {
  const route = useRouter()
  const [ pagePath, setPagePath ] = useState(route.asPath)
  useEffect(()=>{
    setPagePath(route.asPath)
  },[route])
  const pageName = {
    '/' : "Início",
    '/cv' : "Curriculo",
    '/contato': "Contato",
    '/portifolio': "Portifólio"
  }

  function handleHamburguerActive(){
    document.querySelector('.'+styles.right).classList.toggle(styles.active)
    document.querySelector('.'+styles.centershadow).classList.toggle(styles.activeCenter)
    document.querySelector('.'+LeftBarStyles.left).classList.toggle(LeftBarStyles.activeMenu)
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Home - Patrick Chaves</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content="Patrick Chaves - Desenvolvedor Fullstack javascript" />
      </Head>

      <main className={styles.main}>
        <LeftBar />
        <div className={styles.center}>
          {children}
        <div className={styles.centershadow} />
        </div>
          <div className={styles.footer}>
            <span>© 2021 All Rights Reserved.</span>
          </div>
        <div className={styles.right}>
          <div className={styles.hamburguer} onClick={handleHamburguerActive}>
            <span className={styles.hamburguerLine}></span>
          </div>
          <div onClick={handleHamburguerActive} className={styles.links}>
            <Link href="/">
              <a>Inicio</a>
            </Link>
            <Link href="/portifolio">
              <a>Portifolio</a>
            </Link>
            <Link href="/cv">
              <a>Curriculo</a>
            </Link>
            <Link href="/contato">
              <a>Contato</a>
            </Link>
          </div>
          <div className={styles.actualPage}>
            <span>{ pageName[pagePath] }</span>
          </div>
        </div>
      </main>
    </div>
  )
}
