import { useEffect, useState } from 'react';
import { getAllTodos } from '../api/todoApi';
import TodoItem from './TodoItem';

const TodoList = ({todos, setTodos}) => {
    // const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const { allTodos } = await getAllTodos();
                setTodos(allTodos);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();
    }, []);

    return (
        <div>
            <h2>Todo List</h2>
            <ul>
                {todos.map(todo => (
                    <TodoItem key={todo._id} todo={todo} todos = {todos} setTodos = {setTodos}/>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
