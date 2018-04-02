import React from 'react'

const List = ({list}) =>
  <div className="tile" key={list.id}>
    <h4>{list.title}</h4>
  </div>

export default List