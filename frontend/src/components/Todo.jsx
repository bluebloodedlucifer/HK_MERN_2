export const Todo = ({title, description, completed}) => {
  return (
    <div>   
        <h1>{title}</h1>
        <h2>{description}</h2>
        <button>{completed ? "Completed" : "Mark as Complete"}</button>
    </div>
  )
}