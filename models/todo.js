'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, { 
        foreignKey: 'user_id',
        as: 'user' 
      });
    }
  }
  Todo.init({
    task: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    completed: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};