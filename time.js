"use strict";

const currentTimeDisplay = document.getElementById("currentTime");
const currentTimeSecondDisplay = document.getElementById("currentTimeSecond");
const message = document.getElementById("message");
const inputTime = document.getElementById("alarmTime");

let watchId = null;
let stopFlag = false;

// 現在時刻を常に表示
function updateCurrentTime() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    currentTimeDisplay.textContent = `${hh}:${mm}`;
    currentTimeSecondDisplay.textContent = `${ss}`;
}
setInterval(updateCurrentTime, 1000);
updateCurrentTime();

// アラームセット
document.getElementById("set").addEventListener("click", () => {
    const targetTime = inputTime.value;
    if (!targetTime) {
    message.textContent = "Please enter the alarm time.";
    return;
    }

    stopFlag = false;
    message.textContent = `alarm set:  ${targetTime}`;

    if (watchId) clearInterval(watchId);

    watchId = setInterval(() => {
    if (stopFlag) return;

    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    const current = `${hh}:${mm}:${ss}`;

    let target = targetTime;
    if (target.length === 5) target += ":00"; // 秒が未指定なら00秒扱い

    if (current === target) {
        clearInterval(watchId);
        message.textContent = "It's time！";

        const alarmImg = document.getElementById("alarmImg");
        alarmImg.src = "img/mezamashi2.png";
        alarmImg.classList.add("shake");

        // クリックで元に戻す処理
        alarmImg.onclick = () => {
        alarmImg.src = "img/mezamashi.png";
        alarmImg.classList.remove("shake");

        // alarmTime の値をリセット
        const alarmInput = document.getElementById("alarmTime");
        if (alarmInput) {
            alarmInput.value = ""; // 入力を空にする
        }

        // 表示中のメッセージもリセット（必要なら）
        message.textContent = "Please enter the alarm time.";
        };
    }
    }, 1000);
});

// ストップボタン
document.getElementById("stop").addEventListener("click", () => {
    stopFlag = true;
    if (watchId) clearInterval(watchId);
    message.textContent = "The alarm stopped.";
});