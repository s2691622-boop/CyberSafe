(function () {
  var navEl = document.querySelector("nav");
  var footerEl = document.querySelector("footer");

  if (navEl) {
    navEl.innerHTML =
      '<a href="index.html" class="logo">🛡️ CyberSafe</a>' +
      '<button type="button" class="menu-toggle" aria-label="Open navigation menu" aria-expanded="false" aria-controls="site-menu">' +
      "<span></span><span></span><span></span>" +
      "</button>" +
      '<div class="menu" id="site-menu">' +
      '<a href="index.html">Home</a>' +
      '<a href="about.html">About</a>' +
      '<a href="scams.html">Types of Scams</a>' +
      '<a href="detect.html">Detect a Scam</a>' +
      '<a href="safety.html">Safety Tips</a>' +
      '<a href="quiz.html">Quiz</a>' +
      '<a href="survey.html">Survey</a>' +
      '<a href="contact.html">Contact</a>' +
      "</div>";

    var menuToggle = navEl.querySelector(".menu-toggle");
    var menu = navEl.querySelector(".menu");
    menuToggle.addEventListener("click", function () {
      var isOpen = navEl.classList.toggle("menu-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    menu.addEventListener("click", function (event) {
      if (event.target.tagName !== "A") return;
      navEl.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  }

  if (footerEl) {
    footerEl.innerHTML =
      "<p>© 2026 CyberSafe</p>" +
      "<p>Phishing, Scam & Fraud Detection Awareness Program</p>";
  }

  var page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu a").forEach(function (link) {
    if (link.getAttribute("href") === page) {
      link.setAttribute("aria-current", "page");
    }
  });
})();
