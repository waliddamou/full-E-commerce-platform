import React, { Component } from 'react'
import Navbar from '../navbar/Navbar';
import { Typography, Radio, notification, Col, Row, Divider, Button } from 'antd';
import { ShoppingCartOutlined, RightCircleFilled, ShopOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import Footer from '../footer/Footer';
import ImageGallery from 'react-image-gallery';
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css"
import "./style.css";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Cookies from 'universal-cookie';
import { BrowserView, MobileView } from 'react-device-detect';
import { loadReCaptcha } from 'react-recaptcha-google'

import { ReCaptcha } from 'react-recaptcha-google'
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
        message: 'Bon travail',
        description:
            'Le Produit a été ajouté au Panier.',
        btn,
        key,
        onClose: close,
    });
};

const { Text } = Typography;

class BuyProduct extends Component {
    constructor(props, context) {
        super(props, context)
        this.InputNumber = React.createRef();
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.state = {
            Categories: [],
            SubCategories: [],
            Types: [],
            Product: {},
            Result: [],
            cartItem: [],
            id: window.location.href.split('/')[4],
            images: [],
            visible: false,
            choix: "",
            taille: [],
            choicetaille: "",
            count: 0,
            captcha:true

        }

    }

    componentDidMount() {
        loadReCaptcha();
        if (this.captchaDemo) {
            this.captchaDemo.reset();
            this.captchaDemo.execute();
        }

        const cookies = new Cookies();
        let x = cookies.get("Products")
        let cartItem = []
        if (x) {
            x.forEach(item => {
                cartItem.push(item)
            })
            this.setState({
                cartItem: cartItem
            })
        }
        fetch('http://151.80.56.201:5000/Dashboard/ManageCategories')
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
                fetch(`http://151.80.56.201:5000/ProductView/${this.state.id}`)
                    .then((Response) => Response.json())
                    .then((findresponse) => {
                        this.setState({
                            Product: findresponse.Product
                        })
                        let x = JSON.parse(this.state.Product.Details)
                        let tempimages = []
                        let infos = []
                        x["multipleproducts"].forEach(element => {
                            tempimages.push({ "original": `http://151.80.56.201:5000/static/products/${element.Photo}`, "thumbnail": `http://151.80.56.201:5000/static/products/${element.Photo}` })
                            if (element.Taille) {
                                if (element.Quantité > 0) {
                                    infos.push(element.Taille)
                                    this.setState({
                                        taille: infos
                                    })
                                }

                            }
                        });
                        this.setState({
                            images: tempimages
                        })
                    })


            })

    }
    onLoadRecaptcha() {
        if (this.captchaDemo) {
            this.captchaDemo.reset();
            this.captchaDemo.execute();
        }
    }
    verifyCallback(recaptchaToken) {
        this.setState({
            captcha:false
        })
    }
    removeFromCart = (photos) => {
        const cookies = new Cookies();
        let x = cookies.get("Products")
        let cartItem = []
        if (x) {
            x.forEach(item => {
                cartItem.push(item)
            })
        }
        cartItem.forEach(i => {
            if (i.Photos == photos) {
                cartItem.splice(i, 1);
            }
        })
        cookies.set('Products', JSON.stringify(cartItem), { path: '/' });
        this.setState({
            cartItem: cartItem
        })
    }

    addToCart = (product) => {
        let tempproduct = Object.create(product)
        const cookies = new Cookies();
        let x = cookies.get("Products")
        let cartItem = []
        let tempphoto = ""
        if (x) {
            x.forEach(item => {
                cartItem.push(item)
            })
        }
        let alreadyInCart = false;
        if (cartItem) {
            cartItem.forEach(item => {
                if (item.id == tempproduct.id && item.Photos === this.state.choix) {
                    tempproduct.Name = this.state.Product.Name
                    tempproduct.count++;
                    tempphoto = this.state.choix
                    tempproduct.Photos = tempphoto.split('/')[5]
                    tempproduct.Taille = this.state.choicetaille
                    tempproduct.SellPrice = product.SellPrice
                    alreadyInCart = true;

                }
            });
            cookies.set('Products', JSON.stringify(cartItem), { path: '/' });
            this.setState({
                cartItem: cartItem,

            })

        }
        if (!alreadyInCart) {
            tempproduct.id = this.state.Product.id
            tempproduct.Name = this.state.Product.Name
            tempphoto = this.state.choix
            tempproduct.Photos = tempphoto.split('/')[5]
            tempproduct.Taille = this.state.choicetaille
            tempproduct.Details = ""
            tempproduct.SellPrice = product.SellPrice
            cartItem.push({ ...tempproduct, count: 1 })
            cookies.set('Products', JSON.stringify(cartItem), { path: '/' });
            this.setState({
                cartItem: cartItem
            })
        }

        openNotification()
        this.openModal()
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

                    item.count = item.count + 1;
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
                        item.count = item.count - 1;

                    }
                }
            });
        }
        cookies.set('Products', JSON.stringify(cartItem), { path: '/' });
        this.setState({
            cartItem: cartItem
        })
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
    onChange(e) {
        this.setState({
            choix: e.target.value
        })
        let photo = e.target.value.split("/")[5]
        let x = JSON.parse(this.state.Product.Details)
        let newTaille = []
        x["multipleproducts"].forEach(element => {
            if (element.Photo === photo) {
                this.setState({
                    taille: [],
                })
                element.detailed.forEach(item => {
                    newTaille.push(item)
                })

                this.setState({
                    taille: newTaille
                })

            }
        })


    }
    onChange3(e) {
        this.setState({
            choicetaille: e.target.value
        })
    }
    render() {


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
                            this.state.cartItem.map((item, key) =>
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
                                        <a class="btn-floating btn-small red" onClick={() => this.removeFromCart(item.Photos)}>
                                            <i class="large material-icons">delete_forever</i>
                                        </a>
                                    </div>

                                    <Divider />


                                </>



                            )

                            : (<Text className="center">Le Panier est vide</Text>)

                        }
                        {this.state.cartItem !== [] ?
                            <div className="container center">
                                <ReCaptcha
                                    ref={(el) => { this.captchaDemo = el; }}
                                    size="visible"
                                    render="explicit"
                                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                    onloadCallback={this.onLoadRecaptcha}
                                    verifyCallback={this.verifyCallback}
                                />
                                <div className="row">
                                    <div className="col">
                                        <Link to="/shop" className="btn halfway-fab waves effect waves-light darken center" style={{ backgroundColor: "#ad3216", width: "100%" }} ><ShoppingCartOutlined /> Continuer Mes Achats <RightCircleFilled /></Link>
                                    </div>
                                    <div className="col">
                                        <Link to="/ShoppingCart" className="btn halfway-fab waves effect waves-light darken center" style={{ backgroundColor: "#198ffe", width: "100%" }} disabled={this.state.captcha} ><ShopOutlined /> Finaliser Mes Achats &nbsp;&nbsp;<RightCircleFilled /></Link>

                                    </div>

                                </div>
                            </div>
                            : (null)
                        }
                    </div>

                </Modal>

                <Navbar />
                <section className="text-center">

                    <div className="container" style={{ marginTop: "5px" }}>
                        <BrowserView>
                            <Row>
                                <Col span={10} pull={2}>
                                    <ImageGallery items={this.state.images}
                                        autoPlay="true"
                                        showThumbnails={true}
                                        showPlayButton={false}
                                        showFullscreenButton={true}
                                        showBullets={true}
                                        showNav={false}
                                        sizes="100px"
                                    />

                                </Col>
                                <Col span={14} push={2}>
                                    <div className="col s6 ">
                                        <Text style={{ fontSize: "25px", color: "#ad3216" }}><b>{this.state.Product.Name}</b></Text>
                                    </div>
                                    <div className="col s6 ">
                                        <Text style={{ fontSize: "14px" }}>{this.state.Product.Description}</Text>
                                    </div>
                                    <div className="col s6">
                                        <ul className="ul1">
                                            {this.state.images.map((element, key) =>
                                                <>

                                                    <li className="li1">
                                                        <input type="radio" name="choice" value={element["thumbnail"]} onChange={(e) => this.onChange(e)} id={`cb${key}`} />
                                                        <label className="label1" htmlFor={`cb${key}`}><img src={element["thumbnail"]} alt="" /></label>
                                                    </li>

                                                </>
                                            )}
                                        </ul>
                                    </div>
                                    <div className="col s6">
                                        <Radio.Group onChange={(e) => this.onChange3(e)}>
                                            {this.state.taille.map((item, key) =>
                                                item.Quantité > 0 ?
                                                    <Radio value={item.Taille} id={key} key={key}>{item.Taille}</Radio>
                                                    : (<Radio value={item.Taille} disabled="true" >{item.Taille}</Radio>)

                                            )}
                                        </Radio.Group>
                                    </div>
                                    <div className="col s6">
                                        <Text style={{ fontSize: "19px", color: "#ad3216" }}><b>Prix : {this.state.Product.SellPrice} DZD</b></Text>
                                    </div>
                                    <div className="col s6 " style={{ marginBottom: '5px' }}>
                                        {this.state.taille.map((item) =>
                                            item.Quantité <= 0 ?
                                                <p style={{ color: "red" }}><b>La Taille {item.Taille} est en Répture de Stock</b></p>
                                                : (null)
                                        )


                                        }

                                        {
                                            this.state.choicetaille && this.state.choix ?
                                                <Link type="button" onClick={() => this.addToCart(this.state.Product)} className="btn halfway-fab waves effect waves-light darken center" style={{ backgroundColor: "#ad3216", width: "80%" }} ><ShoppingCartOutlined /> Acheter</Link>

                                                : (<Link type="button" onClick={() => this.addToCart(this.state.Product)} disabled="true" className="btn halfway-fab waves effect waves-light darken center" style={{ backgroundColor: "#ad3216", width: "80%" }} ><ShoppingCartOutlined /> Acheter</Link>
                                                )

                                        }

                                    </div>
                                </Col>
                            </Row>
                        </BrowserView>
                        <MobileView>
                            <div className="row">
                                <div className="col">
                                    <ImageGallery items={this.state.images}
                                        autoPlay="true"
                                        showThumbnails={true}
                                        showPlayButton={false}
                                        showFullscreenButton={true}
                                        showBullets={true}
                                        showNav={false}
                                        sizes="100px"
                                    />

                                </div>
                                <div>
                                    <div className="col">
                                        <Text style={{ fontSize: "25px", color: "#ad3216" }}><b>{this.state.Product.Name}</b></Text>
                                    </div>
                                    <div className="col ">
                                        <Text style={{ fontSize: "14px" }}>{this.state.Product.Description}</Text>
                                    </div>
                                    <div className="col-sm ">
                                        <ul className="ul1">
                                            {this.state.images.map((element, key) =>
                                                <>

                                                    <li className="li1">
                                                        <input type="radio" name="choice" value={element["thumbnail"]} onChange={(e) => this.onChange(e)} id={`cb${key}`} />
                                                        <label className="label1" htmlFor={`cb${key}`}><img src={element["thumbnail"]} alt="" /></label>
                                                    </li>

                                                </>
                                            )}
                                        </ul>
                                    </div>
                                    <div className="col">
                                    <Radio.Group onChange={(e) => this.onChange3(e)}>
                                            {this.state.taille.map((item, key) =>
                                                item.Quantité > 0 ?
                                                    <Radio value={item.Taille} id={key} key={key}>{item.Taille}</Radio>
                                                    : (<Radio value={item.Taille} disabled="true" >{item.Taille}</Radio>)

                                            )}
                                        </Radio.Group>
                                    </div>
                                    <div className="col">
                                        <Text style={{ fontSize: "19px", color: "#ad3216" }}><b>Prix : {this.state.Product.SellPrice} DZD</b></Text>
                                    </div>
                                    <div className="col" style={{ marginBottom: '5px' }}>
                                    {this.state.taille.map((item) =>
                                            item.Quantité <= 0 ?
                                                <p style={{ color: "red" }}><b>La Taille {item.Taille} est en Répture de Stock</b></p>
                                                : (null)
                                        )}
                                    </div>
                                    {this.state.choicetaille && this.state.choix ?
                                        <Link type="button" onClick={() => this.addToCart(this.state.Product)} className="btn halfway-fab waves effect waves-light darken center" style={{ backgroundColor: "#ad3216", width: "100%" }} ><ShoppingCartOutlined /> Acheter</Link>

                                        : (<Link type="button" onClick={() => this.addToCart(this.state.Product)} disabled="true" className="btn halfway-fab waves effect waves-light darken center" style={{ backgroundColor: "#ad3216", width: "80%" }} ><ShoppingCartOutlined /> Acheter</Link>
                                        )

                                    }

                                </div>
                            </div>

                        </MobileView>
                    </div>
                </section>
                <Footer />
            </section>
        )
    }
}

export default BuyProduct;
