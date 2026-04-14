document.addEventListener('DOMContentLoaded', () => {
    initTime();
    
    // イベントリスナー登録
    document.getElementById('jstInput').addEventListener('input', convertJstToUtc);
    document.getElementById('utcInput').addEventListener('input', convertUtcToJst);
});

// 初期化処理：現在のローカル時刻をセット
function initTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    
    const formattedNow = `${year}-${month}-${date}T${hours}:${mins}`;
    
    document.getElementById('jstInput').value = formattedNow;
    document.getElementById('utcInput').value = formattedNow;

    // 初期計算実行
    convertJstToUtc();
    convertUtcToJst();
}

// 時刻のフォーマット YYYY/M/D H:mm
function formatDate(date) {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const hh = date.getHours();
    const mm = String(date.getMinutes()).padStart(2, '0');
    return `${y}/${m}/${d}\n${hh}:${mm}`;
}

// コピペ用エリアのテキスト作成
function getCopyText(jst, utc) {
    const jM = jst.getMonth() + 1;
    const jD = jst.getDate();
    const jH = jst.getHours();
    const jMin = String(jst.getMinutes()).padStart(2, '0');
    
    const uM = utc.getMonth() + 1;
    const uD = utc.getDate();
    const uH = utc.getHours();
    const uMin = String(utc.getMinutes()).padStart(2, '0');

    return `日本時間 ${jM}/${jD} ${jH}:${jMin}、UTC ${uM}/${uD} ${uH}:${uMin}`;
}

// JST -> UTC 変換
function convertJstToUtc() {
    const jstVal = document.getElementById('jstInput').value;
    if (!jstVal) return;

    const jstDate = new Date(jstVal);
    const utcDate = new Date(jstDate.getTime() - (9 * 60 * 60 * 1000));

    document.getElementById('utcResult').innerText = formatDate(utcDate);
    document.getElementById('jstCopyArea').value = getCopyText(jstDate, utcDate);
}

// UTC -> JST 変換
function convertUtcToJst() {
    const utcVal = document.getElementById('utcInput').value;
    if (!utcVal) return;

    const utcDate = new Date(utcVal);
    const jstDate = new Date(utcDate.getTime() + (9 * 60 * 60 * 1000));

    document.getElementById('jstResult').innerText = formatDate(jstDate);
    document.getElementById('utcCopyArea').value = getCopyText(jstDate, utcDate);
}

// タブ切り替え
function switchTab(type) {
    const jstPanel = document.getElementById('panel-jst-to-utc');
    const utcPanel = document.getElementById('panel-utc-to-jst');
    const jstBtn = document.getElementById('tab-jst-to-utc');
    const utcBtn = document.getElementById('tab-utc-to-jst');

    if (type === 'jst-to-utc') {
        jstPanel.style.display = 'flex';
        utcPanel.style.display = 'none';
        jstBtn.classList.add('active');
        utcBtn.classList.remove('active');
    } else {
        jstPanel.style.display = 'none';
        utcPanel.style.display = 'flex';
        jstBtn.classList.remove('active');
        utcBtn.classList.add('active');
    }
}

// クリップボードコピー
function copyToClipboard(id) {
    const copyText = document.getElementById(id);
    copyText.select();
    copyText.setSelectionRange(0, 99999); // スマホ対応
    navigator.clipboard.writeText(copyText.value).then(() => {
        alert("コピーしました！");
    });
}
