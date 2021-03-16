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


function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Travel App</title>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css"
          rel="stylesheet"
          href
        />
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap" rel="stylesheet"/>
      </Head>
      <main>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </main>
     
      <footer>
        <div className="git-hub">
          <a href="https://github.com/slavaider" alt="slavaider"> 
            <img
              className="link-img"
              style={{
                width: "30px",
              }}
              src="https://seeklogo.com/images/G/github-logo-7880D80B8D-seeklogo.com.png"
            />
          </a>
          <a href="https://github.com/VVK1978" alt="viktor">
            <img
              className="link-img"
              style={{
                width: "30px",
              }}
              src="https://seeklogo.com/images/G/github-logo-7880D80B8D-seeklogo.com.png"
            />
          </a>
          <a href="https://github.com/Gadzilla143" alt="gadzilla143">
            <img
              className="link-img"
              style={{
                width: "30px",
              }}
              src="https://seeklogo.com/images/G/github-logo-7880D80B8D-seeklogo.com.png"
            />
          </a>
        </div>
        <a href="https://rs.school/" className="rss">
          <img
            className="link-img"
            style={{
              width: "90px",
            }}
            src="https://rs.school/images/rs_school.svg"
          />
        </a>
      </footer>
    </>
  );

}

export default App;
