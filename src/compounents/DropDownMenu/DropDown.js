import React, { Component } from 'react'
import { bubble as Menu } from 'react-burger-menu'
import "./style.css"
import { Link } from 'react-router-dom';
class DropDown extends Component {
    showSettings(event) {
        event.preventDefault();

    }

    render() {
        // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
        return (
            <Menu>
                <li className="center"><Link to="/" className="brand" style={{ textAlign: "center" }}>
                    <img src="http://151.80.56.201:5000/static/products/noraml.svg" style={{ height: "50px" }} alt="picture" />
                </Link></li>
                <li><Link to="/" ><b>Accueil</b></Link></li>
                <li><Link to="/shop" ><b>Shop</b></Link></li>
                <li><Link to="/contact-us" ><b>Contacter-Nous</b></Link></li>
                <li><Link to="/login" ><b>Connexion</b></Link></li>
            </Menu>
        );
    }
}
export default DropDown