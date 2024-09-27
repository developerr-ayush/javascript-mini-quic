const questions = [
  {
    question: "What’s the Result of 0.1 + 0.2 === 0.3?",
    options: ["true", "false"],
    answer: 1, // index of the correct option (false)
    explanation:
      "The result is false because 0.1 + 0.2 results in 0.30000000000000004.",
  },
  {
    question: "What’s the Result of '5' + 3 and '5' - 3?",
    options: ["'53' and 2", "8 and '53'", "'5' and 8"],
    answer: 0, // '53' and 2
    explanation:
      "'5' + 3 results in '53' (string concatenation), and '5' - 3 results in 2.",
  },
  {
    question: "What’s the Value of typeof null?",
    options: ["'null'", "'object'", "'undefined'"],
    answer: 1, // 'object'
    explanation:
      "typeof null returns 'object', a long-standing bug in JavaScript.",
  },
  {
    question: "How Does a Closure Work?",
    options: [
      "It returns a function",
      "It creates a private scope",
      "Both are correct",
    ],
    answer: 2, // Both are correct
    explanation:
      "A closure retains access to its outer scope, even after the outer function finishes.",
  },
  {
    question: "What’s the Result of true + false and [] + {}?",
    options: [
      "1 and '[object Object]'",
      "0 and '[object Object]'",
      "true and {}",
    ],
    answer: 0, // 1 and '[object Object]'
    explanation: "true + false = 1, and [] + {} = '[object Object]'.",
  },
  {
    question: "What Does [] == ![] Mean?",
    options: ["false", "true", "undefined"],
    answer: 1, // true
    explanation: "[] == ![] returns true due to JavaScript type coercion.",
  },
  {
    question: "What’s the Output of console.log(a)? var a = 5;",
    options: ["5", "undefined", "ReferenceError"],
    answer: 1, // undefined
    explanation:
      "Due to hoisting, a is declared but not assigned before the console.log.",
  },
];

let currentQuestion = 0;
let score = 0;
let hasAnswered = false; // Flag to track if the user has already answered the current question

// Display Question
function showQuestion(index) {
  const questionContainer = document.getElementById("question");
  const optionsContainer = document.getElementById("options");
  const explanationContainer = document.getElementById("explanation");

  questionContainer.innerHTML = questions[index].question;
  optionsContainer.innerHTML = "";
  explanationContainer.innerHTML = ""; // Clear previous explanation

  hasAnswered = false; // Reset flag for new question

  questions[index].options.forEach((option, i) => {
    optionsContainer.innerHTML += `
        <label>
          <input type="radio" name="option" value="${i}" onclick="checkAnswer(${i})">
          ${option}
        </label>
      `;
  });

  document.getElementById("next-btn").disabled = true; // Disable next button until answered
}

// Check the selected answer
function checkAnswer(selectedIndex) {
  if (hasAnswered) return; // Prevent answering multiple times for the same question

  hasAnswered = true;

  const question = questions[currentQuestion];
  const explanationContainer = document.getElementById("explanation");

  // Mark the selected answer
  if (selectedIndex === question.answer) {
    score++; // Increment score if correct
    explanationContainer.innerHTML = `<span class="correct">Correct!</span><br>${question.explanation}`;
  } else {
    explanationContainer.innerHTML = `<span class="incorrect">Incorrect!</span><br>${question.explanation}`;
  }

  // Enable the next button after showing the explanation
  document.getElementById("next-btn").disabled = false;
}

// Move to next question
function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion(currentQuestion);
  } else {
    showResults(); // Show results if all questions are completed
  }
}

// Show results
function showResults() {
  const quizContainer = document.getElementById("quiz-container");
  const resultContainer = document.getElementById("result-container");
  const scoreElement = document.getElementById("score");

  quizContainer.style.display = "none";
  resultContainer.style.display = "block";

  scoreElement.innerHTML = `You got ${score} out of ${questions.length} correct!`;
}

// Restart the quiz
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("result-container").style.display = "none";
  showQuestion(currentQuestion);
}

// Initialize the quiz
showQuestion(currentQuestion);

// Add event listener to next button
document.getElementById("next-btn").addEventListener("click", nextQuestion);
