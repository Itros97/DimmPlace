let gameState = {
    lightOn: false,
    inventory: []
};

document.addEventListener('DOMContentLoaded', (event) => {
    startGame();
});

function startGame() {
    output("Bienvenido a la aventura de texto. Estás en una habitación oscura.");
    output("¿Qué quieres hacer?");
}

function processInput() {
    const inputField = document.getElementById("input");
    const inputValue = inputField.value.toLowerCase();
    inputField.value = '';

    if (!gameState.lightOn && inputValue === "buscar un interruptor") {
        gameState.lightOn = true;
        output("Encuentras un interruptor y enciendes la luz. Ves una llave en el suelo.");
        gameState.inventory.push("llave");
    } else if (inputValue === "gritar por ayuda") {
        output("Gritas por ayuda, pero nadie responde.");
    } else if (inputValue === "tomar llave" && gameState.lightOn && gameState.inventory.includes("llave")) {
        output("Ya has tomado la llave.");
    } else if (inputValue === "tomar llave" && gameState.lightOn) {
        output("Tomas la llave.");
        gameState.inventory.push("llave");
    } else {
        output("No entiendo esa acción.");
    }
}

function output(text) {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML += `<p>${text}</p>`;
    outputDiv.scrollTop = outputDiv.scrollHeight;
}
