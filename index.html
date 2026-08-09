<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>語研大冒險 - Ultimate Beginner Edition</title>
  <style>
    :root {
      --bg-color: #f7f9fa;
      --card-bg: #ffffff;
      --primary: #85d2d0;
      --primary-hover: #6cbdbb;
      --accent-pink: #f8b195;
      --accent-yellow: #f6d55c;
      --accent-blue: #4ea5d9;
      --text-main: #2c3e50;
      --text-muted: #7f8c8d;
      --border-color: #eef2f5;
      --shadow: 0 8px 20px rgba(0,0,0,0.04);
      --radius: 18px;
    }

    [data-theme="dark"] {
      --bg-color: #12181b;
      --card-bg: #1e252b;
      --primary: #5ac8c6;
      --primary-hover: #45b3b1;
      --accent-pink: #e09f85;
      --accent-yellow: #e5c453;
      --accent-blue: #4592c4;
      --text-main: #ecf0f1;
      --text-muted: #95a5a6;
      --border-color: #2c3e50;
      --shadow: 0 8px 20px rgba(0,0,0,0.3);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; transition: background-color 0.3s, color 0.3s; }
    body { background-color: var(--bg-color); color: var(--text-main); display: flex; justify-content: center; min-height: 100vh; }

    .app-container { width: 100%; max-width: 480px; background: var(--bg-color); display: flex; flex-direction: column; height: 100vh; position: relative; overflow: hidden; box-shadow: 0 0 30px rgba(0,0,0,0.05); }

    .global-header { background: var(--card-bg); padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); z-index: 10; }
    .user-info { display: flex; align-items: center; gap: 6px; font-weight: bold; font-size: 13px; }
    .cat-avatar { font-size: 20px; background: #fff3e6; padding: 4px 6px; border-radius: 50%; }
    .lang-selector { background: var(--bg-color); border: 1px solid var(--border-color); padding: 6px 10px; border-radius: 12px; font-weight: bold; color: var(--text-main); cursor: pointer; outline: none; font-size: 12px; }
    
    .header-controls { display: flex; align-items: center; gap: 6px; }
    .theme-toggle-btn { background: var(--bg-color); border: 1px solid var(--border-color); padding: 6px 10px; border-radius: 12px; cursor: pointer; font-size: 14px; }

    .stats-badge { display: flex; gap: 6px; font-size: 11px; font-weight: bold; }
    .stat-item { background: var(--bg-color); border: 1px solid var(--border-color); padding: 4px 8px; border-radius: 20px; color: #d68910; }

    .content-area { flex: 1; overflow-y: auto; padding: 16px; padding-bottom: 80px; }
    .tab-page { display: none; }
    .tab-page.active { display: block; }

    .segmented-control { display: flex; background: var(--bg-color); border: 1px solid var(--border-color); padding: 4px; border-radius: 14px; margin-bottom: 16px; }
    .segment-btn { flex: 1; border: none; padding: 8px; border-radius: 10px; font-weight: bold; font-size: 12px; background: transparent; color: var(--text-muted); cursor: pointer; transition: 0.2s; }
    .segment-btn.active { background: var(--card-bg); color: var(--text-main); box-shadow: 0 2px 6px rgba(0,0,0,0.05); }

    .card { background: var(--card-bg); border-radius: var(--radius); padding: 16px; margin-bottom: 14px; box-shadow: var(--shadow); border: 1px solid var(--border-color); }
    .exam-card { display: flex; justify-content: space-between; align-items: center; background: var(--card-bg); border-left: 5px solid var(--primary); }
    .btn-action { background: var(--primary); color: #2c3e50; border: none; padding: 8px 14px; border-radius: 12px; font-weight: bold; cursor: pointer; transition: 0.2s; }
    .btn-action:hover { background: var(--primary-hover); }

    .lib-article-card { background: var(--card-bg); border-left: 5px solid var(--accent-pink); cursor: pointer; transition: 0.2s; margin-bottom: 10px; }
    .lib-article-card:hover { transform: translateY(-2px); }
    .today-tag { font-size: 10px; font-weight: bold; background: #e74c3c; color: white; padding: 2px 6px; border-radius: 6px; margin-left: 6px; }
    
    .filter-bar { display: flex; gap: 6px; margin-bottom: 12px; overflow-x: auto; padding-bottom: 4px; }
    .filter-chip { background: var(--bg-color); border: 1px solid var(--border-color); padding: 4px 10px; border-radius: 10px; font-size: 11px; font-weight: bold; color: var(--text-muted); cursor: pointer; white-space: nowrap; }
    .filter-chip.active { background: var(--primary); color: #fff; border-color: var(--primary); }

    .highlight-vocab { background-color: #fff9c4; color: #2c3e50; border-bottom: 2px dashed #fbc02d; cursor: pointer; padding: 0 2px; font-weight: bold; }
    .reader-modal { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: var(--bg-color); z-index: 150; display: none; flex-direction: column; padding: 16px; overflow-y: auto; }
    .reader-modal.active { display: flex; }

    .todo-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px dashed var(--border-color); font-size: 13px; }
    .todo-check { cursor: pointer; font-size: 16px; color: var(--primary); }

    .exam-modal { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: var(--bg-color); z-index: 100; display: none; flex-direction: column; padding: 16px; overflow-y: auto; }
    .exam-modal.active { display: flex; }
    .exam-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 12px; border-bottom: 2px solid var(--border-color); margin-bottom: 16px; }
    .timer { font-weight: bold; color: #e74c3c; font-size: 15px; background: var(--card-bg); border: 1px solid var(--border-color); padding: 4px 8px; border-radius: 8px; }
    .passage-box { background: var(--bg-color); border-left: 4px solid var(--accent-blue); padding: 12px; font-size: 13px; line-height: 1.5; margin-bottom: 12px; border-radius: 4px; max-height: 140px; overflow-y: auto; }
    .quiz-opt { width: 100%; text-align: left; background: var(--card-bg); border: 1.5px solid var(--border-color); color: var(--text-main); padding: 12px; border-radius: 12px; margin-bottom: 8px; font-size: 13px; cursor: pointer; transition: 0.2s; }
    .quiz-opt:hover { border-color: var(--primary); }

    .flashcard-container { perspective: 1000px; height: 300px; margin-bottom: 14px; }
    .flashcard { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; transition: transform 0.6s; cursor: pointer; }
    .flashcard.flipped { transform: rotateY(180deg); }
    .card-face { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: var(--radius); padding: 20px; display: flex; flex-direction: column; justify-content: space-between; background: var(--card-bg); box-shadow: var(--shadow); border: 1px solid var(--border-color); text-align: center; }
    .card-back { transform: rotateY(180deg); text-align: left; overflow-y: auto; }
    .badge { align-self: center; background: var(--bg-color); border: 1px solid var(--border-color); color: var(--primary-hover); font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 12px; }
    .srs-buttons { display: flex; gap: 8px; }
    .srs-btn { flex: 1; border: none; padding: 10px; border-radius: 12px; font-weight: bold; font-size: 12px; cursor: pointer; color: white; }
    .srs-hard { background: var(--accent-pink); }
    .srs-good { background: var(--accent-yellow); color: #7d6608; }
    .srs-easy { background: var(--primary); color: #2c3e50; }

    .achievement-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 10px; }
    .achievement-badge { background: var(--bg-color); border: 1px solid var(--border-color); padding: 8px; border-radius: 12px; text-align: center; font-size: 11px; opacity: 0.4; }
    .achievement-badge.unlocked { opacity: 1; border-color: var(--primary); background: rgba(133, 210, 208, 0.1); }

    .bottom-nav { position: absolute; bottom: 0; left: 0; width: 100%; background: var(--card-bg); display: flex; border-top: 1px solid var(--border-color); padding: 8px 0; z-index: 10; }
    .nav-item { flex: 1; display: flex; flex-direction: column; align-items: center; font-size: 10px; font-weight: bold; color: var(--text-muted); cursor: pointer; gap: 3px; }
    .nav-item.active { color: var(--primary-hover); }
    .nav-icon { font-size: 18px; }
  </style>
</head>
<body data-theme="light">

<div class="app-container">
  
  <header class="global-header">
    <div class="user-info">
      <span class="cat-avatar">🐱</span>
      <select class="lang-selector" id="lang-select" onchange="changeLanguage(this.value)">
        <option value="en_toeic">🇺🇸 英文 (TOEIC 300+)</option>
        <option value="ja_jlpt">🇯🇵 日文 (JLPT N5)</option>
        <option value="ko_topik">🇰🇷 韓文 (TOPIK I)</option>
        <option value="fr_delf">🇫🇷 法文 (DELF A1)</option>
        <option value="de_goethe">🇩🇪 德文 (Goethe A1)</option>
        <option value="es_dele">🇪🇸 西班牙文 (DELE A1)</option>
      </select>
    </div>
    <div class="header-controls">
      <button class="theme-toggle-btn" onclick="toggleTheme()" id="theme-btn">🌙</button>
      <div class="stats-badge">
        <div class="stat-item">🔥 <span id="streak-days">1</span></div>
        <div class="stat-item">⭐ <span id="user-xp">0</span></div>
      </div>
    </div>
  </header>

  <main class="content-area">

    <!-- TAB 1: 學習大廳 -->
    <section id="tab-learn" class="tab-page active">
      <div class="card" style="border: 1.5px solid var(--primary);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <h3 style="font-size:14px; color:var(--primary-hover);">📅 今日真實學習微目標</h3>
          <span style="font-size:11px; font-weight:bold; background:var(--primary); color:#2c3e50; padding:2px 8px; border-radius:10px;">自動存檔</span>
        </div>
        <div id="daily-todo-list">
          <div class="todo-item">
            <span>🔲 完成今日基礎沉浸閱讀文章</span>
            <span class="todo-check" onclick="completeTodo(this, 10)">⭕ 點擊完成</span>
          </div>
          <div class="todo-item">
            <span>🔲 完成 1 次入門檢定模擬測驗</span>
            <span class="todo-check" onclick="completeTodo(this, 15)">⭕ 點擊完成</span>
          </div>
          <div class="todo-item">
            <span>🔲 複習 10 個核心單字</span>
            <span class="todo-check" onclick="completeTodo(this, 10)">⭕ 點擊完成</span>
          </div>
        </div>
      </div>

      <div class="segmented-control">
        <button class="segment-btn active" onclick="switchLearnSubTab('exam')">🎯 入門檢定考場</button>
        <button class="segment-btn" onclick="switchLearnSubTab('lib')">📚 智慧外語圖書館</button>
      </div>

      <div id="sub-learn-exam">
        <div id="exam-list-container"></div>
      </div>

      <div id="sub-learn-lib" style="display: none;">
        <div class="filter-bar">
          <div class="filter-chip active" onclick="filterArticles('all', this)">全部文章</div>
          <div class="filter-chip" onclick="filterArticles('daily', this)">☕ 日常生活</div>
          <div class="filter-chip" onclick="filterArticles('travel', this)">✈️ 旅遊觀光</div>
          <div class="filter-chip" onclick="filterArticles('basics', this)">📖 基礎文法</div>
        </div>
        <div id="library-list-container"></div>
      </div>
    </section>

    <!-- TAB 2: 3D 單字卡 -->
    <section id="tab-vocab" class="tab-page">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-size: 12px; font-weight: bold; color: var(--text-muted);">3D 深度間隔記憶卡 (新手起步)</span>
        <span id="vocab-mode-tag" style="font-size: 11px; background:var(--bg-color); border:1px solid var(--border-color); color:var(--primary-hover); padding:2px 8px; border-radius:8px; font-weight:bold;">智慧記憶引擎</span>
      </div>
      
      <div class="flashcard-container">
        <div class="flashcard" id="active-card" onclick="flipCard()">
          <div class="card-face card-front">
            <span class="badge" id="card-level">Level 1</span>
            <div>
              <div style="font-size: 30px; font-weight: bold;" id="card-word">Word</div>
              <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;" id="card-phonetic">/phonetic/</div>
            </div>
            <div style="display:flex; gap:8px; justify-content:center;">
              <button class="btn-action" onclick="event.stopPropagation(); speakWord(1.0);">🔊 標準發音</button>
              <button class="btn-action" style="background:var(--accent-blue); color:#fff;" onclick="event.stopPropagation(); speakWord(0.75);">🐢 0.75倍</button>
            </div>
          </div>
          <div class="card-face card-back">
            <div style="font-size: 11px; color: var(--primary-hover); font-weight: bold; margin-bottom: 2px;" id="card-pos">詞性</div>
            <h3 style="font-size: 16px; margin-bottom: 6px;" id="card-meaning">中文解釋</h3>
            <p style="font-size: 11px; font-weight: bold; color: var(--text-main);">基礎例句：</p>
            <p style="font-size: 11px; color: var(--text-muted); margin-top: 2px;" id="card-ex-en">Example sentence.</p>
            <p style="font-size: 11px; color: var(--text-muted);" id="card-ex-zh">例句中文翻譯。</p>
          </div>
        </div>
      </div>

      <div class="srs-buttons">
        <button class="srs-btn srs-hard" onclick="rateSRS(1)">🔴 有點難 (+生字筆記)</button>
        <button class="srs-btn srs-good" onclick="rateSRS(3)">🟡 還記得</button>
        <button class="srs-btn srs-easy" onclick="rateSRS(5)">🟢 超簡單</button>
      </div>
    </section>

    <!-- TAB 3: 遊戲中心 -->
    <section id="tab-games" class="tab-page">
      <div class="card" style="text-align: center;">
        <span style="font-size: 36px;">🐱</span>
        <h3 style="margin-top: 6px;">單字配對消消樂</h3>
        <p style="font-size: 12px; color: var(--text-muted); margin: 4px 0 10px 0;">趣味基礎單字配對，賺取 +15 XP！</p>
        <button class="btn-action" onclick="startMatchGame()">開始挑戰</button>
      </div>
      <div id="game-board" class="card" style="display: none;"></div>
    </section>

    <!-- TAB 4: 個人中心與真實學習紀錄 -->
    <section id="tab-profile" class="tab-page">
      <div class="card">
        <h3>📊 個人戰力與成就徽章</h3>
        <div style="display: flex; justify-content: space-around; margin-top: 12px; text-align: center;">
          <div><div style="font-size: 18px; font-weight: bold; color: var(--primary);" id="prof-xp">0</div><div style="font-size: 11px; color: var(--text-muted);">總 XP</div></div>
          <div><div style="font-size: 18px; font-weight: bold; color: var(--accent-pink);" id="prof-streak">1 天</div><div style="font-size: 11px; color: var(--text-muted);">連續登入</div></div>
          <div><div style="font-size: 18px; font-weight: bold; color: #e74c3c;" id="prof-wrong-count">0</div><div style="font-size: 11px; color: var(--text-muted);">累積生字</div></div>
        </div>
        <div style="margin-top: 14px; font-size: 12px; font-weight: bold; color: var(--text-muted);">🏆 成就解鎖進度：</div>
        <div class="achievement-grid" id="achievement-container">
          <div class="achievement-badge" id="ach-1">🌟 初試啼聲<br>(獲得 50 XP)</div>
          <div class="achievement-badge" id="ach-2">📚 勤學不倦<br>(收藏 3 個生字)</div>
          <div class="achievement-badge" id="ach-3">🎯 考場達人<br>(完成模擬考)</div>
        </div>
      </div>

      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3>📖 個人累積生字筆記本</h3>
          <button class="btn-action" style="padding: 2px 8px; font-size: 10px; background: #e74c3c; color:#fff;" onclick="clearNotes()">清空筆記</button>
        </div>
        <div id="ai-wrong-list" style="margin-top: 10px; font-size: 12px; color: var(--text-muted);">
          目前尚無筆記紀錄，開始探索學習吧！
        </div>
      </div>
    </section>

  </main>

  <!-- 全真模擬考 Modal -->
  <div class="exam-modal" id="exam-modal">
    <div class="exam-header">
      <h3 id="exam-modal-title" style="font-size: 14px;">入門檢定測驗</h3>
      <div class="timer">⏱️ <span id="exam-timer">--:--</span></div>
    </div>
    <div id="exam-quiz-content"></div>
    <button class="btn-action" style="background: #e74c3c; color:#fff; margin-top: auto;" onclick="closeExamModal()">結束並交卷</button>
  </div>

  <!-- 智慧圖書館文章閱讀 Reader Modal -->
  <div class="reader-modal" id="reader-modal">
    <div class="exam-header">
      <h3 id="reader-title" style="font-size: 14px;">文章閱讀</h3>
      <button class="btn-action" style="background: var(--text-muted); color:#fff; padding: 4px 10px; font-size: 11px;" onclick="closeReaderModal()">關閉文章</button>
    </div>
    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
      <button class="btn-action" style="flex:1;" onclick="speakCurrentArticle()">🔊 朗讀整篇文章</button>
    </div>
    <div class="card" style="flex:1; overflow-y:auto; line-height: 1.8; font-size: 14px;" id="reader-body"></div>
    <div class="card" style="background: var(--card-bg); margin-top: 8px;">
      <div style="font-weight: bold; font-size: 12px; color: var(--primary-hover); margin-bottom: 4px;">📝 中文對照與解析</div>
      <p id="reader-translation" style="font-size: 12px; color: var(--text-muted);">請點選上方文章進行閱讀。</p>
    </div>
  </div>

  <nav class="bottom-nav">
    <div class="nav-item active" onclick="switchTab('learn', this)"><span class="nav-icon">🗺️</span><span>學習考場</span></div>
    <div class="nav-item" onclick="switchTab('vocab', this)"><span class="nav-icon">🎴</span><span>深度單字</span></div>
    <div class="nav-item" onclick="switchTab('games', this)"><span class="nav-icon">🎮</span><span>遊戲中心</span></div>
    <div class="nav-item" onclick="switchTab('profile', this)"><span class="nav-icon">👤</span><span>備考戰力</span></div>
  </nav>

</div>

<script>
const appDatabase = {
  en_toeic: {
    exams: [
      {
        id: 'toeic_300',
        title: 'TOEIC 300分入門模擬卷 (基礎文法與單字)',
        desc: '專為多益 300 分起步者設計，測試基礎句型與日常工作單字',
        duration: 600,
        questions: [
          {
            type: 'reading',
            title: 'Part 5: 基礎代名詞與動詞填空',
            passage: 'Ms. Green will visit our office tomorrow. Please give _______ the latest report.',
            options: ['(A) she', '(B) her', '(C) hers', '(D) herself'],
            answer: 1,
            coachTip: '💡 教練解析：動詞 give 後面需要接受格 her。',
            explanation: 'give 為授與動詞，其後接受格代名詞 her 作受詞。'
          }
        ]
      }
    ],
    library: [
      {
        id: 'lib_en_300_1',
        date: '2026-08-09',
        category: 'daily',
        title: '☕ A Simple Morning Routine at Work',
        level: 'TOEIC 300+ 基礎',
        rawText: 'Every morning, John arrives at the office at nine o clock. He checks his email and drinks a cup of coffee before the team meeting.',
        translation: '每天早上，約翰在九點到達辦公室。他在團隊會議前檢查電子郵件並喝了一杯咖啡。',
        vocabNotes: [
          { word: 'arrives', meaning: '到達' },
          { word: 'checks', meaning: '檢查' }
        ]
      }
    ],
    vocabs: [
      { word: 'Schedule', phonetic: '/ˈskedʒuːl/', pos: '名詞 (n.)', meaning: '行程表、時間表', level: 'TOEIC 300+', exEn: 'Please check your schedule.', exZh: '請檢查您的行程表。' }
    ]
  },
  ja_jlpt: {
    exams: [
      {
        id: 'jlpt_n5',
        title: 'JLPT N5 入門基礎模擬測驗',
        desc: '測試基礎助詞與初階動詞變化',
        duration: 600,
        questions: [
          {
            type: 'reading',
            title: '問題：助詞の選択',
            passage: '私は毎日、図書館_______勉強します。',
            options: ['1. で', '2. に', '3. を', '4. は'],
            answer: 0,
            coachTip: '💡 教練解析：在某個場所進行動作，使用助詞「で」。',
            explanation: '表示進行動作的場所時，使用「で」。'
          }
        ]
      }
    ],
    library: [
      {
        id: 'lib_ja_n5_1',
        date: '2026-08-09',
        category: 'daily',
        title: '🌸 私の新しい日本語の生活',
        level: 'JLPT N5 入門',
        rawText: '私は毎日朝七時に起きます。そして、パンを食べます。日本語の勉強はとても楽しいです。',
        translation: '我每天早上七點起床。然後，吃麵包。日語學習非常有趣。',
        vocabNotes: [
          { word: '起きます', meaning: '起床' },
          { word: '楽しい', meaning: '快樂的、有趣的' }
        ]
      }
    ],
    vocabs: [
      { word: '食べる', phonetic: 'たべる', pos: '動詞 (一段)', meaning: '吃', level: 'JLPT N5', exEn: 'りんごを食べます。', exZh: '吃蘋果。' }
    ]
  },
  ko_topik: {
    exams: [
      {
        id: 'topik_i',
        title: 'TOPIK I (初級) 基礎文法與閱讀模擬',
        desc: '測試基礎句尾與日常對話',
        duration: 600,
        questions: [
          {
            type: 'reading',
            title: '빈칸 채우기',
            passage: '저는 오늘 친구를 _______.',
            options: ['1. 만나요', '2. 맛있다', '3. 가방', '4. 예쁘다'],
            answer: 0,
            coachTip: '💡 教練解析：친구(朋友)通常搭配 만나요(見面)。',
            explanation: '句子語意為「我今天和朋友見面」，故選 만나요。'
          }
        ]
      }
    ],
    library: [
      {
        id: 'lib_ko_i_1',
        date: '2026-08-09',
        category: 'daily',
        title: '🇰🇷 나의 하루 일과',
        level: 'TOEIC / TOPIK I 初級',
        rawText: '아침에 일어나서 커피를 마셔요. 그리고 회사에 갑니다. 일하는 것은 재미있어요.',
        translation: '早上起床後喝咖啡。然後去公司。工作很有趣。',
        vocabNotes: [
          { word: '마셔요', meaning: '喝' },
          { word: '갑니다', meaning: '去' }
        ]
      }
    ],
    vocabs: [
      { word: '사과', phonetic: '/sa-gwa/', pos: '名詞 (n.)', meaning: '蘋果', level: 'TOEIC / TOPIK I', exEn: '사과를 먹어요.', exZh: '吃蘋果。' }
    ]
  },
  fr_delf: {
    exams: [
      {
        id: 'delf_a1',
        title: 'DELF A1 Découverte et Grammaire',
        desc: '法語檢定 A1 初級基礎與自我介紹',
        duration: 600,
        questions: [
          {
            type: 'reading',
            title: 'Conjugaison basique',
            passage: 'Bonjour ! Je _______ Marie et j’habite à Paris.',
            options: ['(A) suis', '(B) s’appelle', '(C) es', '(D) ont'],
            answer: 0,
            coachTip: '💡 教練解析：第一人稱主詞 Je 搭配être動詞變位為 suis。',
            explanation: 'Je 的être動詞正確變位為 suis (Je suis)。'
          }
        ]
      }
    ],
    library: [
      {
        id: 'lib_fr_a1_1',
        date: '2026-08-09',
        category: 'daily',
        title: '🥐 Ma première journée à Paris',
        level: 'DELF A1 入門',
        rawText: 'Le matin, je prends un croissant et un café dans un petit café. J’aime beaucoup la ville.',
        translation: '早上，我在一間小咖啡館吃可頌配咖啡。我非常喜歡這座城市。',
        vocabNotes: [
          { word: 'matin', meaning: '早晨' },
          { word: 'ville', meaning: '城市' }
        ]
      }
    ],
    vocabs: [
      { word: 'Bonjour', phonetic: '/bɔ̃.ʒuʁ/', pos: '感嘆詞', meaning: '早安、你好', level: 'DELF A1', exEn: 'Bonjour, comment ça va ?', exZh: '你好，最近怎麼樣？' }
    ]
  },
  de_goethe: {
    exams: [
      {
        id: 'goethe_a1',
        title: 'Goethe-Zertifikat A1 Start Deutsch',
        desc: '德語檢定 A1 基礎文法與對話測驗',
        duration: 600,
        questions: [
          {
            type: 'reading',
            title: 'Verben im Präsens',
            passage: 'Ich _______ Anna und komme aus Berlin.',
            options: ['(A) bin', '(B) bist', '(C) ist', '(D) sind'],
            answer: 0,
            coachTip: '💡 教練解析：主詞 Ich 對應的 sein 動詞是 bin。',
            explanation: 'Ich (我) 的動詞sein變化為 bin。'
          }
        ]
      }
    ],
    library: [
      {
        id: 'lib_de_a1_1',
        date: '2026-08-09',
        category: 'daily',
        title: '☕ Mein Morgen in München',
        level: 'Goethe A1 入門',
        rawText: 'Am Morgen trinke ich gerne Tee. Die Sonne scheint und das Wetter ist sehr schön.',
        translation: '早上我喜歡喝茶。陽光普照，天氣非常好。',
        vocabNotes: [
          { word: 'trinke', meaning: '喝' },
          { word: 'Wetter', meaning: '天氣' }
        ]
      }
    ],
    vocabs: [
      { word: 'Guten Tag', phonetic: '/ˈɡuːtn̩ ˈtaːk/', pos: '片語', meaning: '您好', level: 'Goethe A1', exEn: 'Guten Tag, Herr Müller.', exZh: '您好，穆勒先生。' }
    ]
  },
  es_dele: {
    exams: [
      {
        id: 'dele_a1',
        title: 'DELE A1 Acceso y Vocabulario Básico',
        desc: '西班牙語檢定 A1 初學者基礎測驗',
        duration: 600,
        questions: [
          {
            type: 'reading',
            title: 'Verbos regulares',
            passage: 'Yo _______ español todos los días.',
            options: ['(A) estudio', '(B) estudias', '(C) estudia', '(D) estudiamos'],
            answer: 0,
            coachTip: '💡 教練解析：第一人稱 Yo 的動詞字尾通常結尾於 -o (estudio)。',
            explanation: 'Yo 對應動詞 regular -ar 結尾變位為 estudio。'
          }
        ]
      }
    ],
    library: [
      {
        id: 'lib_es_a1_1',
        date: '2026-08-09',
        category: 'daily',
        title: '☀️ Mi rutina diaria en Madrid',
        level: 'DELE A1 入門',
        rawText: 'Por la mañana, desayuno pan con aceite de oliva. Me gusta mucho pasear por el parque.',
        translation: '早上，我吃配橄欖油的麵包當早餐。我非常喜歡在公園散步。',
        vocabNotes: [
          { word: 'mañana', meaning: '早晨、明天' },
          { word: 'parque', meaning: '公園' }
        ]
      }
    ],
    vocabs: [
      { word: 'Amigo', phonetic: '/aˈmi.ɣo/', pos: '名詞 (n.)', meaning: '朋友', level: 'DELE A1', exEn: 'Él es mi amigo.', exZh: '他是我的朋友。' }
    ]
  }
};

let currentLangKey = 'en_toeic';
let currentVocabIdx = 0;
let currentFilter = 'all';
let userProfile = { xp: 0, streak: 1, aiWrongList: [] };
let examTimerInterval = null;
let activeArticleText = '';

function init() {
  loadFromLocalStorage();
  renderData();
  updateUI();
}

function saveToLocalStorage() {
  localStorage.setItem('polyglot_profile', JSON.stringify(userProfile));
}

function loadFromLocalStorage() {
  const saved = localStorage.getItem('polyglot_profile');
  if (saved) {
    try { userProfile = JSON.parse(saved); } catch (e) {}
  }
  const savedTheme = localStorage.getItem('polyglot_theme');
  if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    document.getElementById('theme-btn').innerText = '☀️';
  }
}

function toggleTheme() {
  const current = document.body.getAttribute('data-theme');
  if (current === 'dark') {
    document.body.setAttribute('data-theme', 'light');
    document.getElementById('theme-btn').innerText = '🌙';
    localStorage.setItem('polyglot_theme', 'light');
  } else {
    document.body.setAttribute('data-theme', 'dark');
    document.getElementById('theme-btn').innerText = '☀️';
    localStorage.setItem('polyglot_theme', 'dark');
  }
}

function switchTab(tabId, el) {
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  document.querySelectorAll('.tab-page').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  document.getElementById(`tab-${tabId}`).classList.add('active');
}

function switchLearnSubTab(type) {
  const btns = document.querySelectorAll('.segmented-control .segment-btn');
  btns.forEach(b => b.classList.remove('active'));
  if (type === 'exam') {
    btns[0].classList.add('active');
    document.getElementById('sub-learn-exam').style.display = 'block';
    document.getElementById('sub-learn-lib').style.display = 'none';
  } else {
    btns[1].classList.add('active');
    document.getElementById('sub-learn-exam').style.display = 'none';
    document.getElementById('sub-learn-lib').style.display = 'block';
  }
}

function changeLanguage(key) {
  currentLangKey = key;
  currentVocabIdx = 0;
  renderData();
}

function filterArticles(cat, el) {
  currentFilter = cat;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  renderLibrary();
}

function renderData() {
  const db = appDatabase[currentLangKey] || appDatabase['en_toeic'];
  
  const container = document.getElementById('exam-list-container');
  container.innerHTML = '';
  db.exams.forEach(ex => {
    container.innerHTML += `
      <div class="card exam-card">
        <div>
          <div style="font-weight:bold; font-size:14px; margin-bottom:2px;">${ex.title}</div>
          <div style="font-size:11px; color:var(--text-muted);">${ex.desc}</div>
        </div>
        <button class="btn-action" onclick="openExamModal('${ex.id}')">進入考場</button>
      </div>
    `;
  });

  renderLibrary();
  renderVocabCard();
}

function renderLibrary() {
  const db = appDatabase[currentLangKey] || appDatabase['en_toeic'];
  const libContainer = document.getElementById('library-list-container');
  libContainer.innerHTML = '';
  
  const todayStr = '2026-08-09';
  const filtered = db.library.filter(art => currentFilter === 'all' || art.category === currentFilter);

  if (filtered.length === 0) {
    libContainer.innerHTML = `<div style="text-align:center; padding:20px; font-size:12px; color:var(--text-muted);">此分類目前尚無文章</div>`;
    return;
  }

  filtered.forEach(art => {
    const isToday = art.date === todayStr;
    libContainer.innerHTML += `
      <div class="card lib-article-card" onclick="openReaderModal('${art.id}')">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <span style="font-size:10px; font-weight:bold; background:var(--bg-color); border:1px solid var(--border-color); color:var(--primary-hover); padding:2px 8px; border-radius:6px;">${art.level}</span>
          <div>
            <span style="font-size:10px; color:var(--text-muted);">📅 ${art.date}</span>
            ${isToday ? '<span class="today-tag">今日精選</span>' : ''}
          </div>
        </div>
        <h3 style="font-size:14px; margin:6px 0 2px 0;">${art.title}</h3>
        <p style="font-size:11px; color:var(--text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${art.rawText}</p>
      </div>
    `;
  });
}

function openReaderModal(artId) {
  const db = appDatabase[currentLangKey] || appDatabase['en_toeic'];
  const art = db.library.find(a => a.id === artId);
  document.getElementById('reader-title').innerText = art.title;
  activeArticleText = art.rawText;
  document.getElementById('reader-translation').innerText = art.translation;

  let processedText = art.rawText;
  art.vocabNotes.forEach(v => {
    const regex = new RegExp(`(${v.word})`, 'gi');
    processedText = processedText.replace(regex, `<span class="highlight-vocab" onclick="addNoteToProfile('${v.word}', '${v.meaning}')">$1 (📌 ${v.meaning})</span>`);
  });

  document.getElementById('reader-body').innerHTML = processedText;
  document.getElementById('reader-modal').classList.add('active');
}

function closeReaderModal() {
  document.getElementById('reader-modal').classList.remove('active');
}

function speakCurrentArticle() {
  speakText(activeArticleText);
}

function addNoteToProfile(word, meaning) {
  userProfile.aiWrongList.push({ word: `[圖書館生字] ${word}`, meaning: meaning });
  userProfile.xp += 5;
  saveToLocalStorage();
  updateUI();
  alert(`✅ 已成功將「${word} (${meaning})」收入筆記本！+5 XP`);
}

function clearNotes() {
  if (confirm('確定要清空所有生字筆記嗎？')) {
    userProfile.aiWrongList = [];
    saveToLocalStorage();
    updateUI();
  }
}

function renderVocabCard() {
  const db = appDatabase[currentLangKey] || appDatabase['en_toeic'];
  const v = db.vocabs[currentVocabIdx];
  document.getElementById('active-card').classList.remove('flipped');
  document.getElementById('card-level').innerText = v.level;
  document.getElementById('card-word').innerText = v.word;
  document.getElementById('card-phonetic').innerText = v.phonetic;
  document.getElementById('card-pos').innerText = v.pos;
  document.getElementById('card-meaning').innerText = v.meaning;
  document.getElementById('card-ex-en').innerText = v.exEn;
  document.getElementById('card-ex-zh').innerText = v.exZh;
}

function flipCard() { document.getElementById('active-card').classList.toggle('flipped'); }

function speakWord(rate) {
  const db = appDatabase[currentLangKey] || appDatabase['en_toeic'];
  speakText(db.vocabs[currentVocabIdx].word, rate);
}

function speakText(txt, rate = 1.0) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(txt);
  utter.rate = rate;
  if (currentLangKey.startsWith('ja')) utter.lang = 'ja-JP';
  else if (currentLangKey.startsWith('ko')) utter.lang = 'ko-KR';
  else if (currentLangKey.startsWith('fr')) utter.lang = 'fr-FR';
  else if (currentLangKey.startsWith('de')) utter.lang = 'de-DE';
  else if (currentLangKey.startsWith('es')) utter.lang = 'es-ES';
  else utter.lang = 'en-US';
  window.speechSynthesis.speak(utter);
}

function rateSRS(score) {
  if (score === 1) {
    const db = appDatabase[currentLangKey] || appDatabase['en_toeic'];
    userProfile.aiWrongList.push(db.vocabs[currentVocabIdx]);
  }
  userProfile.xp += score * 2;
  saveToLocalStorage();
  updateUI();
  const db = appDatabase[currentLangKey] || appDatabase['en_toeic'];
  currentVocabIdx = (currentVocabIdx + 1) % db.vocabs.length;
  renderVocabCard();
}

function openExamModal(id) {
  const db = appDatabase[currentLangKey] || appDatabase['en_toeic'];
  const ex = db.exams.find(e => e.id === id);
  document.getElementById('exam-modal-title').innerText = ex.title;
  const qc = document.getElementById('exam-quiz-content');
  qc.innerHTML = '';

  ex.questions.forEach((q, idx) => {
    qc.innerHTML += `
      <div class="card">
        <div style="font-weight:bold; font-size:13px; margin-bottom:6px;">${idx+1}. ${q.title}</div>
        ${q.passage ? `<div class="passage-box">${q.passage}</div>` : ''}
        ${q.options.map((opt, oIdx) => `<button class="quiz-opt" onclick="checkAnswer('${id}', ${idx}, ${oIdx})">${opt}</button>`).join('')}
      </div>
    `;
  });

  document.getElementById('exam-modal').classList.add('active');

  let left = ex.duration;
  clearInterval(examTimerInterval);
  examTimerInterval = setInterval(() => {
    left--;
    const m = Math.floor(left / 60);
    const s = left % 60;
    document.getElementById('exam-timer').innerText = `${m}:${s<10?'0':''}${s}`;
    if (left <= 0) { clearInterval(examTimerInterval); alert('時間到！'); closeExamModal(); }
  }, 1000);
}

function checkAnswer(examId, qIdx, selected) {
  const db = appDatabase[currentLangKey] || appDatabase['en_toeic'];
  const ex = db.exams.find(e => e.id === examId);
  const q = ex.questions[qIdx];

  if (selected === q.answer) {
    alert(`🎉 答對了！\n\n${q.coachTip}`);
    userProfile.xp += 20;
  } else {
    alert(`❌ 答錯了！\n\n${q.coachTip}\n解析：${q.explanation}`);
    userProfile.aiWrongList.push({ word: q.title, meaning: q.explanation });
  }
  saveToLocalStorage();
  updateUI();
}

function closeExamModal() {
  clearInterval(examTimerInterval);
  document.getElementById('exam-modal').classList.remove('active');
}

function completeTodo(el, xpReward) {
  el.parentElement.innerHTML = `<span>✅ 已完成目標</span><span style="color:var(--primary);">+${xpReward} XP</span>`;
  userProfile.xp += xpReward;
  saveToLocalStorage();
  updateUI();
}

function startMatchGame() {
  const b = document.getElementById('game-board');
  b.style.display = 'block';
  b.innerHTML = '<p style="font-size:12px; font-weight:bold; margin-bottom:8px;">點擊配對單字與中文：</p>';
  const db = appDatabase[currentLangKey] || appDatabase['en_toeic'];
  let items = db.vocabs.slice(0, 1);
  let arr = [];
  items.forEach(i => { arr.push({t:i.word, id:i.word}); arr.push({t:i.meaning, id:i.word}); });
  arr.push({t:'Schedule', id:'Schedule'}); arr.push({t:'行程表', id:'Schedule'});
  arr.sort(() => Math.random() - 0.5);

  let sel = null;
  arr.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.style.width = '48%';
    btn.style.display = 'inline-block';
    btn.style.margin = '1%';
    btn.innerText = item.t;
    btn.onclick = () => {
      if (!sel) { sel = {btn, id:item.id}; btn.style.borderColor = 'var(--primary)'; }
      else {
        if (sel.id === item.id && sel.btn !== btn) {
          btn.style.background = 'rgba(133, 210, 208, 0.3)'; sel.btn.style.background = 'rgba(133, 210, 208, 0.3)';
          userProfile.xp += 15; saveToLocalStorage(); updateUI();
        } else { sel.btn.style.borderColor = 'var(--border-color)'; }
        sel = null;
      }
    };
    b.appendChild(btn);
  });
}

function updateUI() {
  document.getElementById('user-xp').innerText = userProfile.xp;
  document.getElementById('streak-days').innerText = userProfile.streak;
  document.getElementById('prof-xp').innerText = userProfile.xp;
  document.getElementById('prof-streak').innerText = `${userProfile.streak} 天`;
  document.getElementById('prof-wrong-count').innerText = userProfile.aiWrongList.length;

  if (userProfile.xp >= 50) document.getElementById('ach-1').classList.add('unlocked');
  if (userProfile.aiWrongList.length >= 3) document.getElementById('ach-2').classList.add('unlocked');
  if (userProfile.xp >= 20) document.getElementById('ach-3').classList.add('unlocked');

  const wl = document.getElementById('ai-wrong-list');
  if (userProfile.aiWrongList.length > 0) {
    wl.innerHTML = userProfile.aiWrongList.map(w => `<div style="padding:4px 0; border-bottom:1px solid var(--border-color); color:var(--text-main);">📌 ${w.word || '生字'} : ${w.meaning || ''}</div>`).join('');
  } else {
    wl.innerHTML = '目前尚無筆記紀錄，開始探索學習吧！';
  }
}

window.onload = init;
</script>

</body>
</html>
