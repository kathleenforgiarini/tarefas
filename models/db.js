const Sequelize = require("sequelize");

const sequelize = new Sequelize('tarefas', 'kathleen', '123456', {
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}