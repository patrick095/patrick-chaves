import "../styles/globals.scss";
import type { AppProps } from "next/app";
import PageDefault from "../components/pageDefault";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <PageDefault>
            <Component {...pageProps} />
        </PageDefault>
    );
}
export default MyApp;
