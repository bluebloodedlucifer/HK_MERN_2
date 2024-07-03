// basic express boilerplate code
// with express.json() middleware

const express = require('express');
const anyRouter = require('./routes/any.js')
const app = express();
const cors = require('cors');

app.use(cors())

app.use(express.json());
app.use("/any", anyRouter)

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})