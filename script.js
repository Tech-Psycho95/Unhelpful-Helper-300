const centerAttemptBtn = document.getElementById("center-attempt-btn");
const centerTarget = document.getElementById("center-target");
const volumeSlider = document.getElementById("volume-slider");
const volumeValue = document.getElementById("volume-value");
const fakeShakeBtn = document.getElementById("fake-shake-btn");
const doSomethingBtn = document.getElementById("do-something-btn");
const infiniteLoader = document.getElementById("infinite-loader");
const completeTaskBtn = document.getElementById("complete-task-btn");
const progressFill = document.getElementById("reverse-progress-fill");
const progressText = document.getElementById("progress-text");
const progressShell = document.querySelector(".progress-shell");
const complimentForm = document.getElementById("compliment-form");
const complimentOutput = document.getElementById("compliment-output");

const sarcasticCompliments = [
  "Nice try, champ.",
  "Incredible confidence for that input.",
  "Your form had vibes, if not accuracy.",
  "Bold strategy. Zero notes, mostly because we ignored it.",
  "You are the reason placeholder text has trust issues.",
  "Stunning effort. The server laughed softly.",
  "You clicked submit like a true innovator.",
];

let reverseProgress = 100;
let spinningForever = false;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 1) CSS Un-centering Engine: any centering attempt gets launched to random corners.
function shoveToRandomCorner() {
  const margin = randomInt(4, 22);
  const corner = randomInt(1, 4);

  centerTarget.classList.add("chaos");
  centerTarget.style.transform = `rotate(${randomInt(-9, 9)}deg)`;

  if (corner === 1) {
    centerTarget.style.top = `${margin}px`;
    centerTarget.style.left = `${margin}px`;
    centerTarget.style.right = "auto";
    centerTarget.style.bottom = "auto";
  } else if (corner === 2) {
    centerTarget.style.top = `${margin}px`;
    centerTarget.style.right = `${margin}px`;
    centerTarget.style.left = "auto";
    centerTarget.style.bottom = "auto";
  } else if (corner === 3) {
    centerTarget.style.bottom = `${margin}px`;
    centerTarget.style.left = `${margin}px`;
    centerTarget.style.top = "auto";
    centerTarget.style.right = "auto";
  } else {
    centerTarget.style.bottom = `${margin}px`;
    centerTarget.style.right = `${margin}px`;
    centerTarget.style.top = "auto";
    centerTarget.style.left = "auto";
  }
}

centerAttemptBtn.addEventListener("click", () => {
  centerTarget.textContent = "Centering attempt detected.";
  shoveToRandomCorner();
});

// 2) Shake-to-Volume: changing volume by movement, occasionally in reverse.
function applyChaoticVolumeDelta(baseDelta) {
  const invertChance = Math.random() < 0.35;
  const signedDelta = invertChance ? -baseDelta : baseDelta;
  const current = Number(volumeSlider.value);
  const next = Math.max(0, Math.min(100, current + signedDelta));
  volumeSlider.value = String(next);
  volumeValue.textContent = `${next}%`;
}

volumeSlider.addEventListener("input", (event) => {
  // Dragging is disallowed: snap back and shame politely.
  event.preventDefault();
  volumeSlider.value = volumeValue.textContent.replace("%", "");
});

fakeShakeBtn.addEventListener("click", () => {
  applyChaoticVolumeDelta(randomInt(5, 18));
});

let lastShakeTime = 0;

window.addEventListener("devicemotion", (event) => {
  const a = event.accelerationIncludingGravity;
  if (!a) {
    return;
  }

  const magnitude = Math.sqrt((a.x || 0) ** 2 + (a.y || 0) ** 2 + (a.z || 0) ** 2);
  const now = Date.now();

  if (magnitude > 19 && now - lastShakeTime > 280) {
    lastShakeTime = now;
    applyChaoticVolumeDelta(randomInt(2, 12));
  }
});

// 3) Infinite Loading Spinner: no completion path by design.
doSomethingBtn.addEventListener("click", () => {
  if (spinningForever) {
    return;
  }
  spinningForever = true;
  doSomethingBtn.disabled = true;
  doSomethingBtn.textContent = "Something is being done...";
  infiniteLoader.classList.remove("hidden");
});

// 4) Reverse Progress Bar drains as user completes fake tasks.
completeTaskBtn.addEventListener("click", () => {
  reverseProgress = Math.max(0, reverseProgress - randomInt(7, 21));
  progressFill.style.width = `${reverseProgress}%`;
  progressText.textContent = `${reverseProgress}% complete. Progress is fleeing.`;
  progressShell.setAttribute("aria-valuenow", String(reverseProgress));

  if (reverseProgress === 0) {
    completeTaskBtn.textContent = "No tasks left to un-complete";
    completeTaskBtn.disabled = true;
  }
});

// 5) AI Compliment Generator ignores form and returns sarcastic praise.
complimentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const randomLine = sarcasticCompliments[randomInt(0, sarcasticCompliments.length - 1)];
  complimentOutput.textContent = randomLine;
  complimentForm.reset();
});
