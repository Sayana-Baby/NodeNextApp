const { DataTypes } = require('sequelize');
const {sequelize} = require('../db');

const Engagement = sequelize.define('Engagement', {
  engagement_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id',
    },
    onDelete: 'CASCADE',
  },
  task_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tasks',
      key: 'task_id',
    },
    onDelete: 'CASCADE',
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  badge: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  achieved_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'engagements',
  timestamps: false,
});

module.exports = Engagement;
