const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const moment = require("moment");
const Tarefa = require("./models/Tarefa");

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY');
        }
    }
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Rotas

app.get('/tarefa', function(req, res) {
    Tarefa.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(function(tarefas) {
        res.render('tarefa', { tarefas: tarefas });

    })
});

app.get('/cad-tarefa', function(req, res) {
    res.render('cad-tarefa');
})

app.post('/add-tarefa', function(req, res) {
    Tarefa.create({
        nome: req.body.nome,
        descricao: req.body.descricao
    }).then(function() {
        res.redirect('/tarefa');
    }).catch(function(erro) {
        res.send("Erro ao cadastrar tarefa: " + erro);
    });

});

app.get('/del-tarefa/:id', function(req, res) {
    Tarefa.destroy({
        where: { 'id': req.params.id }
    }).then(function() {
        // res.send("Tarefa apagada com sucesso!")
        res.redirect('/tarefa');
    }).catch(function() {
        res.send("Tarefa não foi apagada.")

    });
});

app.listen(8080);