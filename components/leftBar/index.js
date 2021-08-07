import { useEffect, useState } from 'react'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Image from 'next/image'
import styles from './LeftBar.module.css'
import profileImg from '../../public/perfil.jpeg'
import createApi from '../../services/api'
import Language from '../Language'

//aqui vai ficar estático por enquanto
import userCoding from '../../languages-github.json'

export default function LeftBar(){

  const [ coding, setCoding ] = useState({})
  const [ languages, setLanguages ] = useState([])
  const [ showNotification, setShowNotification ] = useState(false)

  useEffect(()=>{
    const api = createApi()
    // let keys = Object.keys(userCoding)
    // setLanguages(keys)
    // setCoding(userCoding)
    api.get('/authuser?user=patrick095&token='+process.env.TOKEN)
    .then(res => {
      console.log(res)
        let keys = Object.keys(res.data)
        setCoding(res.data)
        setLanguages(keys)
    })
  },[])

  function toogleNotification(){
    let notification = document.querySelector('#notificationMsg')
    if (!showNotification) {
      notification.classList.remove(styles.hidden)
      notification.classList.add(styles.notificationMsg)
      setShowNotification(true)
      setTimeout(() => {
        notification.classList.add(styles.hidden)
        notification.classList.remove(styles.notificationMsg)
        setShowNotification(false)
      }, 5000)
    }
    else {
        notification.classList.add(styles.hidden)
        notification.classList.remove(styles.notificationMsg)
        setShowNotification(false)
    }
  }

    return (
        <div className={styles.left}>
             <div className={styles.profile}>
            <Image src={profileImg} width={175} height={175} />
            <div 
            title="uma nova notificação"  
            className={styles.notification}
            onClick={toogleNotification}
            ></div>
            <span id="notificationMsg" className={styles.hidden}>Estou disponível para contratação!</span>
            <div className={styles.name}>
              <h1>{"<Patrick Chaves />"}</h1>
              <h2>{"<Javascript Developer />"}</h2>
              <h2>{"<Fullstack />"}</h2>
            </div>
          </div>
          <div className={styles.coding}>
            <h2>Coding (<a title="Github" href="https://github.com/patrick095" target="_blank" className={styles.contactIcons}>Github</a>)</h2>
            {languages.map(language => {
            return <Language key={language} language={language} percent={coding[language]} />
            })}
          </div>
          <div className={styles.downloadCV}>
            <div className={styles.separator}></div>
            <a href="https://drive.google.com/file/d/1k93HCxIGKdQiAmHqP5ETTEi_8YoA-UJX/view?usp=sharing" target="_blank">
              <h2>Download CV <CloudDownloadIcon /></h2>
            </a>
          </div>
          <div className={styles.contact}>
          <a title="Github" href="https://github.com/patrick095" target="_blank" className={styles.contactIcons}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a title="Linkedin" href="https://www.linkedin.com/in/patrick095/" target="_blank" className={styles.contactIcons}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/></svg>
          </a>
          <a title="Telegram" href="https://t.me/patrick095" target="_blank" className={styles.contactIcons}>
            <svg width="24px" height="24px" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 1.41421,  }}><path id="telegram-4" d="M12,0c-6.626,0 -12,5.372 -12,12c0,6.627 5.374,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.628 -5.373,-12 -12,-12Zm3.224,17.871c0.188,0.133 0.43,0.166 0.646,0.085c0.215,-0.082 0.374,-0.267 0.422,-0.491c0.507,-2.382 1.737,-8.412 2.198,-10.578c0.035,-0.164 -0.023,-0.334 -0.151,-0.443c-0.129,-0.109 -0.307,-0.14 -0.465,-0.082c-2.446,0.906 -9.979,3.732 -13.058,4.871c-0.195,0.073 -0.322,0.26 -0.316,0.467c0.007,0.206 0.146,0.385 0.346,0.445c1.381,0.413 3.193,0.988 3.193,0.988c0,0 0.847,2.558 1.288,3.858c0.056,0.164 0.184,0.292 0.352,0.336c0.169,0.044 0.348,-0.002 0.474,-0.121c0.709,-0.669 1.805,-1.704 1.805,-1.704c0,0 2.084,1.527 3.266,2.369Zm-6.423,-5.062l0.98,3.231l0.218,-2.046c0,0 3.783,-3.413 5.941,-5.358c0.063,-0.057 0.071,-0.153 0.019,-0.22c-0.052,-0.067 -0.148,-0.083 -0.219,-0.037c-2.5,1.596 -6.939,4.43 -6.939,4.43Z"/></svg>
          </a>
          <a title="Email" href="mailto:patrick095@gmail.com" target="_blank" className={styles.contactIcons}>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 0c-6.626 0-12 5.372-12 12 0 6.627 5.374 12 12 12 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm6.001 16.917c.552 0 .999-.448.999-.999v-7.919c0-.551-.448-.999-.999-.999h-12.002c-.551 0-.999.448-.999.999v7.919c0 .551.448.999.999.999h12.002zm-6.001-3.55l-5.45-3.782-.011 6.748h10.899v-6.748l-5.438 3.782zm5.174-5.784c-1.527 1.064-5.174 3.634-5.174 3.634l-5.203-3.634h10.377z"/></svg>
            </a>
          </div>
        </div>
    )
}