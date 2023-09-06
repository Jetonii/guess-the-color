function formatTime(minutes) {
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes - mins) * 60);
    const formattedMins = String(mins).padStart(2, '0');
    const formattedSecs = String(secs).padStart(2, '0');
    return `${formattedMins}:${formattedSecs}`;
}


const measureResults = () => {
    var score = localStorage.getItem("score");
    var nrQuestions = localStorage.getItem("nrQuestions");
    var timePassed = localStorage.getItem("timePassed");
    const resultTextEl = document.querySelector(".result-text")
    const resultEl = document.querySelector(".result")
    const timeEl = document.querySelector(".result-time")
    var result = score / nrQuestions * 10; // Multiply by 10 not by 100 because score for question is 10
    resultEl.innerHTML = `Result: ${score}/${nrQuestions * 10}`
    timeEl.innerHTML = `Time: ${formatTime(timePassed)}`
    if (result < 30) {
        resultTextEl.innerHTML = "Oooh, you can do better!"
        resultEl.classList.add("badResult")
    } else if (result < 60) {
        resultTextEl.innerHTML = "Good, but you can do even better!";
        resultEl.classList.add("fineResult")
    } else if (result >= 60 && result <= 100) {
        resultTextEl.innerHTML = "Suuper, such a nice score!"
        resultEl.classList.add("superResult")
    }
}

measureResults()