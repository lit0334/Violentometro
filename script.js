document.addEventListener("DOMContentLoaded", () => {
    showQuestion(1);
});

function showQuestion(number) {
    const questions = document.querySelectorAll(".question");
    questions.forEach(question => {
        question.style.display = "none";
    });

    const current = document.querySelector(`.question[data-question="${number}"]`);
    if (current) {
        current.style.display = "block";
        current.classList.add('active');
    }
}

function nextQuestion() {
    const currentQuestion = document.querySelector('.question.active');
    const inputs = currentQuestion.querySelectorAll('input[type="radio"]:checked');
    
    if (inputs.length === 0) {
        alert("Por favor selecciona una opción antes de continuar.");
        return;
    }

    const nextQuestion = currentQuestion.nextElementSibling;
    if (nextQuestion && nextQuestion.classList.contains('question')) {
        currentQuestion.classList.remove('active');
        nextQuestion.classList.add('active');
        showQuestion(parseInt(nextQuestion.getAttribute('data-question')));
    } else {
        document.getElementById("resultContainer").style.display = "block";
        calculateResult();
    }
}

function calculateResult() {
    const form = document.getElementById('violenceForm');
    const questions = form.querySelectorAll('input[type="radio"]:checked');
    let score = 0;

    questions.forEach(question => {
        score += parseInt(question.value);
    });

    const resultDiv = document.getElementById('result');
    resultDiv.classList.remove('green', 'yellow', 'red');

    if (score === 0) {
        resultDiv.classList.add('green');
        resultDiv.textContent = "Amor sano";
    } else if (score > 0 && score <= 2) {
        resultDiv.classList.add('yellow');
        resultDiv.textContent = "CUIDADO";
    } else {
        resultDiv.classList.add('red');
        resultDiv.textContent = "ALTAMENTE TOXICO, SAL DE AHI!";
    }
}
