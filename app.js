const langData = {
  ja: { levels: ["JLPT N5", "JLPT N4", "JLPT N3", "JLPT N2", "JLPT N1"], pass: 80, time: 2400 },
  ko: { levels: ["TOPIK I (1級)", "TOPIK I (2級)", "TOPIK II"], pass: 80, time: 3600 },
  en: { levels: ["TOEIC 入門(300+)", "TOEIC 中級(500+)", "TOEIC 高階(700+)"], pass: 70, time: 2700 },
  fr: { levels: ["DELF A1", "DELF A2", "DELF B1"], pass: 60, time: 1800 },
  de: { levels: ["Goethe A1", "Goethe A2", "Goethe B1"], pass: 60, time: 1800 },
  es: { levels: ["DELE A1", "DELE A2", "DELE B1"], pass: 60, time: 2700 }
};

// 永久學習紀錄結構
let userState = JSON.parse(localStorage.getItem('user_lang_learning_data_v3')) || {
  progress: { ja: 0, ko: 0, en: 0, fr: 0, de: 0, es: 0 },
  xp: 0,
  historyLogs: [] // 記錄每一次的考試與練習紀錄
};

let currentLang = 'ja';
let vocabsData = [];
let examsData = [];
let examTimer = null;
let timeRemain = 0;
let userAnswers = {};
let currentQIdx = 0;

async function init() {
  try {
    const vRes = await fetch('data/basic_vocabs.json');
    vocabsData = (await vRes.json()).categories;
    const eRes = await fetch('data/exam_questions.json');
    examsData = (await eRes.json()).exams;

    bindEvents();
    renderPath();
    updateUI();
    renderHistoryLogs();
  } catch(e) { console.error("Data load err:", e); }
}

function bindEvents() {
  document.getElementById('lang-select').onchange = (e) => {
    currentLang = e.target.value;
    renderPath();
    updateExamIntro();
  };

  document.getElementById('tab-path').onclick = () => showTab('path');
  document.getElementById('tab-game').onclick = () => showTab('game');
  document.getElementById('tab-exam').onclick = () => { showTab('exam'); updateExamIntro(); };
  document.getElementById('tab-record').onclick = () => { showTab('record'); renderHistoryLogs(); };

  document.getElementById('btn-play-match').onclick = startMatchGame;
  document.getElementById('btn-close-game').onclick = () => {
    document.getElementById('game-board').classList.add('hidden');
  };

  document.getElementById('btn-start-exam').onclick = startExam;
  document.getElementById('btn-submit-exam').onclick = submitExam;
  document.getElementById('btn-back-map').onclick = () => {
    document.getElementById('exam-result-card').classList.add('hidden');
    document.getElementById('exam-start-card').classList.remove('hidden');
    showTab('path');
  };

  document.getElementById('btn-prev-q').onclick = () => { if(currentQIdx > 0) { currentQIdx--; renderQuestion(); } };
  document.getElementById('btn-next-q').onclick = () => {
    const qList = getQuestions();
    if(currentQIdx < qList.length - 1) { currentQIdx++; renderQuestion(); }
  };

  // 進度備份與還原事件
  document.getElementById('btn-export-data').onclick = exportProgress;
  document.getElementById('btn-import-data').onclick = () => document.getElementById('file-input').click();
  document.getElementById('file-input').onchange = importProgress;
}

function showTab(name) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.sec-box').forEach(s => s.classList.add('hidden'));

  document.getElementById(`tab-${name}`).classList.add('active');
  document.getElementById(`${name}-sec`).classList.remove('hidden');
}

function renderPath() {
  const container = document.getElementById('map-nodes');
  container.innerHTML = '';
  const lvls = langData[currentLang].levels;
  const currentUnlocked = userState.progress[currentLang] || 0;

  document.getElementById('current-lvl-badge').innerText = lvls[currentUnlocked];

  lvls.forEach((lvl, idx) => {
    const btn = document.createElement('button');
    if (idx < currentUnlocked) {
      btn.className = 'node-circle done'; btn.innerText = '✓';
    } else if (idx === currentUnlocked) {
      btn.className = 'node-circle current'; btn.innerText = '⭐';
    } else {
      btn.className = 'node-circle locked'; btn.innerText = '🔒';
    }

    btn.onclick = () => {
      if(idx <= currentUnlocked) {
        alert(`您當前進行至 [${lvl}]。請進入「擬真檢定」測驗合格以晉級！`);
      } else {
        alert(`🔒 該級別鎖定中！請先參加並通過前一級別的正式擬真檢定。`);
      }
    };
    container.appendChild(btn);
  });
}

function startMatchGame() {
  const cards = vocabsData.find(c => c.lang_code === currentLang)?.cards || [];
  if (cards.length < 4) return alert("單字資料載入中...");

  document.getElementById('game-board').classList.remove('hidden');
  const grid = document.getElementById('match-grid');
  grid.innerHTML = '';

  const pick = cards.slice(0, 4);
  let items = [];
  pick.forEach(c => {
    items.push({ id: c.id, text: c.word, type: 'w' });
    items.push({ id: c.id, text: c.translation, type: 't' });
  });
  items.sort(() => Math.random() - 0.5);

  let first = null;
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'm-card';
    div.innerText = item.text;
    div.onclick = () => {
      if (div.classList.contains('matched')) return;
      if (!first) {
        first = { item, el: div };
        div.classList.add('selected');
      } else {
        if (first.el === div) return;
        if (first.item.id === item.id && first.item.type !== item.type) {
          first.el.classList.add('matched');
          div.classList.add('matched');
          userState.xp += 15;
          saveState();
          updateUI();
        } else {
          first.el.classList.remove('selected');
        }
        first = null;
      }
    };
    grid.appendChild(div);
  });
}

