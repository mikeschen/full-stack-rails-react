import React, { Component } from 'react';

class Item extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.clicked(this.props.item.id);
  }

  render() {
    return (
      <div className="item" key={this.props.item.id}>{this.props.item.title}
        <span className="deleteButton" onClick={this.handleDelete}>x</span>
      </div>
    );
  }
}

export default Item;