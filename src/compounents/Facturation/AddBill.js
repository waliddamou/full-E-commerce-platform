import React, { PureComponent } from 'react';
import jwt_decode from 'jwt-decode';
import { Layout, Button, Menu, Divider, Typography, Breadcrumb } from 'antd';
import '../../App.css';
import { DollarCircleOutlined, MenuOutlined, LogoutOutlined, ToolOutlined, ShoppingCartOutlined, UsergroupAddOutlined, MoreOutlined, ShoppingOutlined, MenuUnfoldOutlined, DashboardOutlined, EditOutlined, DeleteOutlined, FileAddOutlined, ChromeOutlined, PlusCircleOutlined }
    from '@ant-design/icons';

import SubMenu from 'antd/lib/menu/SubMenu';
import '../Panel/Panel.css'
import { Link } from 'react-router-dom';
import { jsPDF } from "jspdf";
import MUIDataTable from "mui-datatables";
import 'jspdf-autotable';
const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;

class AddBill extends PureComponent {
    constructor() {
        super()
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            myemail: "",
            myname: "Abdelkrim",
            mylastname: "Louzani",
            mycompany: "KRISMA BODYCARE",
            myaddress: "RTT 1 Bois des Cars 1 - Dely ibrahim - Alger",
            myphone: "0560 60 00 13",
            myfix: "021 91 75 25",
            facturera: "",
            expediera: "",
            adresse1: "",
            phone2: "",
            numfacture: "",
            datefacture: "",
            tva: "",
            image: "",
            Categories: [],
            Result: [],
            BillProducts: []

        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.Generatebill = this.Generatebill.bind(this)
        this.handleSellPrice = this.handleSellPrice.bind(this)
    }
    componentDidMount() {
        const result = []
        fetch('/Dashboard/ManageProducts')
            .then((Response) => Response.json())
            .then((findresponse) => {
                this.setState({
                    Categories: findresponse.products.map((row, i) =>
                        result.push([row.id, row.Name, row.Type, row.Subcategory, row.Mother, <><Button onClick={() => this.AddtoBill(row)} icon={<FileAddOutlined />}></Button></>]))
                })
            })
        this.setState({ Result: result })
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            first_name: decoded.identity.first_name,
            last_name: decoded.identity.last_name,
            email: decoded.identity.email
        })
        this.onChange = this.onChange.bind(this)
    }
    state = {
        collapsed: true,
    };
    removeFromCart = (index) => {
        var array = [...this.state.BillProducts];
        const slicedNewTodos = array.slice(0, index).concat(array.slice(index + 1));
        this.setState({
            BillProducts: slicedNewTodos
        })

    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSellPrice(e, index) {
        console.log(index, e.target.name)
        const values = [...this.state.BillProducts]
        values[index][e.target.name] = e.target.value;
        console.log(values)
        this.setState({ BillProducts: values })
    }

    onSubmit(e) {

    }
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });

    };
    AddtoBill = (product) => {
        const cartItem = this.state.BillProducts.slice();
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
        this.setState({ BillProducts: cartItem });
        console.log("###### Bill products" + this.state.BillProducts)
    }


    Generatebill() {

        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.setFontSize(12);
        doc.text("Market-Dz", 40, 4);
        doc.setFontSize(40);
        doc.setFont("bold");
        doc.setFontSize(18);
       
        //saving the bill
        doc.save("a4".pdf);
    }
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>

                <Sider className="Sider" width={260} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} style={{ background: '#ad3216' }}>
                    <div className="logo" style={{ background: '#ad3216' }} />
                    <Menu defaultSelectedKeys={['1']} mode="inline" style={{ background: '#ad3216', color: "white", fontSize: "16px" }}>
                        <Menu.Item className="ManuItem" key="Dashboard" icon={<DashboardOutlined spin />}>
                            <Link style={{ color: "white" }} to="/panel"> Dashboard</Link>
                        </Menu.Item>
                        <Divider plain></Divider>
                        <Menu.Item key="Site" icon={<ChromeOutlined spin />}>
                            <Link style={{ color: "white" }} to="/"> Aller sur le site</Link>
                        </Menu.Item>

                        <Divider plain></Divider>
                        <SubMenu title="Gestion des Catégories" icon={<MenuOutlined />}>
                            <Menu.ItemGroup title="Gestion des Catégories">
                                <Menu.Item icon={<PlusCircleOutlined spin />}>
                                    <Link style={{ color: "black" }} to="/AddCategorie"> Ajouter une Catégorie</Link>
                                </Menu.Item>
                                <Menu.Item icon={<EditOutlined spin />}>
                                    <Link style={{ color: "black" }} to="/ManageCategories"> Gérer les Catégories</Link>
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                        <Divider plain></Divider>
                        <SubMenu title="Gestion des sous Catégories" icon={<MenuUnfoldOutlined />}>
                            <Menu.ItemGroup title="Gestion des sous Catégories">
                                <Menu.Item icon={<PlusCircleOutlined />}>
                                    <Link style={{ color: "black" }} to="/AddSubCategorie">
                                        Ajouter une sous Catégorie
                                        </Link>
                                </Menu.Item>
                                <Menu.Item icon={<EditOutlined spin />}>
                                    <Link style={{ color: "black" }} to="/ManageSubCategories"> Gérer les sous Catégories</Link>
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                        <Divider plain></Divider>
                        <SubMenu title="Gestion des Types" icon={<MoreOutlined />}>
                            <Menu.ItemGroup title="Gestion des Types">
                                <Menu.Item icon={<PlusCircleOutlined spin />}>
                                    <Link style={{ color: "black" }} to="/AddType"> Ajouter un Type</Link>
                                </Menu.Item>
                                <Menu.Item icon={<EditOutlined spin />}>
                                    <Link style={{ color: "black" }} to="/ManageTypes"> Gérer les Types</Link>
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                        <Divider plain></Divider>
                        <SubMenu title="Gestion des Produits" icon={<ShoppingOutlined />}>
                            <Menu.ItemGroup title="Gestion des Produits">
                                <Menu.Item icon={<PlusCircleOutlined spin />}>
                                    <Link style={{ color: "black" }} to="/AddProduct"> Ajouter un Produit</Link>
                                </Menu.Item>
                                <Menu.Item icon={<EditOutlined spin />}>
                                    <Link style={{ color: "black" }} to="/ManageProducts"> Gérer les Produits</Link>
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                        <Divider plain></Divider>

                        <SubMenu title="Gestion des Commandes" icon={<ShoppingCartOutlined />}>
                            <Menu.ItemGroup title="Gestion des Commandes">
                                <Menu.Item icon={<PlusCircleOutlined spin />}>
                                    <Link style={{ color: "black" }} to="/AddOrder"> Ajouter une Commande</Link>
                                </Menu.Item>
                                <Menu.Item icon={<PlusCircleOutlined spin />}>
                                    <Link style={{ color: "black" }} to="/ManageOrders"> Consulter les Commandes</Link>
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                        <Divider plain></Divider>
                        <SubMenu title="Gestion des Facturation" icon={<DollarCircleOutlined />}>
                            <Menu.ItemGroup title="Gestion des Factures">
                                <Menu.Item icon={<DollarCircleOutlined spin />}>
                                    <Link style={{ color: "black" }} to="/AddBill"> Ajouter une Facture</Link>
                                </Menu.Item>
                                <Menu.Item icon={<DollarCircleOutlined spin />}>
                                    <Link style={{ color: "black" }} to="/ManageBills"> Consulter les Factures</Link>
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                        <Divider plain></Divider>
                        <SubMenu title="Gestion des Livreures" icon={<UsergroupAddOutlined />}>
                            <Menu.ItemGroup title="Gestion des Livreures">
                                <Menu.Item icon={<PlusCircleOutlined spin />}>
                                    <Link style={{ color: "black" }} to="/AddDeliver"> Ajouter un Livreure</Link>
                                </Menu.Item>
                                <Menu.Item icon={<EditOutlined spin />}>
                                    <Link style={{ color: "black" }} to="/ManageDelivers"> Gérer les Livreure</Link>
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                        <Divider plain></Divider>
                        <SubMenu title="Gestion des Utilisateurs" icon={<UsergroupAddOutlined />}>
                            <Menu.ItemGroup title="Gestion des Utilisateurs">
                                <Menu.Item icon={<PlusCircleOutlined spin />}>
                                    <Link style={{ color: "black" }} to="/AddUsers"> Ajouter un Utilisateur</Link>
                                </Menu.Item>
                                <Menu.Item icon={<EditOutlined spin />}>
                                    <Link style={{ color: "black" }} to="/ManageUsers"> Gérer les Utilisateurs</Link>
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>

                        <Divider plain></Divider>
                        <SubMenu title="Paramétres de site" icon={<ToolOutlined />}>
                            <Menu.ItemGroup title="Paramétres de site">
                                <Menu.Item icon={<PlusCircleOutlined spin />}>
                                    <Link style={{ color: "black" }} to="/Settings"> Paramétres</Link>
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                        <Divider plain></Divider>
                        <Menu.Item key="logout" icon={<LogoutOutlined spin />}>
                            <Link style={{ color: "white" }} onClick={() => this.lougout()}> Déconnexion</Link>

                        </Menu.Item>
                        <Divider plain></Divider>

                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0, background: '#ad3216' }}>
                        <div className="row">

                            <div className="col8 center">
                                <span className="">
                                    <Text style={{ color: "white", fontWeight: "bold", fontSize: "25px" }}>Market-Dz</Text>
                                </span>
                            </div>
                        </div>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                            <Breadcrumb.Item>Créer une Facture</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="input-field">
                                    <input type="text" name="mycompany" value={this.state.mycompany} onChange={this.onChange} id="mycompany" className="validate" />
                                    <label for="mycompany" className="purple-text">Entreprise</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="myaddress" value={this.state.myaddress} onChange={this.onChange} id="myaddress" className="validate" />
                                    <label for="myaddress" className="purple-text">Adresse</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="myphone" value={this.state.myphone} onChange={this.onChange} id="myphone" className="validate" />
                                    <label for="myphone" className="purple-text">Num° Téléphone Portable</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="myfix" value={this.state.myfix} onChange={this.onChange} id="myfix" className="validate" />
                                    <label for="myfix" className="purple-text">Num° Téléphone Fix</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="numfacture" value={this.state.numfacture} onChange={this.onChange} id="numfacture" className="validate" />
                                    <label for="numfacture" className="purple-text">Numéro° de Facture</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="tva" value={this.state.tva} onChange={this.onChange} id="tva" className="validate" />
                                    <label for="tva" className="purple-text">TVA</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="numfacture" value={this.state.numfacture} onChange={this.onChange} id="numfacture" className="validate" />
                                    <label for="numfacture" className="purple-text">Date de Facture</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="facturera" value={this.state.facturera} onChange={this.onChange} id="facturera" className="validate" />
                                    <label for="facturera" className="purple-text">Facturer à</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="expediera" value={this.state.expediera} onChange={this.onChange} id="expediera" className="validate" />
                                    <label for="expediera" className="purple-text">Expedier à</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="adressexpediera" value={this.state.adresse1} onChange={this.onChange} id="adressexpediera" className="validate" />
                                    <label for="adressexpediera" className="purple-text">Adresse de l'Expéditeur</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="phoneexpediera" value={this.state.phone2} onChange={this.onChange} id="phoneexpediera" className="validate" />
                                    <label for="phoneexpediera" className="purple-text">Numéro° de l'Expéditeur</label>
                                </div>
                                {this.state.BillProducts.map((data, key) =>
                                    <div className="row">


                                        <div className="col s2">
                                            <img src={`data:image/jpg;base64,${data.Photos}`} alt={data.Name} style={{ width: "5rem" }}></img>
                                        </div>
                                        <div className="col s2">
                                            <p>{data.Name}</p>
                                        </div>


                                        <div className="col s2">
                                            <input type="text" value={data.SellPrice} id="SellPrice" name="SellPrice" onChange={event => this.handleSellPrice(event, key)} />

                                        </div>
                                        <div className="col s2">
                                            <input type="text" name="count" id="count" value={data.count} onChange={event => this.handleSellPrice(event, key)} />
                                        </div>
                                        <div className="col s2">
                                            <Button danger onClick={() => this.removeFromCart(key)} icon={<DeleteOutlined />} shape="circle"></Button>

                                        </div>
                                    </div>
                                )}
                                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                    <MUIDataTable
                                        title={"Types"}
                                        columns={["ID", "NOM", "Type", "Sous Catégorie", "Catégorie Mére", "Actions"]}
                                        data={this.state.Result}
                                        options={{
                                            filterType: "checkbox",
                                            print: true
                                        }
                                        }
                                    />
                                </div>
                                <button type="button" className="btn purple" onClick={this.Generatebill}>Afficher la facture</button>
                            </form>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>SMART BOX SOLUTION ©2020</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default AddBill