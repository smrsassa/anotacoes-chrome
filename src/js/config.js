function reloadVarsConfig() {
    const elemSwitchTema = $("#switchTema")
    const elemSwitchClearAll = $("#switchClearAll")
    const elemSwitchCredt = $("#switchCredt")

    var config = {
        Tema: "checked",
        ClearAll: "checked",
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
        elemSwitchCredt.prop("checked", config.Credt === "checked")
    }

    function switchChecked( param ) {
        return param === "checked" ? "" : "checked"
    }

    function saveSwitch(params) {
        Object.assign(config, params)
        storageConfig()
        inputState()
        applyConfigs()
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
    elemSwitchCredt.on("change", () => {
        saveSwitch({
            Credt: switchChecked(config.Credt)
        })
    })

    function applyTema( whiteTheme = false ) {
        let cores = {
            '--back-color': whiteTheme ? '#ececec' : '#23272a',
            '--dark': whiteTheme ? '#2c2f33' : '#2c2f33',
            '--soft-dark': whiteTheme ? '#ebebf2' : '#45484d',
            '--dark-border': whiteTheme ? '#99aab5' : '#57595e',
            '--blue': whiteTheme ? '#7289da' : '#7289da',
            '--blue-L': whiteTheme ? '#333955' : '#333955',
            '--gray': whiteTheme ? '#99aab5' : '#99aab5',
            '--white': whiteTheme ? '#23272a' : '#ececec',
            '--red': whiteTheme ? '#fa3c3c' : '#fa3c3c'
        }

        for(var index in cores) {
            document.documentElement.style.setProperty(index, cores[index]);
        }
    }

    function applyClearAll( hide = true ) {
        const elemClearAll = $("#clearAll")
        if ( hide ) return elemClearAll.hide()
        return elemClearAll.show()
    }

    function applyCredt( hide = true ) {
        const elemCredt = $("footer")
        if ( hide ) return elemCredt.hide()
        return elemCredt.show()
    }

    function applyConfigs() {
        if ( config.Tema === "" ) applyTema(true)
        else applyTema()
        if ( config.ClearAll === "" ) applyClearAll()
        else applyClearAll(false)
        if ( config.Credt === "" ) applyCredt()
        else applyCredt(false)
    }

    carregarConfigs()
}
