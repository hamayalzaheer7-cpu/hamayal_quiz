// Questions
var questions = [
    { question: "1. How many pillars of Islam are there?", options: ["3", "4", "5", "6"], answer: 2 },
    { question: "2. What is the holy book of Islam?", options: ["Bible", "Torah", "Quran", "Psalms"], answer: 2 },
    { question: "3. How many daily prayers do Muslims perform?", options: ["3", "4", "5", "6"], answer: 2 },
    { question: "4. In which month do Muslims fast?", options: ["Muharram", "Ramadan", "Shawwal", "Rajab"], answer: 1 },
    { question: "5. What is the first month of the Islamic calendar?", options: ["Ramadan", "Safar", "Muharram", "Shawwal"], answer: 2 },
    { question: "6. Where is the Kaaba?", options: ["Madinah", "Makkah", "Jerusalem", "Cairo"], answer: 1 },
    { question: "7. Who is the last Prophet?", options: ["Musa", "Isa", "Ibrahim", "Muhammad (PBUH)"], answer: 3 },
    { question: "8. What is the declaration of faith?", options: ["Shahada", "Zakat", "Sawm", "Hajj"], answer: 0 },
    { question: "9. Which angel brought revelation?", options: ["Mikail", "Jibreel", "Israfeel", "Izraeel"], answer: 1 },
    { question: "10. Which direction do Muslims face in prayer?", options: ["North", "East", "Kaaba", "West"], answer: 2 }
];

var index = 0, score = 0, selected = -1;

// Show question
function showQuestion() {
    selected = -1;
    document.getElementById("progress").innerText = "Question " + (index + 1) + " of 10";
    document.getElementById("question").innerText = questions[index].question;

    var options = "";
    for (var i = 0; i < questions[index].options.length; i++) {
        options += `<button class="option" onclick="selectOption(${i})">${questions[index].options[i]}</button>`;
    }
    document.getElementById("options").innerHTML = options;
}

// Select answer
function selectOption(i) {
    selected = i;
    var buttons = document.getElementsByClassName("option");

    for (var j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove("selected");
    }
    buttons[i].classList.add("selected");
}

// Next question
function nextQuestion() {
    if (selected == -1) {
        alert("Please select an answer!");
        return;
    }

    if (selected == questions[index].answer) score++;

    index++;
    if (index < questions.length) showQuestion();
    else showResult();
}

// Show and save result
function showResult() {
    document.getElementById("progress").innerText = "Quiz Completed!";
    document.getElementById("question").innerText = "";
    document.getElementById("options").innerHTML = "";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("result").innerText = "Your Score: " + score + " / 10";

    var results = JSON.parse(localStorage.getItem("islamicResults")) || [];
    results.push("Score: " + score + " / 10");
    localStorage.setItem("islamicResults", JSON.stringify(results));
    showHistory();
}

// Show history
function showHistory() {
    var results = JSON.parse(localStorage.getItem("islamicResults")) || [];
    document.getElementById("history").innerHTML = "";

    for (var i = 0; i < results.length; i++) {
        document.getElementById("history").innerHTML +=
            `<p>Attempt ${i + 1}: ${results[i]} <button onclick="deleteResult(${i})">Delete</button></p>`;
    }
}

// Delete result
function deleteResult(i) {
    var results = JSON.parse(localStorage.getItem("islamicResults")) || [];
    results.splice(i, 1);
    localStorage.setItem("islamicResults", JSON.stringify(results));
    showHistory();
}

showHistory();
showQuestion();
