import React, { Component } from 'react'

import InputComp from './input-comp'
import ProdRow from './data-models'
import ProductRow from './product-row'

class Quote extends Component {

  constructor(props) {
      super(props);
      this.state = {
          clientName: '',
          xName: "Pepe",
          quotedProducts: [],
          listProducts: "",
          grandTotal: 0,
          conditions:"This offer is valid for 30 days."
      };
      this.clients = [{ id: 1, name: "Rui López"}, { id: 2, name: "Mijail Tahl"}, { id: 3, name: "Abastos El Chueco"},
        { id: 4, name: "Muebles El Sentado"}, { id: 5, name: "Farmacia Tekuro"}, { id: 6, name: "Walmart"},
        { id: 7, name: "Amazon"}, { id: 8, name: "Nasdaq"}, { id: 9, name: "Makro"}];

      this.products = [{ id: 1, name: "Papas fritas", price: 100}, { id: 2, name: "Ají dulce", price: 200}, 
        { id: 3, name: "Aguacate", price: 300}, { id: 4, name: "Chimo perijanero", price: 400}, 
        { id: 5, name: "Fresas en almibar", price: 500}, { id: 6, name: "Carne de parrilla", price: 600},
        { id: 7, name: "Azúcar", price: 800}, { id: 8, name: "Nitrógeno líquido", price: 900}, { id: 9, name: "Mango", price: 100}];
    
        //this.addItem = this.addItem.bind(this);

    }

    componentDidMount(){
    }

    onClientSelect = (selection, id) => {
        this.setState({ clientName: selection});
    }

    onProductSelect = (selectedProduct, indexLP, id) => {
      const arrayVar = this.state.quotedProducts;
      arrayVar[indexLP].name = selectedProduct;
      
      const ind = this.products.findIndex((product) => {return product.id === id;});
      if(ind !== -1){
        arrayVar[indexLP].price = this.products[ind].price;
      } else {
        alert("Sorry, I could not find this product price.");
        return;
      }
      
      this.setState({ quotedProducts: arrayVar });
      this.updateProductList();
    }

    onQuantity = (quantity, index) => {
      const arrayVar = this.state.quotedProducts;
      arrayVar[index].quantity = quantity;
      arrayVar[index].total = arrayVar[index].quantity * arrayVar[index].price;
      this.setState({ quotedProducts: arrayVar });
      this.updateProductList();
      this.updateGrandTotal(); 
    }

    updateGrandTotal = () =>{
      let gT = 0;
      this.state.quotedProducts.forEach((item) => {return gT += item.total;});
      this.setState({ grandTotal: gT });  
    }

    onRemove = (index) => {
      console.log("quote/removing: "+index);
      const arrayVar = this.state.quotedProducts;
      arrayVar.splice(index,1);
      this.setState({ quotedProducts: arrayVar });
      this.updateProductList();
      this.updateGrandTotal();
    }

    updateProductList = () => {
      const qP = this.state.quotedProducts;

      const lP = qP.map((item, index) =>
        <ProductRow key={item.id} name={item.name} price={item.price} index={index}
                quantity={item.quantity} total={item.total} onProductSelect={this.onProductSelect}
                products={this.products} onQuantity={this.onQuantity} onRemoveProduct={this.onRemove}/>
        );
      this.setState({listProducts:lP});
    }

    addItem = () => {
      const nRow = new ProdRow();
      const arrayVar = this.state.quotedProducts;
      arrayVar.push(nRow);
      this.setState({ quotedProducts: arrayVar });
      this.updateProductList();
    }

    onConditions = (e) =>{
      const cond = e.target.value;
      this.setState({ conditions: cond });
    }

    onSubmit = () => {
      if(this.state.clientName ===""){
        alert('Please enter the client name');
        return;
      }  
      if(this.state.grandTotal===0){
        alert('Please select the products and quantities')
        return;
      } else {
        alert("Submitted data for client: "+this.state.clientName);
      } 
    }

    componentWillUnmount() {
    }

    render() {
      const { clientName, listProducts, grandTotal, conditions } = this.state;

      return (
        <div>
          <div className="quote-section">
            <InputComp placeholder={"Client Name"} onSelect={this.onClientSelect} 
              items = {this.clients}
              selectedItem = {clientName}
            />
          </div> 

          <div className="quote-section" >
            <div className="grid-container">
              <div className="grid-item-prod">Product</div>
              <div className="grid-item-header">Quantity</div>
              <div className="grid-item-header">Price</div>  
              <div className="grid-item-header">Total</div>
            </div>
            {listProducts}
          </div>

          <div className="quote-section" >
            <div className="grid-container">
              <div className="item-grandT-label">Grand Total:</div>
              <div className="item-grandT">{grandTotal}</div>
            </div>
          </div>

          <div className="quote-section" >
            <button className="add-button" onClick={this.addItem}>
             Add product
            </button>
          </div>     

          <div className="quote-section" >
            <p className="conditions-label">Conditions</p>
            <textarea className= "conditions" onChange={this.onConditions}>{conditions}</textarea>
          </div>

          <div className="quote-section" >
            <button className="add-button" onClick={this.onSubmit}>
             Submit this form
            </button>
          </div>
        </div>
      );
    }C
  } 

  export default Quote;