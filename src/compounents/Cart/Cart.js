import React, { Component } from 'react'
import "./Cart.css"
import { withRouter } from 'react-router-dom';

class Cart extends Component {
    constructor() {
        super()
        this.state = {
           
            cartItem: []

        }

    }
    render() {
        const { cartItem } = this.props;
        return (
                <div>


                    <div className="container-fluid">
                        {cartItem.length === 0 ? (
                            <div className="cart cart-header">Le Panier est vide</div>
                        ) : (
                                <div className="cart cart-header">
                                    Vous avez {cartItem.length} Produits dans le Panier {" "}
                                </div>
                            )}

                    </div>
                    {cartItem.map(item => (
                    <div className="row">
                        
                            <>
                            <div className="col s4">
                                
                                <img src={`data:image/jpg;base64,${item.Photos}`} alt={item.Name} style={{ width: "5rem" }}></img>
                                
                            </div>
                            <div className="col s4">
                            <p>{item.Name}{"     "}</p>
                            
                            </div>
                            
                            <div className="col s4">
                                <p>{item.SellPrice} x {item.count}{"     "}
                                <button className="btn purple" onClick={() => this.props.removeFromCart(item)}><i className="material-icons">delete_forever</i></button>
                                </p>
                            </div>
                             </>  
                        </div>
                        ))}

                </div>
                
        )
    }

}

export default withRouter(Cart);