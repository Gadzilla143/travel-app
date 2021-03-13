import { withRouter } from "next/router";
import axios from "axios";
import styles from "../styles/Country_id.module.css";
import Link from "next/link";
import React from "react";
import mapboxgl from "mapbox-gl";
import Rating from "react-rating";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectCube,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper";
import YouTube from 'react-youtube';


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectCube]);

class SingleCountry extends React.Component {
  state = {
    id: null,
    capitalImg: [],
    capital_description: [],
    capital: [],
    capitalData: [],
    currency: null,
    attractions: [],
    rating: [],
    isAuth: false,
    rates: {},
    date: null,
    offset: null,
    temp: null,
    wind: null,
  };

  getData = () => {
    const alias = this.props.router.query.id;
    console.log(alias);
    const {
      currency,
      attractions,
      rating,
      capitalImg,
      capital_description,
      capital,
    } = JSON.parse(this.props.router.query.data);

    this.setState({
      id: this.props.router.query.id,
      currency,
      attractions,
      rating,
      capitalImg,
      capital_description,
      capital,
    });
    // CURRENCY
    axios.post("/api/currency", { currency }).then((response) => {
      if (!response.data.error) {
        this.setState({ rates: response.data.data });
      }
    });
    // TIME
    axios.post("/api/time", { alias }).then((response) => {
      if (!response.data.error) {
        const date = Date.parse(response.data.data);
        const options = {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false,
        };
        options.timeZone = "UTC";
        options.timeZoneName = "short";
        this.setState({
          date: new Intl.DateTimeFormat("en-AU", options).format(date),
          offset: response.data.offset,
        });
      }
    });
    // WEATHER
    axios.post("/api/weather", { alias }).then((response) => {
      if (!response.data.error) {
        this.setState({
          temp: response.data.data.temp,
          wind: response.data.data.wind,
        });
        mapboxgl.accessToken =
          "pk.eyJ1Ijoic2xhdmFpZGVyIiwiYSI6ImNrbHhxY20xNDF2bDEyb3Azc2h6M3gydW4ifQ.lIJ0H5bCqxE7JmW892Hc6g";
        new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11",
          center: [response.data.data.cords.lon, response.data.data.cords.lat], // starting position [lng, lat]
          zoom: 9, // starting zoom
        });
      }
    });
  };

  componentDidMount() {
    if (this.props.router.query.data) {
      this.getData();
    }
    const id = localStorage.getItem("user");
    if (id) {
      const user = { id, type: "auto_login" };
      axios.post("/api/auth", { user }).then((response) => {
        if (!response.data.error) {
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("avatar", response.data.imageUrl);
          localStorage.setItem("user", response.data.id);
          this.setState({ isAuth: true });
        }
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.getData();
    }
  }

  Rate = (value) => {
    const id = localStorage.getItem("user");
    const name = localStorage.getItem("name");
    const alias = this.props.router.query.id;
    axios.post("/api/rate", { value, alias, ownerName: name, ownerId: id });
  };

  render() {
       const opts = {
      height: 'auto',
      width: '100%',
      playerVars: {
        autoplay: 1,
      },
    };
    console.log(parseFloat(this.state.rates.rub).toFixed(2))
    return (
      <div className={styles.full_country}>
         <img
          className={styles.capital__img}
          src={this.state.capitalImg}
          alt={this.state.capitalImg}
        />
        <div className={styles.capital__info_wrapper}>
          <div className={styles.link__home}>
            <Link className="link__home" style={{ color: "red" }} href={"/"}>
              HOME
            </Link>
          </div>
          <div className={styles.capital__info}>
            <p className={styles.capital__info_name}>{this.state.capital}</p>
            <p className={styles.capital__info_description}>
              {this.state.capital_description}
            </p>
          </div>
          RATE:
          {this.state.isAuth ? (
            <Rating onChange={(value) => this.Rate(value)} />
          ) : null}
          RECENT RATING:
          <ul>
            {this.state.rating.map((el) => {
              return Object.values(el).map((value) => {
                return (
                  <li key={value.ownerName}>
                    Owner:{value.ownerName} Rate : {value.value}
                  </li>
                );
              });
            })}
          </ul>
        </div>
        <div className={styles.capital__data_wrapper}>
          <div className={styles.capital__attraction_container}>
            <Swiper
              className={styles.swiper__attraction}
              effect="cube"
              loop={true}
              pagination={{ clickable: true }}
            >
              {this.state.attractions.map((attraction, index) => {
                return (
                  <li key={index}>
                    <SwiperSlide key={index}>
                      {/* <button onClick={handle.enter}>Enter fullscreen</button> */}
{/*                       <FullScreen >
 */}                        <img
                          className={styles.swiper__img}
                          src={attraction.imageUrl}
                          alt={attraction.imageUrl}
                        />
{/*                       </FullScreen>
 */}
                      <p className={styles.swiper__attraction_title}>
                        {attraction.title}
                      </p>
                      <p className={styles.swiper__attraction_description}>
                        {attraction.description}
                      </p>
                    </SwiperSlide>
                  </li>
                );
              })}
            </Swiper>
          </div>
          <div className={styles.capital__data_container}>
          <div className={styles.data__container_info}>
            <Swiper
              className={styles.swiper__info}
              effect="cube"
              loop={true}
              pagination={{ clickable: true }}
            >
              <SwiperSlide className={styles.info__currency}>
                <div className={styles.info__container}>
                  <p className={styles.currency__title}>
                    Валюта страны: {this.state.currency}
                  </p>
                  <p className={styles.currency__course}>Курсы валют:</p>

                  <p className={styles.currency__course}>
                    USD/EUR
                    {parseFloat(this.state.rates.usd).toFixed(3)}
                  </p>
                  <p className={styles.currency__course}>
                    RUB/EUR{parseFloat(this.state.rates.rub).toFixed(3)}
                  </p>
                </div>
              </SwiperSlide>

              <SwiperSlide className={styles.info__weather}>
                <div className={styles.info__container}>
                  <p className={styles.weather__date_title}>Местное время:</p>
                  <p className={styles.weather__date}>{this.state.date}</p>
                  <p className={styles.weather__current_title}>
                    Текущая погода:
                  </p>
                  <p className={styles.weather__current}>
                    tC = {this.state.temp}
                  </p>
                  <p className={styles.weather__current}>
                    wind {this.state.wind} m/s
                  </p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className={styles.data__container_map}>
            <Swiper className={styles.swiper__map}>
              <SwiperSlide>
                <div id={"map"} className={styles.map} />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className={styles.data__container_video}>
            <Swiper className={styles.swiper__video}>

              <SwiperSlide>
               <YouTube videoId="U8_q60-vs9E" opts={opts} onReady={this._onReady} />
               </SwiperSlide>

            </Swiper>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SingleCountry);
