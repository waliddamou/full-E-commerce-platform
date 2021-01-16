import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { Layout, Menu, Divider, Typography, Breadcrumb, Button, notification, Form, Space } from 'antd';
import '../../App.css';
import { PlusOutlined, DollarCircleOutlined, MinusCircleOutlined, MenuOutlined, LogoutOutlined, ToolOutlined, ShoppingCartOutlined, UsergroupAddOutlined, MoreOutlined, ShoppingOutlined, MenuUnfoldOutlined, DashboardOutlined, EditOutlined, ChromeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import '../Panel/Panel.css'
import './settings.css'

import { Link } from 'react-router-dom';
import axios from "axios";
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
            'Les images ont été ajouté.',
        btn,
        key,
        onClose: close,
    });
};


class Settings extends Component {
    constructor() {
        super()
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            imgCollection: '',
            fileList: [],
            collapsed: true

        }
    }
    componentDidMount() {
        const token = localStorage.usertoken
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
    onFileChange(e) {
        this.setState({ imgCollection: e.target.files })
    }
    state = {
        collapsed: true,
    };

    handleimgChange(fieldKey, event) {
        let currnetlist = [...this.state.fileList]
        if (currnetlist[fieldKey]) {
            currnetlist[fieldKey] = event.target.files[0]
            this.setState({
                fileList: currnetlist
            })
        }
        else {
            currnetlist.push(event.target.files[0])
            this.setState({
                fileList: currnetlist
            })
        }
    }
    onSubmit(e) {
        e.preventDefault()

        const formData = new FormData();
        const files1 = this.state.fileList;
        for (let i = 0; i < files1.length; i++) {
            formData.append(`images[${i}]`, files1[i])
        }
        axios({
            url: "http://151.80.56.201:5000/Settings",
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + localStorage.getItem('usertoken'),
            }
        }).then((response) => {
            openNotification()
        })
    }
    onFinish = values => {

        this.setState({
            SpecialProducts: values
        })
    };
    
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
                                    <Text style={{ color: "white", fontWeight: "bold", fontSize: "25px" }}>Staylli</Text>
                                </span>
                            </div>
                        </div>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                            <Breadcrumb.Item>Paramétres</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            Ajouter des images au Slide
                            <br />
                            <Form name="dynamic_form_nest_item" onFinish={this.onFinish} autoComplete="off">
                                <Form.List name="slider">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(field => (
                                                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">


                                                    <Form.Item
                                                        {...field}
                                                        name={[field.name, 'Photo']}
                                                        fieldKey={[field.fieldKey, 'Photo']}
                                                        >
                                                        <label for="file">Choose a file</label>
                                                        <input type="file" name="file[]" className="inputfile"  onChange={(e) => this.handleimgChange(field.fieldKey, e)} />
                                                    </Form.Item>

                                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                                                </Space>
                                            ))}
                                            <Form.Item>
                                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                    Ajouter
                                                            </Button>
                                            </Form.Item>
                                        </>

                                    )}

                                </Form.List>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Confirmer
                                </Button>
                                </Form.Item>
                            </Form>
                            <button onClick={(e)=>this.onSubmit(e)} type="submit" className="btn align-center" style={{ background: "#ad3216" }}>{<PlusCircleOutlined spin />} Ajouter</button>
                         

                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>SMART BOX SOLUTION ©2020</Footer>
                </Layout>
            </Layout >
        )
    }
}

export default Settings