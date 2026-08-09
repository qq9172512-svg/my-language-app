// 🔑 Supabase 連線資訊設定
const SUPABASE_URL = "https://uKtJ0qD18Q7MkDzf3co0Bg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_uKtJ0qD18Q7MkDzf3co0Bg_wfoinpqh";

// 初始化 Supabase Client
const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY) : null;

// 全域狀態管理
let currentUser = null;
let currentLang = 'ja';
let userProfile = { xp: 0, streak_days: 1 };
let currentCards = [];
let cardIndex = 0;

// 備用單字庫 (離線或免登入時使用)
const fallbackVocabs = {
  ja: [
    { id: 'ja-1', word: '食べる', reading: 'たべる (taberu)', meaning: '吃 (動詞)', category: '飲食', example_sentence: 'ラーメンを食べます。', example_translation: '我要吃拉麵。' },
    { id: 'ja-2', word: '飲む', reading: 'のむ (nomu)', meaning: '喝 (動詞)', category: '飲食', example_sentence: '水をおねがいします。', example_translation: '請給我水。' },
    { id: 'ja-3', word: '行く', reading: 'いく (iku)', meaning: '去 (動詞)', category: '交通', example_sentence: '東京へ行きます。', example_translation: '我要去東京。' },
    { id: 'ja-4', word: '話す', reading: 'はなす (hanasu)', meaning: '說話 (動詞)', category: '交流', example_sentence: '日本語で話します。', example_translation: '用日語交談。' }
  ],
  ko: [
    { id: 'ko-1', word: '먹다', reading: 'meok-da', meaning: '吃 (動詞)', category: '日常', example_sentence: '밥을 먹어요.', example_translation: '我在吃飯。' },
    { id: 'ko-2', word: '마시다', reading: 'ma-si-da', meaning: '喝 (動詞)', category: '日常', example_sentence: '커피를 마셔요.', example_translation: '我在喝咖啡。' }
  ],
  en: [
    { id: 'en-1', word: 'Resilient', reading: '/rɪˈzɪl.jənt/', meaning: '有彈性的；堅韌的', category: 'TOEIC高頻', example_sentence: 'She is a resilient leader.', example_translation: '她是一位堅忍不拔的領導者。' },
    { id: 'en-2', word: 'Innovate', reading: '/ˈɪn.ə.veɪt/', meaning: '創新 (動詞)', category: '職場商務', example_sentence: 'We need to innovate constantly.', example_translation: '我們需要不斷創新。' }
  ]
};

// 1. App 初始化
async function init() {
  bindEvents();

  // 預設設為自由模式
  document.getElementById('user-name').innerText = "自由冒險家";
  document.getElementById('sync-indicator').innerText = "👤 本地模式";

  if (supabase) {
    // 自動靜默檢查是否有先前的登入 Session（不會彈窗）
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await onUserLogin(session.user);
    }

    // 監聽 Auth 狀態轉變
    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await onUserLogin(session.user);
      } else {
        onUserLogout();
      }
    });
  }

  await loadLanguageData();
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

  // 切換語言
  document.getElementById('lang-select').onchange = async (e) => {
    currentLang = e.target.value;
    await loadLanguageData();
  };

  // ⚙️ 右上角登入/帳號按鈕（主動點擊才跳出彈窗或執行登出）
  document.getElementById('btn-logout').onclick = () => {
    if (currentUser) {
      if (confirm("確定要登出 Supabase 帳號嗎？")) {
        if (supabase) supabase.auth.signOut();
      }
    } else {
      // 未登入狀態時，點擊按鈕跳出登入視窗
      document.getElementById('auth-modal').classList.remove('hidden');
    }
  };

  // 彈窗內的按鈕事件
  document.getElementById('btn-login').onclick = handleLogin;
  
  const closeBtn = document.getElementById('btn-close-modal') || document.getElementById('btn-guest-login');
  if (closeBtn) {
    closeBtn.onclick = () => {
      document.getElementById('auth-modal').classList.add('hidden');
    };
  }

  // 點擊單字卡翻面
  document.getElementById('active-card').onclick = (e) => {
    if (e.target.id === 'btn-audio') return;
    document.getElementById('active-card').classList.toggle('flipped');
  };

  // 聽語音 TTS
  document.getElementById('btn-audio').onclick = (e) => {
    e.stopPropagation();
    playSpeech();
  };

  // 小遊戲
  document.getElementById('btn-start-game').onclick = startMatchGame;
}

// 3. Supabase 登入處理
async function handleLogin() {
  const email = document.getElementById('auth-email').value.trim();
  const pwd = document.getElementById('auth-pwd').value.trim();

  if (!email || !pwd) {
    alert("請輸入 Email 與密碼");
    return;
  }

  if (!supabase) {
    alert("Supabase 連線尚未就緒");
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password: pwd });

  if (error) {
    // 登入失敗嘗試自動註冊
    const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({ email, password: pwd });
    if (signUpErr) {
      alert("登入/註冊失敗: " + signUpErr.message);
    } else {
      alert("帳號建立成功！已為您自動同步登入。");
      document.getElementById('auth-modal').classList.add('hidden');
    }
  } else {
    document.getElementById('auth-modal').classList.add('hidden');
  }
}

