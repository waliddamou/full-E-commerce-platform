import React, { Component } from 'react';
import { Layout, Menu, Divider, Typography, Breadcrumb, Button, notification } from 'antd';
import '../../App.css';
import { MoneyCollectOutlined, PhoneOutlined, StarOutlined, DeleteOutlined, DollarCircleOutlined, MenuOutlined, LogoutOutlined, ToolOutlined, ShoppingCartOutlined, UsergroupAddOutlined, MoreOutlined, ShoppingOutlined, MenuUnfoldOutlined, DashboardOutlined, EditOutlined, ChromeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import '../Panel/Panel.css';
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import axios from 'axios'
const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;


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
            "L'Utilisateur a été Supprimer.",
        btn,
        key,
        onClose: close,
    });
};


class ManageUsers extends Component {
    constructor() {
        super()
        this.state = {
            Users: [],
            Result: [],
            collapsed: true

        }
    }
    componentDidMount() {
        const result = []
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

        fetch('http://151.80.56.201:5000/AllUsers', {
            method: 'get', headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('usertoken'),
            }
        })
            .then((Response) => Response.json())
            .then((findresponse) => {
                this.setState({
                    Users: findresponse.users.map((row, i) =>
                        result.push([row.id, row.Nom, row.Prénom, row.Email, row.Num, <><Link to={`/EditUser/${row.id}`} ><EditOutlined /></Link> <Button onClick={() => this.DeleteUser(row.id)} icon={<DeleteOutlined />}></Button></>]))
                })
            })
        this.setState({ Result: result })

    }
    state = {
        collapsed: false,
    };
    DeleteUser = id => {
        let result = []
        const formData = new FormData()
        formData.append("id", id)
        axios({
            url: "http://151.80.56.201:5000/AllUsers",
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + localStorage.getItem('usertoken'),
            }
        })
            .then((findresponse) => {
                console.log(findresponse.data.users)
                this.setState({    
                Users:findresponse.data.users.map((row, i) =>
                   
                        result.push([row.id, row.Nom, row.Prénom, row.Email, row.Num, <><Link to={`/EditUser/${row.id}`} ><EditOutlined /></Link> <Button onClick={() => this.DeleteUser(row.id)} icon={<DeleteOutlined />}></Button></>]))
                })
            })
        this.setState({ Result: result })
        openNotification()


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
                                <Menu.Item icon={<PhoneOutlined spin />}>
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
                                <Menu.Item icon={<ShoppingCartOutlined spin />}>
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
                        <SubMenu title="Gestion des Promotions" icon={<StarOutlined />}>
                            <Menu.ItemGroup title="Gestion des Promotions">
                                <Menu.Item icon={<StarOutlined spin />}>
                                    <Link style={{ color: "black" }} to="/AddPromotion"> Ajouter une Promotion</Link>
                                </Menu.Item>
                                <Menu.Item icon={<StarOutlined spin />}>
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
                        <Menu.Item key="Caisse" icon={<MoneyCollectOutlined spin />}>
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
                            <Breadcrumb.Item>Gérer les Utilisateurs</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <MUIDataTable
                                title={"Utilisateurs"}
                                columns={["ID", "NOM", "Prénom", "Email", "Num", "Action"]}
                                data={this.state.Result}
                                options={{
                                    filterType: "checkbox",
                                    print: true
                                }
                                }
                            />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>SMART BOX SOLUTION ©2020</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default ManageUsers