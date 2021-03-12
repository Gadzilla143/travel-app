import {connectToDatabase} from "../util/mongodb";
import React from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Rating from "react-rating";

class Index extends React.Component {
    state = {
        img: null,
        name: null,
        countries: [],
        isAuth: false,
        filteredCountries: null,
        type: "ru",
    };

    componentDidMount() {
        if (localStorage.getItem("lang")) {
            this.setState({
                type: localStorage.getItem("lang"),
            });
        } else {
            localStorage.setItem("lang", this.state.type);
        }
        axios
            .post("/api/country", {
                type: localStorage.getItem("lang") || this.state.type,
            })
            .then((response) => {
                this.setState({
                    countries: response.data.data,
                });
            });

        const id = localStorage.getItem("user");
        if (id) {
            const user = {id, type: "auto_login"};
            axios.post("/api/auth", {user}).then((response) => {
                if (!response.data.error) {
                    localStorage.setItem("name", response.data.name);
                    localStorage.setItem("avatar", response.data.imageUrl);
                    localStorage.setItem("user", response.data.id);
                    this.setState({
                        name: response.data.name,
                        img: response.data.imageUrl,
                        isAuth: true,
                    });
                }
            });
        }
    }

    RegisterSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const avatar = e.target.avatar.files;

        const config = {
            headers: {"content-type": "multipart/form-data"},
            onUploadProgress: (event) => {
                console.log(
                    `Current progress:`,
                    Math.round((event.loaded * 100) / event.total)
                );
            },
        };
        const formData = new FormData();
        Array.from(avatar).forEach((file) => {
            formData.append("theFiles", file);
        });
        const imageUrlRaw = await axios.post("/api/uploads", formData, config);
        const imageUrl = imageUrlRaw.data.data;
        const user = {email, name, password, imageUrl, type: "register"};
        const response = await axios.post("/api/auth", {user});
        localStorage.setItem("name", name);
        localStorage.setItem("avatar", imageUrl);
        localStorage.setItem("user", response.data.id);
        this.setState({isAuth: true});
    };
    LoginSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const user = {email, password, type: "login"};
        const response = await axios.post("/api/auth", {user});
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("avatar", response.data.imageUrl);
        localStorage.setItem("user", response.data.id);
        this.setState({isAuth: true});
    };

    searchText = (e) => {
        if (e.target.value === "") this.setState({filteredCountries: null});
        const filter = [...this.state.countries];
        const result = filter.filter((el) => {
            return (
                el.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
            );
        });
        this.setState({filteredCountries: result});
    };
    searchButton = () => {
        const value = document.querySelector("#search").value;
        if (value === "") this.setState({filteredCountries: null});
        const filter = [...this.state.countries];
        const result = filter.filter((el) => {
            return el.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
        this.setState({filteredCountries: result});
    };

    quit = () => {
        this.setState({isAuth: false});
        localStorage.clear();
    };
    changeLang = (e) => {
        this.setState({
            type: e.target.value,
        });
        axios.post("/api/country", {type: e.target.value}).then((response) => {
            this.setState({
                countries: response.data.data,
            });
        });
        localStorage.setItem("lang", e.target.value);
    };

    getRating = (rating) => {
        if (rating.length === 0) return 0;
        let res = 0;
        rating.map((item) => {
            Object.values(item).forEach((el) => {
                res += el.value;
            });
        });
        return (res / rating.length).toFixed(1);
    };

    render() {
        return (
            <div className={styles.homepage}>
                <div className={styles.header}>
                    <select
                        onChange={(e) => this.changeLang(e)}
                        value={this.state.type}
                        name="lang"
                        id="lang"
                    >
                        <option value={"ru"}>RU</option>
                        <option value={"en"}>EN</option>
                        <option value={"ge"}>GE</option>
                    </select>
                    <Link href="/">Homepage</Link>
                    <input
                        type="text"
                        id={"search"}
                        onKeyDown={(e) => this.searchText(e)}
                        placeholder={"Search"}
                    />
                    <button onClick={() => this.searchButton()}>Search</button>
                    {!this.state.isAuth ? (
                        <div className={styles.auth}>
                            <form id={"Register"} onSubmit={(e) => this.RegisterSubmit(e)}>
                                <label htmlFor="file">
                                    Avatar
                                    <input required id="file" name="avatar" type="file"/>
                                </label>
                                <br/>
                                <label htmlFor="username">
                                    Name:
                                    <input required id={"username"} type="text" name="username"/>
                                </label>
                                <br/>
                                <label htmlFor="email">
                                    Email:
                                    <input id={"email"} type="email" required name="email"/>
                                </label>
                                <br/>
                                <label htmlFor="password">
                                    Password:
                                    <input
                                        required
                                        id={"password"}
                                        type="password"
                                        name="password"
                                    />
                                </label>
                                <br/>
                                <input type="submit" name="submit"/>
                            </form>
                            <br/>
                            <h1>Dev [LOGIN] : 1@mail.ru [PASSWORD]:123</h1>
                            <form id={"Login"} onSubmit={(e) => this.LoginSubmit(e)}>
                                <label htmlFor="login_email">
                                    Email:
                                    <input
                                        required
                                        id={"login_email"}
                                        type="email"
                                        name="email"
                                    />
                                </label>
                                <br/>
                                <label htmlFor="login_password">
                                    Password:
                                    <input
                                        required
                                        id={"login_password"}
                                        type="password"
                                        name="password"
                                    />
                                </label>
                                <br/>
                                <input type="submit" name="submit"/>
                            </form>
                        </div>
                    ) : (
                        <>
                            <img
                                className={styles.avatar}
                                src={this.state.img}
                                alt="avatar"
                            />
                            <p>{this.state.name}</p>
                            <button onClick={() => this.quit()}>quit</button>
                        </>
                    )}
                </div>
                {this.props.isConnected ? (
                    <>
                        <div className={styles.main}>
                            <ul>
                                {this.state[
                                    this.state.filteredCountries
                                        ? "filteredCountries"
                                        : "countries"
                                    ].map((country, index) => {
                                    console.log(country.capitalImageUrl);
                                    return (
                                        <div key={index}>
                                            <Link
                                                href={{
                                                    pathname: `/${country.capital_alias}`,
                                                    query: {
                                                        data: JSON.stringify({
                                                            currency: country.local_currency,
                                                            attractions: country.attractions,
                                                            rating: country.rating,
                                                            capitalImg: country.capitalImageUrl,
                                                            capital_description: country.capital_description,
                                                            capital: country.capital,
                                                            videoUrl:country.videoUrl
                                                        }),
                                                    },
                                                }}
                                            >
                                                <div>
                                                    <hr/>
                                                    <div className={styles.country__wrapper}>
                                                        <div className={styles.country__info}>
                                                            <p className={styles.country__name}>
                                                                {country.name}
                                                            </p>
                                                            <img
                                                                className={styles.flag__img}
                                                                src={country.flagImageUrl}
                                                                alt={country.flagImageUrl}
                                                            />
                                                            <div className={styles.country__raitng}>
                                                                <Rating
                                                                    readonly={true}
                                                                    initialRating={this.getRating(country.rating)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className={styles.country__map}>
                                                            <img
                                                                className={styles.country__map__img}
                                                                src={country.urlImage}
                                                                alt={country.urlImage}
                                                            />
                                                        </div>
                                                        {/*                             <p>{country.capital}</p>
                             */}
                                                        <p>{country.capital_description}</p>

                                                        {/* <img
                            className={styles.capital__img}
                            src={country.capitalImageUrl}
                            alt={country.capitalImageUrl}
                          /> */}
                                                        <hr/>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </ul>
                        </div>
                    </>
                ) : null}
            </div>
        );
    }
}

export default Index;

export async function getServerSideProps() {
    const {client} = await connectToDatabase();

    const isConnected = await client.isConnected();

    return {
        props: {isConnected},
    };
}
