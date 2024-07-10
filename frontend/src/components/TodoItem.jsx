// src/components/TodoItem.js

import React, { useState, useRef } from 'react';
import { updateTodo, deleteTodo, updateTodoStatus } from '../api/todoApi';

const TodoItem = ({ todo, todos, setTodos}) => {
    const [isEditing, setIsEditing] = useState(false);

    const titleInputRef = useRef(null);
    const descriptionInputRef = useRef(null);

    const handleToggleComplete = async () => {
        try {
            const { updatedTodo } = await updateTodoStatus(todo._id);
            const completed = updatedTodo.completed
            setTodos(todos.map(e => {
                if(e._id === todo._id) return {...e, completed}
                else return e;
            }))
            console.log('Todo updated successfully:', updatedTodo);
        } catch (error) {
            console.error('Error toggling todo status:', error);
        }
    };

    const handleDeleteTodo = async () => {
        try {
            const { deletedTodo } = await deleteTodo(todo._id);
            setTodos(todos.filter(e => e._id !== todo._id))
            console.log('Todo deleted successfully:', deletedTodo);
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };


    const handleEditTodo = async () => {
        try {
            const editedTodo = {
                title: titleInputRef.current.value,
                description: descriptionInputRef.current.value
            }
            const { updatedTodo } = await updateTodo(todo._id, editedTodo);
            setTodos(todos.map(e => {
                if(e._id === todo._id) return {...updatedTodo}
                else return e;
            }))
            console.log('Todo updated successfully:', updatedTodo);

            setIsEditing(false); // Exit edit mode
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (
        <li className="todo-item">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleToggleComplete}
                    className="mr-2"
                />
                {isEditing ? (
                    <div className="edit-form">
                        <input
                            type="text"
                            name="title"
                            defaultValue={todo.title}
                            ref={titleInputRef}
                            className="mr-2"
                        />
                        <input
                            type="text"
                            name="description"
                            defaultValue={todo.description}
                            ref={descriptionInputRef}
                        />
                        <br />
                        <button onClick={handleEditTodo} className="edit-button">
                            Save
                        </button>
                        <button onClick={handleCancelEdit} className="cancel-button">
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div className={`todo-details ${todo.completed ? 'completed' : ''}`}>
                        <span style={{fontWeight: "bold"}}>{todo.title}</span>
                        <br />
                        <span>{todo.description}</span>
                        <br />
                        <button onClick={handleEditClick} className="edit-button">
                            Edit
                        </button>
                        <button onClick={handleDeleteTodo} className="delete-button">
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </li>
    );
};

export default TodoItem;
