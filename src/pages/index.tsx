/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import styles from "../styles/Home.module.scss";

export default function Home() {
    return (
        <div className={styles.home}>
            <Head>
                <title>Patrick Chaves</title>
            </Head>
            <div className={styles.banner}>
                <div className={styles.bannerBackground}></div>
                <div className={styles.bannerText}>
                    <span>
                        <span className={styles.pink}>function</span>{" "}
                        <span className={styles.green}>welcome</span>() {"{"}
                    </span>
                    <span style={{ marginLeft: 40 }}>
                        <span className={styles.pink}>
                            const <span className={styles.gray}>message </span>:
                        </span>
                        <span className={styles.blue}> string </span> ={" "}
                        <span className={styles.yellow}>
                            "Bem vindo(a), sinta-se a vontade"
                        </span>
                    </span>
                    <span style={{ marginLeft: 40 }}>
                        <span className={styles.pink}>return</span> message
                    </span>
                    <span>{"}"}</span>
                    <span
                        style={{ marginLeft: -5, marginTop: 5 }}
                        className={styles.writing}
                    >
                        |
                    </span>
                </div>
            </div>
            <div className={styles.about}>
                <h1>{"<About>"}</h1>
                <p>
                    Olá, me chamo Patrick Chaves, tenho 28 anos, e atualmente
                    estou morando em João Pessoa - PB. Sou desenvolvedor
                    Front-end com mais de 4 anos de experiência e atualmente estou trabalhando como desenvolvedor front-end.
                </p>
                <h1>{"</About>"}</h1>
            </div>
            <div className={styles.others}>
                <div className={styles.stacks}>
                    <span className={styles.pink}>
                        let{" "}
                        <span className={styles.gray}>Conhecimentos = [</span>
                    </span>
                    <span className={styles.yellow + " " + styles.margin1}>
                        "JavaScript"<span className={styles.gray}>,</span>
                    </span>
                    <span className={styles.yellow + " " + styles.margin1}>
                        "Typescript"<span className={styles.gray}>,</span>
                    </span>
                    <span className={styles.yellow + " " + styles.margin1}>
                        "Angular"<span className={styles.gray}>,</span>
                    </span>
                    <span className={styles.yellow + " " + styles.margin1}>
                        "React"<span className={styles.gray}>,</span>
                    </span>
                    <span className={styles.yellow + " " + styles.margin1}>
                        "NextJs"<span className={styles.gray}>,</span>
                    </span>
                    <span className={styles.yellow + " " + styles.margin1}>
                        "VueJs"<span className={styles.gray}>,</span>
                    </span>
                    <span className={styles.yellow + " " + styles.margin1}>
                        "NodeJs"<span className={styles.gray}>,</span>
                    </span>
                    <span className={styles.yellow + " " + styles.margin1}>
                        "Postgres/MySql"<span className={styles.gray}>,</span>
                    </span>
                    <span className={styles.yellow + " " + styles.margin1}>
                        "MongoDb"<span className={styles.gray}>,</span>
                    </span>
                    <span className={styles.yellow + " " + styles.margin1}>
                        "Docker"<span className={styles.gray}>,</span>
                    </span>
                    <span className={styles.yellow + " " + styles.margin1}>
                        "Socket.io"<span className={styles.gray}>,</span>
                    </span>
                    <span className={styles.gray}>]</span>
                </div>
                <div className={styles.academic}>
                    <span className={styles.pink}>
                        const <span className={styles.gray}>Formação</span> ={" "}
                        <span className={styles.gray}>[</span>
                    </span>
                    <span className={styles.yellow + " " + styles.margin1}>
                        "Sistemas para Internet"
                        <span className={styles.pink}> : </span>
                        <span className={styles.gray}>{"{"}</span>
                    </span>
                    <span className={styles.gray + " " + styles.margin2}>
                        Universidade<span className={styles.pink}> : </span>
                        <span className={styles.yellow}>"Estácio de Sá"</span>,
                    </span>
                    <span className={styles.gray + " " + styles.margin2}>
                        Inicio<span className={styles.pink}> : </span>
                        <span className={styles.lightblue}>2021</span>,
                    </span>
                    <span className={styles.gray + " " + styles.margin2}>
                        Termino<span className={styles.pink}> : </span>
                        <span className={styles.lightblue}>2023</span>
                    </span>
                    <span className={styles.gray + " " + styles.margin1}>
                        {"}"},
                    </span>
                    <span className={styles.yellow + " " + styles.margin1}>
                        "Educação Física - Bacharelado"
                        <span className={styles.pink}> : </span>
                        <span className={styles.gray}>{"{"}</span>
                    </span>
                    <span className={styles.gray + " " + styles.margin2}>
                        Universidade<span className={styles.pink}> : </span>
                        <span className={styles.yellow}>"UNIASSELVI"</span>,
                    </span>
                    <span className={styles.gray + " " + styles.margin2}>
                        Inicio<span className={styles.pink}> : </span>
                        <span className={styles.lightblue}>2018</span>,
                    </span>
                    <span className={styles.gray + " " + styles.margin2}>
                        Termino<span className={styles.pink}> : </span>
                        <span className={styles.lightblue}>2019</span>
                    </span>
                    <span className={styles.gray + " " + styles.margin1}>
                        {"}"}
                    </span>
                    <span className={styles.yellow + " " + styles.margin1}>
                        "Educação Física - Licenciatura"
                        <span className={styles.pink}> : </span>
                        <span className={styles.gray}>{"{"}</span>
                    </span>
                    <span className={styles.gray + " " + styles.margin2}>
                        Universidade<span className={styles.pink}> : </span>
                        <span className={styles.yellow}>"UNIPÊ"</span>,
                    </span>
                    <span className={styles.gray + " " + styles.margin2}>
                        Inicio<span className={styles.pink}> : </span>
                        <span className={styles.lightblue}>2015</span>,
                    </span>
                    <span className={styles.gray + " " + styles.margin2}>
                        Termino<span className={styles.pink}> : </span>
                        <span className={styles.lightblue}>2018</span>
                    </span>
                    <span className={styles.gray + " " + styles.margin1}>
                        {"}"}
                    </span>
                    <span className={styles.gray}>]</span>
                </div>
            </div>
        </div>
    );
}
