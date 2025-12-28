// filepath: script.js

// ตัวแปรเก็บตัวเลขลับ
let secretNumber = 0;
// ตัวแปรนับจํานวนครั้งที่ทาย
let attemptCount = 0;
let maxNumber = 100; // default range
// ฟังก์ชันเริ่มเกมใหม่
function initializeGame() {
  // ดึงค่าระดับความยากจาก dropdown
  const difficultySelect = document.getElementById("difficultySelect");
  maxNumber = parseInt(difficultySelect.value);

  // อัปเดตข้อความ range
  const rangeText = document.getElementById("rangeText");
  rangeText.textContent = `ทายตัวเลขตั้งแต่ 1 ถึง ${maxNumber}`;

  // สุ่มตัวเลขลับใหม่
  secretNumber = Math.floor(Math.random() * maxNumber) + 1;
  attemptCount = 0;
  updateDisplay();
  document.getElementById("resultContainer").innerHTML = "";
  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").focus();
}

// ...existing code...
// ฟังก์ชันตรวจสอบการทาย
function checkGuess() {
  const guessInput = document.getElementById("guessInput");
  const guessValue = parseInt(guessInput.value);
  const resultContainer = document.getElementById("resultContainer");

  // Validation: ตรวจสอบว่าใส่ตัวเลขหรือไม่
  if (isNaN(guessValue) || guessInput.value === "") {
    resultContainer.innerHTML = `
      <div class="alert alert-danger" role="alert">
        กรุณาใส่ตัวเลข!
      </div>`;
    return;
  }

  // Validation: ตรวจสอบช่วงตัวเลขตาม difficulty
  if (guessValue < 1 || guessValue > maxNumber) {
    resultContainer.innerHTML = `
      <div class="alert alert-danger" role="alert">
        กรุณาใส่ตัวเลขระหว่าง 1 ถึง ${maxNumber}!
      </div>`;
    return;
  }

  // ... validation code ...
  attemptCount++; // เพิ่มจำนวนครั้งทาย

  // ตรวจสอบถูกหรือไม่
  if (guessValue === secretNumber) {
    resultContainer.innerHTML = `
      <div class="alert alert-success" role="alert">
        <h5>✓ ถูกต้อง!</h5>
        <p>คุณทายถูกในครั้งที่ ${attemptCount}</p>
      </div>`;
  } else if (guessValue > secretNumber) {
    resultContainer.innerHTML = `
      <div class="alert alert-warning" role="alert">
        ↓ ตัวเลขสูงไป
      </div>`;
  } else {
    resultContainer.innerHTML = `
      <div class="alert alert-info" role="alert">
        ↑ ตัวเลขตํ่าไป
      </div>`;
  }

  updateDisplay();
  guessInput.value = "";
  guessInput.focus();
}
// ...existing code...

// ฟังก์ชันอัปเดตจํานวนครั้ง
function updateDisplay() {
  const attemptsContainer = document.getElementById("attemptsContainer");
  attemptsContainer.textContent = `ทายแล้ว: ${attemptCount} ครั้ง`;
}

// filepath: script.js
// ...existing code...

// เพิ่มการ select text เมื่อคลิก input
document.addEventListener("DOMContentLoaded", function () {
  const guessInput = document.getElementById("guessInput");
  guessInput.addEventListener("focus", function () {
    this.select();
  });
});
// ...existing code...

// ...existing code...
// เพิ่มการรองรับ Enter key
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("guessInput")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        checkGuess();
      }
    });
});
// ...existing code...

// ...existing code...
// ฟังก์ชันเริ่มเกมใหม่
function resetGame() {
  initializeGame();
  document.getElementById("resultContainer").innerHTML = "";
  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").focus();
}
// ...existing code...
// เริ่มเกมเมื่อโหลดหน้า
window.addEventListener("load", initializeGame);
