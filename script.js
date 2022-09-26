const question = document.querySelector("#question")
const choices = Array.from(document.querySelectorAll(".choice-text"))
const progressText = document.querySelector("#progressText")
const scoreText = document.querySelector("#score")
const ProgressBarFull = document.querySelector("#progressBarFull")

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "What does CSS stand for?",
        choice1: "Cows Standing Still",
        choice2: "Cascading Style Sheets",
        choice3: "Casually Selling Salmon",
        choice4: "Cascading Style Script",
        answer: "Cascading Style Sheets",
    },
    {
        question: "Which programming language was invented by Brendan Eich?",
        choice1: "C#",
        choice2: "Python",
        choice3: "Javascript",
        choice4: "C++",
        answer: "Javascript",
    },
    {
        question: "What was the original name for Bootstrap?",
        choice1: "Twitter Blueprint",
        choice2: "Beltstrap",
        choice3: "Twitter Framework",
        choice4: "Tailwind",
        answer: "Twitter Blueprint",
    },
    {
        question: "Who is the best instructor in the game?",
        choice1: "Nate Perfetti",
        choice2: "Nate Perfetti",
        choice3: "Nate Perfetti",
        choice4: "Nathan Perfetti",
        answer: "Nate Perfetti",
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNextQuestion()
}

getNextQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign("/end.html")
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let ClassToApply = selectedAnswer == currentQuestions.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestions()

        
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()