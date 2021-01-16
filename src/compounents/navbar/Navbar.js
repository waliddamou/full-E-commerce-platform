import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import DropDown from "../DropDownMenu/DropDown"
export default class navbar extends Component {
    constructor() {
        super()
        this.state = {
            loggedin:false
        }
    }
    componentDidMount() {
        if (localStorage.getItem("usertoken") === null) {
            this.setState({
                loggedin:false
            })
          }
          else{
            this.setState({
                loggedin:true
            })
          }
        
      }
    
    render() {
        
        return (
            <section>
            <div className="navbar">
            <DropDown />
                <nav className="" style={{backgroundColor:"#ad3216"}}>
                
                    <div className="container">
                        <div className="nav-wrapper center">
                            <Link to="/" className="brand" style={{textAlign:"center",fontSize:"25px"}}>
                                <img src="http://151.80.56.201:5000/static/products/noraml.svg" style={{height:"50px"}}  alt="picture"/>
                            
                            </Link>
                            
                            <ul id="nav-mobile" className="right hide-on-med-and-down">

                                <li key="k1">
                                <Link to="/" ><b>Accueil</b></Link>
                                </li>
                                <li key="k2">
                                    <Link to="/shop" ><b>Shop</b></Link>
                                </li>

                                
                                <li key="k5">
                                    <Link to="/contact-us" ><b>Contacter-Nous</b></Link>
                                </li>
                                <li key="k6">
                                    {this.state.loggedin===true ?
                                    <Link to="/panel" ><b>Tableau De Bord</b></Link>
                                    :(
                                    
                                    <Link to="/login" ><b>Connexion</b></Link>
                                    )
                                    }
                                    </li>
                            </ul>
                            
                        </div>

                    </div>
                </nav>
            </div>
        </section>
        )
    }
}
