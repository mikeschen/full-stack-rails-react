import React, { Component } from 'react';
import glamorous from 'glamorous';
import { CSSTransition } from 'react-transition-group';

const duration = 300;

const Box = glamorous.div({
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  border: '5px solid rgba(0, 0, 0, 0.03)',
  borderRadius: '2px',
  fontSize: '14px',
  backgroundColor: 'var(--yellow)',
  ':hover': {
    opacity: 0.7,
    transform: 'translateY(-1px)',
    boxShadow: '0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08)'
},
':focus': { outline: 0 },
':active': {
    transform: 'translateY(1px)'
}
});

class Item extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.clicked(this.props.item.id);
  }

  render() {
    const { ...props } = this.props;
    return (
        <Box className="item" key={this.props.item.id}>{this.props.item.title}
          <span className="deleteButton" onClick={this.handleDelete}>x</span>
        </Box>
    );
  }
}

export default Item;