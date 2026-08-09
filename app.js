// 各國語言解鎖狀態與考題配置
const langConfigs = {
  ja: {
    levels: ["JLPT N5", "JLPT N4", "JLPT N3", "JLPT N2", "JLPT N1"],
    examTime: 2400, // 40分鐘
    passScore: 80
  },
  ko: {
    levels: ["TOPIK I (1級)", "TOPIK I (2級)", "TOPIK II (3~6級)"],
    examTime: 3600, // 60分鐘
    passScore: 80
  },
  en: {
    levels: ["TOEIC 入門(300+)", "TOEIC 中級(500+)", "TOEIC 高階(700+)"],
    examTime: 2700, // 45分鐘
    passScore: 70
  },
  fr: { levels: ["DELF A1", "DELF A2", "DELF B1"], examTime: 1800, passScore: 60 },
  de: { levels: ["Goethe A1", "Goethe A2", "Goethe B1"], examTime: 1800, passScore: 60 },
  es: { levels: ["DELE A1", "DELE A2", "DELE B1"], examTime: 2700, passScore: 60 }
};

// 儲存使用者解鎖進度（儲存於 LocalStorage）
let userProgress = JSON.parse(localStorage.getItem('lang_user_progress')) || {
  ja: 0, ko: 0, en: 0, fr: 0, de: 0, es: 0, // 0 代表只解鎖最低級別
  xp: 0
};

let currentLang = 'ja';
let examsData = [];
let vocabsData = [];

// 考試控制變數
let examTimer = null;
let timeRemaining = 0;
let userExamAnswers = {};
let currentQIndex = 0;

async function init() {
  try {
    const vRes = await fetch('data/basic_vocabs.json');
    vocabsData = (await vRes.json()).categories;

    const eRes = await fetch('data/exam_questions.json');
    examsData = (await eRes.json()).exams;

    setupEvents();
    renderLevelPath();
    updateUserStatsUI();
  } catch(err) {
    console.error("數據加載失敗:", err);
  }
}

function setupEvents() {
  document.getElementById('lang-select').addEventListener('change', (e) => {
    currentLang = e.target.value;
    renderLevelPath();
    updateExamIntro();
  });

  // 頁籤切換
  document.getElementById('tab-path').onclick = () => switchTab('path');
  document.getElementById('tab-game').onclick = () => switchTab('game');
  document.getElementById('tab-exam').onclick = () => { switchTab('exam'); updateExamIntro(); };

  // 小遊戲按鈕
  document.getElementById('btn-game-match').onclick = startMatchGame;
  document.getElementById('btn-close-match').onclick = () => {
    document.getElementById('match-game-area').classList.add('hidden');
  };

  // 擬真檢定控制
  document.getElementById('btn-start-official-exam').onclick = startOfficialExam;
  document.getElementById('btn-submit-exam').onclick = submitOfficialExam;
  document.getElementById('btn-finish-report').onclick = () => {
    document.getElementById('exam-report-card').classList.add('hidden');
    document.getElementById('exam-intro-box').classList.remove('hidden');
    switchTab('path');
  };

  document.getElementById('btn-prev-q').onclick = () => { if(currentQIndex > 0) { currentQIndex--; renderExamQuestion(); } };
  document.getElementById('btn-next-q').onclick = () => { 
    const questions = getQuestions();
    if(currentQIndex < questions.length - 1) { currentQIndex++; renderExamQuestion(); } 
  };
}

function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));

  document.getElementById(`tab-${tab}`).classList.add('active');
  document.getElementById(`${tab}-section`).classList.remove('hidden');
}

// 渲染級別闖關節點
function renderLevelPath() {
  const container = document.getElementById('level-path-nodes');
  container.innerHTML = '';

  const levels = langConfigs[currentLang].levels;
  const unlockedIndex = userProgress[currentLang];

  document.getElementById('current-level-tag').innerText = `${levels[unlockedIndex]} (當前等級)`;

  levels.forEach((lvl, idx) => {
    const btn = document.createElement('button');
    if (idx < unlockedIndex) {
      btn.className = 'node-btn completed';
      btn.innerText = '✓';
    } else if (idx === unlockedIndex) {
      btn.className = 'node-btn unlocked';
      btn.innerText = '⭐';
    } else {
      btn.className = 'node-btn locked';
      btn.innerText = '🔒';
    }
    
    btn.onclick = () => {
      if (idx <= unlockedIndex) {
        alert(`當前為 [${lvl}] 級別。請進入「擬真檢定考」並通過測驗來解鎖下一級！`);
      } else {
        alert(`🔒 該級別已被鎖定！您必須先通過前一級別的正式擬真檢定考試。`);
      }
    };
    container.appendChild(btn);
  });
}

