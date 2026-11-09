(function () {
  var btn = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#site-nav");
  if (!btn || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  btn.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setOpen(false);
  });

  var links = Array.prototype.slice.call(nav.querySelectorAll("a[href^='#']"));
  var sections = links
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || !sections.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          var current = link.getAttribute("href") === "#" + entry.target.id;
          if (current) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();

(function () {
  var buttons = document.querySelectorAll(".song-play");
  if (!buttons.length) return;

  var players = [];

  Array.prototype.forEach.call(buttons, function (button) {
    var audioId = button.getAttribute("aria-controls");
    var audio = audioId ? document.getElementById(audioId) : null;
    if (!audio) return;

    var label = button.querySelector(".song-play-label");
    var playText = label ? label.textContent : "";
    var pauseText = button.getAttribute("data-pause-label") || "Pause";

    function setPlaying(playing) {
      button.setAttribute("aria-pressed", playing ? "true" : "false");
      button.classList.toggle("is-playing", playing);
      if (label) label.textContent = playing ? pauseText : playText;
    }

    button.addEventListener("click", function () {
      if (audio.paused) {
        players.forEach(function (other) {
          if (other !== audio && !other.paused) other.pause();
        });
        var pending = audio.play();
        if (pending && pending.catch) pending.catch(function () {});
      } else {
        audio.pause();
      }
    });

    audio.addEventListener("play", function () { setPlaying(true); });
    audio.addEventListener("pause", function () { setPlaying(false); });
    audio.addEventListener("ended", function () {
      audio.currentTime = 0;
      setPlaying(false);
    });

    players.push(audio);
  });
})();
