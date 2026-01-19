const CSS_URL = 'http://localhost:5173/css';

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === 'get-css') {
    fetch(CSS_URL + '?t=' + Date.now(), { cache: 'no-cache' })
      .then(res => res.text().then(text => sendResponse({ css: text, etag: res.headers.get('etag'), lastModified: res.headers.get('last-modified') })))
      .catch(() => sendResponse({ error: true }));
    return true; // keep channel open for async response
  }
});
