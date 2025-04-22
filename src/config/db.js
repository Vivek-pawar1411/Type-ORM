const { DataSource } = require("typeorm"); // ✅ Fix: Destructure the DataSource class
const { UserEntity } = require("../entity/user.entity.js"); // ✅ Make sure this matches your export
require("dotenv").config();

const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [UserEntity], // ✅ Use the correct exported name
});

module.exports = { AppDataSource };
