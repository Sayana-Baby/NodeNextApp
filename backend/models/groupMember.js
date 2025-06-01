const { DataTypes } = require('sequelize');
const {sequelize} = require('../db');

const GroupMember = sequelize.define('GroupMember', {
  group_member_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  group_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'groups',   
      key: 'group_id'
    },
    onDelete: 'CASCADE'
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
  role: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'Member'
  },
  joined_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'group_members'
});

module.exports = GroupMember;
