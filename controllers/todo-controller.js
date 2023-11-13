const { Todo } = require("../models");

module.exports = {
  getAllTodo: async (req, res) => {
    try {
      const todos = await Todo.findAll();
      
      res.status(200).json({
        message: "Berhasil mendapatkan semua data todo",
        data: todos
      })
    } catch (error) {
      res.status(505).json({
        message: error
      })
    }
  },
  getTodoById: async (req, res) => {
    try {
      const todo = await Todo.findOne({
        where: {
          id: req.params.id,
        },
      });

      if(todo){
        res.status(200).json({
          message: `Berhasil mendapatkan todo dengan id ${req.params.id}`,
          data: todo,
        })
      } else {
        res.status(404).json({
          message: `Tidak ada todo dengan id ${req.params.id}`,
        })
      }
    } catch (error) {
      res.status(505).json({
        message: "Internal Server Error",
      });
    }
  },
  createTodo: async (req, res) => {
    let data = req.body;

    try {
      await Todo.create(data);

      res.status(201).json({
        message: "Berhasil membuat todo",
      });
    } catch {
      res.json({
        message: "Gagal membuat todo",
      });
    }
  },
  deleteTodo: async (req, res) => {
    let todoId = req.params.id;

    try {
      const existingTodo = await Todo.findByPk(todoId);

      if (!existingTodo) {
        return res.status(404).json({
          message: 'Todo not found' 
        });
      }
  
      // Delete the Todo
      await existingTodo.destroy();
      return res.status(200).json({ 
        message: 'Todo deleted successfully'
      });
    } catch (error) {
      res.status(505).json({
        message: "Internal Server Error",
        error: error
      });
    }
  },
  updateTodoStatus: async (req, res) => {
    let todoId = req.params.id;

    try {
      const existingTodo = await Todo.findByPk(todoId);
      if (!existingTodo) {
        return res.status(404).json({ 
          error: "Todo tidak ditemukan" 
        });
      } else {
        const status = existingTodo.completed == "false" ? "true" : "false";
        const updatedCompletedStatus = await Todo.update({
          completed: status
        }, {
          where: {
            id: todoId
          }
        });
    
        if(updatedCompletedStatus){
          res.status(200).json({
            message: "Berhasil update status todo",
          })
        }
      }
    } catch {
      res.json({
        message: "Gagal update status todo",
      });
    }
  },
  updateTodoTask: async (req, res) => {
    let todoId = req.params.id;
    let newTodoData = req.body;

    try {
      const existingTodo = await Todo.findByPk(todoId);
      if (!existingTodo) {
        return res.status(404).json({ 
          error: "Todo tidak ditemukan" 
        });
      } else {
        const updatedTodoTask = await Todo.update({
          task: newTodoData.task
        }, {
          where: {
            id: todoId
          }
        });
    
        if(updatedTodoTask){
          res.status(200).json({
            message: "Berhasil update task todo",
          })
        }
      }
    } catch {
      res.json({
        message: "Gagal update task todo",
      });
    }
  },
};