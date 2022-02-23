import express from "express";

import usuarioController from "./controllers/usuario-controller.js";
import tarefaController from "./controllers/tarefa-controller.js";

const app = express()
const porta = 3000

// chamando os controllers
usuarioController(app)
tarefaController(app)

app.listen(porta, ()=>{
    console.log(`Servidor aberto na http://localhost:${porta}`)
})