import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import styled, {css} from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as listActions from './actions/listActions';

import './App.css';
import List from './List';

const Button = styled.button`
border-radius: 3px;
padding: 0.25em 1em;
margin: 0 1em;
background: transparent;
color: palevioletred;
border: 2px solid palevioletred;

${props => props.primary && css`
background: palevioletred;
color: white;
`}
`;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lists: [],
      term: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.listActions.fetchList();
  }

  handleChange(event) {
    this.setState({ term: event.target.value })
  }

  handleSubmit(event) {
    console.log("event", event)
    event.preventDefault();
    this.setState({
      term: '',
      // items: [...this.state.items, this.state.term] 
    })
    axios.post('http://localhost:3000/todos',
    {
      title: this.state.term,
      created_by: 1
    }
  )
  .then(response => {
    console.log(response)
    const lists = update(this.state.lists, {
        $push: [response.data]
      })
      this.setState({lists: lists})
  })
  .catch(error => console.log(error))
  }

  // componentWillUpdate() {
  //   console.log("staet", this.state.term);
  //   axios.get('http://localhost:3000/todos', {crossdomain: true}) 
  //   .then(response => {
  //     console.log(response)
  //     this.setState({lists: response.data})
  //   })
  // }

  // {this.state.lists.map((list) => {
  //   return (<List list={list} key={list.id} />)
  // })}
  renderData(item) {
    return <div className="tile" key={item.id}>{item.title}</div>;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <input value = {this.state.term} onChange={this.handleChange} />
        <Button primary>Submit</Button>
        </form>
        {
          this.props.list.map((item, index) => {
            return(
              this.renderData(item)
          )
        })
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.list
};
}

function mapDispatchToProps(dispatch) {
  return {
    listActions: bindActionCreators(listActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
