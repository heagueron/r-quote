import React, { Component } from 'react'

function ListItem(props) {

    return <li onClick={() => handleClick(props)}>{props.value}</li>;
  }

  function handleClick(props) {
    //e.preventDefault();
    props.liftSelected1(props.value, props.id);
  }

class ItemList extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleSelected = (value, index) =>{
        //console.log('Received at ItemList Comp: '+selected);
        this.props.liftSelected2(value, index);
    }

    render() {

    const items = this.props.items;
    //console.log("numbers en numbers);
    const listItems = items.map((item, index) =>

      <ListItem key={item.id.toString()}
                value={item.name}
                id={item.id}            
                liftSelected1={this.handleSelected}/>
    );

    return (
      <ul>
        {listItems}
      </ul>
    );
  }
}
export default ItemList;