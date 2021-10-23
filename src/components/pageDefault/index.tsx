import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

import styles from "./PageDefault.module.scss";
import LeftBarStyles from '../leftBar/LeftBar.module.scss'
import LeftBar from "../leftBar";
import { pagesName } from "../../configs/pages-name";

export default function PageDefault({
    children,
}: {
    children: React.ReactNode;
}) {
    const route = useRouter();

    const [pagePath, setPagePath] = useState(route.asPath);
    const [activeHamburguer, setActiveHamburguer] = useState(false);

    useEffect(() => {
        setPagePath(route.asPath);
    }, [route]);

    function handleHamburguerActive() {
        const leftBarElement = document.querySelector('.'+LeftBarStyles.left) as Element;
        leftBarElement.classList.toggle(LeftBarStyles.activeMenu)
        setActiveHamburguer(!activeHamburguer);
    }

    return (
        <div className={styles.container}>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                />
                <meta
                    name="description"
                    content="Patrick Chaves - Desenvolvedor Fullstack javascript"
                />
            </Head>

            <main className={styles.main}>
                <LeftBar />
                <div className={styles.center}>
                    {children}
                    <div
                        className={
                            activeHamburguer
                                ? `${styles.centershadow} ${styles.active}`
                                : styles.centershadow
                        }
                    />
                </div>
                <div className={styles.footer}>
                    <span>© 2021 All Rights Reserved.</span>
                </div>
                <div
                    className={
                        activeHamburguer
                            ? `${styles.right} ${styles.active}`
                            : styles.right
                    }
                    id="hamburguerDiv"
                >
                    <div
                        className={styles.hamburguer}
                        onClick={handleHamburguerActive}
                    >
                        <span className={styles.hamburguerLine}></span>
                    </div>
                    <div
                        onClick={handleHamburguerActive}
                        className={styles.links}
                    >
                        <Link href="/">
                            <a>Inicio</a>
                        </Link>
                        <Link href="/portifolio">
                            <a>Portifolio</a>
                        </Link>
                        <Link href="/cv">
                            <a>Curriculo</a>
                        </Link>
                        <Link href="/contato">
                            <a>Contato</a>
                        </Link>
                    </div>
                    <div className={styles.actualPage}>
                        <span>{pagesName[pagePath]}</span>
                    </div>
                </div>
            </main>
        </div>
    );
}
