export const TodoItemEditing = () => {
  return (
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
  );
};
