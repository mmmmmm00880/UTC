// タブ切り替え
function openTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// 時間変換ロジック
const jstInput = document.getElementById('jstInput');
const utcInput = document.getElementById('utcInput');
const utcResult = document.getElementById('utcResult');
const jstResult = document.getElementById('jstResult');
const copyText = document.getElementById('copyText');

// 「m/d h:mm」形式にフォーマットする関数
function formatDateTime(date) {
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const min = date.getMinutes().toString().padStart(2, '0');
    return `${m}/${d} ${h}:${min}`;
}

// JST -> UTC 変換
jstInput.addEventListener('input', () => {
    if (!jstInput.value) return;
    const jstDate = new Date(jstInput.value);
    const utcDate = new Date(jstDate.getTime() - (9 * 60 * 60 * 1000));
    
    utcResult.textContent = utcDate.toLocaleString('ja-JP');
    copyText.value = `日本時間 ${formatDateTime(jstDate)}、UTC ${formatDateTime(utcDate)}`;
});

// UTC -> JST 変換
utcInput.addEventListener('input', () => {
    if (!utcInput.value) return;
    const utcDate = new Date(utcInput.value);
    const jstDate = new Date(utcDate.getTime() + (9 * 60 * 60 * 1000));
    
    jstResult.textContent = jstDate.toLocaleString('ja-JP');
    copyText.value = `UTC ${formatDateTime(utcDate)}、日本時間 ${formatDateTime(jstDate)}`;
});

// コピー機能
document.getElementById('copyBtn').addEventListener('click', () => {
    copyText.select();
    document.execCommand('copy');
    alert('コピーしました！');
});
