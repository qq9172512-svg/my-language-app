// 1. 全域變數，存放從雲端抓下來的資料
let appDatabase = null;

// 2. 設定你的 Raw JSON URL (請將下面連結換成你 GitHub 檔案的 Raw 連結)
const DB_URL = 'https://raw.githubusercontent.com/你的帳號/my-language-app/main/languages_db.json';

// 3. 核心載入函數
async function loadData() {
    try {
        console.log("正在從雲端同步題庫...");
        const response = await fetch(DB_URL);
        
        if (!response.ok) {
            throw new Error(`網路錯誤: ${response.status}`);
        }
        
        appDatabase = await response.json();
        console.log("✅ 題庫更新成功！目前支援語言:", Object.keys(appDatabase));
        
        // 資料載入完成後，正式啟動 App 介面
        initApp(); 
    } catch (err) {
        console.error("❌ 無法載入題庫，請檢查 GitHub 連結是否正確:", err);
    }
}

// 4. 初始化介面 (取代你原本的程式入口)
function initApp() {
    if (!appDatabase) return;
    
    // 範例：渲染語言選單
    console.log("渲染應用程式介面中...");
    
    // 這裡放入你原本處理 DOM 的渲染邏輯
    // 例如：displayLanguages(Object.keys(appDatabase));
}

// 5. 程式啟動點
document.addEventListener('DOMContentLoaded', () => {
    loadData();
});
