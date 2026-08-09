// 全域狀態
let currentUser = null;
let currentLang = 'ja';
let userProfile = { xp: 0, streak_days: 1 };
let currentCards = [];
let cardIndex = 0;

// 遊戲狀態
let audioQuizCurrent = null;
let swipeQuizCurrent = null;
let swipeQuizIsCorrect = false;

// 內建 6 國語言單字庫
const vocabsDatabase = {
  ja: [
    { id: 'j1', word: 'こんにちは', reading: 'Konnichiwa', meaning: '你好', category: '問候', example_sentence: '皆さん、こんにちは！', example_translation: '大家你好！' },
    { id: 'j2', word: 'ありがとう', reading: 'Arigatou', meaning: '謝謝', category: '表達', example_sentence: 'いつもありがとうございます。', example_translation: '一直以來非常感謝你。' },
    { id: 'j3', word: '美味しい', reading: 'Oishii', meaning: '好吃的', category: '飲食', example_sentence: 'このラーメンはとても美味しいです。', example_translation: '這個拉麵非常好吃。' },
    { id: 'j4', word: '猫', reading: 'Neko', meaning: '貓咪', category: '動物', example_sentence: '可愛い猫がいます。', example_translation: '有一隻可愛的貓。' },
    { id: 'j5', word: '勉強', reading: 'Benkyou', meaning: '學習', category: '日常', example_sentence: '毎日日本語を勉強します。', example_translation: '我每天學習日文。' }
  ],
  ko: [
    { id: 'k1', word: '안녕하세요', reading: 'An-nyeong-ha-se-yo', meaning: '你好', category: '問候', example_sentence: '안녕하세요! 반갑습니다.', example_translation: '你好！很高興認識你。' },
    { id: 'k2', word: '감사합니다', reading: 'Gam-sa-ham-ni-da', meaning: '謝謝', category: '表達', example_sentence: '도와주셔서 감사합니다.', example_translation: '謝謝你的幫助。' },
    { id: 'k3', word: '맛있어요', reading: 'Mas-iss-eo-yo', meaning: '好吃', category: '飲食', example_sentence: '한국 음식이 맛있어요.', example_translation: '韓國料理很好吃。' },
    { id: 'k4', word: '사랑해', reading: 'Sa-rang-hae', meaning: '我愛你', category: '情感', example_sentence: '정말 사랑해요.', example_translation: '真的愛你。' }
  ],
  en: [
    { id: 'e1', word: 'Awesome', reading: '/ˈɔː.səm/', meaning: '超棒的', category: '讚美', example_sentence: 'You did an awesome job!', example_translation: '你做得太棒了！' },
    { id: 'e2', word: 'Delicious', reading: '/dɪˈlɪʃ.əs/', meaning: '美味的', category: '飲食', example_sentence: 'This cake is delicious.', example_translation: '這個蛋糕真美味。' },
    { id: 'e3', word: 'Adventure', reading: '/ədˈven.tʃər/', meaning: '冒險', category: '日常', example_sentence: 'Welcome to the language adventure!', example_translation: '歡迎來到語言大冒險！' }
  ],
  fr: [
    { id: 'f1', word: 'Bonjour', reading: 'bõʒuʁ', meaning: '你好；早安', category: '問候', example_sentence: 'Bonjour, comment allez-vous ?', example_translation: '你好，你好嗎？' },
    { id: 'f2', word: 'Merci', reading: 'mɛʁsi', meaning: '謝謝', category: '禮貌', example_sentence: 'Merci beaucoup !', example_translation: '非常感謝！' },
    { id: 'f3', word: 'Café', reading: 'kafe', meaning: '咖啡', category: '飲食', example_sentence: 'Un café, s\'il vous plaît.', example_translation: '請給我一杯咖啡。' }
  ],
  de: [
    { id: 'd1', word: 'Guten Tag', reading: 'ɡuːtn̩ taːk', meaning: '你好；日安', category: '問候', example_sentence: 'Guten Tag! Wie geht es Ihnen?', example_translation: '你好！您最近好嗎？' },
    { id: 'd2', word: 'Danke', reading: 'daŋkə', meaning: '謝謝', category: '禮貌', example_sentence: 'Vielen Dank für Ihre Hilfe.', example_translation: '非常感謝您的幫助。' }
  ],
  es: [
    { id: 's1', word: '¡Hola!', reading: 'o.la', meaning: '你好！', category: '問候', example_sentence: '¡Hola! ¿Cómo estás?', example_translation: '你好！你好嗎？' },
    { id: 's2', word: 'Gracias', reading: 'gɾa.sjas', meaning: '謝謝', category: '禮貌', example_sentence: 'Muchas gracias por todo.', example_translation: '非常感謝你做的一切。' }
  ]
};

