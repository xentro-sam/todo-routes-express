const express = require('express');
const app = express();
const Todo = require('./controllers');
const bodyParser = require('body-parser');
const PORT = 3000;

app.use(bodyParser.json());

app.route('/tasks')
  .get(async (req, res) => {
    const tasks = await Todo.getTasks();
    res.status(200);
    res.json(tasks);
  })
  .post(async (req, res) => {
    let taskData = req.body;
    try {
      let task = await Todo.createTask(taskData);
      res.status(201);
      res.json(task);
    }
    catch {
      res.status(400);
      res.json({message: 'Input is not in JSON'});
    }
  });

app.route('/tasks/:id')
  .get(async (req, res) => {
    try {
      const {id} = req.params;
      const task = await Todo.getTask(id);
      res.status(200);
      res.json(task);
    }
    catch(error) {
      res.status(404);
      res.json({message: error});
    }
  })
  .patch(async (req, res) => {
    try {
      const {id} = req.params;
      const task = await Todo.completeTask(id);
      res.status(200);
      res.json(task);
    }
    catch(error) {
      res.status(404);
      res.json({message: error});
    }
  })
  .put(async (req, res) => {
    try {
      let taskData = req.body;
      const {id} = req.params;
      let updatedTask = await Todo.updateTask(id, taskData);
      res.status(200);
      res.json(updatedTask);
    }
    catch(error) {
      res.status(404);
      res.json({message: error});
    }
  })
  .delete(async (req, res) => {
    try {
      const {id} = req.params;
      let status = await Todo.deleteTask(id);
      res.status(200);
      res.json({message: status});
    }
    catch(error) {
      res.status(404);
      res.json({message: error});
    }
  });

app.all('*',(req,res) => {
  res.status(400);
  res.json({message: 'Bad Request'});
});

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});