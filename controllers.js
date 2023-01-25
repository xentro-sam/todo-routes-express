let taskList = require('./data');

class Controller {
  static getTasks = () => {
    return new Promise((resolve) => resolve(taskList));
  }
    
  static getTask = (id) => {
    return new Promise((resolve, reject) => {
      const task = taskList.find((todo) => todo.id === parseInt(id));
      if(task) {
        resolve(task);
      }
      reject(`Task with id ${id} was not found`);
    });
  }

  static createTask = (task) => {
    const newId = Math.floor(2 + Math.random() * 10);
    return new Promise((resolve) => {
      let newTask = {
        ...task,
        id: newId,
        isComplete: false
      };
      taskList.push(newTask);
      resolve(newTask);
    });
  }

  static deleteTask = (id) => {
    return new Promise((resolve, reject) => {
      const index = taskList.findIndex((task) => task.id === parseInt(id))
      if(index === -1) {
        reject(`Task with id ${id} was not found`);
      }
      taskList = [...taskList.slice(0, index), ...taskList.slice(index + 1)];
      resolve('Task deleted successfully');
    });
  }

  static completeTask = (id) => {
    return new Promise((resolve, reject) => {
      const index = taskList.findIndex((task) => task.id === parseInt(id))
      if(index === -1) {
        reject(`Task with id ${id} was not found`);
      }
      taskList[index].isComplete = true;
      resolve(taskList[index]);
    });
  }
  
  static updateTask = (id, data) => {
    return new Promise((resolve, reject) => {
      const index = taskList.findIndex((task) => task.id === parseInt(id))
      if(index === -1) {
        reject(`Task with id ${id} was not found`);
      }
      taskList[index] = {...taskList[index], ...data};
      resolve(taskList[index]);
    });
  }
}

module.exports = Controller;