// 1. 初始化
function init() {
  bindEvents();
  loadLanguageData();
  renderMapNodes();
  updateUI();
}

// 2. 事件綁定
function bindEvents() {
  // 底部 Tab 切換
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-page').forEach(p => p.classList.add('hidden'));

      btn.classList.add('active');
      const tabName = btn.getAttribute('data-tab');
      document.getElementById(`tab-${tabName}`).classList.remove('hidden');
    };
  });

  // 語言選單
  document.getElementById('lang-select').onchange = (e) => {
    currentLang = e.target.value;
    loadLanguageData();
  };

  // 帳號按鈕 / Modal 關閉
  document.getElementById('btn-logout').onclick = () => {
    document.getElementById('auth-modal').classList.remove('hidden');
  };
  document.getElementById('btn-close-modal').onclick = () => {
    document.getElementById('auth-modal').classList.add('hidden');
  };

  // 3D 單字卡翻轉與發音
  document.getElementById('active-card').onclick = (e) => {
    if (e.target.id === 'btn-audio') return;
    document.getElementById('active-card').classList.toggle('flipped');
  };
  document.getElementById('btn-audio').onclick = (e) => {
    e.stopPropagation();
    playSpeech(currentCards[cardIndex]?.word);
  };

  // SRS 評分
  document.getElementById('srs-btn-hard').onclick = () => handleSrsRating(1);
  document.getElementById('srs-btn-good').onclick = () => handleSrsRating(3);
  document.getElementById('srs-btn-easy').onclick = () => handleSrsRating(5);

  // 遊戲模式切換按鈕
  document.getElementById('mode-match-btn').onclick = () => switchGameMode('match');
  document.getElementById('mode-audio-btn').onclick = () => switchGameMode('audio');
  document.getElementById('mode-swipe-btn').onclick = () => switchGameMode('swipe');

  // 連連看開始
  document.getElementById('btn-start-game').onclick = startMatchGame;

  // 聽音辨字播放與答題
  document.getElementById('btn-play-quiz-sound').onclick = () => {
    if (audioQuizCurrent) playSpeech(audioQuizCurrent.word);
  };

  // 滑卡衝刺按鈕
  document.getElementById('btn-swipe-false').onclick = () => handleSwipeAnswer(false);
  document.getElementById('btn-swipe-true').onclick = () => handleSwipeAnswer(true);
}

// 3. 載入單字
function loadLanguageData() {
  currentCards = vocabsDatabase[currentLang] || vocabsDatabase['ja'];
  cardIndex = 0;
  renderFlashcard();
}

// 4. 卡片渲染
function renderFlashcard() {
  if (!currentCards.length) return;
  const item = currentCards[cardIndex];

  document.getElementById('active-card').classList.remove('flipped');
  document.getElementById('card-cat').innerText = item.category;
  document.getElementById('card-word').innerText = item.word;
  document.getElementById('card-reading').innerText = item.reading;
  document.getElementById('card-meaning').innerText = item.meaning;
  document.getElementById('card-ex-src').innerText = item.example_sentence;
  document.getElementById('card-ex-tgt').innerText = item.example_translation;
  document.getElementById('srs-pending-count').innerText = currentCards.length - cardIndex;
}

