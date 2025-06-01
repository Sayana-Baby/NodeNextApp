const { DataTypes } = require('sequelize');
const {sequelize} = require('../db');

const TaskDependency = sequelize.define('TaskDependency', {
  dependency_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  task_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tasks',
      key: 'task_id'
    },
    onDelete: 'CASCADE'
  },
  depends_on_task_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tasks',
      key: 'task_id'
    },
    onDelete: 'CASCADE'
  },
  dependency_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['Blocks', 'Precedes', 'Related']]
    }
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'task_dependencies',
  timestamps: false
});

module.exports = TaskDependency;
