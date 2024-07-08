import { useEffect, useState } from 'react';
import { getAllTodos } from '../api/todoApi';
import TodoItem from './TodoItem';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

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
    }, [todos]);

    return (
        <div>
            <h2>Todo List</h2>
            <ul>
                {todos.map(todo => (
                    <TodoItem key={todo._id} todo={todo} />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
