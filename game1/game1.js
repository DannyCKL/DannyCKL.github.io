const sentences = [];

function transformSentence(reasons, correctness) {
    reasons.forEach(element => {
        let obj = {};
        obj.text = element;
        obj.isTrue = Boolean(correctness);
        sentences.push(obj);
    });
}
transformSentence(true_reasons, 1);
transformSentence(false_reasons, 0);

let currentSentenceIndex = 0;
let score = 0;

const sentenceElement = document.getElementById("sentence");
const trueBoxElement = document.getElementById("trueBox");
const falseBoxElement = document.getElementById("falseBox");
const scoreElement = document.getElementById("scoreValue");
const nextButtonElement = document.getElementById("nextButton");

function showSentence() {
    currentSentenceIndex = Math.floor(Math.random() * sentences.length);
    const currentSentence = sentences[currentSentenceIndex];
    sentenceElement.textContent = currentSentence.text;
}

function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    const sentenceId = event.dataTransfer.getData("text");
    const boxId = event.target.id;
    const currentSentence = sentences[currentSentenceIndex];

    if (
        (boxId === "trueBox" && currentSentence.isTrue) ||
        (boxId === "falseBox" && !currentSentence.isTrue)
    ) {
        score++;
        event.target.classList.add("correct");
    } else {
        event.target.classList.add("incorrect");
    }

    scoreElement.textContent = score;
    sentenceElement.draggable = false;
}

function handleNextQuestion() {
    currentSentenceIndex++;
    if (currentSentenceIndex === sentences.length) {
        alert("Quiz completed! Your score: " + score);
        currentSentenceIndex = 0;
        score = 0;
    }
    resetBoxColors();
    showSentence();
    sentenceElement.draggable = true;
}

function resetBoxColors() {
    trueBoxElement.classList.remove("correct", "incorrect");
    falseBoxElement.classList.remove("correct", "incorrect");
}

sentenceElement.addEventListener("dragstart", handleDragStart);
trueBoxElement.addEventListener("dragover", handleDragOver);
trueBoxElement.addEventListener("drop", handleDrop);
falseBoxElement.addEventListener("dragover", handleDragOver);
falseBoxElement.addEventListener("drop", handleDrop);
nextButtonElement.addEventListener("click", handleNextQuestion);

showSentence();