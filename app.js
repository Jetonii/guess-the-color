const nextButton = document.querySelector("button.next")
const switchButton = document.querySelector("button.switch")
const code = document.querySelector(".color-code")
const options = document.querySelectorAll(".option")
const question = document.querySelector(".options .question span")
const scoreEl = document.querySelector(".options .score span")



let context = "code"
let score = 0;
let currentQuestion = 1;
let nrQuestions = 10;
question.innerHTML = `${currentQuestion}/${nrQuestions}`;
scoreEl.innerHTML = `${score}/${(currentQuestion - 1) * 10}`
let startTime;

for (let i = 0; i < options.length; i++) {
    options[i].addEventListener('click', () => {
        options.forEach(element => {
            element.classList.remove("selected")
        });
        options[i].classList.add("selected")
    })
}

const generateRandomRGB = () => {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var colorList = [red, green, blue]
    return colorList
}

let correctOption;
const generateRandomQuestion = () => {
    var correctColor = generateRandomRGB();
    code.innerHTML = `RGB(${correctColor[0]}, ${correctColor[1]}, ${correctColor[2]})`
    correctOption = Math.floor(Math.random() * 4);
    options[correctOption].style.backgroundColor = `rgb(${correctColor[0]}, ${correctColor[1]}, ${correctColor[2]})`;
    for (let i = 0; i < options.length; i++) {
        if (i != correctOption) {
            var optionColor = generateRandomRGB();
            options[i].style.backgroundColor = `rgb(${optionColor[0]}, ${optionColor[1]}, ${optionColor[2]})`;
        }
    }
}


const startGame = () => {
    startTime = new Date();
    document.querySelectorAll(`.option span.correct`).forEach(el => el.style.display = 'none')
    generateRandomQuestion();
    currentQuestion = 1;
    score = 0;
    nextButton.disabled = false
    question.innerHTML = `${currentQuestion}/${nrQuestions}`;
    scoreEl.innerHTML = `${score}/${(currentQuestion - 1) * 10}`
    localStorage.clear();
}

startGame();

const checkAnswer = () => {
    options[correctOption].classList.add("correct")
    let selectedOption;
    for (let i = 0; i < options.length; i++) {
        if (options[i].classList.contains("selected")) {
            selectedOption = i;
        }
        if (i == correctOption) {
            document.querySelector(`.option:nth-child(${i + 1}) span.correct`).style.display = 'block'
        } else {
            options[i].classList.add("wrong")
        }
    }

    currentQuestion++;
    if (correctOption === selectedOption) {
        score += 10;
    }

    setTimeout(() => {
        question.innerHTML = `${currentQuestion}/${nrQuestions}`;
        scoreEl.innerHTML = `${score}/${(currentQuestion - 1) * 10}`
    }, 2500)
}

nextButton.addEventListener("click", () => {
    nextButton.disabled = true
    checkAnswer()
    setTimeout(function () {
        if (currentQuestion === nrQuestions) {
            nextButton.innerHTML = "Submit"
        }
        if (currentQuestion > nrQuestions) {
            let endTime = new Date();
            const timePassedInMinutes = (endTime - startTime) / (1000 * 60);
            console.log("time: " + endTime - startTime)
            localStorage.setItem("score", score);
            localStorage.setItem("nrQuestions", nrQuestions)
            localStorage.setItem("timePassed", timePassedInMinutes)

            window.location.href = "/result.html"
        }
        document.querySelectorAll(`.option span.correct`).forEach(el => el.style.display = 'none')
        generateRandomQuestion();
        nextButton.disabled = false
        question.innerHTML = `${currentQuestion}/${nrQuestions}`;
        if (currentQuestion === nrQuestions) {
        }
        scoreEl.innerHTML = `${score}/${(currentQuestion - 1) * 10}`
    }, 2500);
})



