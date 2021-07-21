function reloadVarsConfig() {
    const elemSwitchTema = $("#switchTema")
    const elemSwitchClearAll = $("#switchClearAll")
    const elemSwitchAsk = $("#switchAsk")
    const elemSwitchCredt = $("#switchCredt")

    var config = {
        Tema: "checked",
        ClearAll: "checked",
        Ask: "",
        Credt: "checked"
    }

    function storageConfig() {
        chrome.storage.local.set({ "anotacoesConfig": config }, () => {})
    }

    function carregarAnotacoes() {
        chrome.storage.local.get("anotacoesConfig", (items) => {
            let source = items.anotacoesConfig
            Object.assign(config, source)
            storageConfig()
            inputState()
        })
    }

    function inputState() {
        elemSwitchTema.prop("checked", config.Tema === "checked")
        elemSwitchClearAll.prop("checked", config.ClearAll === "checked")
        elemSwitchAsk.prop("checked", config.Ask === "checked")
        elemSwitchCredt.prop("checked", config.Credt === "checked")
    }

    function switchChecked( param ) {
        return param === "checked" ? "" : "checked"
    }

    function saveSwitch(params) {
        Object.assign(config, params)
        storageConfig()
        inputState()
    }

    elemSwitchTema.on("change", () => {
        saveSwitch({
            Tema: switchChecked(config.Tema)
        })
    })
    elemSwitchClearAll.on("change", () => {
        saveSwitch({
            ClearAll: switchChecked(config.ClearAll)
        })
    })
    elemSwitchAsk.on("change", () => {
        saveSwitch({
            Ask: switchChecked(config.Ask)
        })
    })
    elemSwitchCredt.on("change", () => {
        saveSwitch({
            Credt: switchChecked(config.Credt)
        })
    })

    carregarAnotacoes()
}