// 5. TTS 發音
function playSpeech(text) {
  if (!text || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  const langCodes = { ja: 'ja-JP', ko: 'ko-KR', en: 'en-US', fr: 'fr-FR', de: 'de-DE', es: 'es-ES' };
  utter.lang = langCodes[currentLang] || 'en-US';
  utter.rate = 0.85;
  window.speechSynthesis.speak(utter);
}

// 6. SRS 按鈕
function handleSrsRating(score) {
  userProfile.xp += score * 5;
  updateUI();
  cardIndex = (cardIndex + 1) % currentCards.length;
  renderFlashcard();
}

// 7. 遊戲切換與邏輯
function switchGameMode(mode) {
  document.querySelectorAll('.game-mode-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.game-container').forEach(c => c.classList.add('hidden'));

  if (mode === 'match') {
    document.getElementById('mode-match-btn').classList.add('active');
    document.getElementById('game-match-view').classList.remove('hidden');
  } else if (mode === 'audio') {
    document.getElementById('mode-audio-btn').classList.add('active');
    document.getElementById('game-audio-view').classList.remove('hidden');
    startAudioQuiz();
  } else if (mode === 'swipe') {
    document.getElementById('mode-swipe-btn').classList.add('active');
    document.getElementById('game-swipe-view').classList.remove('hidden');
    startSwipeQuiz();
  }
}

// 遊戲 1: 連連看
function startMatchGame() {
  const board = document.getElementById('game-board');
  board.classList.remove('hidden');
  board.innerHTML = '';

  const sample = [...currentCards].sort(() => Math.random() - 0.5).slice(0, 4);
  let items = [];

  sample.forEach(c => {
    items.push({ id: c.id, text: c.word, type: 'word' });
    items.push({ id: c.id, text: c.meaning, type: 'meaning' });
  });

  items.sort(() => Math.random() - 0.5);
  let selected = null;

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'm-card';
    card.innerText = item.text;

    card.onclick = () => {
      if (card.classList.contains('matched')) return;

      if (!selected) {
        selected = { item, el: card };
        card.classList.add('selected');
      } else {
        if (selected.el === card) return;

        if (selected.item.id === item.id && selected.item.type !== item.type) {
          selected.el.classList.remove('selected');
          selected.el.classList.add('matched');
          card.classList.add('matched');
          userProfile.xp += 15;
          updateUI();
        } else {
          selected.el.classList.remove('selected');
        }
        selected = null;
      }
    };
    board.appendChild(card);
  });
}

// 遊戲 2: 聽音辨字
function startAudioQuiz() {
  if (!currentCards.length) return;
  audioQuizCurrent = currentCards[Math.floor(Math.random() * currentCards.length)];
  
  const container = document.getElementById('audio-options-container');
  container.innerHTML = '';

  // 隨機取出選項並放入正確答案
  let options = [...currentCards].filter(c => c.id !== audioQuizCurrent.id).sort(() => Math.random() - 0.5).slice(0, 2);
  options.push(audioQuizCurrent);
  options.sort(() => Math.random() - 0.5);

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option-btn';
    btn.innerText = opt.meaning;
    btn.onclick = () => {
      if (opt.id === audioQuizCurrent.id) {
        alert("🎉 答對了！ +10 XP");
        userProfile.xp += 10;
        updateUI();
        startAudioQuiz();
      } else {
        alert("❌ 再試一次看看！");
      }
    };
    container.appendChild(btn);
  });

  // 自動播放發音
  setTimeout(() => playSpeech(audioQuizCurrent.word), 300);
}

// 遊戲 3: 滑卡判斷
function startSwipeQuiz() {
  if (!currentCards.length) return;
  const wordItem = currentCards[Math.floor(Math.random() * currentCards.length)];
  swipeQuizIsCorrect = Math.random() > 0.5;

  let displayMeaning = wordItem.meaning;
  if (!swipeQuizIsCorrect) {
    const wrongItems = currentCards.filter(c => c.id !== wordItem.id);
    if (wrongItems.length > 0) {
      displayMeaning = wrongItems[Math.floor(Math.random() * wrongItems.length)].meaning;
    }
  }

  document.getElementById('swipe-word').innerText = wordItem.word;
  document.getElementById('swipe-meaning').innerText = displayMeaning;
}

function handleSwipeAnswer(userChoice) {
  if (userChoice === swipeQuizIsCorrect) {
    userProfile.xp += 10;
    updateUI();
    alert("⭕ 答對了！ +10 XP");
  } else {
    alert("❌ 答錯了，再接再厲！");
  }
  startSwipeQuiz();
}

// 8. 地圖與 UI 更新
function renderMapNodes() {
  const container = document.getElementById('map-nodes-container');
  if (!container) return;
  container.innerHTML = '';

  const stages = [
    { title: "新手發音與基礎", icon: "⭐" },
    { title: "生活常用對話", icon: "🔒" },
    { title: "旅遊美饌通關", icon: "🔒" },
    { title: "進階檢定考場", icon: "🔒" }
  ];

  stages.forEach((s, idx) => {
    const btn = document.createElement('button');
    btn.className = `node-btn ${idx === 0 ? 'active-node' : ''}`;
    btn.innerText = s.icon;
    btn.onclick = () => alert(`關卡【${s.title}】\n進行複習與遊戲賺取 XP，解鎖新章節！`);
    container.appendChild(btn);
  });
}

function updateUI() {
  document.getElementById('xp-val').innerText = userProfile.xp;
  document.getElementById('streak-val').innerText = userProfile.streak_days;
  document.getElementById('prof-xp').innerText = `${userProfile.xp} XP`;
  document.getElementById('prof-streak').innerText = `${userProfile.streak_days} 天`;
}

window.onload = init;
