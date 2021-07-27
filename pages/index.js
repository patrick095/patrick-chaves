import Image from 'next/image'
import styles from '../styles/Home.module.css'
import bannerImg from '../public/js-ts.png'

export default function Home(){
    return (
    <div className={styles.home}>
        <div className={styles.banner}>
            <div className={styles.bannerBackground}>
            </div>
            <div className={styles.bannerText}>
                <span><span className={styles.pink}>function</span> <span className={styles.green}>wellcome</span>() {'{'}</span>
                <span style={{marginLeft: 40}}><span className={styles.pink}>const <span className={styles.gray}>message </span>:</span> 
                <span className={styles.blue}> string </span> = <span className={styles.yellow}>"Bem vindo(a), sinta-se a vontade"</span></span>
                <span style={{marginLeft: 40}}><span className={styles.pink}>return</span> message</span>
                <span>{'}'}</span>
                <span style={{marginLeft: -5, marginTop: 5}} className={styles.writing}>|</span>
            </div>
        </div>
        <div className={styles.about}>
            <h1>{'<Sobre>'}</h1>
            <p>Olá, me chamo Patrick Chaves, tenho 28 anos, estou morando em João Pessoa - PB. Desenvolvedor JavaScript com mais de 2 anos de experiência em projetos próprios desenvolvidos com essa linguagem. Tenho uma boa experiência em aplicações web utilizando ReactJs, NextJs, NodeJs e databases relacionais e não relacionais. Atualmente estou estudando TypeScript e React Native.</p>
            <h1>{'</Sobre>'}</h1>
        </div>
        <div className={styles.others}>
            <div className={styles.stacks}>
                <span className={styles.pink}>let <span className={styles.gray}>Stacks = [</span></span>
                <span className={styles.yellow+' '+styles.margin1}>"JavaScript"<span className={styles.gray}>,</span></span>
                <span className={styles.yellow+' '+styles.margin1}>"Typescript"<span className={styles.gray}>,</span></span>
                <span className={styles.yellow+' '+styles.margin1}>"React"<span className={styles.gray}>,</span></span>
                <span className={styles.yellow+' '+styles.margin1}>"NextJs"<span className={styles.gray}>,</span></span>
                <span className={styles.yellow+' '+styles.margin1}>"VueJs"<span className={styles.gray}>,</span></span>
                <span className={styles.yellow+' '+styles.margin1}>"NodeJs"<span className={styles.gray}>,</span></span>
                <span className={styles.yellow+' '+styles.margin1}>"Postgres/MySql"<span className={styles.gray}>,</span></span>
                <span className={styles.yellow+' '+styles.margin1}>"MongoDb"<span className={styles.gray}>,</span></span>
                <span className={styles.yellow+' '+styles.margin1}>"Docker"<span className={styles.gray}>,</span></span>
                <span className={styles.yellow+' '+styles.margin1}>"Socket.io"<span className={styles.gray}>,</span></span>
                <span className={styles.gray}>]</span>
            </div>
            <div className={styles.academic}>
                <span className={styles.pink}>const <span className={styles.gray}>Formação</span> = <span className={styles.gray}>[</span></span>
                <span className={styles.yellow+' '+styles.margin1}>"Sistemas para Internet"<span className={styles.pink}> : </span><span className={styles.gray}>{'{'}</span></span>
                <span className={styles.gray+' '+styles.margin2}>Universidade<span className={styles.pink}> : </span><span className={styles.yellow}>"Estácio de Sá"</span>,</span>
                <span className={styles.gray+' '+styles.margin2}>Inicio<span className={styles.pink}> : </span><span className={styles.lightblue}>2021</span>,</span>
                <span className={styles.gray+' '+styles.margin2}>Termino<span className={styles.pink}> : </span><span className={styles.lightblue}>2023</span></span>
                <span className={styles.gray+' '+styles.margin1}>{'}'},</span>
                <span className={styles.yellow+' '+styles.margin1}>"Educação Física - Bacharelado"<span className={styles.pink}> : </span><span className={styles.gray}>{'{'}</span></span>
                <span className={styles.gray+' '+styles.margin2}>Universidade<span className={styles.pink}> : </span><span className={styles.yellow}>"UNIASSELVI"</span>,</span>
                <span className={styles.gray+' '+styles.margin2}>Inicio<span className={styles.pink}> : </span><span className={styles.lightblue}>2018</span>,</span>
                <span className={styles.gray+' '+styles.margin2}>Termino<span className={styles.pink}> : </span><span className={styles.lightblue}>2019</span></span>
                <span className={styles.gray+' '+styles.margin1}>{'}'}</span>
                <span className={styles.yellow+' '+styles.margin1}>"Educação Física - Licenciatura"<span className={styles.pink}> : </span><span className={styles.gray}>{'{'}</span></span>
                <span className={styles.gray+' '+styles.margin2}>Universidade<span className={styles.pink}> : </span><span className={styles.yellow}>"UNIPÊ"</span>,</span>
                <span className={styles.gray+' '+styles.margin2}>Inicio<span className={styles.pink}> : </span><span className={styles.lightblue}>2015</span>,</span>
                <span className={styles.gray+' '+styles.margin2}>Termino<span className={styles.pink}> : </span><span className={styles.lightblue}>2018</span></span>
                <span className={styles.gray+' '+styles.margin1}>{'}'}</span>
                <span className={styles.gray}>]</span>
            </div>
        </div>
    </div>
    )
}