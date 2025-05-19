const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Suggestion = sequelize.define('Suggestion', {
  suggestion_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id'
    },
    onDelete: 'CASCADE'
  },
  suggested_task_title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  suggested_task_description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  suggested_priority: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['High', 'Medium', 'Low']]
    }
  },
  suggested_start_time: {
    type: DataTypes.DATE,
    allowNull: true
  },
  suggested_end_time: {
    type: DataTypes.DATE,
    allowNull: true
  },
  confidence_score: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: true,
    validate: {
      min: 0,
      max: 1
    }
  },
  context_data: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'Pending',
    validate: {
      isIn: [['Accepted', 'Rejected', 'Pending']]
    }
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  feedback_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'suggestions'
});

module.exports = Suggestion;
