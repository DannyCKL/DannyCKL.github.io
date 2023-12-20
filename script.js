// function changeText() {
//     var textElement = document.getElementById('team1');
//     textElement.textContent = 'The text has been changed!';
// }

// var button = document.getElementById('change-btn');
// button.addEventListener('click', changeText);

// control the menu
document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.circle-menu');

    toggleButton.addEventListener('click', function () {
        menu.classList.toggle('menu-active');
    });
});

let scores = localStorage.getItem("scores");
if (scores) {
    scores = JSON.parse(scores);
    const cells = document.getElementsByClassName("scores");
    for (let i = 0; i < 6; i++) {
        if (scores[i][8]) {
            cells[i].innerHTML = scores[i][8] + 100;
        }
    }
}