import React, { Component } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import CategorySingle from "./CategorySingle";
import CategoryApi from '../../../../client-code/categories';

class Categories extends Component {
  //create state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  //use lifecycle method
  componentDidMount() {
    new CategoryApi().getCategories().then(data => {
      this.setState({
        categories: data
      })
    })
  }

  renderItems() {
    return this.state.categories.map((item) => (
      <NavLink
        style={({ isActive }) => ({
          color: isActive ? "red" : "blue",
        })}
        to={item.name}
        key={item.id}>
        <CategorySingle key={item.id} item={item} />
      </NavLink>
    ));
  }

  render() {
    return (
      <div className="container">
        {this.renderItems()}
        <Outlet />
      </div>
    );
  }
}

export default Categories;
