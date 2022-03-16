// Model que cuida da criação do objeto da nossa entidade
// validando as entradas

class TarefaSchema{
    constructor(titulo, descricao, status, idUsuario){
        this.titulo = titulo
        this.descricao = descricao
        this.status = this._validaStatus(status)
        this.dataCriacao = new Date().toLocaleString(),
        this.idUsuario = idUsuario
    }

    _validaStatus = (status)=>{
        const statusPermitidos = ["Feito", "Fazendo", "A fazer"]
        if(statusPermitidos.includes(status)){
            return status
        }
        else{
            throw new Error("Status não permitido. O status deve ser: Feito, Fazendo, A fazer")
        }
    }

}

export default TarefaSchema