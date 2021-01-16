import React, { Component } from 'react';
import { Layout, Menu, Divider, Typography, Breadcrumb, Button } from 'antd';
import '../../App.css';
import {  CheckOutlined, ClockCircleOutlined, StopOutlined, ZoomInOutlined, MenuOutlined, LogoutOutlined, DollarCircleOutlined, ToolOutlined, ShoppingCartOutlined, UsergroupAddOutlined, MoreOutlined, ShoppingOutlined, MenuUnfoldOutlined, DashboardOutlined, EditOutlined, ChromeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import '../Panel/Panel.css'
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import axios from 'axios'
const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;

class Livreur extends Component {
    constructor() {
        super()
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            Orders: [],
            collapsed: true
        }
    }
    componentDidMount() {
        const token = localStorage.getItem('usertoken');
        const result = []
        
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

            }).then(()=>{
                fetch('http://151.80.56.201:5000/Dashboard/Livreur', {
                    method: 'get', headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + token,
                    }
                })
                .then((Response) => Response.json())
                .then((findresponse) => {
                    if(findresponse.Orders){
                    findresponse.Orders.map((row, i) =>
                        result.push([row.id, row.FirstName, row.LastName, row.Phone, row.Wilaya, row.Commune, <><Button type="link" href={"/ViewOrder/" + row.id} style={{ width: "100%", backgroundColor: "#198ffe", color: "white" }} icon={<ZoomInOutlined />}> <b> Consulter</b></Button> <Button style={{ width: "100%", backgroundColor: "green", color: "white" }} icon={<CheckOutlined />} onClick={() => this.Confirmed(row.id)}><b> Livré</b></Button><Button onClick={()=>this.NoResponse(row.id)} style={{ width: "100%", backgroundColor: "#f99821", color: "white" }} icon={<ClockCircleOutlined />}><b> Ne Répond Pas</b></Button> <Button onClick={()=>this.Cancelled(row.id)} style={{ width: "100%", backgroundColor: "red", color: "white" }} icon={<StopOutlined />}> <b> Annuler</b></Button>
                        </>]))}
                    this.setState({
                        Orders: result
                    })
                })
            })
        
            

    }
    lougout() {
        localStorage.clear()
        this.props.history.push('/login')
    }
    Confirmed = (id) => {
        const formData = new FormData();
        formData.append("id", id)
        formData.append("State", "Livré")
        axios({
            url: "http://151.80.56.201:5000/Dashboard/Livreur",
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json',
                "Authorization" : "Bearer " +localStorage.getItem('usertoken')
            }
        }).then((response) => {
            const result = []
            fetch('http://151.80.56.201:5000/Dashboard/Livreur', {
                method: 'get', headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem('usertoken'),
                }
            })
            .then((Response) => Response.json())
            .then((findresponse) => {
                localStorage.setItem('usertoken',findresponse.user)
                
                if(findresponse.Orders){
                findresponse.Orders.map((row, i) =>
                    result.push([row.id, row.FirstName, row.LastName, row.Phone, row.Wilaya, row.Commune, <><Button type="link" href={"/ViewOrder/" + row.id} style={{ width: "100%", backgroundColor: "#198ffe", color: "white" }} icon={<ZoomInOutlined />}> <b> Consulter</b></Button> <Button style={{ width: "100%", backgroundColor: "green", color: "white" }} icon={<CheckOutlined />} onClick={() => this.Confirmed(row.id)}><b> Livré</b></Button><Button onClick={()=>this.NoResponse(row.id)} style={{ width: "100%", backgroundColor: "#f99821", color: "white" }} icon={<ClockCircleOutlined />}><b> Ne Répond Pas</b></Button> <Button onClick={()=>this.Cancelled(row.id)} style={{ width: "100%", backgroundColor: "red", color: "white" }} icon={<StopOutlined />}> <b> Annuler</b></Button>
                    </>]))}
                this.setState({
                    Orders: result
                })
            })
        })

    }
    Cancelled = (id) => {
        const formData = new FormData();
        formData.append("id", id)
        formData.append("State", "Annuler")
        axios({
            url: "http://151.80.56.201:5000/Dashboard/Livreur",
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + localStorage.getItem('usertoken'),
            }
        }).then((response) => {
            const result = []
            fetch('http://151.80.56.201:5000/Dashboard/Livreur', {
                method: 'get', headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem('usertoken'),
                }})
                .then((Response) => Response.json())
                .then((findresponse) => {
                    findresponse.Orders.map((row, i) =>
                        result.push([row.id, row.FirstName, row.LastName, row.Phone, row.Wilaya, row.Commune, <><Button to={"/ViewOrder/" + row.id} style={{ width: "100%", backgroundColor: "#198ffe", color: "white" }} icon={<ZoomInOutlined />}> <b> Consulter</b></Button> <Button style={{ width: "100%", backgroundColor: "green", color: "white" }} icon={<CheckOutlined />} onClick={() => this.Confirmed(row.id)}><b> Livré</b></Button><Button  style={{ width: "100%", backgroundColor: "#f99821", color: "white" }} icon={<ClockCircleOutlined />} onClick={()=>this.NoResponse(row.id)}><b> Ne Répond Pas</b></Button> <Button style={{ width: "100%", backgroundColor: "red", color: "white" }} icon={<StopOutlined />} onClick={()=>this.Cancelled(row.id)}> <b> Annuler</b></Button>
                        </>]))
                    this.setState({
                        Orders: result
                    })
                })
        })

    }
    NoResponse = (id) => {
        const formData = new FormData();
        formData.append("id", id)
        formData.append("State", "Pas de reponse")
        axios({
            url: "http://151.80.56.201:5000/Dashboard/Livreur",
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + localStorage.getItem('usertoken'),
            }
        }).then((response) => {
            const result = []
            fetch('http://151.80.56.201:5000/Dashboard/Livreur', {
                method: 'get', headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem('usertoken'),
                }})
                .then((Response) => Response.json())
                .then((findresponse) => {
                    findresponse.Orders.map((row, i) =>
                        result.push([row.id, row.FirstName, row.LastName, row.Phone, row.Wilaya, row.Commune, <><Button to={"/ViewOrder/" + row.id} style={{ width: "100%", backgroundColor: "#198ffe", color: "white" }} icon={<ZoomInOutlined />}> <b> Consulter</b></Button> <Button style={{ width: "100%", backgroundColor: "green", color: "white" }} icon={<CheckOutlined />} onClick={() => this.Confirmed(row.id)}><b> Livré</b></Button><Button  style={{ width: "100%", backgroundColor: "#f99821", color: "white" }} icon={<ClockCircleOutlined />} onClick={()=>this.NoResponse(row.id)}><b> Ne Répond Pas</b></Button> <Button style={{ width: "100%", backgroundColor: "red", color: "white" }} icon={<StopOutlined />} onClick={()=>this.Cancelled(row.id)}> <b> Annuler</b></Button>
                        </>]))
                    this.setState({
                        Orders: result
                    })
                })
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
    

    lougout (){
        localStorage.clear()
        this.props.history.push('/login')
    }
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>

            <Sider className="Sider" width={260} collapsible collapsed={this.state.collapsed} onCollapse={()=>this.onCollapse(this.state.collapsed)} style={{ background: '#ad3216' }}>
                    <div className="logo" style={{ background: '#ad3216' }} />
                    <Menu defaultSelectedKeys={['1']} mode="inline" style={{ background: '#ad3216', color: "white", fontSize: "16px" }}>
                        <Divider plain></Divider>
                        <Menu.Item key="Site" icon={<ChromeOutlined spin />}>
                            <Link style={{ color: "white" }} to="/"> Aller sur le site</Link>
                        </Menu.Item>
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
                            <Breadcrumb.Item>Gérer les Commandes</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <MUIDataTable
                                title={"Liste des Commandes En Attente"}
                                columns={["ID", "Nom", "Prénom", "Num Tél°", "Wilaya", "Commune", "Actions"]}
                                data={this.state.Orders}
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

export default Livreur