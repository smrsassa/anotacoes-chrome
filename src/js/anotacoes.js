function reloadVarsAnotacoes() {
    const elemAnotacoes = $("#anotacoes")
    const elemInputAnotacao = $("#addAnotacao")
    const elemClearAll = $("#clearAll")
    const contextMenu = $("#context-menu")
    const scope = $("body")

    var elemSelected = null

    let data = { "notas": [] }

    function appendAnotacao( texto ) {
        data.notas.push(texto)
    }

    function criaNota( texto, index ) {
        elemAnotacoes.prepend(
            $('<li>' + texto + '</li>')
                .attr("id", index)
                .addClass("anotacao")
        )
    }

    function storageData() {
        chrome.storage.local.set({ "anotacoes": data }, () => {})
    }

    function carregarAnotacoes(ignora = false) {
        chrome.storage.local.get("anotacoes", (items) => {
            if ( items.anotacoes != null ) {
                var dados = items.anotacoes.notas
                for(var index in dados) {
                    criaNota(dados[index], index)
                    if (!ignora) appendAnotacao(dados[index])
                    storageData()
                }
            }
        })
    }

    function clearAllData() {
        data = { "notas": [] }
        storageData()
        elemAnotacoes.html("")
    }

    function deletarUmaAnotacao( index ) {
        data.notas.splice(index, 1)
        elemAnotacoes.html("")
        storageData()
        carregarAnotacoes(true)
    }

    function copyTextToClipboard(text) {
        let textArea = document.createElement("textarea")

        textArea.value = text

        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()

        document.execCommand('copy')
      
        document.body.removeChild(textArea)
    }

    elemInputAnotacao.on("change", () => {
        let anotacao = elemInputAnotacao.val()

        appendAnotacao(anotacao)
        storageData()
        elemAnotacoes.html("")
        carregarAnotacoes(true)

        elemInputAnotacao.val("")
    })

    elemClearAll.on("dblclick", () => {
        clearAllData()
    })

    function normalizePozition(mouseX, mouseY) {
        let scopeOffsetX = scope.offset().left
        let scopeOffsetY = scope.offset().top
        scopeOffsetX = scopeOffsetX < 0 ? 0 : scopeOffsetX
        scopeOffsetY = scopeOffsetY < 0 ? 0 : scopeOffsetY

        const scopeX = mouseX - scopeOffsetX
        const scopeY = mouseY - scopeOffsetY

        const outOfBoundsOnX = scopeX + contextMenu.clientWidth > scope.clientWidth

        const outOfBoundsOnY =  scopeY + contextMenu.clientHeight > scope.clientHeight

        let normalizedX = mouseX
        let normalizedY = mouseY

        if (outOfBoundsOnX) {
            normalizedX = scopeOffsetX + scope.clientWidth - contextMenu.clientWidth
        }

        if (outOfBoundsOnY) {
            normalizedY = scopeOffsetY + scope.clientHeight - contextMenu.clientHeight
        }

        return { normalizedX, normalizedY }
    }

    function resetLastElem(elem) {
        if (elem == null) return false

        elem.removeAttr("style")

        elemSelected = null
    }

    scope.on("contextmenu", ".anotacao", (event) => {
        event.preventDefault()

        resetLastElem(elemSelected)

        elemSelected = $("#"+event.target.id)

        const { clientX: mouseX, clientY: mouseY } = event

        var { normalizedX, normalizedY } = normalizePozition(mouseX, mouseY)

        contextMenu.removeClass("visible")

        if ((contextMenu.width() + normalizedX) > $(document).width()) 
            normalizedX -= contextMenu.width()
        if ((contextMenu.height() + normalizedY) > $(document).height()) 
            normalizedY -= contextMenu.height()

        contextMenu.css({ top: `${normalizedY}px` })
        contextMenu.css({ left: `${normalizedX}px` })

        contextMenu.addClass("visible")

        elemSelected.attr("style", "color: var(--blue);")
    })

    $("#copyToClipboard").on("click", () => {
        copyTextToClipboard(elemSelected.html())
    })
    
    $("#delAnotacao").on("click", () => {
        deletarUmaAnotacao(elemSelected.attr('id'))
    })

    scope.on("click", (e) => {
        if (e.target.offsetParent != contextMenu) {
            contextMenu.removeClass("visible")
            resetLastElem(elemSelected)
        }
    })

    carregarAnotacoes()
}
