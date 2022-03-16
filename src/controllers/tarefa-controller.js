import Tarefa from '../models/Tarefa.js'

const tarefaController = (app, bd)=>{
    const tarefaModel = new Tarefa(bd)

    app.get('/tarefa', async (req, res)=>{
        // Buscando informações no banco de dados
        res.json(await tarefaModel.pegaTodasTarefas())

    })

    app.get('/tarefa/titulo/:titulo', async (req, res)=>{
        // Pegando parametro que sera utilizado para o filtro
        const titulo = req.params.titulo

        // Pesquisa a tarefa no banco de dados
        res.json(await tarefaModel.pegaUmaTarefa(titulo))
    })

    app.post('/tarefa', async (req, res)=>{
        // Recebe o corpo da requisição
        const body = req.body

        res.json(await tarefaModel.insereTarefa(body))
    })

    app.delete('/tarefa/id/:id', async (req, res)=>{
        // Pegando parametro que sera utilizado para o filtro
        const id = req.params.id

        // remove a tarefa do banco de dados
        res.json(await tarefaModel.deletaTarefa(id))

    })

    app.put('/tarefa/id/:id', async (req, res)=>{
        // Pegando parametro que sera utilizado para o filtro
        const id = req.params.id

        // Pegando o corpo da requisição com as informações
        // que serão atualizados
        const body = req.body

        res.json(await tarefaModel.atualizaTarefa(id, body))
    })
}

export default tarefaController