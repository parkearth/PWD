/**
 * sw.js — Service Worker for 臺北市政府工務局鼠類防治稽查報告 PWA
 *
 * 快取策略：Stale-While-Revalidate（邊回傳舊快取、邊背景更新）
 * 版本管理：每次部署更新 CACHE_VERSION，舊版快取將在 activate 時自動清除
 */

// ─────────────────────────────────────────────
// 版本與快取名稱設定
// ─────────────────────────────────────────────
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `rat-inspection-${CACHE_VERSION}`;

// 應用程式核心資源清單（App Shell）
const APP_SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  // 第三方 CDN 資源（離線時需要）
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
];

// ─────────────────────────────────────────────
// install 事件：預快取 App Shell 核心資源
// ─────────────────────────────────────────────
self.addEventListener('install', (event) => {
  console.log(`[SW] 安裝中：快取版本 ${CACHE_VERSION}`);

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] 正在預快取 App Shell 資源...');
      // 使用 addAll 確保所有資源都成功快取
      return cache.addAll(APP_SHELL_ASSETS).catch((err) => {
        // CDN 資源可能因網路問題失敗，允許部分失敗
        console.warn('[SW] 部分資源預快取失敗（可能為 CDN），繼續安裝...', err);
        // 嘗試逐一快取，忽略失敗的單一項目
        return Promise.allSettled(
          APP_SHELL_ASSETS.map((url) =>
            cache.add(url).catch((e) => console.warn(`[SW] 無法快取 ${url}:`, e))
          )
        );
      });
    })
  );

  // 強制新版 Service Worker 立即接管，不等待頁面關閉
  self.skipWaiting();
});

// ─────────────────────────────────────────────
// activate 事件：清除舊版本快取
// ─────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  console.log(`[SW] 啟用中：清除舊版快取...`);

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          // 篩選出不屬於本版本的快取
          .filter((name) => name.startsWith('rat-inspection-') && name !== CACHE_NAME)
          .map((oldCache) => {
            console.log(`[SW] 刪除舊版快取：${oldCache}`);
            return caches.delete(oldCache);
          })
      );
    }).then(() => {
      console.log('[SW] 舊版快取清除完成，Service Worker 正式接管所有 client。');
      // 立即接管所有已開啟的頁面
      return self.clients.claim();
    })
  );
});

// ─────────────────────────────────────────────
// fetch 事件：Stale-While-Revalidate 策略
//
// 流程：
// 1. 先從快取取出舊資料立即回傳（使用者體驗快）
// 2. 同時在背景向網路請求最新版本
// 3. 將最新版本存入快取，下次使用
// ─────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 只處理 GET 請求，其他方法（POST/PUT等）直接放行
  if (request.method !== 'GET') return;

  // 排除 Google Apps Script API 呼叫（這些必須即時連網）
  if (url.hostname.includes('script.google.com') ||
      url.hostname.includes('googleapis.com')) {
    return; // 不攔截，直接走網路
  }

  // 排除 chrome-extension 等非 http(s) 請求
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(staleWhileRevalidate(request));
});

/**
 * Stale-While-Revalidate 實作
 * 邊用舊快取回應、邊在背景更新快取
 *
 * @param {Request} request - 攔截到的網路請求
 * @returns {Promise<Response>} 快取的回應（或網路回應）
 */
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);

  // 從快取讀取現有資源（可能為 undefined）
  const cachedResponse = await cache.match(request);

  // 在背景發起網路請求（不 await，讓它非同步執行）
  const networkFetchPromise = fetch(request.clone())
    .then((networkResponse) => {
      // 確保回應有效（狀態 200、非 opaque 不快取）
      if (networkResponse && networkResponse.status === 200) {
        // 將最新版本存入快取（clone 後存，原始回傳給瀏覽器）
        cache.put(request, networkResponse.clone());
        console.log(`[SW] 背景更新快取：${request.url}`);
      }
      return networkResponse;
    })
    .catch((err) => {
      // 網路請求失敗（離線狀態），靜默處理
      console.warn(`[SW] 背景網路請求失敗（可能離線）：${request.url}`, err);
    });

  // 如果有快取，立即回傳快取資料（快速響應）
  if (cachedResponse) {
    return cachedResponse;
  }

  // 沒有快取時，等待網路回應
  try {
    const networkResponse = await networkFetchPromise;
    if (networkResponse) return networkResponse;
  } catch (e) {
    // 網路也失敗
  }

  // 最後防線：回傳離線提示頁（若有的話）
  return new Response(
    '<h1 style="font-family:sans-serif;text-align:center;margin-top:2rem;">目前處於離線狀態，請確認網路連線後再試。</h1>',
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}

// ─────────────────────────────────────────────
// message 事件：接收來自主頁的控制訊息
// ─────────────────────────────────────────────
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    // 主頁要求立即更新 Service Worker
    console.log('[SW] 收到 SKIP_WAITING 指令，強制更新...');
    self.skipWaiting();
  }
});
