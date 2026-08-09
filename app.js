// 全域狀態
let currentUser = null;
let currentLang = 'ja';
let userProfile = { xp: 0, streak_days: 1 };
let currentCards = [];
let cardIndex = 0;

// 完整內建單字庫 (隨開即用，完全不需要依賴後端即可體驗)
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
  // 底部頁籤切換
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-page').forEach(p => p.classList.add('hidden'));

      btn.classList.add('active');
      const tabName = btn.getAttribute('data-tab');
      document.getElementById(`tab-${tabName}`).classList.remove('hidden');
    };
  });

  // 切換語言選單
  document.getElementById('lang-select').onchange = (e) => {
    currentLang = e.target.value;
    loadLanguageData();
  };

  // 右上角設定/登入按鈕
  document.getElementById('btn-logout').onclick = () => {
    document.getElementById('auth-modal').classList.remove('hidden');
  };

  // 關閉登入視窗
  document.getElementById('btn-close-modal').onclick = () => {
    document.getElementById('auth-modal').classList.add('hidden');
  };

  // 點擊單字卡翻面 (避開發音按鈕)
  document.getElementById('active-card').onclick = (e) => {
    if (e.target.id === 'btn-audio') return;
    document.getElementById('active-card').classList.toggle('flipped');
  };

  // 發音按鈕 (Web Speech API)
  document.getElementById('btn-audio').onclick = (e) => {
    e.stopPropagation();
    playSpeech();
  };

  // SRS 記憶評分按鈕綁定
  document.getElementById('srs-btn-hard').onclick = () => handleSrsRating(1);
  document.getElementById('srs-btn-good').onclick = () => handleSrsRating(3);
  document.getElementById('srs-btn-easy').onclick = () => handleSrsRating(5);

  // 開始連連看遊戲
  document.getElementById('btn-start-game').onclick = startMatchGame;
}

// 3. 載入單字數據
function loadLanguageData() {
  currentCards = vocabsDatabase[currentLang] || vocabsDatabase['ja'];
  cardIndex = 0;
  renderFlashcard();
}

// 4. 渲染單字卡內容
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

// 5. 語音朗讀 TTS
function playSpeech() {
  const item = currentCards[cardIndex];
  if (!item || !('speechSynthesis' in window)) {
    alert("您的瀏覽器暫不支援語音合成發音。");
    return;
  }

  window.speechSynthesis.cancel(); // 停止先前的聲音
  const utter = new SpeechSynthesisUtterance(item.word);
  const langCodes = { ja: 'ja-JP', ko: 'ko-KR', en: 'en-US' };
  utter.lang = langCodes[currentLang] || 'en-US';
  utter.rate = 0.8;
  window.speechSynthesis.speak(utter);
}

// 6. SRS 記憶算分與換頁
function handleSrsRating(score) {
  userProfile.xp += score * 5;
  updateUI();

  // 下一張卡片
  cardIndex = (cardIndex + 1) % currentCards.length;
  renderFlashcard();
}

// 7. 連連看小遊戲
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

// 8. 地圖關卡渲染
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
    btn.onclick = () => {
      alert(`關卡【${s.title}】\n點擊下方「單字卡」或「遊戲」開始學習，即可獲得 XP 解鎖關卡！`);
    };
    container.appendChild(btn);
  });
}

// 9. 更新介面顯示數據
function updateUI() {
  document.getElementById('xp-val').innerText = userProfile.xp;
  document.getElementById('streak-val').innerText = userProfile.streak_days;
  document.getElementById('prof-xp').innerText = `${userProfile.xp} XP`;
  document.getElementById('prof-streak').innerText = `${userProfile.streak_days} 天`;
}

// 頁面載入後自動啟動
window.onload = init;
