// src/components/TodoItem.js

import React, { useState, useRef } from 'react';
import { updateTodo, deleteTodo, updateTodoStatus } from '../api/todoApi';

const TodoItem = ({ todo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTodo, setEditedTodo] = useState({ ...todo });

    const titleInputRef = useRef(null);
    const descriptionInputRef = useRef(null);

    const handleToggleComplete = async () => {
        try {
            const updatedTodo = await updateTodoStatus(todo._id);
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

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedTodo({ ...todo }); // Initialize editedTodo with current todo data
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedTodo({ ...todo }); // Reset editedTodo to original todo
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTodo({
            ...editedTodo,
            [name]: value
        });
    };

    const handleEditTodo = async () => {
        try {
            const updatedTodo = await updateTodo(todo._id, editedTodo);
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
                            value={editedTodo.title}
                            onChange={handleInputChange}
                            ref={titleInputRef}
                            className="mr-2"
                        />
                        <input
                            type="text"
                            name="description"
                            value={editedTodo.description}
                            onChange={handleInputChange}
                            ref={descriptionInputRef}
                        />
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
