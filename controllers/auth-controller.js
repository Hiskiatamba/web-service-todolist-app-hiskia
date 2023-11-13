require("dotenv").config()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { User } = require("../models")

module.exports = {
  loginAction: async (req, res) => {
    const userLogin = req.body 

    try {
      const user = await User.findOne({
        where: {
          email: userLogin.email
        }
      })
  
      if(bcrypt.compareSync(userLogin.password, user.password)){
        const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_KEY)
    
        res.json({
          message: "Login Successfull",
          userId: user.id,
          token,
        })
      } else {
        res.json({
          message: "Login Failed",
        })
      }
    } catch (error) {
      res.json(error.message)
    }
  },
  // registerAction: async (req, res) => {
  //   let data = req.body;

  //   try {
  //     const hashPassword = bcrypt.hashSync(data.password, 10);
  //     data.password = hashPassword;

  //     await User.create(data);

  //     res.status(201).json({
  //       message: "Berhasil menambahkan user",
  //     });
  //   } catch {
  //     res.json({
  //       message: "Gagal menambahkan user",
  //     });
  //   }
  // }
}