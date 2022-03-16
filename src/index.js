// Importando o framework
import express from "express";

// importanto os controllers
import usuarioController from "./controllers/usuario-controller.js";
import tarefaController from "./controllers/tarefa-controller.js";

// importando os middlewares
import generalMiddleware from "./middleware/general-middleware.js";

// banco de dados do sqlite
import database from './database/sqlite-db.js'

// Instanciando/criando servidor
const app = express()
// Escolhendo a porta
const port = 3000

// Middleware necessario para fazer o parser do 
// JSON recebido do body em objeto
app.use(express.json())

// Chamada dos Middlewares especificos das rotas
generalMiddleware(app) // vai ser rodados em todas as rotas

// chamando os controllers passando o servidor (app) 
// e o banco de dados (bd) como parâmetro
usuarioController(app, database)
tarefaController(app, database)

// Abrindo o servidor na porta escolhida
app.listen(port, ()=>{
    console.log(`Servidor aberto na http://localhost:${port}/`)
})