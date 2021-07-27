import Head from 'next/head'
import styles from '../styles/CV.module.css'

export default function Portifolio(){
    return (
        <div className={styles.cv}>
        <Head>
            <title>Contato - Patrick Chaves</title>
        </Head>
            <div className={styles.frame}>
                <h1>Meios de contato</h1>
                <div className={styles.frameData}>
                    <span>Email: 
                        <a 
                        href="mailto:patrick095@gmail.com" 
                        target="_blank"> patrick095@gmail.com </a>
                    </span>
                    <span>Telegram:
                        <a 
                        href="https://t.me/patrick095" 
                        target="_blank"> patrick095 </a>
                    </span>
                    <span>Linkedin:
                        <a 
                        href="https://www.linkedin.com/in/patrick095/" 
                        target="_blank"> patrick095 </a>
                    </span>
                    <span>Github:
                        <a 
                        href="https://github.com/patrick095" 
                        target="_blank"> patrick095 </a>
                    </span>
                </div>
            </div>
        </div>
    )
}