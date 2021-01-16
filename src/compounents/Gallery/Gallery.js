import React, { Component } from 'react'
import '../../../node_modules/materialize-css/dist/css/materialize.min.css';
import img1 from '../../images/1.jpg';
import img2 from '../../images/2.jpg';
import img3 from '../../images/3.jpg';
import img4 from '../../images/4.jpg';
import img5 from '../../images/5.jpg';
import img6 from '../../images/6.jpg';
import img8 from '../../images/8.jpg';
const Photo = ({img,alt}) =>{
    return(
        <div className="col s9  m4 center marg scrollspy">
            <img className="materialboxed responsive-img center" src={img} alt={alt} style={{width:'200px',height:'200px'}}/>
        </div>
    );
}

class PhotoGallery extends Component{
    state = {
        photo:[
            {
                id:1,
                img:img1,
                alt:"alt"
            },
            {
                id:2,
                img:img2,
                alt:"alt1"
            },
            {
                id:3,
                img:img3,
                alt:"alt2"
            },
            {
                id:4,
                img:img4,
                alt:"alt3"
            },
            {
                id:5,
                img:img5,
                alt:"alt4"
            },
            {
                id:6,
                img:img6,
                alt:"alt5"
            },
            
            {
                id:8,
                img:img8,
                alt:"alt7"
            },
            

        ]
    }
    render(){
        return (
            <div className="row center">
                {this.state.photo.map(gal =>(
                    <Photo key={gal.id}
                    img={gal.img} alt={gal.alt} />
                ) 
                )}
            </div>
        );
    }




}


export default class Gallery extends Component {
    render() {
        return (
            <section id="gallery" className="section section-gallery center scrollspy">
                <div className="container">
                    <div className="row">
                    <h4 className="center">
                        <span className="purple-text text-darken-1">Gal</span>lery
                    </h4>
                    <PhotoGallery />
                    </div>
                </div>
            </section>
        )
    }
}
