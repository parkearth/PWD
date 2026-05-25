// 1. 更新版本號（從 v1 升級為 pcontrol-v2），這是觸發瀏覽器更新的核心
const CACHE_NAME = 'pest-control-analytics-v2';

// 2. 重新定義這次要快取的全新檔案清單
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './surveyAgent.js',
  './app.js'
];

// 安裝事件：將全新防治系統的靜態資源寫入快取
self.addEventListener('install', (e) => {
  // 強制讓處於等待狀態的 Service Worker 立即激活，不用等使用者關閉 App 重新開啟
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('--- [PWA] 鼠類防治大數據快取成功建立 ---');
      return cache.addAll(ASSETS);
    })
  );
});

// 激活事件：【最重要】自動清理掉「世足賽」或先前留下的舊版垃圾快取
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log(`--- [PWA] 成功清除舊快取檔案: ${key} ---`);
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      // 讓新激活的 Service Worker 馬上接管所有打開的網頁視窗
      return self.clients.claim();
    })
  );
});

// 攔截事件：網路優先策略（Network-First）
// 針對需要即時填報與讀取 Ollama AI 的系統，我們改成「先抓網路，失敗了（沒網時）再吃快取」
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .catch(() => {
        // 當完全斷網、在山區或深處現勘時，自動降級調用離線快取檔案
        return caches.match(e.request);
      })
  );
});