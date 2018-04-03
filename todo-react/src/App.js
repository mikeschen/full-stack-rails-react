import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper'

import './App.css';
import List from './List';

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
    axios.get('http://localhost:3000/todos', {crossdomain: true}) 
      .then(response => {
        console.log(response)
        this.setState({lists: response.data})
      })
  }

  handleChange(event) {
    this.setState({ term: event.target.value })
  }

  handleSubmit(event) {
    console.log("event", event)
    event.preventDefault();
    console.log("eventz", event);
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

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <input value = {this.state.term} onChange={this.handleChange} />
        <button>Submit</button>
        </form>
       {this.state.lists.map((list) => {
         return (<List list={list} key={list.id} />)
       })}
      </div>
    );
  }
}

export default App;
