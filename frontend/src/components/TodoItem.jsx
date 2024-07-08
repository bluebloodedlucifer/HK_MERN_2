import { updateTodo, deleteTodo } from '../api/todoApi';

const TodoItem = ({ todo }) => {
    const handleToggleComplete = async () => {
        try {
            const updatedTodo = await updateTodo(todo._id, { ...todo, completed: !todo.completed });
            console.log('Todo updated successfully:', updatedTodo);
        } catch (error) {
            console.error('Error toggling todo status:', error);
        }
    };

    const handleDeleteTodo = async () => {
        try {
            const deleted = await deleteTodo(todo._id);

            console.log('Todo deleted successfully:', deleted);
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <li>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleToggleComplete}
            />
            <span>{todo.title}</span>
            <button onClick={handleDeleteTodo}>Delete</button>
        </li>
    );
};

export default TodoItem;
