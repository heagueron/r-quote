import React, { Component } from 'react'

function ListItem(props) {
    // Correct! There is no need to specify the key here:
    return <li onClick={() => handleClick(props.value)}>{props.value}</li>;
  }

  function handleClick(number) {
    //e.preventDefault();
    console.log('The link was clicked on: '+number);
  }

class NumberList extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

    const numbers = this.props.numbers;
    //console.log("numbers en numbers);
    const listItems = numbers.map((number) =>
      // Correct! Key should be specified inside the array.
      <ListItem key={number.toString()}
                value={number} />
    );

    return (
      <ul>
        {listItems}
      </ul>
    );
  }
}
export default NumberList;
  