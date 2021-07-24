import { useEffect, useState } from "react"
import { createGitInstance } from "../services/api"
import styles from '../styles/Portifolio.module.css'


export default function Portifolio(){
    const [ repos, setRepos ] = useState([])
    useEffect(()=>{
        const api = createGitInstance()
        api.get('/users/patrick095/repos')
        .then(res => setRepos(res.data))
    },[])

    return (<div className={styles.Portifolio}>
        <h1>Repositórios públicos no Github</h1>
        {repos.map(repo =>{
            let updated = new Date(repo.updated_at)
            let created = new Date(repo.created_at)
            let forked = ''
            if (repo.fork) {
                forked = "(fork)"
            }
            return <a href={repo.html_url} target="_blank">{
                repo.name}
                <span style={{color: '#e59f16'}}>{' ('+created.getFullYear()+'-'+updated.getFullYear()+') '
                }</span>
                <span style={{color: '#000'}}>{forked}</span>
                </a>
        })}
    </div>)
}