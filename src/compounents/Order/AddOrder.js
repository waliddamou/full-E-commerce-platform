import React, { Component } from 'react';
import { Layout, Menu,Divider,Typography, Breadcrumb,Select } from 'antd';
import '../../App.css';
import {PhoneOutlined,MoneyCollectOutlined,StarOutlined,DollarCircleOutlined, MenuOutlined,LogoutOutlined ,ToolOutlined ,ShoppingCartOutlined,UsergroupAddOutlined ,MoreOutlined,ShoppingOutlined , MenuUnfoldOutlined, DashboardOutlined, EditOutlined, ChromeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import '../Panel/Panel.css'
import { Link } from 'react-router-dom';

const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;

class AddOrder extends Component {
    constructor() { 
        super()
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            name:"",
            lastname:"",
            phone:"",
            adress:"",
            commune:"",
            wilaya:"",
            Products:[],
            options:[{label:'Adrar',value:'Adrar'},{label:'Chlef',value:'Chlef'},{label:'Laghouat',value:'Laghouat'},{label:'Oum El Bouaghi',value:'Oum El Bouaghi'},{label:'Batna',value:'Batna'},{label:'Béjaïa',value:'Béjaïa'},{label:'Biskra',value:'Biskra'},{label:'Béchar',value:'Béchar'},{label:'Blida',value:'Blida'},{label:'Bouira',value:'Bouira'},{label:'Tamanrasset',value:'Tamanrasset'},{label:'Tébessa',value:'Tébessa'},{label:'Tlemcen',value:'Tlemcen'},{label:'Tiaret',value:'Tiaret'},{label:'Tizi Ouzou',value:'Tizi Ouzou'},{label:'Alger',value:'Alger'},{label:'Djelfa',value:'Djelfa'},{label:'Jijel',value:'Jijel'},{label:'Sétif',value:'Sétif'},{label:'Saïda',value:'Saïda'},{label:'Skikda',value:'Skikda'},{label:'Sidi Bel Abbès',value:'Sidi Bel Abbès'},{label:'Annaba',value:'Annaba'},{label:'Guelma',value:'Guelma'},{label:'Constantine',value:'Constantine'},{label:'Médéa',value:'Médéa'},{label:'Mostaganem',value:'Mostaganem'},{label:"M'Sila",value:"M'Sila"},{label:'Mascara',value:'Mascara'},{label:'Ouargla',value:'Ouargla'},{label:'Oran',value:'Oran'},{label:'El Bayadh',value:'El Bayadh'},{label:'Illizi',value:'Illizi'},{label:'Bordj Bou Arreridj',value:'Bordj Bou Arreridj'},{label:'Boumerdès',value:'Boumerdès'},{label:'El Tarf',value:'El Tarf'},{label:'Tindouf',value:'Tindouf'},{label:'Tissemsilt',value:'Tissemsilt'},{label:'El Oued',value:'El Oued'},{label:'Khenchela',value:'Khenchela'},{label:'Souk Ahras',value:'Souk Ahras'},{label:'Tipaza',value:'Tipaza'},{label:'Mila',value:'Mila'},{label:'Aïn Defla',value:'Aïn Defla'},{label:'Naâma',value:'Naâma'},{label:'Aïn Témouchent',value:'Aïn Témouchent'},{label:'Ghardaïa',value:'Ghardaïa'},{label:'Relizane',value:'Relizane'}],
            collapsed: true

            
        }
        this.onChange=this.onChange.bind(this)
    }
    componentDidMount() {
        const token = localStorage.getItem('usertoken');

        fetch('http://151.80.56.201:5000/Dashboard/panel', {
            method: 'get', headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        })
            .then((Response) => Response.json())
            .then((findresponse) => {
                if (!findresponse.status===200 || findresponse.msg==='Not enough segments') {
                    this.props.history.push('/login')
                }
                else {
                    if(!findresponse.user){
                        this.props.history.push('/login')
                    }
                    else{
                        if(findresponse.user.role==="Confermatrice"){
                            this.props.history.push('/Confermatrice')
                        }
                        if(findresponse.user.role==="Livreur"){
                            this.props.history.push('/Livreur')
                        }
                    }
                }

            })
    }
    
    onCollapse = collapsed => {
        if(collapsed===true){
            this.setState({
                collapsed:false
            })
        }
        else{
            this.setState({
                collapsed:true
            })
        }

    }; 

    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
        
    }
    lougout() {
        localStorage.clear()
        this.props.history.push('/login')
    }
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>

                <Sider className="Sider" width={260} collapsible collapsed={this.state.collapsed} onCollapse={()=>this.onCollapse(this.state.collapsed)} style={{ background: '#ad3216' }}>
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
                                    <Link style={{ color: "black" }} to="/ManageOrders"> Consulter les Commandes</Link>
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                        <Divider plain></Divider>
                        <SubMenu title="Gestion des ConfermatriBillssces" icon={<PhoneOutlined />}>
                            <Menu.ItemGroup title="Gestion des Confermatrices">
                                <Menu.Item icon={<PhoneOutlined spin />}>
                                    <Link style={{ color: "black" }} to="/AddConfermatrice"> Ajouter une Confermatrice</Link>
                                </Menu.Item>
                                <Menu.Item icon={<PhoneOutlined spin/>}>
                                    <Link style={{ color: "black" }} to="/ManageConfermatrice"> Consulter les Confermatrices</Link>
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
                                <Menu.Item icon={<ShoppingCartOutlined  spin/>}>
                                    <Link style={{ color: "black" }} to="/Delivred"> Commande Livré</Link>
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
                        <SubMenu title="Gestion des Promotions" icon={<StarOutlined /> }>
                            <Menu.ItemGroup title="Gestion des Promotions">
                                <Menu.Item icon={<StarOutlined spin/>}>
                                    <Link style={{ color: "black" }} to="/AddPromotion"> Ajouter une Promotion</Link>
                                </Menu.Item>
                                <Menu.Item icon={<StarOutlined spin/>}>
                                    <Link style={{ color: "black" }} to="/ManagePromotion"> Gérer les Promotion</Link>
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
                        <Menu.Item key="Caisse" icon={<MoneyCollectOutlined spin/>}>
                            <Link to="/Caisse" style={{ color: "white" }} > Caisse</Link>

                        </Menu.Item>
                        <Divider plain></Divider>
                        <Divider plain></Divider>
                        <Menu.Item key="logout" icon={<LogoutOutlined spin />}>
                            <Link type="button" style={{ color: "white" }} onClick={() => this.lougout()}> Déconnexion</Link>

                        </Menu.Item>
                        <Divider plain></Divider>

                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0, background: '#ad3216' }}>
                        <div className="row">
                            
                            <div className="col8 center">
                                <span className="">
                                    <Text style={{ color: "white", fontWeight: "bold", fontSize: "25px" }}>Staylli</Text>
                                </span>
                            </div>
                        </div>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                            <Breadcrumb.Item>Ajouter Une Commande</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <Text>Nom :</Text>
                            <input type="text" name="name" value={this.state.name} onChange={this.onChange} />
                            <Text>Prénom :</Text>
                            <input type="text" name="lastname" value={this.state.lastname} onChange={this.onChange} />
                            <Text>Numéro Tel° :</Text>
                            <input type="text" name="phone" value={this.state.phone} onChange={this.onChange} />
                            <Text>Wilaya :</Text>
                            <div className="input-field">
                            <Select options={this.state.options} name="wilaya"  placeholder="wilaya" value={this.state.wilaya} style={{width:"100%"}} onChange={(value)=>this.setState({wilaya:value})} />
                            </div>
                            <div className="input-field">
                                <Text>Commune</Text>
                                <input type="text" name="commune" value={this.state.commune} onChange={this.onChange} />
                            </div>
                            <div className="input-field">
                                <Text>Adresse</Text>
                                <input type="text" name="adress" value={this.state.adress} onChange={this.onChange} />
                            </div>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>SMART BOX SOLUTION ©2020</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default AddOrder