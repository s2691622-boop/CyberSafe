/* =========================================
   CYBERSAFE JAVASCRIPT
   ========================================= */


/* ---------- OLD SIMPLE QUIZ ---------- */

function answer(option) {

    var result = document.getElementById("result");

    if (option == "correct") {

        result.innerHTML =
            "✅ Correct! Always verify suspicious messages before clicking links or sharing information.";

    } else {

        result.innerHTML =
            "❌ Not the safest choice. Stop and verify the message first.";

    }

}


/* ---------- SCAM DETECTOR ---------- */

function checkScam(option) {

    var result = document.getElementById("detector-result");

    if (option == "scam") {

        result.innerHTML =
            "<div class='correct-result'>" +
            "✅ Correct! This message has several warning signs such as an unexpected reward, urgency and a suspicious link." +
            "</div>";

    } else {

        result.innerHTML =
            "<div class='wrong-result'>" +
            "❌ Be careful! This message contains several warning signs and should be treated as suspicious." +
            "</div>";

    }

}


/* ---------- QUIZ ---------- */

function calculateQuiz() {

    var score = 0;


    var q1 = document.querySelector('input[name="q1"]:checked');

    var q2 = document.querySelector('input[name="q2"]:checked');

    var q3 = document.querySelector('input[name="q3"]:checked');

    var q4 = document.querySelector('input[name="q4"]:checked');

    var q5 = document.querySelector('input[name="q5"]:checked');


    if (q1 != null && q1.value == "correct") {
        score++;
    }


    if (q2 != null && q2.value == "correct") {
        score++;
    }


    if (q3 != null && q3.value == "correct") {
        score++;
    }


    if (q4 != null && q4.value == "correct") {
        score++;
    }


    if (q5 != null && q5.value == "correct") {
        score++;
    }


    var percentage = (score / 5) * 100;


    var message = "";


    if (score == 5) {

        message =
            "🌟 Excellent! You have a strong understanding of cyber safety.";

    }

    else if (score >= 3) {

        message =
            "👍 Good job! You have basic awareness, but keep learning.";

    }

    else {

        message =
            "📚 Keep learning! Improving your cyber awareness can help you make safer decisions online.";

    }


    document.getElementById("quiz-result").innerHTML =

        "<h2>Your Result</h2>" +

        "<p>Score: <strong>" + score + " / 5</strong></p>" +

        "<p>Percentage: <strong>" + percentage + "%</strong></p>" +

        "<p>" + message + "</p>";

}