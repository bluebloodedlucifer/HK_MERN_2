import { useState } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';

const Home = () => {
    const [todos, setTodos] = useState([]);
    return (
        <div>
            <h1>Todo App</h1>
            <TodoForm todos = {todos} setTodos = {setTodos}/>
            <TodoList todos = {todos} setTodos = {setTodos}/>
        </div>
    );
};

export default Home;
