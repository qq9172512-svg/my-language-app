/**
 * 終身學習 App - 核心邏輯
 * 功能：自動雲端載入題庫、動態產生語言選單、錯題儲存機制
 */

let appDatabase = null;
const DB_URL = 'https://raw.githubusercontent.com/你的帳號/my-language-app/main/languages_db.json'; // 請務必修改為你的正確 Raw 連結

// 1. 初始化程序
document.addEventListener('DOMContentLoaded', () => {
    loadData();
});

async function loadData() {
    try {
        const response = await fetch(DB_URL);
        if (!response.ok) throw new Error('連線失敗');
        appDatabase = await response.json();
        console.log("✅ 題庫載入成功");
        initUI();
    } catch (err) {
        console.error("❌ 無法載入題庫:", err);
    }
}

// 2. 動態渲染語言選單 (假設你的 HTML 有一個 <div id="lang-menu"></div>)
function initUI() {
    const menuContainer = document.getElementById('lang-menu');
    if (!menuContainer) return;

    Object.keys(appDatabase).forEach(langKey => {
        const langData = appDatabase[langKey];
        const btn = document.createElement('button');
        btn.innerHTML = langData.name;
        btn.onclick = () => renderContent(langKey);
        menuContainer.appendChild(btn);
    });
}

// 3. 渲染指定語言的內容 (文章與題目)
function renderContent(langKey) {
    const data = appDatabase[langKey];
    console.log("正在顯示:", data.name);
    // 這裡放入你原本渲染「文章列表」或「測驗區」的邏輯
    // 例如：displayLibrary(data.library);
}

// 4. 錯題管理系統 (幫助檢定衝刺)
function saveWrongAnswer(lang, questionId) {
    let wrongBook = JSON.parse(localStorage.getItem('myWrongBook') || '{}');
    if (!wrongBook[lang]) wrongBook[lang] = [];
    
    // 如果尚未收錄，則加入錯題本
    if (!wrongBook[lang].includes(questionId)) {
        wrongBook[lang].push(questionId);
        localStorage.setItem('myWrongBook', JSON.stringify(wrongBook));
        alert("已加入錯題本，準備衝刺！");
    }
}

// 5. 語音朗讀功能 (提升聽力，幫助檢定)
function speakText(text, langCode) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = langCode; // 例如 'en-US', 'ja-JP'
    window.speechSynthesis.speak(msg);
}