function updateExamIntro() {
  const cfg = langData[currentLang];
  const curLvlName = cfg.levels[userState.progress[currentLang] || 0];
  document.getElementById('exam-title').innerText = `${curLvlName} 官方擬真測驗`;
  document.getElementById('exam-desc').innerText = `⏱️ 時間：${Math.floor(cfg.time/60)} 分鐘 | 合格門檻：${cfg.pass} 分`;
}

function getQuestions() {
  return examsData.find(e => e.lang_code === currentLang)?.questions || [];
}

function startExam() {
  const cfg = langData[currentLang];
  timeRemain = cfg.time;
  userAnswers = {};
  currentQIdx = 0;

  document.getElementById('exam-start-card').classList.add('hidden');
  document.getElementById('exam-active-box').classList.remove('hidden');

  clearInterval(examTimer);
  examTimer = setInterval(() => {
    timeRemain--;
    const m = Math.floor(timeRemain / 60);
    const s = timeRemain % 60;
    document.getElementById('clock-display').innerText = `⏱️ ${m}:${s.toString().padStart(2, '0')}`;
    if (timeRemain <= 0) { clearInterval(examTimer); submitExam(); }
  }, 1000);

  renderSheet();
  renderQuestion();
}

function renderSheet() {
  const grid = document.getElementById('sheet-grid');
  grid.innerHTML = '';
  getQuestions().forEach((q, idx) => {
    const b = document.createElement('div');
    b.className = `s-bubble ${userAnswers[idx] !== undefined ? 'filled' : ''}`;
    b.innerText = idx + 1;
    b.onclick = () => { currentQIdx = idx; renderQuestion(); };
    grid.appendChild(b);
  });
}

function renderQuestion() {
  const qList = getQuestions();
  if(!qList.length) return;
  const q = qList[currentQIdx];

  document.getElementById('q-num-tag').innerText = `第 ${currentQIdx + 1} 題 / 共 ${qList.length} 題`;
  document.getElementById('q-text').innerText = q.question;

  const container = document.getElementById('opt-container');
  container.innerHTML = '';

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = `opt-btn ${userAnswers[currentQIdx] === idx ? 'selected' : ''}`;
    btn.innerText = opt;
    btn.onclick = () => {
      userAnswers[currentQIdx] = idx;
      renderSheet();
      renderQuestion();
    };
    container.appendChild(btn);
  });
}

function submitExam() {
  clearInterval(examTimer);
  const qList = getQuestions();
  let correct = 0;
  qList.forEach((q, idx) => { if (userAnswers[idx] === q.answer) correct++; });

  const score = Math.round((correct / (qList.length || 1)) * 100);
  const passScore = langData[currentLang].pass;
  const curLvlName = langData[currentLang].levels[userState.progress[currentLang] || 0];

  document.getElementById('exam-active-box').classList.add('hidden');
  document.getElementById('exam-result-card').classList.remove('hidden');
  document.getElementById('res-score').innerText = `${score} 分`;

  const isPassed = score >= passScore;

  // 寫入學習歷程 Log
  const logEntry = {
    date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    lang: currentLang.toUpperCase(),
    level: curLvlName,
    score: score,
    passed: isPassed
  };
  userState.historyLogs.unshift(logEntry);

  if (isPassed) {
    document.getElementById('res-icon').innerText = '🎓';
    document.getElementById('res-title').innerText = '合格！成功晉級！';
    document.getElementById('res-msg').innerText = `恭喜獲得 ${score} 分，已解鎖下一階段學習！`;
    if ((userState.progress[currentLang] || 0) < langData[currentLang].levels.length - 1) {
      userState.progress[currentLang]++;
    }
  } else {
    document.getElementById('res-icon').innerText = '💪';
    document.getElementById('res-title').innerText = '未達合格門檻';
    document.getElementById('res-msg').innerText = `得分 ${score} 分 (合格標準 ${passScore} 分)，再試一次！`;
  }

  saveState();
  renderPath();
}

function renderHistoryLogs() {
  const list = document.getElementById('history-log-list');
  list.innerHTML = '';

  if (!userState.historyLogs || userState.historyLogs.length === 0) {
    list.innerHTML = '<li class="empty-msg">尚無考試紀錄，快去挑戰擬真檢定吧！</li>';
    return;
  }

  userState.historyLogs.forEach(log => {
    const li = document.createElement('li');
    li.className = `log-item ${log.passed ? 'pass' : 'fail'}`;
    li.innerHTML = `
      <div class="log-info">
        <strong>[${log.lang}] ${log.level}</strong>
        <span class="log-date">${log.date}</span>
      </div>
      <div class="log-score ${log.passed ? 'text-pass' : 'text-fail'}">
        ${log.score} 分 (${log.passed ? '合格' : '不合格'})
      </div>
    `;
    list.appendChild(li);
  });
}

function updateUI() {
  document.getElementById('xp-val').innerText = userState.xp;
  document.getElementById('p-fill').style.width = `${Math.min(100, userState.xp / 10)}%`;
}

function saveState() {
  localStorage.setItem('user_lang_learning_data_v3', JSON.stringify(userState));
  document.getElementById('sync-status').innerText = '✅ 進度已自動保存';
}

function exportProgress() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userState));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `language_app_backup_${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function importProgress(e) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    try {
      const importedData = JSON.parse(event.target.result);
      if (importedData.progress) {
        userState = importedData;
        saveState();
        updateUI();
        renderPath();
        renderHistoryLogs();
        alert("🎉 進度讀取成功！已恢復您的所有學習紀錄。");
      }
    } catch(err) {
      alert("❌ 讀取檔案失敗，請確認是否為正確的備份檔。");
    }
  };
  fileReader.readAsText(e.target.files[0]);
}

window.onload = init;