// ==================== 小遊戲：單字連連看 ====================
function startMatchGame() {
  const cards = vocabsData.find(c => c.lang_code === currentLang)?.cards || [];
  if (cards.length < 4) return alert("單字資料不足！");

  document.getElementById('match-game-area').classList.remove('hidden');
  const grid = document.getElementById('match-grid');
  grid.innerHTML = '';

  const selectedCards = cards.slice(0, 4);
  let items = [];
  selectedCards.forEach(c => {
    items.push({ id: c.id, text: c.word, type: 'word' });
    items.push({ id: c.id, text: c.translation, type: 'trans' });
  });
  items.sort(() => Math.random() - 0.5);

  let firstCard = null;

  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'match-card';
    div.innerText = item.text;
    div.onclick = () => {
      if (div.classList.contains('matched')) return;

      if (!firstCard) {
        firstCard = { item, element: div };
        div.classList.add('selected');
      } else {
        if (firstCard.element === div) return;

        if (firstCard.item.id === item.id && firstCard.item.type !== item.type) {
          // 配對成功
          firstCard.element.classList.add('matched');
          div.classList.add('matched');
          addXP(15);
        } else {
          firstCard.element.classList.remove('selected');
        }
        firstCard = null;
      }
    };
    grid.appendChild(div);
  });
}

// ==================== 擬真檢定考系統 ====================
function updateExamIntro() {
  const cfg = langConfigs[currentLang];
  const curLvlName = cfg.levels[userProgress[currentLang]];
  document.getElementById('exam-official-title').innerText = `${curLvlName} 官方擬真檢定考`;
  document.getElementById('exam-rules-text').innerText = `⏱️ 時間：${Math.floor(cfg.examTime / 60)} 分鐘 | 合格門檻：${cfg.passScore} 分`;
}

function getQuestions() {
  return examsData.find(e => e.lang_code === currentLang)?.questions || [];
}

function startOfficialExam() {
  const cfg = langConfigs[currentLang];
  timeRemaining = cfg.examTime;
  userExamAnswers = {};
  currentQIndex = 0;

  document.getElementById('exam-intro-box').classList.add('hidden');
  document.getElementById('exam-workspace').classList.remove('hidden');

  clearInterval(examTimer);
  examTimer = setInterval(() => {
    timeRemaining--;
    const mins = Math.floor(timeRemaining / 60);
    const secs = timeRemaining % 60;
    document.getElementById('timer-display').innerText = `⏱️ ${mins}:${secs.toString().padStart(2, '0')}`;

    if (timeRemaining <= 0) {
      clearInterval(examTimer);
      alert("⏰ 時間到！自動交卷！");
      submitOfficialExam();
    }
  }, 1000);

  renderBubbleSheet();
  renderExamQuestion();
}

function renderBubbleSheet() {
  const sheet = document.getElementById('bubble-sheet');
  sheet.innerHTML = '';
  const qList = getQuestions();

  qList.forEach((q, idx) => {
    const bubble = document.createElement('div');
    bubble.className = `sheet-bubble ${userExamAnswers[idx] !== undefined ? 'filled' : ''}`;
    bubble.innerText = idx + 1;
    bubble.onclick = () => { currentQIndex = idx; renderExamQuestion(); };
    sheet.appendChild(bubble);
  });
}

function renderExamQuestion() {
  const qList = getQuestions();
  if (!qList.length) return;

  const q = qList[currentQIndex];
  document.getElementById('question-number-badge').innerText = `第 ${currentQIndex + 1} 題 / 共 ${qList.length} 題`;
  document.getElementById('exam-q-text').innerText = q.question;

  const optsBox = document.getElementById('exam-options-group');
  optsBox.innerHTML = '';

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = `opt-btn ${userExamAnswers[currentQIndex] === idx ? 'selected' : ''}`;
    btn.innerText = opt;
    btn.onclick = () => {
      userExamAnswers[currentQIndex] = idx;
      renderBubbleSheet();
      renderExamQuestion();
    };
    optsBox.appendChild(btn);
  });
}

function submitOfficialExam() {
  clearInterval(examTimer);
  const qList = getQuestions();
  let correct = 0;

  qList.forEach((q, idx) => {
    if (userExamAnswers[idx] === q.answer) correct++;
  });

  const score = Math.round((correct / (qList.length || 1)) * 100);
  const passScore = langConfigs[currentLang].passScore;

  document.getElementById('exam-workspace').classList.add('hidden');
  document.getElementById('exam-report-card').classList.remove('hidden');

  document.getElementById('final-score-text').innerText = `${score} 分`;

  if (score >= passScore) {
    document.getElementById('report-icon').innerText = '🎓';
    document.getElementById('report-title').innerText = '合格！正式晉級！';
    document.getElementById('report-desc-text').innerText = `恭喜獲得 ${score} 分！已成功解鎖下一個高級別！`;

    // 晉級解鎖
    if (userProgress[currentLang] < langConfigs[currentLang].levels.length - 1) {
      userProgress[currentLang]++;
      saveProgress();
      renderLevelPath();
    }
  } else {
    document.getElementById('report-icon').innerText = '💪';
    document.getElementById('report-title').innerText = '未達合格門檻';
    document.getElementById('report-desc-text').innerText = `獲得 ${score} 分 (合格線為 ${passScore} 分)。別氣餒，再多複習一下！`;
  }
}

function addXP(amount) {
  userProgress.xp += amount;
  saveProgress();
  updateUserStatsUI();
}

function updateUserStatsUI() {
  document.getElementById('user-xp').innerText = userProgress.xp;
  document.getElementById('xp-progress').style.width = `${Math.min(100, userProgress.xp / 10)}%`;
}

function saveProgress() {
  localStorage.setItem('lang_user_progress', JSON.stringify(userProgress));
}

window.onload = init;
