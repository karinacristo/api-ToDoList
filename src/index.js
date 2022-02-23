// Importando o framework
import express from "express";

// importanto os controllers
import usuarioController from "./controllers/usuario-controller.js";
import tarefaController from "./controllers/tarefa-controller.js";

// Instanciando/criando servidor
const app = express()
// Escolhendo a porta
const port = 3000

// chamando os controllers
usuarioController(app)
tarefaController(app)

// Abrindo o servidor na porta escolhida
app.listen(port, ()=>{
    console.log(`Servidor aberto na http://localhost:${port}`)
})