/*  
	schema structure
	
    {
        title: string,
        description: string,
        completed: boolean
    }
*/

const mongoose = require('mongoose');

// we need to put in .env file in production
mongoose.connect("mongodb+srv://dhaijob:UVWwncyplJ9ThYSS@cluster0.hvlpmfr.mongodb.net/todo-app")

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const Todos = mongoose.model('todos', todoSchema)

module.exports = {
    Todos
}