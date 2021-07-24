import Head from 'next/head'
import LeftBar from '../leftBar'
import styles from './PageDefault.module.css'


export default function PageDefault({children}) {
  function handleHamburguerActive(){
    document.querySelector('.'+styles.right).classList.toggle(styles.active)
    document.querySelector('.'+styles.centershadow).classList.toggle(styles.activeCenter)
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Home - Patrick Chaves</title>
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
            <span>email: patrick095@gmail.com</span>
          </div>
        <div className={styles.right}>
          <div className={styles.hamburguer} onClick={handleHamburguerActive}>
            <span className={styles.hamburguerLine}></span>
          </div>
          <div className={styles.links}>
            <a>Home</a>
            <a>Home</a>
            <a>Home</a>
          </div>
          <div className={styles.actualPage}>
            <span>Início</span>
          </div>
        </div>
      </main>
    </div>
  )
}
