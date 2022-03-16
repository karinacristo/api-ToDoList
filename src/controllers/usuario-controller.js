import Usuario from '../models/Usuario.js'

const usuarioController = (app, bd)=>{
    const usuarioModel = new Usuario(bd)

    app.get('/usuario', async (req, res)=>{

        res.json(await usuarioModel.pegaTodosUsuarios())

    })

    app.get('/usuario/email/:email', async (req, res)=>{
        // Pegando parametro que sera utilizado para o filtro
        const email = req.params.email

        // Pesquisa o usuario no banco de dados
        res.json(await usuarioModel.pegaUmUsuario(email))
    })

    app.post('/usuario',async (req, res)=>{
        // Recebe o corpo da requisição
        const body = req.body
        res.json(await usuarioModel.insereUsuario(body))  
    })

    app.delete('/usuario/id/:id', async (req, res)=>{
        // Pegando parametro que sera utilizado para o filtro
        const id = req.params.id

        // remove o usuário do banco de dados
        res.json(await usuarioModel.deletaUsuario(id))

    })

    app.put('/usuario/id/:id', async (req, res)=>{
        // Pegando parametro que sera utilizado para o filtro
        const id = req.params.id

        // Pegando o corpo da requisição com as informações
        // que serão atualizados
        const body = req.body

        // Atualiza o usuario no banco de dados
        res.json(await usuarioModel.atualizaUsuario(id, body))
    })

}

export default usuarioController