// === schedule.jsonの読み込みとリアルタイム表示処理 ===

// スケジュール表示対象の要素
const scheduleTitle = document.getElementById("scheduleTitle");
const scheduleTime = document.getElementById("scheduleTime");
const scheduleDescription = document.getElementById("scheduleDescription");
const scheduleSection = document.querySelector(".schedule");

let schedules = [];

// JSONファイルを読み込む
fetch("schedule.json")
  .then(response => {
    if (!response.ok) throw new Error("JSONの読み込みに失敗しました");
    return response.json();
  })
  .then(data => {
    schedules = data.map(item => ({
      title: item.title,
      time: new Date(item.time),
      description: item.description
    }));

    // 最初に表示チェック実行
    checkAndDisplaySchedule();

    // 1秒ごとに更新（リアルタイム）
    setInterval(checkAndDisplaySchedule, 1000);
  })
  .catch(error => console.error(error));

function checkAndDisplaySchedule() {
  const now = new Date();

  // 表示対象を「予定時刻の30分前～予定時刻まで」に限定
  const activeSchedule = schedules.find(item => {
    const diffMs = item.time - now;
    const diffMin = diffMs / 1000 / 60;
    return diffMin <= 30 && diffMin >= 0;
  });

  if (activeSchedule) {
    // 対象あり → データを反映
    const timeStr = activeSchedule.time.toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit"
    });
    scheduleTitle.textContent = activeSchedule.title;
    scheduleTime.textContent = timeStr;
    scheduleDescription.textContent = activeSchedule.description;
  } else {
    // 対象なし → sectionは残して中身を初期化
    scheduleTitle.textContent = "";
    scheduleTime.textContent = "";
    scheduleDescription.textContent = "";
  }
}
