import "../styles/global.css";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "swiper/components/effect-cube/effect-cube.scss";
import Head from "next/head";
import React from "react";
import {Provider} from "react-redux";
import store from "../store/store";

function App({Component, pageProps}) {
    return (
        <>
            <Head>
                <title>Travel App</title>
                <link
                    href="https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css"
                    rel="stylesheet"
                />
            </Head>
            <main>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </main>
            <footer>
                <ul>
                    <li><a href="https://github.com/slavaider">&copy;slavaider</a></li>
                    <li><a href="https://github.com/slavaider">&copy;ViktOr</a></li>
                    <li><a href="https://github.com/slavaider">&copy;doomsday_nasty_af</a></li>
                    <li>
                        2021
                        <img src={'/rs_school_js.svg'} width={300} height={50} alt="logo"/>
                    </li>
                    <li>
                        <a href="https://rs.school/js/">rs-school</a>
                    </li>
                </ul>
            </footer>
        </>
    );
}

export default App;