async function onUserLogin(user) {
  currentUser = user;
  document.getElementById('auth-modal').classList.add('hidden');
  document.getElementById('user-name').innerText = user.email.split('@')[0];
  document.getElementById('prof-email').innerText = user.email;
  document.getElementById('sync-indicator').innerText = "☁️ 雲端同步中";

  // 讀取/建立雲端 Profile
  let { data: profile } = await supabase.from('user_profiles').select('*').eq('id', user.id).single();
  
  if (!profile) {
    const newProf = { 
      id: user.id, 
      display_name: user.email.split('@')[0], 
      xp: userProfile.xp || 0, 
      streak_days: 1 
    };
    await supabase.from('user_profiles').insert([newProf]);
    profile = newProf;
  }

  userProfile = profile;
  updateUI();
}

function onUserLogout() {
  currentUser = null;
  userProfile = { xp: 0, streak_days: 1 };
  document.getElementById('user-name').innerText = "自由冒險家";
  document.getElementById('prof-email').innerText = "未登入";
  document.getElementById('sync-indicator').innerText = "👤 本地模式";
  updateUI();
}

// 4. 載入單字資料
async function loadLanguageData() {
  let vocabs = [];

  if (currentUser && supabase) {
    const { data, error } = await supabase.from('words_corpus').select('*').eq('lang', currentLang);
    if (!error && data && data.length > 0) vocabs = data;
  }

  if (vocabs.length === 0) {
    vocabs = fallbackVocabs[currentLang] || fallbackVocabs['ja'];
  }

  currentCards = vocabs;
  cardIndex = 0;
  renderFlashcard();
  renderMapNodes();
}

// 5. 卡片與 SRS 系統
function renderFlashcard() {
  if (!currentCards.length) return;
  const item = currentCards[cardIndex];

  document.getElementById('active-card').classList.remove('flipped');
  document.getElementById('card-cat').innerText = item.category || '日常基礎';
  document.getElementById('card-word').innerText = item.word;
  document.getElementById('card-reading').innerText = item.reading;
  document.getElementById('card-meaning').innerText = item.meaning;
  document.getElementById('card-ex-src').innerText = item.example_sentence || '暫無例句';
  document.getElementById('card-ex-tgt').innerText = item.example_translation || '暫無翻譯';
  document.getElementById('srs-pending-count').innerText = currentCards.length - cardIndex;
}

function playSpeech() {
  const item = currentCards[cardIndex];
  if (!item || !('speechSynthesis' in window)) return;

  const utter = new SpeechSynthesisUtterance(item.word);
  const langMap = { ja: 'ja-JP', ko: 'ko-KR', en: 'en-US', fr: 'fr-FR', de: 'de-DE', es: 'es-ES' };
  utter.lang = langMap[currentLang] || 'en-US';
  utter.rate = 0.85;
  window.speechSynthesis.speak(utter);
}

async function handleSrsRating(rating) {
  const item = currentCards[cardIndex];
  const gainedXp = rating * 5;

  userProfile.xp += gainedXp;

  // 若已登入，寫入 Supabase 雲端
  if (currentUser && supabase) {
    const nextDays = rating === 1 ? 1 : rating === 3 ? 3 : 7;
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + nextDays);

    await supabase.from('user_word_srs').upsert({
      user_id: currentUser.id,
      word_id: item.id,
      proficiency: rating,
      next_review_at: nextReview.toISOString()
    });

    await supabase.from('user_profiles').update({ xp: userProfile.xp }).eq('id', currentUser.id);
  }

  updateUI();
  cardIndex = (cardIndex + 1) % currentCards.length;
  renderFlashcard();
}

// 6. 連連看小遊戲
function startMatchGame() {
  const board = document.getElementById('game-board');
  board.classList.remove('hidden');
  board.innerHTML = '';

  const pick = [...currentCards].sort(() => Math.random() - 0.5).slice(0, 4);
  let items = [];

  pick.forEach(c => {
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

// 7. 地圖節點
function renderMapNodes() {
  const container = document.getElementById('map-nodes-container');
  if (!container) return;
  container.innerHTML = '';

  const stages = ["日常發音與單字", "常用基礎句型", "情境對話練習", "聽力與口語特訓", "全真模擬檢定"];

  stages.forEach((stage, idx) => {
    const btn = document.createElement('button');
    btn.className = `node-btn ${idx === 0 ? 'current' : ''}`;
    btn.innerText = idx === 0 ? '⭐' : '🔒';
    btn.onclick = () => alert(`關卡【${stage}】\n不用登入即可學習！點擊單字卡複習或玩連連看，賺取 XP 即可解鎖關卡！`);
    container.appendChild(btn);
  });
}

// 8. UI 更新
function updateUI() {
  document.getElementById('xp-val').innerText = userProfile.xp;
  document.getElementById('streak-val').innerText = userProfile.streak_days;
  document.getElementById('prof-xp').innerText = `${userProfile.xp} XP`;
  document.getElementById('prof-streak').innerText = `${userProfile.streak_days} 天`;
}

window.onload = init;
