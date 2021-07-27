import { useEffect, useState } from "react"
import { createGitInstance } from "../services/api"
import styles from '../styles/Portifolio.module.css'
import LinkIcon from '@material-ui/icons/Link'
import Head from "next/head"


export default function Portifolio(){
    const [ repos, setRepos ] = useState([])
    useEffect(()=>{
        const api = createGitInstance()
        api.get('/users/patrick095/repos')
        .then(res => setRepos(res.data))
    },[])

    function handlePersonalProject(id){
        if ( !Array.from(document.querySelector('#'+id).classList).find(element => element === styles.personalProjectD)) {
            return document.querySelector('#'+id).classList.add(styles.personalProjectD)
        }
        let projects = Array.from(document.querySelectorAll('.'+styles.personalProject))
        projects.map(project => project.classList.add(styles.personalProjectD))
        document.querySelector('#'+id).classList.toggle(styles.personalProjectD)
        window.location.hash = '#'+id
    }

    return (
    <div className={styles.Portifolio}>
    <Head>
        <title>Portifólio - Patrick Chaves</title>
    </Head>
        <div className={styles.gitList}>
            <h1>Repositórios Github</h1>
            {repos.map(repo =>{
                let updated = new Date(repo.updated_at)
                let created = new Date(repo.created_at)
                let forked = ''
                if (repo.fork) {
                    forked = "(fork)"
                }
                return <a key={repo.html_url} href={repo.html_url} target="_blank">{
                    repo.name}
                    <span style={{color: '#000'}}>{forked}</span>
                    </a>
            })}
        </div>
        <div className={styles.personalList}>
            <h1>Projetos pessoais</h1>
            <div id="placarVolei" className={styles.personalProject+' '+styles.personalProjectD}>
                <h2 onClick={() => handlePersonalProject("placarVolei")}>Placar Volei</h2>
                <a href="https://placarvolei.com.br" target="_blank">
                    Link <LinkIcon />
                </a>
                <h4>Descrição:</h4>
                <span>Projeto criado para poder de forma fácil adicionar um placar na transmissão de jogo de vôlei, assim como exibir no telão, tudo no mesmo lugar</span>
                <h4>Tecnologias:</h4>
                <span><strong>Front-end:</strong> ReactJs, NextJs, Typescript, axios, nookies, socket.io-client </span>
                
                <span><strong>Back-end:</strong> NodeJs, Express, socket.io, mongoose, jwt, bcryptjs, nodemailer, MercadoPago</span>
                
                <span><strong>Banco de dados:</strong> MongoDB</span>
            </div>
            <div id="univolei" className={styles.personalProject+' '+styles.personalProjectD}>
                <h2 onClick={() => handlePersonalProject("univolei")}>Univolei</h2>
                <a href="https://univolei.com.br" target="_blank">
                    Link <LinkIcon />
                </a>
                <h4>Descrição:</h4>
                <span>Site criado para meu time local de voleibol, onde é possivel gerenciar todo o site por uma pagina de gerenciamento onde tem o controle das notícias, elencos e jogos.</span>
                <h4>Tecnologias:</h4>
                <span><strong>Front-end:</strong> ReactJs, axios, styled-components, nuka-carousel </span>
                
                <span><strong>Back-end:</strong> NodeJs, Express, mongoose, jwt, bcryptjs</span>
                
                <span><strong>Banco de dados:</strong> MongoDB</span>
            </div>
        </div>
    </div>)
}