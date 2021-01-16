import React from 'react'
import "./Search.css";
import "../../../node_modules/materialize-css/dist/css/materialize.min.css";
const Search = () => {
    
        return (
            <section id="search" className="section section-search purple  white-text center scrollspy">
                <div className="container">
                     <div className="row">
                         <div className="col s12">
                            <div className="input-field">
                                <input className="white grey-text autocomplete" placeholder="Recherche..." type="text" id="autocomplete-input" />
                            </div>
                         </div>
                     </div>
                </div>
            </section>
        )
    
}

export default Search;