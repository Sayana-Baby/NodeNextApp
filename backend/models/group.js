
const { DataTypes } = require('sequelize');
const {sequelize} = require('../db');
const Group = sequelize.define('Group', {
  group_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id'
    },
    onDelete: 'CASCADE'
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  is_community: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  max_members: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 50
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'groups', 
});

module.exports = Group;
