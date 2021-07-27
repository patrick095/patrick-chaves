import { useEffect, useState } from 'react'
import styles from './Coding.module.css'

export default function Language({language, percent}){
    let percentFinal = parseFloat(percent.replace(/[^0-9.]/gi, ''))
    if (percentFinal < 1) {
        return <></>
    }
    const [percentNumber, setPercent ] = useState(0)
    useEffect(()=>{
        let count = 0
       let timer = setInterval(()=>{
            if (count <= percentFinal) {
                count += 0.5
                document.querySelector('#percent'+language).innerHTML = count.toFixed(1)
            }
            else {
                document.querySelector('#percent'+language).innerHTML = percentFinal
                clearInterval(timer)
            }
        }, 10)
    // setPercent(percentFinal)
    },[percentNumber])
    return (
        <div className={styles.coding}>
            <div className={styles.title}> 
                {/* title */}
                <span>{language}</span>
                <span id='percent'><span id={'percent'+language}>{percentNumber}</span>%</span>
            </div>
            <div className={styles.barBackground}>
                <div className={styles.progressBar} style={{width: percentFinal+'%'}}></div>
            </div>
        </div>
    )
}