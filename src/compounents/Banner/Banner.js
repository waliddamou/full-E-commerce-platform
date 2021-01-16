import React, { Component } from 'react'
import ImageGallery from 'react-image-gallery';
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css"


class Banner extends Component {
    constructor() {
        super()
        this.state = {
          slides:[]
        }

    }
    componentDidMount() {
      fetch("http://151.80.56.201:5000/Slider")
      .then((Response) => Response.json())
      .then((findrespounse)=>{
        let result=[]
        findrespounse.Slides.forEach(element => {
            result.push({"original":`http://151.80.56.201:5000/static/products/${element}`})
        });
        this.setState({
          slides:result
        })
      })
      }
    render(){
        return (
            <section className="" id="acueill">
                <ImageGallery items={this.state.slides} 
                fullscreen="active" 
                autoPlay="true" 
                showThumbnails={false}
                showPlayButton={false}
                showFullscreenButton={false}
                showBullets={false}
                showNav={false}
                />
            </section>
        );  
    
}
}
export default Banner;