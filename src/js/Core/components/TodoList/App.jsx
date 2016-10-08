import AddTodo from 'Core/containers/AddTodo'
import Footer from './Footer'
import React from 'react'
import VisibleTodoList from 'Core/containers/VisibleTodoList'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App
