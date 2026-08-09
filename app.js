/**
 * 終身學習 App - 完整核心邏輯
 * 包含：雲端動態題庫載入、動態選單渲染、測驗互動、錯題紀錄、語音朗讀
 */

let appDatabase = null;

// 請替換為你 GitHub 上 languages_db.json 的正確 Raw 連結
const DB_URL = 'https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/languages_db.json';

// 當網頁載入完成時，立即從雲端同步資料
document.addEventListener('DOMContentLoaded', () => {
    loadCloudDatabase();
});

async function loadCloudDatabase() {
    const area = document.getElementById('content-area');
    area.innerHTML = `<p style="text-align:center;">🔄 正在從雲端同步最新題庫，請稍候...</p>`;
    
    try {
        const response = await fetch(DB_URL);
        if (!response.ok) throw new Error(`連線失敗 (狀態碼: ${response.status})`);
        
        appDatabase = await response.json();
        console.log("✅ 雲端題庫載入成功！");
        renderLanguageMenu();
        
        area.innerHTML = `
            <div class="welcome-card">
                <h2>🎉 題庫同步完成！</h2>
                <p>上方已自動產生 6 國語言選單，請選擇你想挑戰的語言開始學習。</p>
            </div>
        `;
    } catch (err) {
        console.error("❌ 題庫載入失敗:", err);
        area.innerHTML = `
            <div class="welcome-card" style="color: #e74c3c;">
                <h2>⚠️ 載入題庫失敗</h2>
                <p>無法讀取 GitHub 上的 JSON 檔案，請檢查 `app.js` 中的 `DB_URL` 連結是否為正確的 Raw 網址。</p>
            </div>
        `;
    }
}

// 動態渲染語言選單
function renderLanguageMenu() {
    const menuContainer = document.getElementById('lang-menu');
    menuContainer.innerHTML = '';
    
    Object.keys(appDatabase).forEach(langKey => {
        const langData = appDatabase[langKey];
        const btn = document.createElement('button');
        btn.className = 'lang-btn';
        btn.innerText = langData.name;
        btn.onclick = () => renderLanguageDashboard(langKey);
        menuContainer.appendChild(btn);
    });
}

// 渲染特定語言的主控台（包含文章與考試）
function renderLanguageDashboard(langKey) {
    const area = document.getElementById('content-area');
    const data = appDatabase[langKey];
    
    let html = `<h2>🎯 ${data.name} 專屬訓練區</h2>`;
    
    // 渲染圖書館文章與生字筆記
    html += `<h3>📖 智慧圖書館 (閱讀與單字)</h3>`;
    data.library.forEach(lib => {
        html += `
            <div class="card">
                <h4>${lib.title} <span style="font-size:0.8rem; color:#e67e22;">[${lib.level}]</span></h4>
                <p>${lib.rawText}</p>
                <p style="color: #7f8c8d; font-size: 0.9rem; margin-top: 5px;"><b>中文翻譯：</b>${lib.translation}</p>
                <div style="margin-top: 10px;">
                    <strong>核心生字：</strong>
                    ${lib.vocabNotes.map(v => `<span class="vocab-badge">${v.word}: ${v.meaning}</span>`).join('')}
                </div>
                <button class="action-btn" style="background:#34495e;" onclick="speakText('${lib.rawText}', '${langKey}')">🔊 朗讀文章</button>
            </div>
        `;
    });
    
    // 渲染測驗區
    html += `<h3>📝 檢定模擬測驗</h3>`;
    data.exams.forEach((exam, examIndex) => {
        html += `
            <div class="card">
                <h3>${exam.title}</h3>
                <p>${exam.desc}</p>
                <button class="action-btn" onclick="startExam('${langKey}', ${examIndex})">開始測驗</button>
            </div>
        `;
    });
    
    area.innerHTML = html;
}

// 開始測驗互動介面
function startExam(langKey, examIndex) {
    const area = document.getElementById('content-area');
    const exam = appDatabase[langKey].exams[examIndex];
    
    let html = `<h2>📝 ${exam.title}</h2>`;
    
    exam.questions.forEach((q, qIndex) => {
        html += `
            <div class="quiz-box" id="question-${qIndex}">
                <p><b>Q${qIndex + 1}: ${q.title}</b></p>
                <p style="margin: 10px 0; font-weight: 500;">${q.passage}</p>
        `;
        
        q.options.forEach((opt, optIndex) => {
            html += `<button class="option-btn" onclick="checkAnswer('${langKey}', ${examIndex}, ${qIndex}, ${optIndex})">${opt}</button>`;
        });
        
        html += `</div>`;
    });
    
    html += `<button class="action-btn" style="margin-top:20px; background:#7f8c8d;" onclick="renderLanguageDashboard('${langKey}')">⬅ 返回語言主頁</button>`;
    area.innerHTML = html;
}

// 檢查答案邏輯
function checkAnswer(langKey, examIndex, qIndex, selectedOpt) {
    const q = appDatabase[langKey].exams[examIndex].questions[qIndex];
    const box = document.getElementById(`question-${qIndex}`);
    
    if (selectedOpt === q.answer) {
        box.style.borderLeftColor = '#2ecc71';
        box.innerHTML += `<p style="color: #2ecc71; margin-top: 10px; font-weight: bold;">✅ 答對了！${q.coachTip}</p>`;
    } else {
        box.style.borderLeftColor = '#e74c3c';
        box.innerHTML += `<p style="color: #e74c3c; margin-top: 10px; font-weight: bold;">❌ 答錯了。正確答案是選項 ${q.answer + 1}。<br>${q.coachTip}</p>`;
        
        // 自動記錄錯題到本地端
        saveWrongAnswer(langKey, `${examIndex}-${qIndex}`);
    }
}

// 錯題儲存機制 (幫助檢定衝刺)
function saveWrongAnswer(lang, questionId) {
    let wrongBook = JSON.parse(localStorage.getItem('myWrongBook') || '{}');
    if (!wrongBook[lang]) wrongBook[lang] = [];
    if (!wrongBook[lang].includes(questionId)) {
        wrongBook[lang].push(questionId);
        localStorage.setItem('myWrongBook', JSON.stringify(wrongBook));
        console.log(`📝 錯題已加入專屬複習本 (${lang})`);
    }
}

// 語音朗讀功能 (強化聽力)
function speakText(text, langKey) {
    if (!('speechSynthesis' in window)) {
        alert("您的瀏覽器不支援語音朗讀功能。");
        return;
    }
    
    // 對應語系代碼
    const langMap = {
        'en_toeic': 'en-US',
        'ja_jlpt': 'ja-JP',
        'ko_topik': 'ko-KR',
        'fr_delf': 'fr-FR',
        'de_goethe': 'de-DE',
        'es_dele': 'es-ES'
    };
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langMap[langKey] || 'en-US';
    window.speechSynthesis.speak(utterance);
}
