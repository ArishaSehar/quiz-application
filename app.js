const quizData = [
    {
        questions: "Which of the following is not a valid JavaScript variable name?",
        options: [
            "_name",
            "1stPlace",
            "$age",
            "first_name",
        ],
        correct: 1,
    },
    {
        questions: "What does the type of operator return when applied to an array in JavaScript?",
        options: [
            'object',
            'array',
            'list',
            'undefined',
        ],
        correct: 1,
    },
    {
        questions: "How can you check if a value is an array in JavaScript?",
        options: [
            "Array.isArray(value)",
            "value.isArray()",
            "typeof value === 'array'",
            "value instance of Array",
        ],
        correct: 0,
    },
    {
        questions: "How can you add an element to the beginning of an array in JavaScript?",
        options: [
            "array.push()",
            "array.unshift()",
            "array.shift()",
            "array.concat()",
            ],
        correct: 1,
    },
    {
        questions: "What does the map() method do in JavaScript?",
        options: [
            "It creates a new array by modifying each element of the original array.",
            "It filters elements from an array based on a condition.",
            "It finds the first matching element in an array.",
            "It checks if an element exists in an array.",
        ],
        correct: 0,
    },
];

let quizBox = document.getElementById("Quiz");
let questions = document.getElementById("questions");
let option1 = document.getElementById("option-1");
let option2 = document.getElementById("option-2");
let option3 = document.getElementById("option-3");
let option4 = document.getElementById("option-4");
let btn = document.getElementById("submit");
let timerDisplay = document.getElementById("timer");

let currentQuiz = 0;
let score = 0;
let timeLeft = 50; // 5 minutes in seconds
let timer;

// Load the first question initially
loadQuiz();
startTimer();

function loadQuiz() {
    questions.innerHTML = `${currentQuiz + 1}: ${quizData[currentQuiz].questions}`;
    const options = quizData[currentQuiz].options;

    option1.innerHTML = options[0];
    option2.innerHTML = options[1];
    option3.innerHTML = options[2];
    option4.innerHTML = options[3];
}

function getSelectedOption() {
    const answers = document.querySelectorAll(".answer");
    let selectedOption;

    answers.forEach((answer, index) => {
        if (answer.checked) {
            selectedOption = index;
        }
    });

    return selectedOption;
}

btn.addEventListener("click", function () {
    const selectedOption = getSelectedOption();

    if (selectedOption === undefined) {
        Swal.fire("Please select an option!");
        return;
    }

    if (selectedOption === quizData[currentQuiz].correct) {
        score++;
    }

    if (currentQuiz < quizData.length - 1) {
        currentQuiz++;
        document.querySelectorAll(".answer").forEach((radio) => (radio.checked = false));
        loadQuiz();
    } else {
        endQuiz();
    }
});




function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        // Check if time has run out
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz(true); // End quiz automatically if time runs out
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.innerHTML = `Time Left: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function endQuiz(timeUp = false) {
    clearInterval(timer);
    quizBox.innerHTML = `
        <div class="result">
            <h2>${timeUp ? 'Time is up! ' : ''}Your score: ${score}/${quizData.length} correct answers</h2>
          
        </div>`;
}