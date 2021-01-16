import React, { Component } from 'react'
import "../../../node_modules/materialize-css/dist/css/materialize.min.css";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import axios from "axios"
export default class navbar extends Component {
    constructor() {
        super()
        this.state = {
            loggedin: false,
            fullname: "",
            email: "",
            phone: "",
            message: ""
        }
    }

    componentWillMount() {
        if (localStorage.getItem("usertoken") === null) {
            this.setState({
                loggedin: false
            })
        }
        else {
            this.setState({
                loggedin: true
            })
        }

    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

    }
    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append("fullname", this.state.fullname)
        formData.append("phone", this.state.phone)
        formData.append("email", this.state.email)
        formData.append("message", this.state.message)
        axios({
            url: "http://151.80.56.201:5000/Dashboard/Contacte",
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            this.props.history.push("/")
        })
    }

    render() {
        return (
            <>
                <Navbar />
                <section id="contact" className="section section-contact scrollspy">
                    <div className="container">
                        <div className="row">
                            <div className="col s12 m6">
                                <div className="card-panel white-text center" style={{ backgroundColor: "#ad3216" }}>
                                    <i className="material-icons">email</i>
                                    <h5>Staylli</h5>
                                    <p>Bienvenue sur le site Staylli ! Toutes choses , tout en un seul endroit. ♥</p>
                                </div>
                                <ul className="collection with-header">
                                    <li className="collection-header">
                                        <h4>A PROPOS</h4>
                                    </li>
                                    <li className="collection-item"><i className="fas fa-phone"></i>  0558 93 21 43/0775 83 35 37</li>

                                </ul>
                            </div>
                            <div className="col s12 m6">
                                <div className="card-panel grey lighten-3">
                                    <h5><span className="text-darken-1" style={{ color: "#ad3216" }}>Contacter</span> Nous</h5>
                                    <form>
                                        <div className="input-field">
                                            <input type="text" name="fullname" id="name" className="validate" onChange={(e) => this.onChange(e)} />
                                            <label for="name" className="" style={{ color: "#ad3216" }} >Nom et Prénom</label>
                                        </div>
                                        <div className="input-field">
                                            <input type="text" id="mail" name="email" className="validate" onChange={(e) => this.onChange(e)} />
                                            <label for="mail" className="" style={{ color: "#ad3216" }}>E-Mail</label>
                                        </div>
                                        <div className="input-field">
                                            <input type="text" id="phone" name="phone" className="validate" onChange={(e) => this.onChange(e)} />
                                            <label for="phone" className="" style={{ color: "#ad3216" }}>Numéro de téléphone</label>
                                        </div>
                                        <div className="input-field">
                                            <textarea type="text" id="message" name="message" className="materialize-textarea" onChange={(e) => this.onChange(e)} data-length="1000" ></textarea>
                                            <label for="message" className="" style={{ color: "#ad3216" }}>Envoyer</label>
                                        </div>
                                        <input type="submit" value="Envoyer" className="btn" style={{ backgroundColor: "#ad3216" }} onClick={(e) => this.onSubmit(e)} />

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        )
    }
}