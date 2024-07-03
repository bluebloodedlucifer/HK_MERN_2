const { Router } = require("express");
const { createTodo, updateTodo } = require("../utils/types.js");
const { Todos } = require("../database/db.js");

const router = Router()


router.post("/todo", async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if(!parsedPayload.success){
        return res.status(411).json({
            msg: "Input format is incorrect"
        })
    }else{
        // put new todo in mongodb
        try {
            const {title, description} = createPayload;
            const newTodo = await Todos.create({
                title,
                description,
                completed: false
            })
            return res.status(201).json({
                msg: "todo created successfully",
                newTodo
            })
        } catch (error) {
            return res.status(500).json({
                msg: "failed to create new todo at the moment",
                error
            })
        }
    }
})

router.get('/todos', async (req, res) => {
    try {
        const allTodos = await Todos.find({})
        
        return res.json({
            allTodos
        })
    } catch (error) {
        return res.status(500).json({
            msg: "failed to retrive Todos at the moment",
            error
        })
    }
})


router.patch("/completed", async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = updateTodo.safeParse(createPayload);

    if(!parsedPayload.success){
        return res.status(411).json({
            msg: "Input format is incorrect"
        })
    }else{
        // search and update in mongodb by _id
        try {
            const {_id } = createPayload;
            const updatedTodo = await Todos.findByIdAndUpdate(
                _id ,
                { completed: true },
                // { new: false}
            )
            if(updatedTodo){
                return res.json({
                    msg: "todo marked as completed"
                })
            }else{
                return res.status(404).json({
                    msg: "unable to find the todo with the given _id",
                })
            }

        } catch (error) {
            return res.status(500).json({
                msg: "unable to update the todo status at the moment",
                error
            })
        }
    }
})



module.exports = router;