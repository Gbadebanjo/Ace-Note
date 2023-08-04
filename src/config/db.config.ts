import { Sequelize } from 'sequelize';

const db = new Sequelize('database', 'oluwagbogo', 'oluwagbogo', {
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
})

export default db;