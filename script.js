// タブ切り替え
function openTab(tabId) {
    // すべてのコンテンツを一旦非表示にする
    document.querySelectorAll('.tab-content').forEach(c => {
        c.classList.remove('active');
        c.style.display = 'none'; // 明示的に非表示
    });
    
    // すべてのボタンからactiveを消す
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    // 選択されたタブだけ表示する
    const selectedTab = document.getElementById(tabId);
    selectedTab.classList.add('active');
    selectedTab.style.display = 'block'; // 明示的に表示
    
    // ボタンをアクティブにする
    event.currentTarget.classList.add('active');
}

// 初期値（現在時刻）の設定
window.onload = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    const nowString = now.toISOString().slice(0, 16);
    jstInput.value = nowString;
    utcInput.value = nowString;
    updateFromJST(); // 初期表示実行
};

// 共通フォーマット (m/d h:mm)
function formatDateTime(date) {
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const min = date.getMinutes().toString().padStart(2, '0');
    return `${m}/${d} ${h}:${min}`;
}

// 結果表示用 (yyyy/m/d h:mm)
function formatFull(date) {
    return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
}

function updateFromJST() {
    if (!jstInput.value) return;
    const jstDate = new Date(jstInput.value);
    const utcDate = new Date(jstDate.getTime() - (9 * 60 * 60 * 1000));
    utcResult.textContent = formatFull(utcDate);
    copyText.value = `日本時間 ${formatDateTime(jstDate)}、UTC ${formatDateTime(utcDate)}`;
}

function updateFromUTC() {
    if (!utcInput.value) return;
    const utcDate = new Date(utcInput.value);
    const jstDate = new Date(utcDate.getTime() + (9 * 60 * 60 * 1000));
    jstResult.textContent = formatFull(jstDate);
    copyText.value = `UTC ${formatDateTime(utcDate)}、日本時間 ${formatDateTime(jstDate)}`;
}

jstInput.addEventListener('input', updateFromJST);
utcInput.addEventListener('input', updateFromUTC);

document.getElementById('copyBtn').addEventListener('click', () => {
    copyText.select();
    document.execCommand('copy');
    alert('コピーしました！');
});
