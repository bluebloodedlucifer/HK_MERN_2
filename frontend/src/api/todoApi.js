
const PORT = 3001;
const API_BASE_URL = `http://localhost:${PORT}/any`; 

export const getAllTodos = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/todos`);
        if (!response.ok) {
            throw new Error('Failed to fetch todos');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
};

export const createTodo = async (todoData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/todo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todoData)
        });
        if (!response.ok) {
            throw new Error('Failed to create todo');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating todo:', error);
        throw error;
    }
};

export const updateTodo = async (todoId, todoData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/todo/${todoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todoData)
        });
        if (!response.ok) {
            throw new Error('Failed to update todo');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error updating todo with ID ${todoId}:`, error);
        throw error;
    }
};
export const updateTodoStatus = async (todoId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/todo/${todoId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Failed to update todo status');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error updating todo with ID ${todoId}:`, error);
        throw error;
    }
};

export const deleteTodo = async (todoId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/todo/${todoId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete todo');
        }
        return true;
    } catch (error) {
        console.error(`Error deleting todo with ID ${todoId}:`, error);
        throw error;
    }
};
