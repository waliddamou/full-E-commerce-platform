import React, { Fragment } from 'react';
import  {BrowserRouter as Router , Switch, Route} from 'react-router-dom';
import M from  'materialize-css/dist/js/materialize.min.js';
import Shop from './compounents/Shop/Shop';
import Login from './compounents/Login/Login';
import Accueil from './compounents/Accueil/Accueil';
import Panel from './compounents/Panel/Panel';
import AddCategorie from './compounents/Categorie/AddCategorie';
import AddSubCategorie from "./compounents/SubCategorie/AddSubCategorie";
import AddType from './compounents/Types/AddType';
import ManageCategories from './compounents/Categorie/ManageCategories';
import ManageSubCat from './compounents/SubCategorie/ManageSubCat';
import AddProduct from './compounents/Products/AddProduct';
import ManageTypes from './compounents/Types/ManageTypes';
import ManageProducts from './compounents/Products/ManageProducts';
import AddUsers from './compounents/Users/AddUsers';
import ManageUsers from './compounents/Users/ManageUsers';
import EditCategory from './compounents/Categorie/EditCategory';
import EditSubCategorie from './compounents/SubCategorie/EditSubCategorie';
import EditType from './compounents/Types/EditType';
import DeleteCategory from './compounents/Categorie/DeleteCategory';
import DeleteSubCategory from './compounents/SubCategorie/DeleteSubCategory';
import DeleteType from "./compounents/Types/DeleteType";
import EditProduct from './compounents/Products/EditProduct';
import ContactUS from './compounents/Contact/ContactUs';
import Settings from './compounents/Settings/Settings';
import AddOrder from "./compounents/Order/AddOrder";
import ManageOrders from "./compounents/Order/ManageOrders";
import BuyProduct from './compounents/Shop/BuyProduct';
import ShoppingCard from './compounents/ShoppingCard/ShoppingCard';
import EditOrder from './compounents/Order/EditOrder';
import AddDeliver from './compounents/Livreur/AddDeliver';
import ManageDelivers from "./compounents/Livreur/ManageDelivers";
import EditDeliver from "./compounents/Livreur/EditDeliver";
import Confermatrice from './compounents/Confermatrice/Confermatrice'
import Livreur from './compounents/Livreur/Livreur'
import Delivred from './compounents/Livreur/Delivred'
import Caisse from './compounents/Caisse/Caisse'
import AddConfermatrice from './compounents/Confermatrice/AddConfermatrice'
import ManageConfermatrice from './compounents/Confermatrice/ManageConfermatrice'
import EditConfermatrice from './compounents/Confermatrice/EditConfermatrice'
import Promotion from './compounents/Promotion/Promotion'
import ManagePromotions from './compounents/Promotion/ManagePromotions'
import EditPromo from './compounents/Promotion/EditPromo'
import EditUser from './compounents/Users/EditUser'
import ViewOrder from './compounents/Order/ViewOrder'

function App() {
 
    let sidenav = document.querySelector('#slide-out');
    M.Sidenav.init(sidenav, {});
    
  return (
    
      <Fragment>
        <Router>
        <Switch>
        <Route path={"/"} exact component={Accueil}  />
        <Route path={"/login"} component={Login}/>
        <Route path={"/shop"} component={Shop}/>
        <Route path={"/panel"} component={Panel}/>
        <Route path={"/AddCategorie"} component={AddCategorie}/>
        <Route path={"/AddSubCategorie"} component={AddSubCategorie}/>
        <Route path={"/AddType"} component={AddType}/>
        <Route path={"/ManageCategories"} component={ManageCategories}/>
        <Route path={"/ManageSubCategories"} component={ManageSubCat}/>
        <Route path={"/AddProduct"} component={AddProduct}/>
        <Route path={"/ManageTypes"} component={ManageTypes}/>
        <Route path={"/ManageProducts"} component={ManageProducts}/>
        <Route path={"/AddUsers"} component={AddUsers}/>
        <Route path={"/ManageUsers"} component={ManageUsers}/>
        <Route path={"/EditCategorie"} component={EditCategory}/>
        <Route path={"/EditSubCategorie"} component={EditSubCategorie}/>
        <Route path={"/EditType"} component={EditType}/>
        <Route path={"/DeleteCategory"} component={DeleteCategory}/>
        <Route path={"/DeleteSubCategory"} component={DeleteSubCategory}/>
        <Route path={"/DeleteType"} component={DeleteType}/>
        <Route path={"/EditProduct"} component={EditProduct}/>
        <Route path={"/contact-us"} component={ContactUS}/>
        <Route path={"/Settings"} component={Settings}/>
        <Route path={"/AddOrder"} component={AddOrder} />
        <Route path={"/ManageOrders"} component={ManageOrders} />
        <Route path={"/BuyProduct/"} component={BuyProduct} />
        <Route path={"/ShoppingCart"} component={ShoppingCard} />
        <Route path={"/EditOrder/"} component={EditOrder} />
        <Route path={"/AddDeliver"} component={AddDeliver} />
        <Route path={"/ManageDelivers"} component={ManageDelivers} />
        <Route path={"/EditDeliver/"} component={EditDeliver} />
        <Route path={"/Confermatrice"} component={Confermatrice} />
        <Route path={"/Livreur"} component={Livreur} />
        <Route path={"/Delivred"} component={Delivred} />
        <Route path={"/Caisse"} component={Caisse} />
        <Route path={"/AddConfermatrice"} component={AddConfermatrice} />
        <Route path={"/ManageConfermatrice"} component={ManageConfermatrice} />
        <Route path={"/EditConfermatrice/"} component={EditConfermatrice} />Promotion
        <Route path={"/AddPromotion"} component={Promotion} />
        <Route path={"/ManagePromotion"} component={ManagePromotions} />
        <Route path={"/EditPromo/"} component={EditPromo} />
        <Route path={"/EditUser/"} component={EditUser} />
        <Route path={"/ViewOrder/"} component={ViewOrder} />
                
        
        </Switch>
        </Router>
        
      </Fragment>
    
  );
}

export default App;
