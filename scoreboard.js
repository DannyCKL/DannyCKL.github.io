document.addEventListener("DOMContentLoaded", function () {
    const rows = 6;
    const cols = 8;
    const shell = document.getElementsByClassName("shell");

    for (let row = 0; row < rows; row++) {
        const teamContainer = document.createElement("div");
        teamContainer.className = "team-container";
        const teamName = document.createElement("h2");
        teamName.innerHTML = `Team ${row + 1}`;
        teamContainer.appendChild(teamName);

        for (let col = 0; col < cols; col++) {
            const inputGroup = document.createElement("div");
            inputGroup.className = "input-group";
            const input = document.createElement("input");
            input.type = "number";
            input.placeholder = "0";
            inputGroup.appendChild(input);
            teamContainer.appendChild(inputGroup);
        }

        shell[0].appendChild(teamContainer);
    }

    const panel = document.createElement("div");
    panel.id = "panel";
    shell[0].appendChild(panel);

    const updateButton = document.createElement("button");
    updateButton.id = "update-btn";
    updateButton.innerHTML = "Update";
    panel.appendChild(updateButton);
    updateButton.addEventListener("click", update);

    const resetButton = document.createElement("button");
    resetButton.id = "reset-btn";
    resetButton.innerHTML = "Reset";
    panel.appendChild(resetButton);
    resetButton.addEventListener("click", reset);

    let scores = localStorage.getItem("scores");
    if (scores) {
        scores = JSON.parse(scores);
        const cells = document.getElementsByTagName("input");
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 8; j++) {
                if (scores[i][j]) {
                    cells[i * 8 + j].value = scores[i][j];
                }
            }
        }
    }
    update();
})

function update() {
    const scores = document.getElementsByTagName("input");
    let data = [];
    for (let i = 0; i < 6; i++) {
        let datum = [];
        let sum = 0;
        for (let j = 0; j < 8; j++) {
            let scoreValue = parseInt(scores[i * 8 + j].value || "0", 10);
            datum.push(scoreValue);
            sum += scoreValue;
            if (j === 7) {
                datum.push(sum);
            }
        }
        data.push(datum);
    }
    try {
        data = JSON.stringify(data);
        localStorage.setItem("scores", data);
    } catch (e) {
        console.error("Failed to stringify or save data to localStorage:", e);
    }
}

function reset() {
    if (window.confirm("Are you sure to reset the data?")) {
        const scores = document.getElementsByTagName("input");
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 8; j++) {
                scores[i * 8 + j].value = "";
            }
        }
        update();
    }
}

setInterval(function () {
    const scores = document.getElementsByTagName("input");
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 8; j++) {
            if (scores[i * 8 + j].value) {
                scores[i * 8 + j].parentElement.classList.add("filled");
            } else {
                scores[i * 8 + j].parentElement.classList.remove("filled");
            }
        }
    }
}, 1000)