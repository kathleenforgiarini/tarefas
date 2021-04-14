const db = require('./db.js');
const Tarefa = db.sequelize.define('tarefas', {
    nome: {
        type: db.Sequelize.STRING
    },
    descricao: {
        type: db.Sequelize.STRING
    }
});

//Criar a tabela
// Tarefa.sync({ force: true });

module.exports = Tarefa;