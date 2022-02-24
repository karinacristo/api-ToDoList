const tarefaController = (app)=>{
    app.get('/tarefa', (req, res)=>{
        res.send('Rota GET para entidade tarefa')
    })

app.post('/tarefa',(req, res)=>{
    res.json({
        "Rota POST de tarefa ativada": "tarefa adicionada ao banco de dados"
    })
 })
}

export default tarefaController