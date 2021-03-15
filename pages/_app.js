import "../styles/global.css";
import "../styles/modal.css";
import "../styles/modalSlider.css";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "swiper/components/effect-cube/effect-cube.scss";
import Head from "next/head";
import React from "react";
import { Provider } from "react-redux";
import store from "../store/store";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Travel App</title>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css"
          rel="stylesheet"
        />
        {/*<link rel="icon" href="/favicon.ico"/>*/}
      </Head>
      <main>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </main>
      {/*       <footer>footer</footer>
       */}{" "}
    </>
  );
}

export default App;
