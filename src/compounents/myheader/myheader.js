/*import React, { Component, Fragment } from 'react';
import jwt_decode from 'jwt-decode';
import { Layout, Avatar, Menu, Switch, Button, Breadcrumb } from 'antd';
import '../../App.css'
import Title from 'antd/lib/typography/Title';
import { UserOutlined, MailOutlined, PieChartOutlined, DesktopOutlined, TeamOutlined, FileOutlined, MenuFoldOutlined, MenuUnfoldOutlined, AppstoreOutlined, SettingOutlined, DashboardOutlined, HddOutlined, EditOutlined, ChromeOutlined, TableOutlined, InsertRowLeftOutlined, PlusCircleOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Icon } from 'semantic-ui-react';
import './Panel.css'
const { Header, Footer, Sider, Content } = Layout;
class Panel extends Component {
    constructor() { 
        super()
        this.state = {
            first_name: "",
            last_name: "",
            email: ""
        }
    }
    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            first_name: decoded.identity.first_name,
            last_name: decoded.identity.last_name,
            email: decoded.identity.email
        })
    }
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
        
    };
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} style={{background : '#9f53af'}}>
                    <div className="logo" style={{background : '#9f53af'}} />
                    <Menu defaultSelectedKeys={['1']} mode="inline" style={{background : '#9f53af', color: "white"}}>
                        <Menu.Item key="Dashboard" icon={<DashboardOutlined spin />}>
                            Dashboard
                                    </Menu.Item>

                        <Menu.Item key="Site" icon={<ChromeOutlined spin />}>
                            Aller sur le site
                                    </Menu.Item>
                                    <SubMenu title="Gestion des Catégories" icon={<TableOutlined spin />}>
                                    <Menu.ItemGroup title="Gestion des Catégories">
                                        <Menu.Item icon={<PlusCircleOutlined spin />}>Ajouter une Catégorie</Menu.Item>
                                        <Menu.Item icon={<EditOutlined spin />}>Mes Catégories</Menu.Item>
                                    </Menu.ItemGroup>
                                </SubMenu>

                                <SubMenu title="Gestion des sous Catégories" icon={<InsertRowLeftOutlined spin />}>
                                    <Menu.ItemGroup title="Gestion des Catégories">
                                        <Menu.Item icon={<PlusCircleOutlined spin />}>Ajouter une Sous Catégorie</Menu.Item>
                                        <Menu.Item icon={<EditOutlined spin />}>Mes sous Catégories</Menu.Item>
                                    </Menu.ItemGroup>
                                </SubMenu>

                                <SubMenu title="Gestion des Types" icon={<HddOutlined spin />}>
                                    <Menu.ItemGroup title="Gestion des Types">
                                        <Menu.Item icon={<PlusCircleOutlined spin />}>Ajouter un Type</Menu.Item>
                                        <Menu.Item icon={<EditOutlined spin />}>Mes Types</Menu.Item>
                                    </Menu.ItemGroup>
                                </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0, background: '#9f53af' }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            Bill is a cat.
            </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>SMART BOX SOLUTION ©2020</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Panel*/