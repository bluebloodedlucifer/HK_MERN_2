import { useState } from 'react'
import './App.css'
import { CreateTodo } from './components/CreateTodo.jsx'
import { Todos } from './components/Todos.jsx'
import { allDummyTodos } from './utils/dummy-todos.js'

function App() {
// const todos = allDummyTodos.allTodos
  // console.log(allDummyTodos.allTodos)
  const [todos, setTodos] = useState([])

  fetch("http://localhost:3001/any/todos")
  .then(async (res) => {
    const jsonResponse = await res.json()
    setTodos(jsonResponse.allTodos)
  })

  return (
    <div>
      <CreateTodo />
      <Todos todos={todos} />
    </div>
  )
}

export default App
