import { Todo } from "./Todo.jsx"

export const Todos = ({todos}) => {
  return (
    <div>
        {todos.map(e => <Todo key={e._id} title = {e.title} description = {e.description} completed = {e.completed}/>)}
    </div>
  )
}   