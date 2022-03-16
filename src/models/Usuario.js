// Models responsáveis pelo tratamento das entidades
// Ela irá chamar os schemas quando necessário para criar validação dos dados
// E irá chamar a DAO para conexão com o Banco de Dados
import UsuarioDAO from '../DAO/UsuarioDAO.js'
import UsuarioSchema from './schema/UsuarioSchema.js'

class Usuario{
    constructor(db){
        this.dao = new UsuarioDAO(db)
    }

    pegaTodosUsuarios = async ()=>{
        try {
            return await this.dao.pegaTodosUsuarios()
        } catch (error) {
            return {
                "mensagem": error.message,
                "erro" : true
            }
        }
    }

    pegaUmUsuario = async (email)=>{
        try {
            return await this.dao.pegaUmUsuario(email)
        } catch (error) {
            return {
                "mensagem": error.message,
                "erro" : true
            }
        }
    }

    insereUsuario = async (usuario)=>{
        try {
            const novoUsuario = new UsuarioSchema(usuario.nome, usuario.email, usuario.senha)
            return await this.dao.insereUsuario(novoUsuario)
        } catch (error) {
            return ({
                "mensagem": error.message,
                "erro" : true
            })
        }
    }

    deletaUsuario = async (id)=>{
        try {
            // verifica se usuario existe
            // por ser uma chamada assincrona tb precisa do await
            await this._verificaUsuario(id)
            
            return await this.dao.deletaUsuario(id)
        } catch (error) {
            return {
                "mensagem": error.message,
                "erro" : true
            }
        }
    }

    atualizaUsuario = async (id, usuario)=>{
        try {
            // verifica se usuario existe
            // por ser uma chamada assincrona tb precisa do await
            await this._verificaUsuario(id)

            // utiliza a classe para validação dos dados recebidos
            const usuarioAtualizado = new UsuarioSchema(usuario.nome, usuario.email, usuario.senha)

            return await this.dao.atualizaUsuario(id, usuarioAtualizado)
        } catch (error) {
            return ({
                "mensagem": error.message,
                "erro" : true
            })
        }
    }

    // Podemos criar um metodo privado que verifica se o dado existe!!
    _verificaUsuario = async (id)=>{
        const resposta = await this.dao.pegaUmUsuarioId(id)
        if(resposta.usuario.length === 0){
            throw new Error(`Usuario de id ${id} não existe`)
        }
    }
}

export default Usuario