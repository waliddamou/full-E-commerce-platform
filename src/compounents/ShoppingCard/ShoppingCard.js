import React, { Component } from 'react'
import Navbar from '../navbar/Navbar';
import { Menu, Typography, Button, Divider, Select, notification } from 'antd';
import { ShoppingCartOutlined, RightCircleFilled, PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import Footer from '../footer/Footer';
import axios from 'axios';
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css"
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Cookies from 'universal-cookie';

const { Text } = Typography;
const { SubMenu } = Menu;
const close = () => {
    console.log(
        'Notification was closed. Either the close button was clicked or duration time elapsed.',
    );
};

const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
        <Button type="primary" size="small" onClick={() => notification.close(key)}>
            Confirm
        </Button>
    );
    notification.open({
        message: 'Bon travail',
        description:
            'La Commande a été envoyer avec succès.',
        btn,
        key,
        onClose: close,
    });
};
const openNotification2 = () => {
    const key = `open${Date.now()}`;
    const btn = (
        <Button type="danger" size="small" onClick={() => notification.close(key)}>
            Confirmer
        </Button>
    );
    notification.open({
        message: 'Échec',
        description:
            'La Commande na pas été envoyer avec succès votre quantité est Supérieure.',
        btn,
        key,
        onClose: close,
    });
};
class ShoppingCard extends Component {
    constructor() {
        super()
        this.InputNumber = React.createRef();
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
            options: [{ label: 'Adrar', value: 'Adrar' }, { label: 'Chlef', value: 'Chlef' }, { label: 'Laghouat', value: 'Laghouat' }, { label: 'Oum El Bouaghi', value: 'Oum El Bouaghi' }, { label: 'Batna', value: 'Batna' }, { label: 'Béjaïa', value: 'Béjaïa' }, { label: 'Biskra', value: 'Biskra' }, { label: 'Béchar', value: 'Béchar' }, { label: 'Blida', value: 'Blida' }, { label: 'Bouira', value: 'Bouira' }, { label: 'Tamanrasset', value: 'Tamanrasset' }, { label: 'Tébessa', value: 'Tébessa' }, { label: 'Tlemcen', value: 'Tlemcen' }, { label: 'Tiaret', value: 'Tiaret' }, { label: 'Tizi Ouzou', value: 'Tizi Ouzou' }, { label: 'Alger', value: 'Alger' }, { label: 'Djelfa', value: 'Djelfa' }, { label: 'Jijel', value: 'Jijel' }, { label: 'Sétif', value: 'Sétif' }, { label: 'Saïda', value: 'Saïda' }, { label: 'Skikda', value: 'Skikda' }, { label: 'Sidi Bel Abbès', value: 'Sidi Bel Abbès' }, { label: 'Annaba', value: 'Annaba' }, { label: 'Guelma', value: 'Guelma' }, { label: 'Constantine', value: 'Constantine' }, { label: 'Médéa', value: 'Médéa' }, { label: 'Mostaganem', value: 'Mostaganem' }, { label: "M'Sila", value: "M'Sila" }, { label: 'Mascara', value: 'Mascara' }, { label: 'Ouargla', value: 'Ouargla' }, { label: 'Oran', value: 'Oran' }, { label: 'El Bayadh', value: 'El Bayadh' }, { label: 'Illizi', value: 'Illizi' }, { label: 'Bordj Bou Arreridj', value: 'Bordj Bou Arreridj' }, { label: 'Boumerdès', value: 'Boumerdès' }, { label: 'El Tarf', value: 'El Tarf' }, { label: 'Tindouf', value: 'Tindouf' }, { label: 'Tissemsilt', value: 'Tissemsilt' }, { label: 'El Oued', value: 'El Oued' }, { label: 'Khenchela', value: 'Khenchela' }, { label: 'Souk Ahras', value: 'Souk Ahras' }, { label: 'Tipaza', value: 'Tipaza' }, { label: 'Mila', value: 'Mila' }, { label: 'Aïn Defla', value: 'Aïn Defla' }, { label: 'Naâma', value: 'Naâma' }, { label: 'Aïn Témouchent', value: 'Aïn Témouchent' }, { label: 'Ghardaïa', value: 'Ghardaïa' }, { label: 'Relizane', value: 'Relizane' }],
            nomclient: "",
            prenomclient: "",
            adresseclient: "",
            wilaya: "",
            numclient: "",
            communeclient: "",
            total: ""
        }
        this.onChange2 = this.onChange2.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }

    componentDidMount() {
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
    loadProducts = (Categorie, Subcategory, Types) => {
        fetch(`http://151.80.56.201:5000/ViewTypeProducts/${Categorie}/${Subcategory}/${Types}`)
            .then((Response) => Response.json())
            .then((findresponse) => {
                this.setState({
                    Products: findresponse.products
                })
            })

    }
    addToCart = (product) => {
        const cookies = new Cookies();
        let s = 0
        let x = cookies.get("Products")
        let cartItem = []
        if (x) {
            x.forEach(item => {
                cartItem.push(item)
            })
        }
        let alreadyInCart = false;
        if (cartItem) {
            cartItem.forEach(item => {
                if (item.id === product.id) {
                    item.count++;
                    item.Photos = this.state.choix.split('/')[5]
                    item.Taille = this.state.choicetaille
                    s = s + (item.count * item.SellPrice)
                    alreadyInCart = true;

                }
            });
            cookies.set('Products', JSON.stringify(cartItem), { path: '/' });
            this.setState({
                cartItem: cartItem,
                total: s
            })

        }
        if (!alreadyInCart) {
            product.Name = this.state.Product.Name
            product.Photos = this.state.choix.split('/')[5]
            product.Taille = this.state.choicetaille
            cartItem.push({ ...product, count: 1 })
            s = s + product.SellPrice
            cookies.set('Products', JSON.stringify(cartItem), { path: '/' });
            this.setState({
                cartItem: cartItem,
                total: s
            })
        }

    }
    Totale() {
        let s = 0
        this.state.cartItem.array.forEach(element => {
            s = s + (element.count * element.SellPrice)
        });
        this.setState({
            total: s
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
    }
    onChange2(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

    }
    onChange3(e) {
        this.setState({
            choicetaille: e.target.value
        })
    }
    onSubmit(e) {
        const cookies = new Cookies();
        e.preventDefault()
        const formData = new FormData();
        const products = []
        this.state.cartItem.forEach((item) =>
            products.push(JSON.stringify(item))
        )
        formData.append("nom", this.state.nomclient)
        formData.append("Prenom", this.state.prenomclient)
        formData.append("Num", this.state.numclient)
        formData.append("Adresse", this.state.adresseclient)
        formData.append("Commune", this.state.communeclient)
        formData.append("Wilaya", this.state.wilaya)
        formData.append("Products", products)
        axios({
            url: "http://151.80.56.201:5000/Dashboard/AddOrder",
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            this.setState({
                visible: false

            })
            if(response.data==="Done"){
                openNotification()
                cookies.set('Products', "", { path: '/' });
                this.props.history.push("/shop")
            
            }
            else{
                openNotification2()
            }
                

        })
    }
    render() {
        const { current } = this.state;

        return (

            <section>



                <Navbar />
                <section className="text-center">

                    <Modal
                        open={this.state.visible}
                        onClose={() => this.closeModal()}
                        classNames={{ modal: 'modal1' }}

                    >
                        <div className="container">
                            <form noValidate onSubmit={this.onSubmit} >
                                <div className="input-field">
                                    <Text>Nom</Text>
                                    <input type="text" name="nomclient" placeholder="Nom" value={this.state.nomclient} onChange={this.onChange2} />
                                </div>
                                <div className="input-field">
                                    <Text>Prénom</Text>
                                    <input type="text" name="prenomclient" placeholder="Prénom" value={this.state.prenomclient} onChange={this.onChange2} />
                                </div>
                                <div className="input-field">
                                    <Text>Numéro Tél°</Text>
                                    <input type="text" name="numclient" placeholder="Nom" value={this.state.numclient} onChange={this.onChange2} />
                                </div>
                                <div className="input-field">
                                    <Text>Wilaya</Text>
                                    <Select options={this.state.options} name="wilaya" placeholder="wilaya" value={this.state.wilaya} style={{ width: "100%" }} onChange={(value) => this.setState({ wilaya: value })} />

                                </div>
                                <div className="input-field">
                                    <Text>Commune</Text>
                                    <input type="text" name="communeclient" placeholder="Commune" value={this.state.communeclient} onChange={this.onChange2} />
                                </div>
                                <div className="input-field">
                                    <Text>Adresse</Text>
                                    <input type="text" name="adresseclient" placeholder="Adresse" value={this.state.adresseclient} onChange={this.onChange2} />
                                </div>

                                <button onClick={(e)=>this.onSubmit(e)} type="submit" className="btn align-center" style={{ background: "#ad3216", width: "100%" }}>{<PlusCircleOutlined spin />} Valider</button>

                            </form>
                        </div>
                    </Modal>
                    <div className="container center" style={{ marginTop: "5px" }}>
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

                            }</div>


                        <Link type="button" className="btn halfway-fab waves effect waves-light darken center" style={{ backgroundColor: "#ad3216", width: "100%", marginBottom: "10px" }} onClick={() => this.openModal()}><ShoppingCartOutlined /> Acheter <RightCircleFilled /></Link>

                    </div>
                </section>
                <Footer />
            </section>
        )
    }
}

export default ShoppingCard;
