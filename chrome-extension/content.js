const CSS_ID = 'dev-css';
let lastCSS = null;

function injectCSS(css) {
  const old = document.getElementById(CSS_ID);
  if (old) old.remove();

  const style = document.createElement('style');
  style.id = CSS_ID;
  style.textContent = css;
  document.head.appendChild(style);

  console.log('CSS injected:', new Date().toLocaleTimeString());
}

function requestCSS(callback) {
  try {
    chrome.runtime.sendMessage({ type: 'get-css' }, (res) => {
      if (!res || res.error) return callback && callback(null);
      callback && callback(res.css);
    });
  } catch (e) {
    callback && callback(null);
  }
}

// Poll periodically for updated CSS (1s)
setInterval(() => {
  requestCSS((css) => {
    if (!css) return;
    if (lastCSS !== css) {
      lastCSS = css;
      injectCSS(css);
    }
  });
}, 1000);

// Initial
requestCSS((css) => {
  if (css) {
    lastCSS = css;
    injectCSS(css);
  }
});

// Minimal indicator and manual reload
const div = document.createElement('div');
div.textContent = 'CSS';
div.style.cssText = 'position:fixed;cursor:pointer;bottom:10px;right:10px;background:green;color:white;padding:5px;z-index:9999';
div.onclick = () => {
  requestCSS((css) => {
    if (css && css !== lastCSS) {
      lastCSS = css;
      injectCSS(css);
    }
  });
};
document.body.appendChild(div);