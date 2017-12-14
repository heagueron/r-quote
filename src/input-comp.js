import React, { Component } from 'react'

import { Subject }           from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

import ItemList from './item-list';

class InputComp extends Component {

  constructor(props) {
      super(props);
      this.state = {
        search: '',
        debounced: '',
        itemSelected: false,
        filteredItems: [],
      };
      this.onSearch$ = new Subject(); //Observable from the input field.
      this.onSearch = this.onSearch.bind(this);
    }

    componentDidMount(){
      this.subscription = this.onSearch$
        .debounceTime(300)
        .subscribe(debounced => {
          this.setState({ debounced });
          if(debounced!==""){           
            this.filterItems(debounced);
            } 
          }
        );
    }

    filterItems = (debounced) =>{
      let filtered = this.props.items.filter((item) => {return item.name.includes(debounced);});
      this.setState({ filteredItems: filtered });
    }

    handleChoice = (selectedOption, id) => {
      this.setState({ itemSelected: true });
      this.setState({ debounced: '' }); //Hides the filtered list.
      this.props.onSelect(selectedOption, id); // Lift state up, so parent can pass down the value.
    }
    
    componentWillUnmount() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
    
    onSearch(e) {
      const search = e.target.value;
      this.setState({ search });
      this.setState({ itemSelected: false });
      this.props.onSelect(""); //Ensures clearing clientName state when re-editing already selected name.  
      this.onSearch$.next(search);
    }

    render() {
      var showedValue;
      const { search, debounced, filteredItems, itemSelected} = this.state;
      const { placeholder, selectedItem } = this.props
      
      if(itemSelected) {
        showedValue = selectedItem; //Selected option from parent (lift state up)
      } else{
        showedValue = search;
      }

      return (
        <div>         
          <input type="text" placeholder = {placeholder} 
                value={showedValue} onChange={this.onSearch}
                className="input-field"/>   
          {debounced.length > 0 &&
            <ItemList items ={filteredItems} liftSelected2={this.handleChoice}/>
          } 
        </div>
      );
    }
  }

  export default InputComp;