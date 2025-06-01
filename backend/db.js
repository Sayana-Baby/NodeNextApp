const { Sequelize } = require('sequelize');
const { Client } = require('pg');

const DB_NAME = 'smarttask';
const DB_USER = 'postgres';
const DB_PASSWORD = '12345678';
const DB_HOST = 'localhost';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 15,
    min: 5,
    acquire: 60000,
    idle: 15000,
    evict: 10000,
  },
  dialectOptions: {
    connectTimeout: 60000,
  },
});

async function connectDB() {
  try {
   
    const client = new Client({
      user: DB_USER,
      host: DB_HOST,
      password: DB_PASSWORD,
      database: 'postgres',
    });

    await client.connect();


    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [DB_NAME]);

    if (res.rowCount === 0) {

      await client.query(`CREATE DATABASE "${DB_NAME}"`);
      console.log(`Database "${DB_NAME}" created successfully.`);
    } else {
      console.log(`Database "${DB_NAME}" already exists.`);
    }

    await client.end();


    await sequelize.authenticate();


    await sequelize.sync({ alter: true });
    console.log('Connected to PostgreSQL successfully with Sequelize!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  sequelize,
  connectDB,
};
