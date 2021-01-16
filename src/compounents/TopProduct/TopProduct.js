import React from 'react';
import "../../../node_modules/materialize-css/dist/css/materialize.min.css";
import icon1 from "../../images/005-cleanser.png";
import icon2 from "../../images/017-eyelashes.png";
import icon3 from "../../images/011-cream.png";
import "./TopProduct.css"
const TopProduct = () => {
        return (
            <section id="TopProducts" className="section section-icons grey lighten-4 center">
                <div className="container">
                  <h4><span className="purple-text darken-1">NOS</span> PRODUITS</h4>
                <div class="row">
                     <div class="col s12 m4">
                       <div class="card" >
                         <div class="card-image" >
                           <img src={icon1} alt="Vacation" class="cardimg" />
                           <a class="btn-floating halfway-fab waves-effect waves-light purple" href="https://www.google.com"><i class="material-icons">search</i></a>
                         </div>
                         <div class="card-content">
                           <h4 className="purple-text">SAVON</h4>
                         </div>
                       </div>
                     </div>
                     <div class="col s12 m4">
                       <div class="card" >
                         <div class="card-image" >
                           <img src={icon2} alt="Vacation" class="cardimg" />
                           <a class="btn-floating halfway-fab waves-effect waves-light purple" href="www.google.com"><i class="material-icons">search</i></a>
                         </div>
                         <div class="card-content">
                           <h4 className="purple-text">PALETTE</h4>
                         </div>
                       </div>
                     </div>
                     <div class="col s12 m4">
                       <div class="card" >
                         <div class="card-image" >
                           <img src={icon3} alt="Vacation" class="cardimg"/>
                           <a class="btn-floating halfway-fab waves-effect waves-light purple" href="www.google.com"><i class="material-icons">search</i></a>
                         </div>
                         <div class="card-content">
                           <h4 className="purple-text">NOIX DE COCO</h4>
                         </div>
                       </div>
                     </div>
                     
                    </div> 
                </div>
            </section>
        )
    
}

export default TopProduct;
