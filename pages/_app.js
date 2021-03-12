import '../styles/global.css'
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "swiper/components/effect-cube/effect-cube.scss";
import Head from "next/head";
import React from "react";

export default function App({Component, pageProps}) {
    return (
        <>
            <Head>
                <title>Travel2 App</title>
                <link href='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css' rel='stylesheet' />
                {/*<link rel="icon" href="/favicon.ico"/>*/}
            </Head>
            <main>
                <Component {...pageProps} />
            </main>
            <footer>
                footer
            </footer>
        </>
    )
}
