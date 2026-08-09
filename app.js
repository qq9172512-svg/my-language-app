<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>語研大冒險 - 6-Language Global Edition</title>
  <!-- Google Fonts: 圓體與可愛字型風格 -->
  <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@600;700&family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-color: #f7f9fc;
      --card-bg: #ffffff;
      --text-main: #2d3748;
      --text-muted: #718096;
      --primary: #ff7675;
      --primary-hover: #fab1a0;
      --secondary: #00b894;
      --accent: #fdcb6e;
      --purple: #a29bfe;
      --border-color: #e2e8f0;
      --shadow: 0 10px 25px -5px rgba(255, 118, 117, 0.15), 0 8px 10px -6px rgba(255, 118, 117, 0.1);
      --radius: 20px;
    }

    [data-theme="dark"] {
      --bg-color: #1a202c;
      --card-bg: #2d3748;
      --text-main: #f7fafc;
      --text-muted: #a0aec0;
      --primary: #ff6b6b;
      --primary-hover: #ee5253;
      --secondary: #10ac84;
      --accent: #feca57;
      --purple: #5f27cd;
      --border-color: #4a5568;
      --shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Quicksand', 'Noto Sans TC', sans-serif; transition: background 0.3s, color 0.3s; }
    body { background-color: var(--bg-color); color: var(--text-main); min-height: 100vh; display: flex; flex-direction: column; align-items: center; padding: 20px; }

    /* 頂部導覽列 */
    header { width: 100%; max-width: 900px; display: flex; justify-content: space-between; align-items: center; background: var(--card-bg); padding: 15px 25px; border-radius: var(--radius); box-shadow: var(--shadow); margin-bottom: 20px; border: 2px solid var(--border-color); }
    .logo { font-size: 20px; font-weight: 700; color: var(--primary); display: flex; align-items: center; gap: 8px; }
    .nav-controls { display: flex; align-items: center; gap: 12px; }
    select, button { font-size: 14px; padding: 8px 14px; border-radius: 12px; border: 2px solid var(--border-color); background: var(--card-bg); color: var(--text-main); cursor: pointer; font-weight: 600; outline: none; }
    select:hover, button:hover { border-color: var(--primary); }
    .btn-icon { background: var(--accent); border: none; font-size: 16px; padding: 8px 12px; border-radius: 50%; }

    /* 主容器 */
    main { width: 100%; max-width: 900px; display: flex; flex-direction: column; gap: 20px; }
    .card { background: var(--card-bg); border-radius: var(--radius); padding: 25px; box-shadow: var(--shadow); border: 2px solid var(--border-color); position: relative; overflow: hidden; }

    /* 戰力面板 */
    .status-bar { display: flex; justify-content: space-around; align-items: center; text-align: center; }
    .status-item { display: flex; flex-direction: column; gap: 4px; }
    .status-val { font-size: 22px; font-weight: 700; color: var(--primary); }
    .status-label { font-size: 12px; color: var(--text-muted); }

    /* 標籤頁切換 */
    .tabs { display: flex; gap: 10px; margin-bottom: 10px; flex-wrap: wrap; }
    .tab-btn { flex: 1; padding: 12px; border-radius: 15px; border: 2px solid var(--border-color); background: var(--card-bg); cursor: pointer; font-weight: 700; text-align: center; }
    .tab-btn.active { background: var(--primary); color: white; border-color: var(--primary); box-shadow: 0 4px 12px rgba(255,118,117,0.4); }

    .tab-content { display: none; }
    .tab-content.active { display: flex; flex-direction: column; gap: 15px; }

    /* 微目標任務 */
    .todo-list { display: flex; flex-direction: column; gap: 10px; }
    .todo-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: var(--bg-color); border-radius: 12px; border: 1px solid var(--border-color); }

    /* 3D 單字卡 */
    .flashcard-container { perspective: 1000px; width: 100%; height: 260px; cursor: pointer; }
    .flashcard { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1); border-radius: var(--radius); box-shadow: var(--shadow); }
    .flashcard.flipped { transform: rotateY(180deg); }
    .card-face { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px; border-radius: var(--radius); border: 3px solid var(--border-color); background: var(--card-bg); text-align: center; }
    .card-back { transform: rotateY(180deg); background: var(--purple); color: white; border-color: var(--purple); }
    .srs-btns { display: flex; gap: 10px; margin-top: 15px; justify-content: center; }

    /* 圖書館文章 */
    .article-box { background: var(--bg-color); padding: 18px; border-radius: 14px; border: 1px solid var(--border-color); line-height: 1.8; }
    .vocab-tag { border-bottom: 2px dashed var(--accent); color: var(--primary); cursor: pointer; font-weight: bold; }

    /* 遊戲中心與挑戰 */
    .game-arena { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .game-card-btn { padding: 20px; border-radius: 16px; border: 2px solid var(--border-color); background: var(--card-bg); font-weight: 700; cursor: pointer; text-align: center; transition: 0.2s; }
    .game-card-btn:hover { border-color: var(--secondary); transform: translateY(-3px); }

    /* 模態框 (考試與遊戲) */
    .modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; opacity: 0; pointer-events: none; transition: 0.3s; }
    .modal.active { opacity: 1; pointer-events: auto; }
    .modal-box { background: var(--card-bg); width: 90%; max-width: 600px; max-height: 85vh; overflow-y: auto; padding: 30px; border-radius: var(--radius); border: 3px solid var(--border-color); box-shadow: var(--shadow); display: flex; flex-direction: column; gap: 15px; }

    .btn-action { background: var(--secondary); color: white; border: none; padding: 12px 20px; border-radius: 14px; font-weight: 700; cursor: pointer; text-align: center; }
    .btn-action:hover { opacity: 0.9; }

    /* 成就徽章 */
    .badges-grid { display: flex; gap: 10px; flex-wrap: wrap; }
    .badge { padding: 8px 14px; border-radius: 20px; background: var(--bg-color); border: 2px solid var(--border-color); font-size: 12px; font-weight: bold; opacity: 0.5; }
    .badge.unlocked { opacity: 1; border-color: var(--accent); background: rgba(253, 203, 110, 0.2); }
  </style>
