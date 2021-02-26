import React from "react";
import { Input, Button, Modal, Spin, message } from "antd";

import { getProducts } from "../../services/products";
import { openModal } from "../../utils/modal";

import "./Home.less";

/**
 * 
brand_name: null
brand_type: ""
color: ""
description: null
discounted_price: "0"
favorite: false
featured: true
group_description: null
group_quantity: null
height: null
id: 2961
images: Array(1)
0:
file_name: "1.jpeg"
file_size: 105946
file_type: "image/jpeg"
id: 3345
large: "https://s3-eu-central-1.amazonaws.com/markitworld-prod-01/0db3f1f2f8a0ec73fe723a9693412d3d/large.jpeg?1520013508"
original: "https://s3-eu-central-1.amazonaws.com/markitworld-prod-01/0db3f1f2f8a0ec73fe723a9693412d3d/original.jpeg?1520013508"
thumbnail: "https://s3-eu-central-1.amazonaws.com/markitworld-prod-01/0db3f1f2f8a0ec73fe723a9693412d3d/thumb.jpeg?1520013508"
__proto__: Object
length: 1
__proto__: Array(0)
klass: "Labneh"
price: "11500"
requires_freezing: true
requires_refrigeration: true
serving_size: "500"
serving_unit: "g"
sort_order: 12595
status: "available"
title: "Taanayel Labneh"
weight: null
width: null
 * 
 */

const ImageModalComponent = ({ imageUrl, close, ...props }) => {
  return (
    <Modal {...props} onCancel={close} footer={null} closable={false}>
      <img src={imageUrl} className="image-modal__image" />
    </Modal>
  );
};

class Home extends React.Component {
  state = {
    products: [],
    isLoading: false,
    searchValue: "",
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const {
        data: {
          data: { products },
        },
      } = await getProducts();
      this.setState({ products });
    } catch (error) {
      message.error(error.message);
    }
    this.setState({ isLoading: false });
  }

  handleCardClick(imageUrl) {
    openModal(ImageModalComponent, { imageUrl });
  }

  handleSearchClick = async () => {
    const { searchValue } = this.state;
    this.setState({ isLoading: true });
    try {
      const {
        data: {
          data: { products },
        },
      } = await getProducts({ ...(searchValue && { keyword: searchValue }) });
      this.setState({ products });
    } catch (error) {
      message.error(error.message);
    }
    this.setState({ isLoading: false });
  };

  handleSearchChange = ({ target: { value } }) => {
    this.setState({ searchValue: value });
  };

  render() {
    const { products, isLoading, searchValue } = this.state;

    return (
      <div className="products">
        <Spin spinning={isLoading}>
          <div className="products__search">
            <span>Search:</span>
            <Input value={searchValue} onChange={this.handleSearchChange} />
            <Button type="primary" onClick={this.handleSearchClick}>
              Search
            </Button>
          </div>
          <div className="products__grid">
            {products.map((product) => {
              return (
                <div
                  key={product.id}
                  className="products__grid__card"
                  onClick={() => {
                    if (product.images.length && product.images[0].thumbnail) {
                      this.handleCardClick(product.images[0].large);
                    }
                  }}
                >
                  {product.images.length && product.images[0].thumbnail && (
                    <img src={product.images[0].thumbnail} />
                  )}
                  <h3>{product.title}</h3>
                  <p className="products__grid__card__description">
                    {product.description}
                  </p>
                  <p>${product.price}</p>
                </div>
              );
            })}
          </div>
        </Spin>
      </div>
    );
  }
}

export default Home;
