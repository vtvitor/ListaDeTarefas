let listaTarefas = [];
let ID = 1;

document.getElementById("btnCriar").addEventListener("click", cadastrarTarefa);
document.getElementById("btnRemover").addEventListener("click", removerTarefa);
document.getElementById("btnFinalizar").addEventListener("click", finalizarTarefa);
document.getElementById("btnBuscar").addEventListener("click", buscarTarefa);
document.getElementById("btnEditar").addEventListener("click", editarTarefa);

function cadastrarTarefa() {

    let nome = document.getElementById("nome").value;
    let descricao = document.getElementById("descricao").value;


    if (nome === "" || descricao === "") {
        alert("Preencha todos os campos!")
        return;
    }

    let tarefa = {
        ID: ID,
        nome: nome,
        descricao: descricao,
        concluida: false
    }

    ID = ID + 1;


    listaTarefas.push(tarefa);
    exibir();
    limparcampos();
}

function removerTarefa() {
    let IDparaRemover = Number(document.getElementById("IDRemover").value);

    if (IDparaRemover === "") {
        alert("Digite um ID")
        return;
    }

    let totalAntes = listaTarefas.length;
    listaTarefas = listaTarefas.filter(tarefa => tarefa.ID !== IDparaRemover);

    if (listaTarefas.length === totalAntes) {
        alert("Tarefa não encontrada!")
    } else {
        alert("Tarefa deletada com sucesso!!")
    }

    exibir();
    limparcampos();
}

function finalizarTarefa() {
    let IDparaEditar = Number(document.getElementById("IDFinalizar").value);
    let tarefa = listaTarefas.find(tarefa => tarefa.ID === IDparaEditar);


    if (tarefa) {
        tarefa.ID = IDparaEditar;
        tarefa.concluida = true;
    }

    exibir();
    limparcampos();
}


function exibir() {
    let exibirTarefa = listaTarefas.map(tarefa => {
        let corStatus = tarefa.concluida ? "green" : "red";

        return (
        `Código: ${tarefa.ID} 
        Nome: ${tarefa.nome}
        Descricao: ${tarefa.descricao}
        <span style="color: ${corStatus}">
        Status: ${tarefa.concluida ? "Concluida " : "Pendente"}
        </span>`
        )
    }).join("<br>");

    document.getElementById("resultado").innerHTML = exibirTarefa;
}

function buscarTarefa() {
    let inputBuscar = document.getElementById("IDBuscar").value;

    if (inputBuscar === "") {
        alert("Digite um ID");
        return;
    }

    let procurar = Number(inputBuscar);
    let tarefaEncontrada = listaTarefas.find(tarefa => tarefa.ID === procurar);

    if (!tarefaEncontrada) {
        alert("Tarefa não encontrada");
        return;
    }

    idTarefaEditando = tarefaEncontrada.ID;
    document.getElementById("IDEditar").value = tarefaEncontrada.nome;
}

function editarTarefa() {
    let novoTexto = document.getElementById("IDEditar").value;
    if (idTarefaEditando === null) {
        alert("Busque uma tarefa primeiro");
        return;
    }

    if (!novoTexto) {
        alert("Não pode estar vazio");
        return;
    }

    let tarefa = listaTarefas.find(tarefa => tarefa.ID === idTarefaEditando);

    if (tarefa) {
        tarefa.nome = novoTexto;
    }

    exibir();
    limparcampos();
}

function limparcampos() {
    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("IDEditar").value = "";
    document.getElementById("IDFinalizar").value = "";
    document.getElementById("IDBuscar").value = "";
    document.getElementById("IDRemover").value = "";
}