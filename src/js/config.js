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

    function carregarConfigs() {
        chrome.storage.local.get("anotacoesConfig", (items) => {
            let source = items.anotacoesConfig
            config = Object.assign(config, source)
            storageConfig()
            inputState()
            applyConfigs()
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

    function applyClearAll() {
        const elemClearAll = $("#clearAll")
        elemClearAll.hide()
    }

    function applyConfigs() {
        if ( config.Tema === "" ) console.log("Tema")
        if ( config.ClearAll === "" ) applyClearAll()
        if ( config.Ask === "checked" ) console.log("Ask")
        if ( config.Credt === "" ) console.log("Credt")
    }

    carregarConfigs()
}
