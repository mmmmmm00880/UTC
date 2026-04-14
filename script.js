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

function formatTime(date) {
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
}

// JST -> UTC 変換
jstInput.addEventListener('input', () => {
    if (!jstInput.value) return;
    const jstDate = new Date(jstInput.value);
    const utcDate = new Date(jstDate.getTime() - (9 * 60 * 60 * 1000));
    
    const utcStr = utcDate.toLocaleString('ja-JP');
    utcResult.textContent = utcStr;
    copyText.value = `日本時間 ${formatTime(jstDate)}、UTC ${formatTime(utcDate)}`;
});

// UTC -> JST 変換
utcInput.addEventListener('input', () => {
    if (!utcInput.value) return;
    const utcDate = new Date(utcInput.value);
    const jstDate = new Date(utcDate.getTime() + (9 * 60 * 60 * 1000));
    
    const jstStr = jstDate.toLocaleString('ja-JP');
    jstResult.textContent = jstStr;
    copyText.value = `UTC ${formatTime(utcDate)}、日本時間 ${formatTime(jstDate)}`;
});

// コピー機能
document.getElementById('copyBtn').addEventListener('click', () => {
    copyText.select();
    document.execCommand('copy');
    alert('コピーしました！');
});
