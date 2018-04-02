import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import List from './List';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      lists: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/todos', {crossdomain: true}) 
      .then(response => {
        console.log(response)
        this.setState({lists: response.data})
      })
  }

  // componentWillUpdate() {
  //   console.log("staet", this.state.term);
  //   axios.get('http://localhost:3000/todos', {crossdomain: true}) 
  //   .then(response => {
  //     console.log(response)
  //     this.setState({lists: response.data})
  //   })
  // }

  onChange = (event) => {
    this.setState({ term: event.target.value })
  }

  onSubmit = (event) => {
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
  })
  .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input value = {this.state.term} onChange={this.onChange} />
          <button>submit</button>
        </form>
       {this.state.lists.map((list) => {
         return (<List list={list} key={list.id} />)
       })}
      </div>
    );
  }
}

export default App;
