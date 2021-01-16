import React from 'react'
import '../../../node_modules/jquery/dist/jquery';
import 'materialize-css/dist/js/materialize';
import './footer.css'
const Footer = () => {
  return (
    <section className="section darken-2 white-text center scrollspy" style={{backgroundColor:"#ad3216",marginTop:"10%"}}>
      <div className="row">
        <div className="col s12">
          <h4 style={{color:"white"}}>Suiver Nous</h4>
          <p>Welcom to the world of Staylli Clothes for Everyone !</p>
          <a className="white-text" href="https://web.facebook.com/staylliDZ">
            <i className="fab fa-facebook fa-3x"></i>
          </a>
         {/* 
          <a className="white-text" href="!#">
            <i className="fab fa-instagram fa-3x"></i>
          </a>
          */}
        </div>
        
      </div>
    </section>

  );
}
export default Footer;
