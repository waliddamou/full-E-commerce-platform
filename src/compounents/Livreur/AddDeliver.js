import React, { Component } from 'react';
import { Layout, Menu, Divider, Typography, Breadcrumb, Button, notification, Select } from 'antd';
import '../../App.css';
import { PhoneOutlined,StarOutlined,MoneyCollectOutlined,DollarCircleOutlined, MenuOutlined, LogoutOutlined, ToolOutlined, ShoppingCartOutlined, UsergroupAddOutlined, MoreOutlined, ShoppingOutlined, MenuUnfoldOutlined, DashboardOutlined, EditOutlined, ChromeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import '../Panel/Panel.css';
import { Link } from 'react-router-dom';
import axios from "axios"
const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;
const { Option } = Select;
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
            "Le Livreure a été ajouté.",
        btn,
        key,
        onClose: close,
    });
};
class AddDeliver extends Component {
    constructor() {
        super()
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            phone: "",
            options:[{label:'Adrar',value:'Adrar'},{label:'Chlef',value:'Chlef'},{label:'Laghouat',value:'Laghouat'},{label:'Oum El Bouaghi',value:'Oum El Bouaghi'},{label:'Batna',value:'Batna'},{label:'Béjaïa',value:'Béjaïa'},{label:'Biskra',value:'Biskra'},{label:'Béchar',value:'Béchar'},{label:'Blida',value:'Blida'},{label:'Bouira',value:'Bouira'},{label:'Tamanrasset',value:'Tamanrasset'},{label:'Tébessa',value:'Tébessa'},{label:'Tlemcen',value:'Tlemcen'},{label:'Tiaret',value:'Tiaret'},{label:'Tizi Ouzou',value:'Tizi Ouzou'},{label:'Alger',value:'Alger'},{label:'Djelfa',value:'Djelfa'},{label:'Jijel',value:'Jijel'},{label:'Sétif',value:'Sétif'},{label:'Saïda',value:'Saïda'},{label:'Skikda',value:'Skikda'},{label:'Sidi Bel Abbès',value:'Sidi Bel Abbès'},{label:'Annaba',value:'Annaba'},{label:'Guelma',value:'Guelma'},{label:'Constantine',value:'Constantine'},{label:'Médéa',value:'Médéa'},{label:'Mostaganem',value:'Mostaganem'},{label:"M'Sila",value:"M'Sila"},{label:'Mascara',value:'Mascara'},{label:'Ouargla',value:'Ouargla'},{label:'Oran',value:'Oran'},{label:'El Bayadh',value:'El Bayadh'},{label:'Illizi',value:'Illizi'},{label:'Bordj Bou Arreridj',value:'Bordj Bou Arreridj'},{label:'Boumerdès',value:'Boumerdès'},{label:'El Tarf',value:'El Tarf'},{label:'Tindouf',value:'Tindouf'},{label:'Tissemsilt',value:'Tissemsilt'},{label:'El Oued',value:'El Oued'},{label:'Khenchela',value:'Khenchela'},{label:'Souk Ahras',value:'Souk Ahras'},{label:'Tipaza',value:'Tipaza'},{label:'Mila',value:'Mila'},{label:'Aïn Defla',value:'Aïn Defla'},{label:'Naâma',value:'Naâma'},{label:'Aïn Témouchent',value:'Aïn Témouchent'},{label:'Ghardaïa',value:'Ghardaïa'},{label:'Relizane',value:'Relizane'}],
            children:[],
            photo:null,
            collapsed: true

        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount(){
        let result=[]
        this.state.options.forEach(item => {
        result.push(<Option key={item.value}>{item.label}</Option>)
        })
        this.setState({
            children:result
        })

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
                if (!findresponse.status === 200 || findresponse.msg === 'Not enough segments') {
                    this.props.history.push('/login')
                }
                else {
                    if (!findresponse.user) {
                        this.props.history.push('/login')
                    }
                    else {
                        if (findresponse.user.role === "Confermatrice") {
                            this.props.history.push('/Confermatrice')
                        }
                        if (findresponse.user.role === "Livreur") {
                            this.props.history.push('/Livreur')
                        }
                    }
                }

            })
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append("first_name",this.state.first_name)
        formData.append("last_name",this.state.last_name)
        formData.append("email",this.state.email)
        formData.append("password",this.state.password)
        formData.append("phone",this.state.phone)
        formData.append("wilaya",this.state.wilaya)
        formData.append("photo",this.state.photo)
        axios({
            url: "http://151.80.56.201:5000/Dashboard/AddDelivrer",
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + localStorage.getItem('usertoken'),
            }
        }).then((response) => {
            {this.setState({ 
                first_name: "",
                last_name:"",
                email:"",
                password:"",
                phone:"",
                wilaya:"",
                photo:null
        
        })
        openNotification()
    }})

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
    handlechange=(wilaya)=>{
        this.setState({
            wilaya:wilaya
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
                            <Breadcrumb.Item>Ajouter un Livreure</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="input-field">
                                    <Text style={{ color: "#ad3216" }}>Nom</Text>
                                    <input type="text" name="first_name" value={this.state.first_name} onChange={this.onChange} id="first_name" className="validate" />

                                </div>
                                <div className="input-field">
                                    <Text style={{ color: "#ad3216" }}>Prénom</Text>
                                    <input type="text" name="last_name" value={this.state.last_name} onChange={this.onChange} id="last_name" className="validate" />
                                </div>
                                <div className="input-field">
                                    <Text style={{ color: "#ad3216" }}>E-Mail</Text>
                                    <input type="email" name="email" value={this.state.email} onChange={this.onChange} id="email" className="validate" />
                                </div>
                                <div className="input-field">
                                    <Text style={{ color: "#ad3216" }}>Numéro de Tél°</Text>
                                    <input type="text" name="phone" value={this.state.phone} onChange={this.onChange} id="phone" className="validate" />
                                </div>
                                <div className="input-field">
                                <Text style={{ color: "#ad3216" }}>Régions</Text>
                                    <Select
                                        mode="multiple"
                                        size="large"
                                        placeholder="Régions"
                                        style={{ width: '100%' }}
                                        onChange={(value)=>this.setState({wilaya:value})}
                                        value={this.state.wilaya}
                                    > 
                                        {this.state.children}
                                    </Select>

                                </div>
                                <div className="input-field">
                                    <Text style={{ color: "#ad3216" }}>Mot de Passe</Text>
                                    <input type="password" name="password" value={this.state.password} onChange={this.onChange} id="password" className="validate"></input>
                                </div>
                                <div className="input-field">
                                    <Text style={{ color: "#ad3216" }}>Piéce d'identité</Text>
                                    <br />
                                    <input type="file" name="photo" onChange={(e)=>this.setState({photo:e.target.files[0]})} className="validate" />
                                </div>
                               


                                <button onClick={(e)=>this.onSubmit(e)} type="submit" className="btn align-center" style={{ background: "#ad3216" }}>{<PlusCircleOutlined spin />} Ajouter</button>

                            </form>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>SMART BOX SOLUTION ©2020</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default AddDeliver