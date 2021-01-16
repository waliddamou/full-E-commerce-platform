import React, { Component } from 'react'
import Navbar from '../navbar/Navbar';
import { Menu, Input, AutoComplete, Typography, Badge, Row, Col, Divider } from 'antd';
import { UserOutlined, ShoppingCartOutlined, RightCircleFilled, ShopOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import Cart from '../Cart/Cart';
import Footer from '../footer/Footer';
import "./style.css"
import { Modal } from 'react-responsive-modal';
import Cookies from 'universal-cookie';
const { Text } = Typography;


const { SubMenu } = Menu;

class Shop extends Component {
    constructor() {
        super()
        this.state = {
            Categories: [],
            SubCategories: [],
            Types: [],
            Products: [],
            Result: [],
            cartItem: [],
            visible: false

        }

    }

    componentDidMount() {


        fetch('http://151.80.56.201:5000/Dashboard/ManageCategories2')
            .then((Response) => Response.json())
            .then((findresponse) => {
                this.setState({
                    Categories: findresponse.Categories
                })
            })
        fetch('http://151.80.56.201:5000/Dashboard/ManageSubCategories')
            .then((Response) => Response.json())
            .then((findresponse) => {
                this.setState({
                    SubCategories: findresponse.Categories
                })
            })
        fetch('http://151.80.56.201:5000/Dashboard/ManageTypes')
            .then((Response) => Response.json())
            .then((findresponse) => {
                this.setState({
                    Types: findresponse.types
                })
                fetch("http://151.80.56.201:5000/FirstCategoryProducts")
                    .then((Response) => Response.json())
                    .then((findresponse) => {
                        this.setState({
                            Products: findresponse.products
                        })
                        
                    })

            })
        const cookies = new Cookies();
        let x = cookies.get("Products")
        let cartItem = []
        if (x) {
            x.forEach(item => {
                cartItem.push(item)
                
            })
            
        } 
        this.setState({
            cartItem: cartItem
        })
    }


    state = {
        current: 'mail',
    };
    removeFromCart = (product) => {
        const cartItem = this.state.cartItem.slice();
        var array = [...cartItem];
        array.forEach(i => {
            if (product.id === i.id) {
                array.splice(i, 1);
            }
        })
        this.setState({
            cartItem: array
        })
    }
    loadProducts = (Categorie, Subcategory, Types) => {
        fetch(`http://151.80.56.201:5000/ViewTypeProducts/${Categorie}/${Subcategory}/${Types}`)
            .then((Response) => Response.json())
            .then((findresponse) => {
                this.setState({
                    Products: findresponse.products
                })
            })

    }
    increament = (photos) => {
        const cookies = new Cookies();
        let x = cookies.get("Products")
        let cartItem = []
        if (x) {
            x.forEach(item => {
                cartItem.push(item)
            })
        }
        if (cartItem) {
            cartItem.forEach(item => {
                if (item.Photos == photos) {
                    item.count=item.count+1;
                }
            });

        }
        cookies.set('Products', JSON.stringify(cartItem), { path: '/' });
        this.setState({
            cartItem: cartItem
        })
    }
    decrement = photos => {
        const cookies = new Cookies();
        let x = cookies.get("Products")
        let cartItem = []
        if (x) {
            x.forEach(item => {
                cartItem.push(item)
            })
        }
        if (cartItem) {
            cartItem.forEach(item => {
                if (item.Photos == photos) {
                    if (item.count > 1) {
                        item.count=item.count-1;

                    }
                }
            });

        }
        cookies.set('Products', JSON.stringify(cartItem), { path: '/' });
        this.setState({
            cartItem: cartItem
        })
    }

    addToCart = (product) => {
        const cartItem = this.state.cartItem.slice();
        let alreadyInCart = false;

        cartItem.forEach(item => {
            if (item.id === product._id) {
                item.count++;
                alreadyInCart = true;

            }
        });
        if (!alreadyInCart) {
            cartItem.push({ ...product, count: 1 })

        }
        this.setState({ cartItem });
    }

    handleClick = e => {
        this.setState({ current: e.key });
    };
    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }
    render() {
        const { current } = this.state;

        return (

            <section>
                <div class="fixed-action-btn">
                    <a class="btn-floating btn-large red button1" onClick={() => this.openModal()}>
                        <i class="large material-icons">add_shopping_cart</i>
                    </a>

                </div>
                <Modal
                    open={this.state.visible}
                    onClose={() => this.closeModal()}
                    classNames={{ modal: 'modal1' }}
                >

                    <Text className="center"><b>Panier</b></Text>
                    <Divider />
                    <div className="row" style={{ overflow: "auto", wordWrap: "break-word" }}>
                        {this.state.cartItem !== [] ?
                            this.state.cartItem.map((item) =>
                                <>
                                    <div className="col s3">
                                        <img src={`http://151.80.56.201:5000/static/products/${item.Photos}`} alt={item.Name} style={{ width: "5rem" }} alt="" />
                                    </div>
                                    <div className="col s3">
                                        <p>{item.Name}</p>
                                        <p>{item.Taille}</p>
                                        <p>{item.SellPrice * item.count} DA</p>
                                    </div>
                                    <div className="col s3">
                                        <div className="input-number" style={this.props.style}>
                                            <button type="button" onClick={() => this.decrement(item.Photos)}>&minus;</button>
                                            <span>{item.count}</span>
                                            <button type="button" onClick={() => this.increament(item.Photos)} >&#43;</button>
                                        </div>
                                    </div>
                                    <div className="col s3 right">
                                        <a class="btn-floating btn-small red" onClick={() => this.removeFromCart(item)}>
                                            <i class="large material-icons">delete_forever</i>
                                        </a>
                                    </div>

                                    <Divider />


                                </>



                            )

                            : (<Text className="center">Le Panier est vide</Text>)

                        }
                        {this.state.cartItem !== [] ?
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <Link to="/shop" className="btn halfway-fab waves effect waves-light darken center" style={{ backgroundColor: "#ad3216", width: "100%" }} ><ShoppingCartOutlined /> Continuer Mes Achats <RightCircleFilled /></Link>
                                    </div>
                                    <div className="col">
                                        <Link to="/ShoppingCart" className="btn halfway-fab waves effect waves-light darken center" style={{ backgroundColor: "#198ffe", width: "100%" }} ><ShopOutlined /> Finaliser Mes Achats <RightCircleFilled /></Link>

                                    </div>

                                </div>
                            </div>
                            : (null)
                        }
                    </div>

                </Modal>


                <Navbar />
                <section className="text-center">
                    <Menu className="" style={{ color: "white", margin: "auto", padding: "10px", width: "100%", textAlign: "center", backgroundColor: "#ad3216" }} onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                        {this.state.Categories.map((data, key) =>
                            <SubMenu title={data.Name} style={{ fontWeight: "bold" }}>
                                {this.state.SubCategories.map((sub, key) =>
                                    sub.Motherid === data.id ?
                                        <Menu.ItemGroup title={sub.Name} style={{ fontWeight: "bold" }}>
                                            {this.state.Types.map((type, key) =>

                                                type.Subid === sub.id ?

                                                    <Menu.Item key={type.id} style={{ fontWeight: "bold" }} onClick={() => this.loadProducts(data.id, sub.id, type.id)}>{type.Name}</Menu.Item>
                                                    : ""
                                            )}
                                        </Menu.ItemGroup>
                                        : ""

                                )}
                            </SubMenu>
                        )}
                    </Menu>

                    <div className="container center">
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                            {this.state.Products.map((data, key) =>

                                <Col>
                                    {data.Pourcentage != 0 ?
                                        <Link to={`BuyProduct/${data.id}`}>
                                            <Badge.Ribbon text="Nouveau Produit" style={{ backgroundColor: "green" }}>
                                                <div className="card" >
                                                    <div className="card-image" >
                                                        <img src={`http://151.80.56.201:5000/static/products/${data.Photos}`} alt="Productimage" style={{ height: "250px", width: "250px" }} />

                                                        <div class="ribbon ribbon-top-left"><span>-{data.Pourcentage}%</span></div>

                                                        <div className="card-content center">
                                                            <Text style={{ color: "#ad3216", justifyContent: 'center' }}><b>{data.Name}</b></Text>
                                                            <br />
                                                            <Text className="align-center" style={{ color: "#ad3216", justifyContent: 'center' }} ><b>Prix: </b>&nbsp; </Text>
                                                            <Text className="align-center" style={{ color: "#ad3216", justifyContent: 'center', textDecoration: "line-through" }} ><b>{data.SellPrice}</b></Text>&nbsp;  <Text><b>{data.PrixPromo} DA</b></Text>
                                                            <br />
                                                            <Link type="button" to={`BuyProduct/${data.id}`} className="btn halfway-fab waves effect waves-light darken center" value={data.id} id={data.id} style={{ backgroundColor: "#ad3216" }}><ShoppingCartOutlined />Acheter</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Badge.Ribbon>
                                        </Link>
                                        : (
                                            <Link to={`BuyProduct/${data.id}`}>
                                                <div className="card" >
                                                    <div className="card-image" >
                                                        <img src={`http://151.80.56.201:5000/static/products/${data.Photos}`} alt="Productimage" style={{ height: "250px", width: "250px" }} />
                                                        <div className="card-content center">
                                                            <Text style={{ color: "#ad3216", justifyContent: 'center' }}><b>{data.Name}</b></Text>
                                                            <br />
                                                            <Text className="align-center" style={{ color: "#ad3216", justifyContent: 'center' }} ><b>Prix: {data.SellPrice}</b> </Text>
                                                            <br />
                                                            <Link type="button" to={`BuyProduct/${data.id}`} className="btn halfway-fab waves effect waves-light darken center" value={data.id} id={data.id} style={{ backgroundColor: "#ad3216" }}><ShoppingCartOutlined />Acheter</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )

                                    }

                                </Col>
                            )}


                        </Row>
                    </div>
                </section>
                <Footer />
            </section>
        )
    }
}

export default Shop;
