let state = {
  xp: 0,
  level: 1,
  streak: 0,
  lastActive: null,

  book: null,
  chapter: 0,
  mission: 0
};

// ---------------- INIT ----------------
function init() {
  renderLibrary();
  updateStats();
  speak("Welcome back, reader.");
}

window.onload = init;

// ---------------- LIBRARY ----------------
function renderLibrary() {
  const lib = document.getElementById("library");

  lib.innerHTML = BOOKS.map(b => `
    <div class="book" onclick="startBook(${b.id})">
      <h3>${b.title}</h3>
      <p>${b.author}</p>
    </div>
  `).join("");
}

// ---------------- GAME START ----------------
function startBook(id) {
  state.book = BOOKS.find(b => b.id === id);
  state.chapter = 0;
  state.mission = 0;

  speak("Mission started");
  updateStreak();
  loadMission();
}

// ---------------- MISSIONS ----------------
function loadMission() {
  const m = state.book.chapters[0].missions[state.mission];

  document.getElementById("screen").innerHTML = `
    <h2>${state.book.title}</h2>
    <p class="mission">${m.text}</p>

    <button onclick="nextMission()">Continue Mission</button>
  `;

  speak("Reading sequence active");
  addXP(5);
}

function nextMission() {
  state.mission++;

  if (state.mission < state.book.chapters[0].missions.length) {
    loadMission();
  } else {
    loadQuiz();
  }
}

// ---------------- QUIZ ----------------
function loadQuiz() {
  const q = state.book.chapters[0].quiz;

  document.getElementById("screen").innerHTML = `
    <h3>Memory Check</h3>
    <p>${q.q}</p>

    ${q.options.map(o => `
      <button onclick="check('${o}')">${o}</button>
    `).join("")}
  `;
}

function check(ans) {
  const q = state.book.chapters[0].quiz;

  if (ans === q.answer) {
    addXP(30);
    speak("Correct. Memory locked.");
  } else {
    addXP(10);
    speak("Incorrect. Learning reinforced.");
  }

  renderLibrary();
}

// ---------------- XP SYSTEM ----------------
function addXP(val) {
  state.xp += val;

  if (state.xp >= state.level * 100) {
    state.level++;
    speak("LEVEL UP → " + state.level);
  }

  updateStats();
}

// ---------------- STREAK SYSTEM (DUOLINGO STYLE) ----------------
function updateStreak() {
  const today = new Date().toDateString();

  if (state.lastActive !== today) {
    state.streak++;
    state.lastActive = today;

    speak(`Streak increased → ${state.streak}`);
  }

  updateStats();
}

// ---------------- UI ----------------
function updateStats() {
  document.getElementById("stats").innerText =
    `XP ${state.xp} | LVL ${state.level} | STREAK ${state.streak} 🔥`;
}

// ---------------- AI HOLOGRAM ----------------
function speak(text) {
  document.getElementById("aiText").innerText = text;
}
