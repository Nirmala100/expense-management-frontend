import React from "react";
import './EachCategory.css';

export default class NewCategory extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="collection-container" style={{cursor: "pointer"}} onClick={this.props.onNewClicked}>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <i className="material-icons">add</i>
          <div className="text">Add new category</div>
        </div>
      </div>
    );
  }
}