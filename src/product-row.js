import React, { Component } from 'react'

import InputComp from './input-comp'

class ProductRow extends Component {
    constructor(props) {
      super(props);
      this.state={ }
    }
    
    // In this method:
    // selectedProduct: clicked product
    // id: id of the clicked product in the products array.

    onProductSelect = (selectedProduct, id) => {
        if(selectedProduct!==""){
            this.props.onProductSelect(selectedProduct, this.props.index, id);
        }
        return
    }

    onChangeQuantity = (e) => {
        const quant = e.target.value;
       // this.props.onQuantity(quant, this.props.index);
        this.props.onQuantity(quant, this.props.index);
      }

    removeProduct = () => {
        console.log("p-row/removing: "+this.props.index);
        this.props.onRemoveProduct(this.props.index);
    }

    render(){
        const { name, price, quantity, total, products  } = this.props;

        return (   
            <div className="grid-container">        
                
                <InputComp className= "grid-item" 
                    placeholder = {"Product Name"}
                    onSelect = {this.onProductSelect}
                    items = {products}
                    selectedItem = {name} />
                
                <input className= "grid-item" 
                    type="number" 
                    value={quantity} 
                    onChange = {this.onChangeQuantity}/>

                <div className= "grid-item-qt">{price}</div>

                <div className= "grid-item-qt">{total}</div>

                <button className= "remove-button" onClick={this.removeProduct}> Remove product </button>

            </div>
        );
    }
}

export default ProductRow;