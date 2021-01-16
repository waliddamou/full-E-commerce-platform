import React from 'react';
import './ShopNow.css';
import {Link} from 'react-router-dom';
const ShopNow = () => {
    
        return (
            <section className="section section-book darken-2 white-text center" id="shopnow" style={{backgroundColor:"#ad3216"}}>
                <div className="container">
                    <div className="row">
                        <div className="col s12 center">
                            <Link to={"/shop"} className="btn btn-large waves-effect white text-darken-3" style={{color:"#ad3216"}}>
                                <i className="material-icons left">send</i> Achetez maintenant

                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        )
    
}

export default ShopNow;