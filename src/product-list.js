import React, { Component } from 'react'

import ProductRow from './product-row'

class ProductList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      };
  }

  handleSelected = (selected) =>{
    /*  console.log('Received at ItemList Comp: '+selected);
    this.props.liftSelected2(selected);*/
    }

  render() {

    console.log("prop name in plist: "+this.props.items);
    console.log("prop nombre in plist: "+this.props.nombre);
    const qP = this.props.items;

    const listProducts = qP.map((item, index) =>

      <ProductRow key={index}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                total={item.total}
                liftSelected1={this.handleSelected}/>
    );

    return (
      <ul>
        {listProducts}
      </ul>
    );
  }
}

export default ProductList;