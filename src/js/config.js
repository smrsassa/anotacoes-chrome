function reloadVarsConfig() {
    const elemSwitchTema = $("#switchTema")
    const elemSwitchClearAll = $("#switchClearAll")
    const elemSwitchAsk = $("#switchAsk")
    const elemSwitchCredt = $("#switchCredt")

    elemSwitchTema.on("change", () => {
        alert("tema")
    })
    elemSwitchClearAll.on("change", () => {
        alert("clear")
    })
    elemSwitchAsk.on("change", () => {
        alert("ask")
    })
    elemSwitchCredt.on("change", () => {
        alert("credt")
    })
}
