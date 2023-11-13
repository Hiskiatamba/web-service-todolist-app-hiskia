const { User, Todo } = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
  getAllUser: async (req, res) => {
    try {
      const users = await User.findAll();
      
      res.status(200).json({
        message: "Berhasil mendapatkan semua data user",
        data: users
      })
    } catch (error) {
      res.status(505).json({
        message: error
      })
    }
  },
  getUserById: async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await User.findByPk(userId);

      if(user){
        res.status(200).json({
          message: `Berhasil mendapatkan user dengan id ${userId}`,
          data: user,
        })
      } else {
        res.status(404).json({
          message: `Tidak ada user dengan id ${userId}`,
        })
      }
    } catch (error) {
      res.status(505).json({
        message: "Internal Server Error",
      });
    }
  },
  getUserTodos: async (req, res) => {
    try {
      const todos = await Todo.findAll({
        where: {
          user_id: req.params.id,
        },
      });

      if(todos){
        res.status(200).json({
          message: `Berhasil mendapatkan todos berdasarkan id user`,
          data: todos,
        })
      } else {
        res.status(404).json({
          message: `Gagal mendapatkan todos berdasarkan id user`,
        })
      }
    } catch (error) {
      res.status(505).json({
        message: "Internal Server Error",
      });
    }
  },
  createUser: async (req, res) => {
    let data = req.body;

    try {
      const hashPassword = bcrypt.hashSync(data.password, 10);
      data.password = hashPassword;

      await User.create(data);

      res.status(201).json({
        message: "Berhasil menambahkan user",
      });
    } catch {
      res.json({
        message: "Gagal menambahkan user",
      });
    }
  }
};