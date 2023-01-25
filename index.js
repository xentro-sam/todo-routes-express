const express = require('express')
const app = express()
const Todo = require('./controllers')
const bodyParser = require('body-parser')
const PORT = 3000

app.use(bodyParser.json());

app.route('/tasks')
    .get(async (req, res) => {
        const tasks = await Todo.getTasks()
        res.status(200)
        res.json(tasks)
    })
    .post(async (req, res) => {
        let taskData = req.body
        try {
            let task = await Todo.createTask(taskData)
            res.status(201)
            res.json(task)
        }
        catch {
            res.status(400)
            res.json({message: 'Input is not in JSON'})
        }
    })

app.route('/tasks/:id')
    .get(async (req, res) => {
        try {
            const {id} = req.params
            const task = await Todo.getTask(id);
            res.status(200)
            res.json(task)
        }
        catch(error) {
            res.status(404)
            res.json({message: error})
        }
    })

app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
})