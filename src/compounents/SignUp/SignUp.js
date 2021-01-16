import React, { Component,Fragment } from 'react'
import Navbar from "../navbar/Navbar"; 
import {register} from './UserSignup';

class SignUp extends Component {
    constructor(){
        super()
        this.state = {
            first_name:"",
            last_name:"",
            email:"",
            password:"",
            phone:"",
            birth:""
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e){
        e.preventDefault()
        const newUser = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            birth: this.state.birth
        }
        register(newUser).then(res =>{
            this.props.history.push('/login')
            
        })
    } 

        render() {
        return (
            <Fragment>
            <section>
                <Navbar />
            </section>
            <section id="contact" className="section section-contact scrollspy">
            <div className="container">
                <div className="row">
                    <div className="col s12 m6">
                        <div className="card-panel purple white-text center">
                             
                            <h5>Body Care</h5>
                            <p>Bienvenue sur le site Krisma Body Care ! Toutes choses beauté, tout en un seul endroit. ♥</p>
                        </div>
                        
                    </div>
                    <div className="col s12 m6">
                        <div className="card-panel grey lighten-3">
                            <h5 className="center"><span className="purple-text text-darken-1">Inscr</span>iption</h5>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="input-field">
                                    <input type="text" name="first_name" value={this.state.first_name} onChange={this.onChange} id="first_name" className="validate" />
                                    <label for="name" className="purple-text">Nom </label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="last_name" value={this.state.last_name} onChange={this.onChange} id="last_name" className="validate" />
                                    <label for="last_name" className="purple-text">Prénom</label>
                                </div>
                                <div className="input-field">
                                    <input type="email" name="email" value={this.state.email} onChange={this.onChange} id="email" className="validate" />
                                    <label for="email" className="purple-text">E-mail</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="phone" value={this.state.phone} onChange={this.onChange} id="phone" className="validate" />
                                    <label for="phone" className="purple-text">Numéro de téléphone</label>
                                </div>
                                <div className="input-field">
                                    <input type="date" name="birth" value={this.state.birth} onChange={this.onChange} id="date" className="validate"></input>
                                    <label for="birth" className="purple-text">Date de Naissance</label>
                                </div>
                                <div className="input-field">
                                    <input type="password" name="password" value={this.state.password} onChange={this.onChange} id="password" className="validate"></input>
                                    <label for="password" className="purple-text">Mot de passe</label>
                                </div>
                                <div className="input-field">
                                    <input type="password" id="password2" className="validate"></input>
                                    <label for="password2" className="purple-text">Confirmer le mot de passe</label>
                                </div>
                                
                                <button type="submit"  className="btn purple" >Inscription</button>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </Fragment>

        )}
    
}

export default SignUp;