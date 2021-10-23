import { useEffect, useState } from 'react'
import styles from './Coding.module.scss'

export default function Language({language, percent}: {language: string, percent: string}) {
    let percentFinal = percent ? parseFloat(percent.replace(/[^0-9.]/gi, '')) : '0'

    useEffect(()=>{
        let count = 0
       let timer = setInterval(()=>{
           const percentElement = document.querySelector('#percent'+language) as Element
            if (percentElement && count <= percentFinal) {
                count += 0.5
                percentElement.innerHTML = count.toFixed(1)
            }
            else {
                if (percentElement !== null) {
                    percentElement.innerHTML = percentFinal.toString()
                }
                clearInterval(timer)
            }
        }, 10)
    },[language, percentFinal])

    if (percentFinal < 1) {
        return <></>
    }
    return (
        <div className={styles.coding}>
            <div className={styles.title}> 
                {/* title */}
                <span>{language}</span>
                <span id='percent'><span id={'percent'+language}>0</span>%</span>
            </div>
            <div className={styles.barBackground}>
                <div className={styles.progressBar} style={{width: percentFinal+'%'}}></div>
            </div>
        </div>
    )
}