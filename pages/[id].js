import {withRouter} from "next/router";
import axios from "axios";
import styles from '../styles/Country_id.module.css'
import Link from "next/link";
import React from "react";
import mapboxgl from 'mapbox-gl'
import Rating from 'react-rating';

class SingleCountry extends React.Component {

    state = {
        id: null,
        currency: null,
        attractions: [],
        rating: [],
        isAuth: false,
        rates: {},
        date: null,
        offset: null,
        temp: null,
        wind: null
    }

    getData = () => {
        const alias = this.props.router.query.id
        const {currency, attractions, rating} = JSON.parse(this.props.router.query.data)
        this.setState({
            id: this.props.router.query.id,
            currency,
            attractions,
            rating
        })
        // CURRENCY
        axios.post('/api/currency', {currency}).then((response) => {
            if (!response.data.error) {
                this.setState({rates: response.data.data});
            }
        })
        // TIME
        axios.post('/api/time', {alias}).then((response) => {
            if (!response.data.error) {
                const date = Date.parse(response.data.data);
                const options = {
                    year: 'numeric', month: 'numeric', day: 'numeric',
                    hour: 'numeric', minute: 'numeric', second: 'numeric',
                    hour12: false
                };
                options.timeZone = 'UTC';
                options.timeZoneName = 'short';
                this.setState({
                    date: new Intl.DateTimeFormat('en-AU', options).format(date),
                    offset: response.data.offset,
                });
            }
        })
        // WEATHER
        axios.post('/api/weather', {alias}).then((response) => {
            if (!response.data.error) {
                this.setState({
                    temp: response.data.data.temp,
                    wind: response.data.data.wind,
                });
                mapboxgl.accessToken = 'pk.eyJ1Ijoic2xhdmFpZGVyIiwiYSI6ImNrbHhxY20xNDF2bDEyb3Azc2h6M3gydW4ifQ.lIJ0H5bCqxE7JmW892Hc6g';
                new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [response.data.data.cords.lon, response.data.data.cords.lat], // starting position [lng, lat]
                    zoom: 9 // starting zoom
                });
            }
        })
    }

    componentDidMount() {
        if (this.props.router.query.data) {
            this.getData()
        }
        const id = localStorage.getItem('user')
        if (id) {
            const user = {id, type: 'auto_login'};
            axios.post('/api/auth', {user}).then((response) => {
                if (!response.data.error) {
                    localStorage.setItem('name', response.data.name)
                    localStorage.setItem('avatar', response.data.imageUrl)
                    localStorage.setItem('user', response.data.id)
                    this.setState({isAuth: true})
                }
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.getData()
        }
    }

    Rate = (value) => {
        const id = localStorage.getItem('user')
        const name = localStorage.getItem('name')
        const alias = this.props.router.query.id
        axios.post('/api/rate', {value, alias, ownerName: name, ownerId: id})
    }

    render() {
        return (
            <div className={styles.full_country}>
                <Link href={'/'}>HOME</Link>
                <br/>
                ID : {this.state.id}
                <br/>
                BASE CURRENCY: {this.state.currency}
                <br/>
                RATES[RUB]: {this.state.rates.rub}
                <br/>
                RATES[USD]: {this.state.rates.usd}
                <br/>
                RATES[EUR]: {this.state.rates.eur}
                <br/>
                TIME:{this.state.date}
                <br/>
                OFFSET: {this.state.offset}
                <br/>
                TEMPERATURE:{this.state.temp}
                <br/>
                WIND:{this.state.wind}
                <br/>
                <div id={'map'} className={styles.map}/>
                RATE:
                {this.state.isAuth ? <Rating onChange={(value) => this.Rate(value)}/> : null}
                <br/>
                RECENT RATING:
                <ul>
                    {this.state.rating.map((el) => {
                        return Object.values(el).map((value) => {
                            return (<li key={value.ownerName}>
                                Owner:{value.ownerName} Rate : {value.value}
                            </li>)
                        })
                    })}
                </ul>
                <ul>
                    {this.state.attractions.map((attraction, index) => {
                        return (
                            <li key={index}>
                                <p>{attraction.title}</p>
                                <img src={attraction.imageUrl} alt={attraction.imageUrl} style={{width: "100%"}}/>
                                <p>{attraction.description}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default withRouter(SingleCountry)
