var dados = []

function Apaga(id){
    let _confirm = confirm("Deseja prosseguir?")

    if(_confirm){
        for(let i = 0; i<dados.length; i++){
        if(dados[i].ID == id) {
            dados.splice(i, 1)
            }
        }

        PopulaTabela()
    }
}

function Editar(id){
    $("#Registro").modal("show")

    dados.forEach(function(item){
        if(item.ID == id){
            $("#hdID").val(item.ID)
            $("#txtnome").val(item.Nome)
            $("#txtidade").val(item.Idade)
        }
    })
}

function PopulaTabela() {
    if (Array.isArray(dados)){

        localStorage.setItem("__dados__", JSON.stringify(dados))

        $("#tblDados tbody").html("")
        dados.forEach(function (item){
            $("#tblDados tbody").append(`<tr>
                <td>${item.ID}</td>
                <td>${item.Nome}</td>
                <td>${item.Idade}</td>
                <td><button type="button" class="btn btn-primary" onclick="javascript:Editar(${item.Id});"><i class="fa fa-edit" /></button></td>
                <td><button type="button" class="btn btn-danger" onclick="javascript:Apaga(${item.ID});"><i class="fa fa-trash" /></button></td>
            </tr>`)
        })        
    }
}

$(function (){
    dados = JSON.parse(localStorage.getItem("__dados__"))

    if (dados){
        PopulaTabela()
    }

    $("#btnsalvar").click(function (){

        let _id = $("#hdID").val()
        let Nome = $("#txtnome").val()
        let Idade = $("#txtidade").val()

        if(_id == 0){
            let registro = {}

            registro.Nome = Nome
            registro.Idade = Idade

            registro.ID = dados.length+1
            dados.push(registro)

        }
        else{
            dados.forEach(function(item){
                if(item.ID == _id){
                    item.Nome = Nome
                    item.Idade - Idade
                }
            })
        }
   

        alert("Registro feito!")
        $("#Registro").modal("hide")

        $("#hdID").val("0")
        $("#txtnome").val("")
        $("#txtidade").val("")

        PopulaTabela()
    })
})