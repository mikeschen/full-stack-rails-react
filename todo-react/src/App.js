import React, { Component } from 'react';
import styled, {css} from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as listActions from './actions/listActions';
import './App.css';

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
    event.preventDefault();
    this.setState({
      term: '',
    })
    this.props.listActions.postTodo(this.state.term)
  }

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
