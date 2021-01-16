import React, { Component, Fragment } from 'react'
import Navbar from "../navbar/Navbar"; 
import { Button, notification } from 'antd';
import jwt_decode from 'jwt-decode';
import 'react-notifications-component/dist/theme.css'
import axios from 'axios'
const close = () => {
    console.log(
        'Notification was closed. Either the close button was clicked or duration time elapsed.',
    );
};

const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
        <Button type="primary" size="small" onClick={() => notification.close(key)}>
            Confirmer
        </Button>
    );
    notification.open({
        message: 'Oops !',
        description:
            'E-Mail ou Mot de Passe invalide',
        btn,
        key,
        onClose: close,
    });
};
class Login extends Component {
    constructor(){
        super()
        this.state = {
            email:"",
            password:""
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e){
        e.preventDefault()
        const formData= new FormData();
        formData.append("email",this.state.email)
        formData.append("password",this.state.password)
        axios({
            url: "http://151.80.56.201:5000/login",
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            if (response.data[0].token){
                localStorage.setItem('usertoken',response.data[0].token)
                const token = localStorage.getItem('usertoken');
                const decoded = jwt_decode(token)
                
                if (decoded.identity.role==="Admin"){
                    this.props.history.push('/panel')
                }
                if (decoded.identity.role==="Confermatrice"){
                    this.props.history.push('/panel')
                }
                if (decoded.identity.role==="Livreur"){
                    this.props.history.push('/Livreur')
                }

            }
            if(!response.data[0].token){
                openNotification()
            }
           
            
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
                    <div className="">
                        <div className="card-panel white-text center" style={{backgroundColor:"#ad3216"}}>
                             
                            <h5 style={{color:"white"}}>Staylli</h5>
                            <p>Bienvenue sur le site Staylli ! , tout en un seul endroit. ♥</p>
                        </div>
                        
                    </div>
                    <div className="">
                        <form noValidate onSubmit={this.onSubmit}>
                        <div className="card-panel grey lighten-3">
                            <h5 className="center"><span className="text-darken-1" style={{color:"#ad3216"}}>Conn</span>exion</h5>
                            <form>
                                <div className="input-field">
                                    <input type="text" name="email" value={this.state.email} onChange={this.onChange} id="mail" className="validate" />
                                    <label for="mail" className="" style={{color:"#ad3216"}}>E-Mail</label>
                                </div>
                                <div className="input-field">
                                    <input type="password" name="password" value={this.state.password} onChange={this.onChange} id="password" className="validate"></input>
                                    <label for="password" className="" style={{color:"#ad3216"}}>Mot de passe</label>
                                </div>
                                <div className="row center">
                                    <div className="col s12">
                                        <button type="submit" className="btn align-center" style={{backgroundColor:"#ad3216"}}>Connexion</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        </form>
                    </div>
                   
                    
                </div>
            </div>
        </section>
        </Fragment>
        )
    }
}

export default Login;