const btnIndex = $("#btnIndex")
const btnConfig = $("#btnConfig")
const btnAbout = $("#btnAbout")

function switchItemAtivo( sucessor ) {
    itemAtivo.parent("li")
        .attr("class", "")
    sucessor.parent("li")
        .attr("class", "ativo")
    itemAtivo = sucessor
}

function ajaxLoadPartial( partial ) {
    $.ajax({
        type: 'GET',
        url: 'partials/'+ partial +'.html',
        success: function (data) {
            $('#conteudo').html(data)
            reloadVarsAnotacoes()
            reloadVarsConfig()
        }
    });
}

ajaxLoadPartial("anotacao")
btnIndex.parent("li").attr("class", "ativo");
var itemAtivo = btnIndex

btnIndex.on("click", () => {
    switchItemAtivo(btnIndex)
    ajaxLoadPartial("anotacao")
})

btnConfig.on("click", () => {
    switchItemAtivo(btnConfig)
    ajaxLoadPartial("config")
})

btnAbout.on("click", () => {
    switchItemAtivo(btnAbout)
    ajaxLoadPartial("about")
})
