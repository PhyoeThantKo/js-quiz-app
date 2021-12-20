const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answerbuttons')
let count = document.getElementById('count')
let currentCount = 0
let countController = [ 1, 2, 3, 4, 5]


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
     currentQuestionIndex++
     setNextQuestion()
})


function startGame() {
     startButton.classList.add('hide')
     count.innerText = 0
     shuffledQuestions = questions.sort( () => Math.random() - .5)
     currentQuestionIndex = 0
     questionContainerElement.classList.remove('hide')
     setNextQuestion()
}

function setNextQuestion() {
     resetState()
     showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
     questionElement.innerText = question.question
     question.answers.forEach(answer => {
          const button = document.createElement('button')
          button.innerText = answer.text
          button.classList.add('btn')
          if (answer.correct) {
               button.dataset.correct = answer.correct
          }
          button.addEventListener('click', selectAnswer)
          answerButtonsElement.appendChild(button)
     })
}

function resetState() {
     clearStatusClass(document.body)
     nextButton.classList.add('hide')
     while (answerButtonsElement.firstChild){
          answerButtonsElement.removeChild(answerButtonsElement.firstChild)
     }

}

function selectAnswer(e) {
     const selectedButton = e.target
     const correct = selectedButton.dataset.correct
     if (correct) {
          currentCount++
          count.innerText = currentCount
          
     }else {
          currentCount--
          count.innerText = currentCount
     }
     setStatusClass(document.body, correct)
     Array.from(answerButtonsElement.children).forEach(button => {
       setStatusClass(button, button.dataset.correct)
     })
     if(shuffledQuestions.length > currentQuestionIndex + 1){
          nextButton.classList.remove('hide')
     } else{
          startButton.innerText = "Restart"
          startButton.classList.remove('hide')
     }
}

function setStatusClass(element, correct) {
     clearStatusClass(element)
     if(correct){
          element.classList.add('correct')
     } else {
          element.classList.add('wrong')
     }
}

function clearStatusClass(element) {
     element.classList.remove('correct')
     element.classList.remove('wrong')
}

const questions = [
     {
          question: 'What is 2+2?',
          answers: [
               { text: '4', correct: true },
               { text: '22', correct: false}
          ]
     },
     {
          question: 'who is the father of MAL?',
          answers: [
               { text: 'Thaung Hlaing', correct: false},
               { text: 'woof woof', correct: true},
               { text: 'Hlaing Thaung', correct: false },
               { text: 'Khin Hlaing', correct: false}
          ]
     },
     {
          question: 'Have you followed my page, PTK, on facebook?',
          answers: [
               { text: 'yes, I have followed', correct: true},
               { text: 'no', correct: false},
               { text: 'who are you?', correct: false }
          ]
     },

]