import React from "react";
import './EachCategory.css';

export default class EachCategory extends React.Component {
    constructor(props) {
        super(props);
    }

    editClicked = () => {
        this.props.onEditClicked && this.props.onEditClicked(this.props.category);
    }

    deleteClicked = () => {
        this.props.onDeleteClicked && this.props.onDeleteClicked(this.props.category);
    }

    render() {
        const menu = [];
        if (this.props.category.userId) {
            menu.push(
                <a key="edit" onClick={this.editClicked}><i className="each-menu material-icons">edit</i></a>,
                <i key="delete" className="each-menu material-icons" onClick={this.deleteClicked}>delete_forever</i>
            );
        }

        return (
            <div className="collection-container">
            <div className="indentation" />
            <div className="icon"><i className="material-icons">{this.props.category.icon}</i></div>
            <div className="text">{this.props.category.name}</div>
            <div className="menu">
              {menu.map(menu => menu)}
            </div>
          </div>
        );
    }
}