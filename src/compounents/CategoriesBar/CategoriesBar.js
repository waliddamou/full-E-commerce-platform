import React, { Component } from "react";
import "./style.css";
import { Element } from "react-scroll";
import { Link as Lo } from "react-scroll"
import { Link } from 'react-router-dom'
import { Card, Typography } from 'antd';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../Shop/style.css"
import { ShoppingCartOutlined } from '@ant-design/icons';
const { Text } = Typography;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

class HorizontalScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Categories: [],
      CategoriesProducts: []
    }
    this.scrollToCategory = this.scrollToCategory.bind(this)
  }
  componentDidMount() {

    fetch('http://151.80.56.201:5000/Dashboard/ManageCategories2')
      .then((Response) => Response.json())
      .then((findresponse) => {
        this.setState({
          Categories: findresponse.Categories
        })
      })
    this.state.Categories.forEach(category => {
      this[category.id] = React.createRef();
    });
    fetch('http://151.80.56.201:5000/Dashboard/HomePageProducts')
      .then((Response) => Response.json())
      .then((findresponse) => {
        this.setState({
          CategoriesProducts: findresponse.HomePageProductsList
        })
      })


  }
  scrollToCategory = id => {
    this[id].current.scrollIntoView({ inline: "center" });
  };

  render() {
    return (
      <>

        <div className="center">
          <ul
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "row",
              overflowY: "hidden",
              whiteSpace: "nowrap",
              listStyleType: "none",
              paddingLeft: "20px",
              backgroundColor: "white",
              flexWrap: "nowrap",
              height: "150px",
              textAlign: "left"

            }}

          >
            {this.state.Categories.map(category => (
              <li
                key={category.id}
                style={{
                  display: "inline-block",
                  margin: "0px auto 0px auto",

                }}
                ref={this[category.id]}
              >
                <Lo
                  activeClass="activeCategoryLink"
                  className={category.id}
                  to={category.id.toString()}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-50}
                >

                  <Card
                    hoverable
                    style={{ textAlign: "center", width: 80, height: 80, backgroundColor: `${category.Color}`, borderRadius: "10px" }}
                    cover={<img src={`http://151.80.56.201:5000/static/products/${category.Icon}`} alt="" />}
                  >

                  </Card>
                  <p style={{ textAlign: "center", color: "#454343" }}>{category.Name}</p>
                </Lo>
              </li>
            ))}
          </ul>
        </div>

        <section className="center">
          <div className="center">
            {this.state.Categories.map(category => (
              <Element
                name={category.id.toString()}
                className={category.id}
                key={"display" + category.id}
                style={{ height: "430px", zIndex: "1", position: "relative" }}
              >
                <div style={{ height: "50vh", textAlign: "center" }} >
                  <h3 style={{ color: "#ad3216" }}>{category.Name}</h3>
                  <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots={true}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    autoPlay={this.props.deviceType !== "mobile" ? true : false}
                    autoPlaySpeed={5000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    deviceType={this.props.deviceType}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"

                  >
                    {this.state.CategoriesProducts.map(data => (
                      data.Category === category.id ?
                        data.Pourcentage !== 0 ? 
                          <div className="col center" style={{ textAlign: "center", display: "inline-table" }} >
                            <div className="card">
                              <div className="card-image">
                                <div className="container1" style={{ textAlign: "center" }}>
                                  <Link to={`/BuyProduct/${data.id}`}>
                                    <img src={`http://151.80.56.201:5000/static/products/${data.Photo}`} alt="Productimage" style={{ height: "250px", width: "250px", marginLeft: "auto", marginRight: "auto", marginTop: "10px" }} />
                                  </Link>
                                  <div class="ribbon ribbon-top-left"><span>-{data.Pourcentage}%</span></div>
                                </div>
                                <div className="card-content center">
                                  <Text className="align-center" style={{ color: "#ad3216", justifyContent: 'center' }} ><b>Prix: </b>&nbsp; </Text>
                                  <Text className="align-center" style={{ color: "#ad3216", justifyContent: 'center', textDecoration: "line-through" }} ><b>{data.SellPrice}</b></Text>&nbsp;  <Text><b>{data.Promo} DA</b></Text>
                                  <br />
                                  <Link type="button" to={`BuyProduct/${data.id}`} className="btn halfway-fab waves effect waves-light darken center" value={data.id} id={data.id} style={{ backgroundColor: "#ad3216" }}><ShoppingCartOutlined />Acheter</Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          : (
                            <div className="col center" style={{ textAlign: "center", display: "inline-table" }} >
                              <div className="card">
                                <div className="card-image">
                                  <div className="container1" style={{ textAlign: "center" }}>
                                    <Link to={`/BuyProduct/${data.id}`}>
                                      <img src={`http://151.80.56.201:5000/static/products/${data.Photo}`} alt="Productimage" style={{ height: "250px", width: "250px", marginLeft: "auto", marginRight: "auto", marginTop: "10px" }} />
                                    </Link>

                                  </div>
                                  <div className="card-content center">
                                    <Text style={{ display: 'flex', color: "#ad3216", justifyContent: 'center' }}><b>{data.Name}</b></Text>
                                    <Text className="align-center" style={{ display: 'flex', color: "#ad3216", justifyContent: 'center' }} ><b>Prix: {data.SellPrice}</b> </Text>
                                    <Link type="button" to={`BuyProduct/${data.id}`} className="btn halfway-fab waves effect waves-light darken center" value={data.id} id={data.id} style={{ backgroundColor: "#ad3216", width: "100%" }}><ShoppingCartOutlined />Acheter</Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        : null
                    ))}

                  </Carousel>
                </div>
              </Element>
            ))}
          </div>
        </section>
      </>
    );
  }
}
export default HorizontalScroll