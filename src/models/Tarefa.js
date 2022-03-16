// Models responsáveis pelo tratamento das entidades
// Ela irá chamar os schemas quando necessário para criar validação dos dados
// E irá chamar a DAO para conexão com o Banco de Dados
import TarefaDAO from '../DAO/TarefaDAO.js'
import TarefaSchema from './schema/TarefaSchema.js'

class Tarefa{
    constructor(db){
        this.dao = new TarefaDAO(db)
    }

    pegaTodasTarefas = async ()=>{
        try {
            return await this.dao.pegaTodasTarefas()
        } catch (error) {
            return {
                "mensagem": error.message,
                "erro" : true
            }
        }
    }

    pegaUmaTarefa = async (titulo)=>{
        try {
            return await this.dao.pegaUmaTarefa(titulo)
        } catch (error) {
            return {
                "mensagem": error.message,
                "erro" : true
            }
        }
    }

    insereTarefa = async (tarefa)=>{
        try {
            const novaTarefa = new TarefaSchema(tarefa.titulo, tarefa.descricao, tarefa.status, tarefa.idUsuario)
            return await this.dao.insereTarefa(novaTarefa)
        } catch (error) {
            return ({
                "mensagem": error.message,
                "erro" : true
            })
        }
    }

    deletaTarefa = async (id)=>{
        try {
            // verifica se tarefa existe
            // por ser uma chamada assincrona tb precisa do await
            await this._verificaTarefa(id)

            return await this.dao.deletaTarefa(id)
        } catch (error) {
            return {
                "mensagem": error.message,
                "erro" : true
            }
        }
    }

    atualizaTarefa = async (id, tarefa)=>{
        try {
            // verifica se tarefa existe
            // por ser uma chamada assincrona tb precisa do await
            await this._verificaTarefa(id)

            // utiliza a classe para validação dos dados recebidos
            const tarefaAtualizada = new TarefaSchema(tarefa.titulo, tarefa.descricao, tarefa.status, tarefa.idUsuario)

            return await this.dao.atualizaTarefa(id, tarefaAtualizada)
        } catch (error) {
            return ({
                "mensagem": error.message,
                "erro" : true
            })
        }
    }

    // Podemos criar um metodo privado que verifica se o dado existe!!
    _verificaTarefa = async (id)=>{
        const resposta = await this.dao.pegaUmaTarefaId(id)
        if(resposta.tarefa.length === 0){
            throw new Error(`Tarefa de id ${id} não existe`)
        }
    }
}

export default Tarefa