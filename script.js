function checkScam(option) {
  var result = document.getElementById("detector-result");
  if (!result) return;
  var ok = option === "scam";
  result.className = ok ? "correct-result" : "wrong-result";
  result.textContent = ok
    ? "✅ Correct! This message has several warning signs such as an unexpected reward, urgency and a suspicious link."
    : "❌ Be careful! This message contains several warning signs and should be treated as suspicious.";
}

function calculateQuiz() {
  var answers = { q1: "b", q2: "b", q3: "c", q4: "b", q5: "b" };
  var score = 0;
  var total = 5;

  for (var i = 1; i <= total; i++) {
    var picked = document.querySelector('input[name="q' + i + '"]:checked');
    if (picked && picked.value === answers["q" + i]) score++;
  }

  var box = document.getElementById("quiz-result");
  if (!box) return;

  var message;
  if (score === total) {
    message = "🌟 Excellent! You have a strong understanding of cyber safety.";
  } else if (score >= 3) {
    message = "👍 Good job! You have basic awareness, but keep learning.";
  } else {
    message =
      "📚 Keep learning! Improving your cyber awareness can help you make safer decisions online.";
  }

  box.replaceChildren();
  var heading = document.createElement("h2");
  heading.textContent = "Your Result";
  var scoreP = document.createElement("p");
  scoreP.append("Score: ");
  var scoreStrong = document.createElement("strong");
  scoreStrong.textContent = score + " / " + total;
  scoreP.append(scoreStrong);
  var pctP = document.createElement("p");
  pctP.append("Percentage: ");
  var pctStrong = document.createElement("strong");
  pctStrong.textContent = (score / total) * 100 + "%";
  pctP.append(pctStrong);
  var msgP = document.createElement("p");
  msgP.textContent = message;
  box.append(heading, scoreP, pctP, msgP);
}

document.addEventListener("DOMContentLoaded", function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var canvas = document.createElement("canvas");
  canvas.id = "matrixCanvas";
  document.body.insertBefore(canvas, document.body.firstChild);

  var ctx = canvas.getContext("2d");
  var particles = [];
  var props = {
    bgColor: "rgba(11, 17, 32, 1)",
    particleColor: "rgba(0, 240, 255, 0.5)",
    particleRadius: 3,
    particleCount: 60,
    particleMaxVelocity: 0.5,
    lineLength: 150,
    particleLife: 6
  };
  var frameId = 0;

  function sizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function randomVelocity() {
    return Math.random() * (props.particleMaxVelocity * 2) - props.particleMaxVelocity;
  }

  function Particle() {
    this.reset();
  }

  Particle.prototype.reset = function () {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.velocityX = randomVelocity();
    this.velocityY = randomVelocity();
    this.life = Math.random() * props.particleLife * 60;
  };

  Particle.prototype.tick = function () {
    if (this.life < 1) this.reset();
    this.life--;
    if (
      (this.x + this.velocityX > canvas.width && this.velocityX > 0) ||
      (this.x + this.velocityX < 0 && this.velocityX < 0)
    ) {
      this.velocityX *= -1;
    }
    if (
      (this.y + this.velocityY > canvas.height && this.velocityY > 0) ||
      (this.y + this.velocityY < 0 && this.velocityY < 0)
    ) {
      this.velocityY *= -1;
    }
    this.x += this.velocityX;
    this.y += this.velocityY;
    ctx.beginPath();
    ctx.arc(this.x, this.y, props.particleRadius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = props.particleColor;
    ctx.fill();
  };

  function drawLines() {
    var len = particles.length;
    for (var i = 0; i < len; i++) {
      for (var j = i + 1; j < len; j++) {
        var dx = particles[j].x - particles[i].x;
        var dy = particles[j].y - particles[i].y;
        var length = Math.sqrt(dx * dx + dy * dy);
        if (length >= props.lineLength) continue;
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgba(0, 240, 255, " + (1 - length / props.lineLength) + ")";
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  function loop() {
    ctx.fillStyle = props.bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++) particles[i].tick();
    drawLines();
    frameId = requestAnimationFrame(loop);
  }

  function setRunning(running) {
    if (running) {
      if (!frameId) frameId = requestAnimationFrame(loop);
    } else {
      cancelAnimationFrame(frameId);
      frameId = 0;
    }
  }

  sizeCanvas();
  window.addEventListener("resize", sizeCanvas);
  document.addEventListener("visibilitychange", function () {
    setRunning(!document.hidden);
  });

  for (var n = 0; n < props.particleCount; n++) particles.push(new Particle());
  setRunning(true);
});
