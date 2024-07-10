import { useRef } from 'react';
import { createTodo, updateTodo } from '../api/todoApi';

const TodoForm = ({todos, setTodos}) => {

    const titleRef = useRef('')
    const descriptionRef = useRef('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const title = titleRef.current.value;
            const description = descriptionRef.current.value

            const { newTodo } = await createTodo({ title, description });
            console.log(newTodo)
            console.log('Todo created successfully:', newTodo);

            setTodos([...todos, newTodo])
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                ref={titleRef}
                required
            />
            <input
                type="text"
                placeholder="Description"
                ref={descriptionRef}
            />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default TodoForm;
