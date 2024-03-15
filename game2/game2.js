const question = document.getElementById('question');
const options = document.querySelectorAll('.option');
const scoreDisplay = document.getElementById('score');
const btn = document.getElementById("nextButton");

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    resetBoxColors();
    const currentQuestionData = questions[currentQuestion];
    question.textContent = currentQuestionData.question;
    options.forEach((option, index) => {
        option.textContent = currentQuestionData.options[index];
    });
}

function checkAnswer(selectedOption) {
    const currentQuestionData = questions[currentQuestion];

    options.forEach((option, index) => {
        if (index === currentQuestionData.answer) {
            option.classList.add("correct");
        } else {
            option.classList.add("incorrect");
        }
    });

    if (selectedOption === currentQuestionData.answer) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }

    if (currentQuestion >= questions.length) {
        question.textContent = 'Quiz completed!';
        options.forEach(option => option.style.display = 'none');
        btn.style.display = 'none';
    }
}

function resetBoxColors() {
    options.forEach((option) => {
        option.classList.remove("correct", "incorrect");
    })
}

options.forEach((option, index) => {
    console.log(option, index);
    option.addEventListener('click', () => checkAnswer(index));
});

btn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion >= questions.length) {
        question.textContent = 'Quiz completed!';
        options.forEach(option => option.style.display = 'none');
        btn.style.display = 'none';
    }
    loadQuestion();
});

loadQuestion();