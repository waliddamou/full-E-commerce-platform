import React, { Component } from 'react';
import { Space, Form, Layout, Menu, Divider, Typography, Button, notification, Breadcrumb, Select, Input, Switch } from 'antd';
import '../../App.css';
import { PhoneOutlined, MoneyCollectOutlined, StarOutlined, DollarCircleOutlined, MenuOutlined, LogoutOutlined, ToolOutlined, ShoppingCartOutlined, UsergroupAddOutlined, MoreOutlined, ShoppingOutlined, MenuUnfoldOutlined, DashboardOutlined, EditOutlined, ChromeOutlined, PlusCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import '../Panel/Panel.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;
const { TextArea } = Input;

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
            'Le Produit a été ajouté.',
        btn,
        key,
        onClose: close,
    });
};


class AddProduct extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            descrption: "",
            subcategorie: "",
            mother_name: "",
            qte: "",
            qtea: "",
            buyprice: "",
            sellprice: "",
            types: "",
            photos: null,
            file: null,
            Types: [],
            Categories: [],
            Subcategories: [],
            Tailles: [{ label: "XS", value: "XS" }, { label: "S", value: "S" }, { label: "M", value: "M" }, { label: "L", value: "L" }, { label: "XL", value: "XL" }, { label: "XXL", value: "XXL" }, { label: "XXXL", value: "XXXL" }],
            taille: [],
            background: "#fff",
            Choice: [{ label: "Taille", value: "Taille" }, { label: "Pointure", value: "Pointure" }, { label: "Autre", value: "Autre" }],
            Checked: false,
            Pointures: [{ label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }, { label: '5', value: '5' }, { label: '6', value: '6' }, { label: '7', value: '7' }, { label: '8', value: '8' }, { label: '9', value: '9' }, { label: '10', value: '10' }, { label: '11', value: '11' }, { label: '12', value: '12' }, { label: '13', value: '13' }, { label: '14', value: '14' }, { label: '15', value: '15' }, { label: '16', value: '16' }, { label: '17', value: '17' }, { label: '18', value: '18' }, { label: '19', value: '19' }, { label: '20', value: '20' }, { label: '21', value: '21' }, { label: '22', value: '22' }, { label: '23', value: '23' }, { label: '24', value: '24' }, { label: '25', value: '25' }, { label: '26', value: '26' }, { label: '27', value: '27' }, { label: '28', value: '28' }, { label: '29', value: '29' }, { label: '30', value: '30' }, { label: '31', value: '31' }, { label: '32', value: '32' }, { label: '33', value: '33' }, { label: '34', value: '34' }, { label: '35', value: '35' }, { label: '36', value: '36' }, { label: '37', value: '37' }, { label: '38', value: '38' }, { label: '39', value: '39' }, { label: '40', value: '40' }, { label: '41', value: '41' }, { label: '42', value: '42' }, { label: '43', value: '43' }, { label: '44', value: '44' }, { label: '45', value: '45' }, { label: '46', value: '46' }],
            finalchoice: [{}],
            autre: "",
            color: "",
            SpecialProducts: [],
            fileList: [],
            collapsed: true

        }
        this.onChange = this.onChange.bind(this)
        this.onChange3 = this.onChange3.bind(this)
        this.onChange2 = this.onChange2.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleimgChange = this.handleimgChange.bind(this)
        this.onFinish = this.onFinish.bind(this)

    }
    handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
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

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleChange(e) {
        let { mother_name, value } = e.target;
        this.setState({
            [mother_name]: value,

        });

    }
    handleChange2(e) {
        let { Types, value } = e.target;
        this.setState({
            [Types]: value,

        });

    }

    handleError(err) {
        console.error(err)
    }
    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData();
        const files1 = this.state.fileList;
        for (let i = 0; i < files1.length; i++) {
            formData.append(`images[${i}]`, files1[i])
        }

        formData.append("name", this.state.name);
        formData.append("descrption", this.state.descrption);
        formData.append("type", this.state.type);
        formData.append("subcategorie", this.state.subcategorie);
        formData.append("mother_name", this.state.mother_name);
        formData.append("qte", this.state.qte);
        formData.append("qtea", this.state.qtea);
        formData.append("buyprice", this.state.buyprice);
        formData.append("sellprice", this.state.sellprice);
        formData.append("SpecialProducts", JSON.stringify(this.state.SpecialProducts))

        axios({
            url: "http://151.80.56.201:5000/Dashboard/AddProduct",
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + localStorage.getItem('usertoken'),
            }
        }).then((response) => {
            
            this.setState({
                name: "",
                descrption: "",
                type: "",
                subcategorie: "",
                mother_name: "",
                qte: "",
                qtea: "",
                buyprice: "",
                sellprice: "",
                photos: null
            })
         

        })
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
            .then(() => {

                fetch('http://151.80.56.201:5000/Dashboard/ManageCategories2')
                    .then((Response) => Response.json())
                    .then((findrespounse) => {
                        this.setState({
                            Categories: findrespounse.Categories
                        })
                    })

                fetch('http://151.80.56.201:5000/Dashboard/ManageSubCategories')
                    .then((Response) => Response.json())
                    .then((findrespounse) => {
                        this.setState({
                            Subcategories: findrespounse.Categories
                        })
                    })

                fetch('http://151.80.56.201:5000/Dashboard/ManageTypes')
                    .then((Response) => Response.json())
                    .then((respounse) => {
                        this.setState({
                            Types: respounse.types

                        })
                    })

            })

    }
    onChange3(value) {
        if (value === "Taille") {
            this.setState({
                finalchoice: this.state.Tailles
            })
        }
        if (value === "Pointure") {
            this.setState({
                finalchoice: this.state.Pointures
            })


        }
        if (value === "Autre") {
            this.setState({
                finalchoice: "Autre"
            })
        }
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

    onFinish = values => {

        this.setState({
            SpecialProducts: values
        })
    };

    onChange2(e) {
        if (this.state.Checked === false) {
            this.setState({
                Checked: true
            })
        }
        else {
            this.setState({
                Checked: false
            })
        }
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
                            <Breadcrumb.Item>Ajouter un Produit</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <div className="col s12 m6">
                                <span>
                                    <Text style={{ color: "black" }}>
                                        Ajouter Un Produit
                             </Text>
                                </span>
                                <form noValidate onSubmit={this.onSubmit} >
                                    <div className="input-field">
                                        <input type="text" name="name" value={this.state.name} onChange={this.onChange} id="name" className="validate" />
                                        <label for="name" className="" style={{ color: "#ad3216" }}>Nom de Produit</label>

                                    </div>
                                    <div className="input-field">
                                        <Switch defaultChecked checked={this.state.Checked} name="Checked" onChange={this.onChange2} />
                                    </div>


                                    <div className="input-field" hidden={!this.state.Checked}>
                                        <div className="input-field">
                                            <Select options={this.state.Choice} placeholder="Taille ou Pointure ?" onChange={this.onChange3} />

                                        </div>

                                        <Form name="dynamic_form_nest_item" onFinish={this.onFinish} autoComplete="off">
                                            <Form.List name="multipleproducts">
                                                {(fields, { add, remove }) => (
                                                    <>
                                                        {fields.map(field => (
                                                            <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                                {this.state.finalchoice !== "Autre" ?
                                                                    <Form.Item
                                                                        {...field}
                                                                        name={[field.name, 'Taille']}
                                                                        fieldKey={[field.fieldKey, 'Taille']}
                                                                    >

                                                                         <Form.List  name={[field.name, 'detailed']}>
                                                                            {(fields, { add, remove }) => (
                                                                                <>
                                                                                    {fields.map(field => (
                                                                                        <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                                                            {this.state.finalchoice !== "Autre" ?
                                                                                                <Form.Item
                                                                                                    {...field}
                                                                                                    name={[field.name, 'Taille']}
                                                                                                    fieldKey={[field.fieldKey, 'Taille']}
                                                                                                    >

                                                                                                    <Select options={this.state.finalchoice} />

                                                                                                </Form.Item>
                                                                                                : (
                                                                                                    <Form.Item
                                                                                                        {...field}
                                                                                                        name={[field.name, 'Taille']}
                                                                                                        fieldKey={[field.fieldKey, 'Taille']}
                                                                                                         >

                                                                                                        <Input placeholder="" />

                                                                                                    </Form.Item>
                                                                                                )
                                                                                            }
                                                                                            *<Form.Item
                                                                                                {...field}
                                                                                                name={[field.name, 'Quantité']}
                                                                                                fieldKey={[field.fieldKey, 'Quantité']}
                                                                                                >
                                                                                                <Input placeholder="Quantité" />
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
                                                                        
                                                               

                                                                    </Form.Item>
                                                                    : (
                                                                        <Form.Item
                                                                            {...field}
                                                                            name={[field.name, 'Taille']}
                                                                            fieldKey={[field.fieldKey, 'Taille']}
                                                                            rules={[{ required: true, message: 'Le Champ est vide' }]}
                                                                        >

                                                                            <Input placeholder="" />

                                                                        </Form.Item>
                                                                    )
                                                                }
                                                               
                                                                <Form.Item
                                                                    {...field}
                                                                    name={[field.name, 'Couleur']}
                                                                    fieldKey={[field.fieldKey, 'Couleur']}
                                                                    rules={[{ required: true, message: 'Le Champ est vide' }]}
                                                                >
                                                                    <input type="color" />
                                                                </Form.Item>
                                                                <Form.Item
                                                                    {...field}
                                                                    name={[field.name, 'Photo']}
                                                                    fieldKey={[field.fieldKey, 'Photo']}
                                                                    rules={[{ required: true, message: 'Le Champ est vide' }]}
                                                                >
                                                                    <input type="file" name="file[]" onChange={(e) => this.handleimgChange(field.fieldKey, e)} />
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

                                    </div>
                                    <div className="input-field">
                                        <Text style={{ color: "#ad3216" }}>Description de Produit</Text>
                                        <TextArea rows={4} name="descrption" value={this.state.descrption} onChange={this.onChange} id="description" />
                                    </div>
                                    <div className="input-field">
                                        <Text className="" style={{ color: "#ad3216" }}>
                                            Types
                                        </Text>

                                    </div>
                                    <div className="input-field">
                                        <Select name="type" id="type" value={this.state.type} onChange={(value) => { this.setState({ type: value }) }} size="large" style={{ width: "100%" }}>
                                            {this.state.Types.map((data, key) =>
                                                <Select.Option value={data.id}>{data.Name}</Select.Option>)

                                            }
                                        </Select>
                                    </div>


                                    <div className="input-field">
                                        <Text className="" style={{ color: "#ad3216" }}>
                                            Sous Catégories
                                </Text>
                                        <Select name="subcategorie" id="subcategorie" value={this.state.subcategorie} onChange={(value) => { this.setState({ subcategorie: value }) }} size="large" style={{ width: "100%" }}>
                                            {this.state.Subcategories.map((data, key) =>
                                                <Select.Option value={data.id}>{data.Name}</Select.Option>)

                                            }
                                        </Select>
                                        <Text className="" style={{ color: "#ad3216" }}>
                                            Catégorie Mére
                                </Text>
                                        <Select name="mother_name" id="mother_name" value={this.state.mother_name} onChange={(value) => { this.setState({ mother_name: value }) }} size="large" style={{ width: "100%" }}>
                                            {this.state.Categories.map((data, key) =>
                                                <Select.Option value={data.id}>{data.Name}</Select.Option>)

                                            }
                                        </Select>

                                    </div>
                                    <div className="input-field">
                                        <input type="number" name="qte" value={this.state.qte} onChange={this.onChange} id="qte" className="validate" />
                                        <label for="qte" className="" style={{ color: "#ad3216" }}>Quantité</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="number" name="qtea" value={this.state.qtea} onChange={this.onChange} id="qteseuil" className="validate" />
                                        <label for="qtea" className="" style={{ color: "#ad3216" }}>Quantité Alert</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="text" name="buyprice" value={this.state.buyprice} onChange={this.onChange} id="buyprice" className="validate" />
                                        <label for="buyprice" className="" style={{ color: "#ad3216" }}>Prix d'Achat</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="text" name="sellprice" value={this.state.sellprice} onChange={this.onChange} id="sellprice" className="validate" />
                                        <label for="sellprice" className="" style={{ color: "#ad3216" }}>Prix de Vente</label>
                                    </div>

                                    <button onClick={openNotification} type="submit" className="btn align-center" style={{ background: "#ad3216" }}>{<PlusCircleOutlined spin />} Ajouter</button>

                                </form>
                            </div>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>SMART BOX SOLUTION ©2020</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default AddProduct