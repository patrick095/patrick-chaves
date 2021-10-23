import Head from 'next/head'
import styles from '../styles/CV.module.scss'

function Formation({date, title, description, learning}: {[key: string]: string}) {
    return (
                <div className={styles.frameData}>
                    <span className={learning ? styles.learning : styles.finished}>{date}</span>
                    <span className={styles.FormationTitle}>{title}</span>
                    <span className={styles.FormationDescription}>{description}</span>
                </div>
    )
}

export default function CV(){
    return (
        <div className={styles.cv}>
        <Head>
            <title>Currículo - Patrick Chaves</title>
        </Head>
            <div className={styles.frame}>
                <h1>Formação Acadêmica</h1>
                <Formation 
                date="2021.1 - Atual"
                title="Sistemas para Internet"
                description="Tecnólogo em sistemas para internet"
                learning="true"
                />
                <Formation 
                date="2018 - 2019"
                title="Educação Física"
                description="Bacharelado em Educação Física"
                />
                <Formation 
                date="2015 - 2018"
                title="Educação Física"
                description="Licenciatura em Educação Física"
                />
            </div>
            <div className={styles.frame}>
                <h1>Idiomas</h1>
                <div className={styles.frameData}>
                    <h2>Português</h2>
                    <div className={styles.progressBarBackground}>
                    <div className={styles.progressBar} style={{width: '100%'}}></div>
                    </div>
                    <h2>Inglês</h2>
                    <div className={styles.progressBarBackground}>
                    <div className={styles.progressBar} style={{width: '40%'}}></div>
                    </div>
                </div>
            </div>
            <div className={styles.frame}>
                <h1>Competências e Habilidades</h1>
                <div className={styles.frameRow}>
                    <div className={styles.frameData+' '+styles.half}>
                    <h1>Hard Skills</h1>
                        <span> - JavaScript, TypeScript, Python, PHP. </span>
                        <span> - ReactJs, NextJs, VueJs.</span>
                        <span> - HTML5, CSS3. </span>
                        <span> - Versionamento Git.</span>
                        <span> - NodeJs.</span>
                        <span> - Docker.</span>
                        <span> - Programação orientada a objetos.</span>
                        <span> - Programação assíncrona.</span>
                        <span> - Banco de dados Postgres, MySql, MongoDB, DynamoDb.</span>
                        <span> - Express, Socket.io, NodeMailer, JWT, Sequelize, TypeORM, BcryptJs, Mongoose.</span>
                        <span> - Integração com meio de pagamentos (MercadoPago)</span>
                    </div>
                    <div className={styles.frameData+' '+styles.half}>
                        <h1>Soft Skills</h1>
                        <span> - Comunicação </span>
                        <span> - Colaboração </span>
                        <span> - Trabalho em equipe </span>
                        <span> - Proatividade </span>
                        <span> - Flexibilidade e resiliência </span>
                        <span> - Liderança </span>
                        <span> - Objetivo em resolução de problemas </span>
                        <span> - Pensamento crítico</span>
                    </div>
                </div>
            </div>
        </div>
    )
}