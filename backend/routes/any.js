const { Router } = require("express");
const { createTodo, updateTodo } = require("../utils/types.js");
const { Todos} = require("../database/db.js");
const mongoose = require("mongoose");


const router = Router();

// Create a new todo
router.post("/todo", async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        return res.status(400).json({
            msg: "Input format is incorrect"
        });
    } else {
        try {
            const { title, description } = createPayload;
            const newTodo = await Todos.create({
                title,
                description,
                completed: false
            });
            return res.status(201).json({
                msg: "Todo created successfully",
                newTodo
            });
        } catch (error) {
            return res.status(500).json({
                msg: "Failed to create new todo at the moment",
                error: error.message
            });
        }
    }
});

// Get all todos
router.get('/todos', async (req, res) => {
    try {
        const allTodos = await Todos.find({});
        return res.json({
            allTodos
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Failed to retrieve todos at the moment",
            error: error.message
        });
    }
});

// Toggle the status for todo
router.patch("/todo/:id", async (req, res) => {
    const { id } = req.params;

    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            msg: "id format is invalid"
        });
    }

    try {
        const todo = await Todos.findById(id);

        if (!todo) {
            return res.status(404).json({
                msg: "Todo not found"
            });
        }

        // Toggle the completed status
        todo.completed = !todo.completed;
        await todo.save();

        return res.json({
            msg: `Todo status toggled successfully`,
            updatedTodo: todo
        });
    } catch (error) {

        return res.status(500).json({
            msg: "Failed to toggle todo status",
            error: error.message
        });
    }
});



// Edit a todo
router.put("/todo/:id", async (req, res) => {
    const { id } = req.params;
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);

    if (!parsedPayload.success) {
        return res.status(400).json({
            msg: "Input format is incorrect"
        });
    } else {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "id format is invalid"
            });
        }

        try {
            const updatedTodo = await Todos.findByIdAndUpdate(
                id,
                updatePayload,
                { new: true }
            );
            if (updatedTodo) {
                return res.json({
                    msg: "Todo updated successfully",
                    updatedTodo
                });
            } else {
                return res.status(404).json({
                    msg: "Todo not found",
                });
            }
        } catch (error) {
            return res.status(500).json({
                msg: "Unable to update the todo at the moment",
                error: error.message
            });
        }
    }
});

// Delete a todo
router.delete("/todo/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            msg: "id format is invalid"
        });
    }

    try {
        const deletedTodo = await Todos.findByIdAndDelete(id);
        if (deletedTodo) {
            return res.json({
                msg: "Todo deleted successfully",
                deletedTodo
            });
        } else {
            return res.status(404).json({
                msg: "Todo not found",
            });
        }
    } catch (error) {
        return res.status(500).json({
            msg: "Unable to delete the todo at the moment",
            error: error.message
        });
    }
});

module.exports = router;
