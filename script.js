// タブ切り替えロジック
function openTab(tabId) {
    // コンテンツの切り替え
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
    });
    
    const selectedContent = document.getElementById(tabId);
    selectedContent.classList.add('active');
    selectedContent.style.display = 'block';

    // ボタンの状態切り替え
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    // 切り替え時にコピペ枠をリセットまたは更新
    if (tabId === 'jst-to-utc') {
        updateFromJST();
    } else {
        updateFromUTC();
    }
}

const jstInput = document.getElementById('jstInput');
const utcInput = document.getElementById('utcInput');
const utcResult = document.getElementById('utcResult');
const jstResult = document.getElementById('jstResult');
const copyText = document.getElementById('copyText');

// ページ読み込み時の初期設定
window.onload = () => {
    const now = new Date();
    // input type="datetime-local" 用のフォーマット (yyyy-mm-ddThh:mm)
    const tzOffset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now - tzOffset).toISOString().slice(0, 16);
    
    jstInput.value = localISOTime;
    utcInput.value = localISOTime;
    
    updateFromJST(); // 初期表示
};

// コピペ用フォーマット (m/d h:mm)
function formatShort(date) {
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const min = date.getMinutes().toString().padStart(2, '0');
    return `${m}/${d} ${h}:${min}`;
}

// 画面表示用フォーマット (yyyy/m/d h:mm)
function formatFull(date) {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const min = date.getMinutes().toString().padStart(2, '0');
    return `${y}/${m}/${d} ${h}:${min}`;
}

// JSTからUTCを計算
function updateFromJST() {
    if (!jstInput.value) return;
    const jstDate = new Date(jstInput.value);
    const utcDate = new Date(jstDate.getTime() - (9 * 60 * 60 * 1000));
    
    utcResult.textContent = formatFull(utcDate);
    copyText.value = `日本時間 ${formatShort(jstDate)}、UTC ${formatShort(utcDate)}`;
}

// UTCからJSTを計算
function updateFromUTC() {
    if (!utcInput.value) return;
    const utcDate = new Date(utcInput.value);
    const jstDate = new Date(utcDate.getTime() + (9 * 60 * 60 * 1000));
    
    jstResult.textContent = formatFull(jstDate);
    copyText.value = `UTC ${formatShort(utcDate)}、日本時間 ${formatShort(jstDate)}`;
}

// イベントリスナー
jstInput.addEventListener('input', updateFromJST);
utcInput.addEventListener('input', updateFromUTC);

// コピー機能
document.getElementById('copyBtn').addEventListener('click', () => {
    if (!copyText.value) return;
    copyText.select();
    document.execCommand('copy');
    alert('コピーしました！');
});