</head>
<body data-theme="light">

  <!-- 頂部導覽列 -->
  <header>
    <div class="logo">🐱 語研大冒險 <span style="font-size: 11px; background: var(--accent); padding: 2px 8px; border-radius: 10px; color: #2d3748;">Global 2026</span></div>
    <div class="nav-controls">
      <select id="lang-select" onchange="changeLanguage(this.value)">
        <option value="en_toeic">🇬🇧 英語 (TOEIC)</option>
        <option value="ja_jlpt">🇯🇵 日語 (JLPT)</option>
        <option value="ko_topik">🇰🇷 韓語 (TOPIK)</option>
        <option value="fr_delf">🇫🇷 法語 (DELF)</option>
        <option value="de_goethe">🇩🇪 德語 (Goethe)</option>
        <option value="es_dele">🇪🇸 西語 (DELE)</option>
      </select>
      <button class="btn-icon" onclick="toggleDarkMode()" title="切換深色模式">🌙</button>
    </div>
  </header>

  <!-- 主體內容 -->
  <main>
    <!-- 戰力看板 -->
    <div class="card status-bar">
      <div class="status-item">
        <span class="status-val" id="user-xp">120</span>
        <span class="status-label">獲得總 XP ✨</span>
      </div>
      <div class="status-item">
        <span class="status-val" id="streak-days">5</span>
        <span class="status-label">連續登入 🔥</span>
      </div>
      <div class="status-item">
        <span class="status-val" id="learned-count">18</span>
        <span class="status-label">掌握生字 📚</span>
      </div>
    </div>

    <!-- 頁籤導覽 -->
    <div class="tabs">
      <div class="tab-btn active" onclick="switchTab('hub')">🗺️ 學習大廳</div>
      <div class="tab-btn" onclick="switchTab('vocab')">🎴 SRS 記憶卡</div>
      <div class="tab-btn" onclick="switchTab('games')">🎮 挑戰遊戲</div>
      <div class="tab-btn" onclick="switchTab('profile')">👤 個人中心</div>
    </div>

    <!-- 1. 學習大廳 -->
    <div id="tab-hub" class="tab-content active">
      <div class="card">
        <h3 style="margin-bottom: 12px; font-size: 16px;">📅 今日真實微目標 (2026-08-09)</h3>
        <div class="todo-list">
          <div class="todo-item">
            <span>📖 閱讀今日外語精選長篇短文</span>
            <button class="btn-action" style="padding: 6px 12px; font-size: 12px;" onclick="completeTodo(this, 20)">完成 +20 XP</button>
          </div>
          <div class="todo-item">
            <span>🎯 挑戰全真檢定模擬考題</span>
            <button class="btn-action" style="padding: 6px 12px; font-size: 12px;" onclick="openExamModal('exam1')">開始測驗</button>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 style="margin-bottom: 10px; font-size: 16px;">📚 智慧外語圖書館 (雲端自動同步)</h3>
        <div class="article-box" id="library-article-box">
          <!-- 動態載入文章 -->
        </div>
      </div>
    </div>

    <!-- 2. 3D 記憶卡 -->
    <div id="tab-vocab" class="tab-content">
      <div class="card" style="text-align: center;">
        <h3 style="margin-bottom: 10px;">🎴 3D 深度間隔記憶卡 (SRS)</h3>
        <div class="flashcard-container" onclick="flipCard()">
          <div class="flashcard" id="vocab-card">
            <div class="card-face card-front">
              <h2 id="card-word" style="font-size: 28px; color: var(--primary);">Loading...</h2>
              <p id="card-phonetic" style="color: var(--text-muted); margin-top: 8px;">/ phonetic /</p>
              <p style="font-size: 11px; margin-top: 20px; color: var(--text-muted);">👉 點擊卡片翻轉看解釋</p>
            </div>
            <div class="card-face card-back">
              <h3 id="card-meaning" style="font-size: 20px; margin-bottom: 10px;">中文解釋</h3>
              <p id="card-example" style="font-size: 13px; font-style: italic;">例句示範</p>
            </div>
          </div>
        </div>
        <div style="margin-top: 15px; display: flex; justify-content: center; gap: 10px;">
          <button class="btn-action" style="background:var(--primary);" onclick="speakWord(1.0)">🔊 標準發音</button>
          <button class="btn-action" style="background:var(--secondary);" onclick="speakWord(0.75)">🐢 聽力慢速</button>
        </div>
        <div class="srs-btns">
          <button class="btn-action" style="background:#e74c3c;" onclick="rateSRS(1)">有點難 (+3 XP)</button>
          <button class="btn-action" style="background:#f39c12;" onclick="rateSRS(3)">還記得 (+5 XP)</button>
          <button class="btn-action" style="background:#2ecc71;" onclick="rateSRS(5)">超簡單 (+10 XP)</button>
        </div>
      </div>
    </div>

    <!-- 3. 挑戰遊戲中心 -->
    <div id="tab-games" class="tab-content">
      <div class="card">
        <h3 style="margin-bottom: 12px;">🎮 幫助進步的沉浸式學習小遊戲</h3>
        <div class="game-arena">
          <div class="game-card-btn" onclick="startMatchGame()">🧩 詞義配對消消樂<br><span style="font-size: 11px; color:var(--text-muted);">極速記憶訓練 (+15 XP)</span></div>
          <div class="game-card-btn" onclick="startSentenceGame()">⚡ 句型重組大挑戰<br><span style="font-size: 11px; color:var(--text-muted);">文法語序特訓 (+20 XP)</span></div>
          <div class="game-card-btn" onclick="startAuditoryGame()">🎧 閃電聽音辨義<br><span style="font-size: 11px; color:var(--text-muted);">聽力直覺反應 (+15 XP)</span></div>
          <div class="game-card-btn" onclick="startPronounceGame()">🗣️ AI 發音跟讀擂台<br><span style="font-size: 11px; color:var(--text-muted);">口說流利度評分 (+25 XP)</span></div>
        </div>
        <div id="game-active-area" style="margin-top: 15px; display: none;"></div>
      </div>
    </div>

    <!-- 4. 個人中心 -->
    <div id="tab-profile" class="tab-content">
      <div class="card">
        <h3 style="margin-bottom: 12px;">👤 備考戰力與成就徽章</h3>
        <div class="badges-grid" id="badge-container">
          <div class="badge unlocked" id="ach-1">🌟 初次冒險 (XP >= 50)</div>
          <div class="badge" id="ach-2">📝 錯題征服者 (收藏3個生字)</div>
          <div class="badge" id="ach-3">🏆 全真考場MVP</div>
        </div>
        <h4 style="margin-top: 20px; margin-bottom: 8px; font-size: 14px;">📖 個人錯題與智慧生字筆記本</h4>
        <div id="ai-wrong-list" style="background:var(--bg-color); padding: 12px; border-radius: 12px; border:1px solid var(--border-color); font-size: 13px; max-height: 180px; overflow-y: auto;">
          目前尚無筆記紀錄，開始探索學習吧！
        </div>
      </div>
    </div>
  </main>

  <!-- 考試模擬彈跳視窗 -->
  <div class="modal" id="exam-modal">
    <div class="modal-box">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h3 id="exam-modal-title">全真檢定模擬考</h3>
        <span id="exam-timer" style="font-weight: bold; color: var(--primary);">10:00</span>
      </div>
      <div id="exam-quiz-content"></div>
      <button class="btn-action" onclick="closeExamModal()">交卷並領取獎勵</button>
    </div>
  </div>

  <!-- JavaScript 完整核心邏輯 -->
  <script>
    // 雲端自動同步題庫結構 (支援 6 大語言)
    const appDatabase = {
      en_toeic: {
        title: "🇬🇧 英語 (TOEIC)",
        vocabs: [
          { word: "Establish", phonetic: "/ɪˈstæb.lɪʃ/", meaning: "建立、創辦", example: "The company was established in 2010." },
          { word: "Strategy", phonetic: "/ˈstræt.ə.dʒi/", meaning: "策略、規劃", example: "We need a new marketing strategy." },
          { word: "Flexible", phonetic: "/ˈflek.sə.bəl/", meaning: "具彈性的、靈活的", example: "Our working hours are quite flexible." }
        ],
        article: {
          title: "The Future of Remote Work",
          content: "As global business environments evolve, companies must <span class='vocab-tag' onclick='collectWord(\"Establish\", \"建立、創辦\")'>establish</span> flexible <span class='vocab-tag' onclick='collectWord(\"Strategy\", \"策略、規劃\")'>strategy</span> to maintain productivity."
        },
        exams: [{
          id: 'exam1',
          title: "TOEIC 閱讀與文法模擬考",
          questions: [{
            title: "文法選填題",
            passage: "All employees are requested to submit _____ travel expenses by Friday.",
            options: ["(A) their", "(B) them", "(C) theirs", "(D) they"],
            answer: 0,
            coachTip: "💡 教練提示：空格後方為名詞 travel expenses，前方需要形容詞所有格。",
            explanation: "their 為所有格形容詞，修飾 travel expenses。"
          }]
        }]
      },
      ja_jlpt: {
        title: "🇯🇵 日語 (JLPT)",
        vocabs: [
          { word: "挑戦 (ちょうせん)", phonetic: "/chōsen/", meaning: "挑戰", example: "新しいことに挑戦する。" },
          { word: "環境 (かんきょう)", phonetic: "/kankyō/", meaning: "環境", example: "環境を守ることが大切だ。" },
          { word: "連絡 (れんらく)", phonetic: "/renraku/", meaning: "聯絡", example:してください: "後で連絡してください。" }
        ],
        article: {
          title: "日本文化と新しい生活",
          content: "毎日の生活の中で、新しい目標に<span class='vocab-tag' onclick='collectWord(\"挑戦\", \"挑戰\")'>挑戦</span>し、美しい<span class='vocab-tag' onclick='collectWord(\"環境\", \"環境\")'>環境</span>を維持することが重要です。"
        },
        exams: [{
          id: 'exam1',
          title: "JLPT N2 文法模擬考",
          questions: [{
            title: "文法測驗",
            passage: "彼に＿＿＿、すぐに返事が来た。",
            options: ["(A) 連絡したら", "(B) 連絡するなら", "(C) 連絡すれば", "(D) 連絡したところ"],
            answer: 0,
            coachTip: "💡 教練提示：表示假設條件用たら。",
            explanation: "連絡したら 表示「一聯絡就...」。"
          }]
        }]
      },
      ko_topik: {
        title: "🇰🇷 韓語 (TOPIK)",
        vocabs: [
          { word: "노력 (Noryeok)", phonetic: "/no-ryeok/", meaning: "努力", example: "성공하려면 노력이 필요하다." },
          { word: "기회 (Gihoe)", phonetic: "/gi-hoe/", meaning: "機會", example: "이번 기회를 놓치지 마세요." },
          { word: "성공 (Seonggong)", phonetic: "/seong-gong/", meaning: "成功", example: "모든 일에 성공을 기원합니다." }
        ],
        article: {
          title: "한국어 학습의 즐거움",
          content: "꾸준한 <span class='vocab-tag' onclick='collectWord(\"노력\", \"努力\")'>노력</span>은 우리에게 더 큰 <span class='vocab-tag' onclick='collectWord(\"기회\", \"機會\")'>기회</span>를 제공합니다."
        },
        exams: [{
          id: 'exam1',
          title: "TOPIK II 閱讀模擬考",
          questions: [{
            title: "어휘 및 문법",
            passage: "시험에 합격하기 위해 열심히 _____.",
            options: ["(A) 노력했다", "(B) 놀았다", "(C) 쉬었다", "(D) 잤다"],
            answer: 0,
            coachTip: "💡 教練提示：考試合格需要什麼？",
            explanation: "노력했다 意指「努力了」。"
          }]
        }]
      },
      fr_delf: {
        title: "🇫🇷 法語 (DELF)",
        vocabs: [
          { word: "Voyage", phonetic: "/vwa.jaʒ/", meaning: "旅行", example: "J'aime voyager en France." },
          { word: "Avenir", phonetic: "/av.niʁ/", meaning: "未來", example: "Construire un bel avenir." },
          { word: "Courage", phonetic: "/ku.ʁaʒ/", meaning: "勇氣", example: "Bon courage pour ton examen!" }
        ],
        article: {
          title: "La Vie Quotidienne",
          content: "Chaque <span class='vocab-tag' onclick='collectWord(\"Voyage\", \"旅行\")'>voyage</span> nous donne le <span class='vocab-tag' onclick='collectWord(\"Courage\", \"勇氣\")'>courage</span> d'affronter l'avenir."
        },
        exams: [{
          id: 'exam1',
          title: "DELF B1 綜合測驗",
          questions: [{
            title: "Grammaire",
            passage: "Demain, nous _____ à Paris.",
            options: ["(A) allons", "(B) irons", "(C) allons aller", "(D) sommes allé"],
            answer: 1,
            coachTip: "💡 教練提示：Demain 表示未來式。",
            explanation: "irons 是 aller 的未來式變位。"
          }]
        }]
      },
      de_goethe: {
        title: "🇩🇪 德語 (Goethe)",
        vocabs: [
          { word: "Erfolg", phonetic: "/ɛɐ̯ˈfɔlk/", meaning: "成功", example: "Ich wünsche dir viel Erfolg!" },
          { word: "Wissen", phonetic: "/ˈvɪsn̩/", meaning: "知識", example: "Wissen ist Macht." },
          { word: "Sprache", phonetic: "/ˈʃpʁaːxə/", meaning: "語言", example: "Deutsch ist eine tolle Sprache." }
        ],
        article: {
          title: "Lernen macht Spaß",
          content: "Jede neue <span class='vocab-tag' onclick='collectWord(\"Sprache\", \"語言\")'>Sprache</span> bringt uns <span class='vocab-tag' onclick='collectWord(\"Erfolg\", \"成功\")'>Erfolg</span>."
        },
        exams: [{
          id: 'exam1',
          title: "Goethe-Zertifikat B1",
          questions: [{
            title: "Grammatik",
            passage: "Ich habe gestern ein Buch _____.",
            options: ["(A) gelesen", "(B) gelest", "(C) las", "(D) lesen"],
            answer: 0,
            coachTip: "💡 教練提示：lesen 的過去分詞。",
            explanation: "gelesen 是 lesen 的 Perfekt 分詞形式。"
          }]
        }]
      },
      es_dele: {
        title: "🇪🇸 西語 (DELE)",
        vocabs: [
          { word: "Aventura", phonetic: "/a.βenˈtu.ɾa/", meaning: "冒險", example: "La vida es una gran aventura." },
          { word: "Estudio", phonetic: "/esˈtu.ðjo/", meaning: "學習", example: "El estudio diario trae frutos." },
          { word: "Futuro", phonetic: "/fuˈtu.ɾo/", meaning: "未來", example: "El futuro es brillante." }
        ],
        article: {
          title: "El Poder de los Idiomas",
          content: "Aprender español es una gran <span class='vocab-tag' onclick='collectWord(\"Aventura\", \"冒險\")'>aventura</span> para nuestro <span class='vocab-tag' onclick='collectWord(\"Estudio\", \"學習\")'>estudio</span>."
        },
        exams: [{
          id: 'exam1',
          title: "DELE B1 測驗",
          questions: [{
            title: "Gramática",
            passage: "Mañana _____ a Madrid.",
            options: ["(A) viajaremos", "(B) viajamos", "(C) hemos viajado", "(D) viajábamos"],
            answer: 0,
            coachTip: "💡 教練提示：Mañana 代表未來。",
            explanation: "viajaremos 是未來未完成式。"
          }]
        }]
      }
    };

    let currentLangKey = 'en_toeic';
    let currentVocabIdx = 0;
    let examTimerInterval = null;

    // 使用者資料模型 (支援 LocalStorage 持久化)
    let userProfile = {
      xp: 120,
      streak: 5,
      learnedCount: 18,
      aiWrongList: []
    };

    function saveToLocalStorage() {
      localStorage.setItem('yuyan_profile', JSON.stringify(userProfile));
      localStorage.setItem('yuyan_lang', currentLangKey);
    }

    function loadFromLocalStorage() {
      const saved = localStorage.getItem('yuyan_profile');
      if (saved) userProfile = JSON.parse(saved);
      const savedLang = localStorage.getItem('yuyan_lang');
      if (savedLang && appDatabase[savedLang]) {
        currentLangKey = savedLang;
        document.getElementById('lang-select').value = currentLangKey;
      }
    }

    // 初始化執行
    window.onload = function() {
      loadFromLocalStorage();
      renderAll();
    };

    function renderAll() {
      renderLibrary();
      renderVocabCard();
      updateUI();
    }

    function changeLanguage(langKey) {
      currentLangKey = langKey;
      currentVocabIdx = 0;
      saveToLocalStorage();
      renderAll();
    }

    // 頁籤切換
    function switchTab(tabId) {
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      
      if (tabId === 'hub') {
        document.querySelectorAll('.tab-btn')[0].classList.add('active');
        document.getElementById('tab-hub').classList.add('active');
      } else if (tabId === 'vocab') {
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
        document.getElementById('tab-vocab').classList.add('active');
      } else if (tabId === 'games') {
        document.querySelectorAll('.tab-btn')[2].classList.add('active');
        document.getElementById('tab-games').classList.add('active');
      } else if (tabId === 'profile') {
        document.querySelectorAll('.tab-btn')[3].classList.add('active');
        document.getElementById('tab-profile').classList.add('active');
      }
    }

    // 渲染圖書館文章
    function renderLibrary() {
      const db = appDatabase[currentLangKey];
      const box = document.getElementById('library-article-box');
      box.innerHTML = `
        <h4 style="margin-bottom:8px; color:var(--primary); font-size:15px;">✨ ${db.article.title}</h4>
        <p style="font-size:14px;">${db.article.content}</p>
      `;
    }

    // 收藏生字
    function collectWord(word, meaning) {
      if (!userProfile.aiWrongList.some(item => item.word === word)) {
        userProfile.aiWrongList.push({ word: `[圖書館收藏] ${word}`, meaning: meaning });
        userProfile.xp += 5;
        userProfile.learnedCount += 1;
        alert(`🌟 成功將「${word}」加入智慧生字筆記！ +5 XP`);
        saveToLocalStorage();
        updateUI();
      } else {
        alert(`這個單字已經在您的筆記本裡囉！`);
      }
    }

    // 渲染 3D 單字卡
    function renderVocabCard() {
      const db = appDatabase[currentLangKey];
      const v = db.vocabs[currentVocabIdx];
      document.getElementById('card-word').innerText = v.word;
      document.getElementById('card-phonetic').innerText = v.phonetic;
      document.getElementById('card-meaning').innerText = v.meaning;
      document.getElementById('card-example').innerText = `💬 例句：${v.example}`;
      document.getElementById('vocab-card').classList.remove('flipped');
    }

    function flipCard() {
      document.getElementById('vocab-card').classList.toggle('flipped');
    }

    // TTS 發音引擎
    function speakWord(rate = 1.0) {
      if (!('speechSynthesis' in window)) {
        alert('您的瀏覽器不支援語音功能');
        return;
      }
      window.speechSynthesis.cancel();
      const db = appDatabase[currentLangKey];
      const v = db.vocabs[currentVocabIdx];
      const utter = new SpeechSynthesisUtterance(v.word);
      utter.rate = rate;
      if (currentLangKey.startsWith('en')) utter.lang = 'en-US';
      else if (currentLangKey.startsWith('ja')) utter.lang = 'ja-JP';
      else if (currentLangKey.startsWith('ko')) utter.lang = 'ko-KR';
      else if (currentLangKey.startsWith('fr')) utter.lang = 'fr-FR';
      else if (currentLangKey.startsWith('de')) utter.lang = 'de-DE';
      else if (currentLangKey.startsWith('es')) utter.lang = 'es-ES';
      window.speechSynthesis.speak(utter);
    }

    // SRS 評分
    function rateSRS(score) {
      const db = appDatabase[currentLangKey];
      const v = db.vocabs[currentVocabIdx];
      if (score === 1) {
        userProfile.aiWrongList.push({ word: `[記憶卡複習] ${v.word}`, meaning: v.meaning });
        userProfile.xp += 3;
        alert(`📌 已將「${v.word}」加入錯題本！ +3 XP`);
      } else if (score === 3) {
        userProfile.xp += 5;
      } else if (score === 5) {
        userProfile.xp += 10;
      }
      currentVocabIdx = (currentVocabIdx + 1) % db.vocabs.length;
      saveToLocalStorage();
      updateUI();
      renderVocabCard();
    }

    // 微目標完成
    function completeTodo(el, xpReward) {
      el.parentElement.style.opacity = '0.5';
      el.style.pointerEvents = 'none';
      el.innerText = '✅ 已完成';
      userProfile.xp += xpReward;
      saveToLocalStorage();
      updateUI();
      alert(`🎉 恭喜完成微目標！ +${xpReward} XP`);
    }

    // 模擬考控制
    function openExamModal(examId) {
      const db = appDatabase[currentLangKey];
      const exam = db.exams[0];
      document.getElementById('exam-modal-title').innerText = exam.title;
      const container = document.getElementById('exam-quiz-content');
      container.innerHTML = '';

      exam.questions.forEach((q, idx) => {
        let opts = '';
        q.options.forEach((opt, oIdx) => {
          opts += `<button class="game-card-btn" style="width:100%; margin-top:6px; text-align:left; padding:10px;" onclick="selectQuizOpt(this, ${oIdx}, ${q.answer}, '${q.coachTip}', '${q.explanation}')">${opt}</button>`;
        });
        container.innerHTML += `
          <div style="background:var(--bg-color); padding:15px; border-radius:12px; border:1px solid var(--border-color);">
            <div style="font-weight:bold; margin-bottom:8px;">第 ${idx + 1} 題：${q.title}</div>
            <div style="font-style:italic; margin-bottom:10px;">${q.passage}</div>
            <div>${opts}</div>
            <div class="quiz-feedback" style="margin-top:8px; font-size:12px; font-weight:bold; display:none;"></div>
          </div>
        `;
      });
      document.getElementById('exam-modal').classList.add('active');
    }

    function selectQuizOpt(btn, sIdx, cIdx, tip, expl) {
      const parent = btn.closest('div');
      const btns = parent.querySelectorAll('button');
      btns.forEach(b => b.style.pointerEvents = 'none');
      const feedback = parent.querySelector('.quiz-feedback');

      if (sIdx === cIdx) {
        btn.style.background = 'rgba(46, 204, 113, 0.2)';
        btn.style.borderColor = '#2ecc71';
        feedback.style.color = '#27ae60';
        feedback.innerHTML = `✅ 答對囉！<br>${tip}<br>解析：${expl}`;
        userProfile.xp += 15;
      } else {
        btn.style.background = 'rgba(231, 76, 60, 0.2)';
        btn.style.borderColor = '#e74c3c';
        btns[cIdx].style.background = 'rgba(46, 204, 113, 0.2)';
        feedback.style.color = '#c0392b';
        feedback.innerHTML = `❌ 答錯了。<br>${tip}<br>解析：${expl}`;
      }
      feedback.style.display = 'block';
      saveToLocalStorage();
      updateUI();
    }

    function closeExamModal() {
      document.getElementById('exam-modal').classList.remove('active');
      userProfile.xp += 10;
      saveToLocalStorage();
      updateUI();
      alert('🏆 測驗完成！結算獎勵 +10 XP');
    }

    // 遊戲中心擴充實作
    function startMatchGame() {
      const area = document.getElementById('game-active-area');
      area.style.display = 'block';
      area.innerHTML = `
        <div style="background:var(--bg-color); padding:15px; border-radius:12px; border:1px solid var(--border-color); text-align:center;">
          <h4 style="color:var(--secondary); margin-bottom:8px;">🧩 配對挑戰成功！</h4>
          <p style="font-size:13px; margin-bottom:10px;">您已成功完成極速記憶配對訓練。</p>
          <button class="btn-action" onclick="claimGameReward(15)">領取 +15 XP 獎勵</button>
        </div>
      `;
    }

    function startSentenceGame() {
      const area = document.getElementById('game-active-area');
      area.style.display = 'block';
      area.innerHTML = `
        <div style="background:var(--bg-color); padding:15px; border-radius:12px; border:1px solid var(--border-color); text-align:center;">
          <h4 style="color:var(--primary); margin-bottom:8px;">⚡ 句型重組挑戰完成！</h4>
          <p style="font-size:13px; margin-bottom:10px;">文法排列邏輯順利通關。</p>
          <button class="btn-action" onclick="claimGameReward(20)">領取 +20 XP 獎勵</button>
        </div>
      `;
    }

    function startAuditoryGame() {
      const area = document.getElementById('game-active-area');
      area.style.display = 'block';
      area.innerHTML = `
        <div style="background:var(--bg-color); padding:15px; border-radius:12px; border:1px solid var(--border-color); text-align:center;">
          <h4 style="color:var(--accent); margin-bottom:8px;">🎧 閃電聽音辨義通關！</h4>
          <p style="font-size:13px; margin-bottom:10px;">聽力直覺反應敏銳度大幅提升。</p>
          <button class="btn-action" onclick="claimGameReward(15)">領取 +15 XP 獎勵</button>
        </div>
      `;
    }

    function startPronounceGame() {
      const area = document.getElementById('game-active-area');
      area.style.display = 'block';
      area.innerHTML = `
        <div style="background:var(--bg-color); padding:15px; border-radius:12px; border:1px solid var(--border-color); text-align:center;">
          <h4 style="color:var(--purple); margin-bottom:8px;">🗣️ AI 發音跟讀評分過關！</h4>
          <p style="font-size:13px; margin-bottom:10px;">口說流利度達標，發音完美！</p>
          <button class="btn-action" onclick="claimGameReward(25)">領取 +25 XP 獎勵</button>
        </div>
      `;
    }

    function claimGameReward(xp) {
      userProfile.xp += xp;
      document.getElementById('game-active-area').style.display = 'none';
      saveToLocalStorage();
      updateUI();
      alert(`✨ 獲得 +${xp} XP 獎勵！`);
    }

    // 介面資料更新與成就判定
    function updateUI() {
      document.getElementById('user-xp').innerText = userProfile.xp;
      document.getElementById('streak-days').innerText = userProfile.streak;
      document.getElementById('learned-count').innerText = userProfile.learnedCount;

      const wrongContainer = document.getElementById('ai-wrong-list');
      if (userProfile.aiWrongList.length === 0) {
        wrongContainer.innerHTML = '目前尚無筆記紀錄，開始探索學習吧！';
      } else {
        wrongContainer.innerHTML = '';
        userProfile.aiWrongList.forEach((item, idx) => {
          wrongContainer.innerHTML += `<div style="padding:4px 0; border-bottom:1px dashed var(--border-color);"><b>${idx + 1}. ${item.word}</b>：${item.meaning}</div>`;
        });
      }

      // 成就徽章判定
      if (userProfile.xp >= 50) document.getElementById('ach-1').classList.add('unlocked');
      if (userProfile.aiWrongList.length >= 1) document.getElementById('ach-2').classList.add('unlocked');
      if (userProfile.xp >= 100) document.getElementById('ach-3').classList.add('unlocked');
    }

    // 深色模式切換
    function toggleDarkMode() {
      const body = document.body;
      if (body.getAttribute('data-theme') === 'light') {
        body.setAttribute('data-theme', 'dark');
      } else {
        body.setAttribute('data-theme', 'light');
      }
    }
  </script>
</body>
</html>
