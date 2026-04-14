// 初期化：現在のローカル時刻をセット
window.onload = () => {
    const now = new Date();
    const localIso = now.toLocaleString('sv-SE').replace(' ', 'T').substring(0, 16);
    
    const jstInput = document.getElementById('jstInput');
    const utcInput = document.getElementById('utcInput');
    
    jstInput.value = localIso;
    utcInput.value = localIso;
    
    // 初回計算
    updateConversion('jstToUtc');
};

// タブ切り替え
function switchTab(mode) {
    const jstSection = document.getElementById('jstToUtc');
    const utcSection = document.getElementById('utcToJst');
    const buttons = document.querySelectorAll('.tab-btn');

    if (mode === 'jstToUtc') {
        jstSection.style.display = 'block';
        utcSection.style.display = 'none';
        buttons[0].classList.add('active');
        buttons[1].classList.remove('active');
        updateConversion('jstToUtc');
    } else {
        jstSection.style.display = 'none';
        utcSection.style.display = 'block';
        buttons[1].classList.add('active');
        buttons[0].classList.remove('active');
        updateConversion('utcToJst');
    }
}

// 変換ロジック
function updateConversion(mode) {
    const jstInput = document.getElementById('jstInput');
    const utcInput = document.getElementById('utcInput');
    const jstOutput = document.getElementById('jstOutput');
    const utcOutput = document.getElementById('utcOutput');
    const copyArea = document.getElementById('copyArea');

    let jstDate, utcDate;

    if (mode === 'jstToUtc') {
        jstDate = new Date(jstInput.value);
        if (isNaN(jstDate)) return;
        // JSTから9時間引いてUTCへ
        utcDate = new Date(jstDate.getTime() - (9 * 60 * 60 * 1000));
        utcOutput.innerText = formatDate(utcDate);
    } else {
        utcDate = new Date(utcInput.value);
        if (isNaN(utcDate)) return;
        // UTCに9時間足してJSTへ
        jstDate = new Date(utcDate.getTime() + (9 * 60 * 60 * 1000));
        jstOutput.innerText = formatDate(jstDate);
    }

    // コピー用テキスト作成
    const copyText = `日本時間 ${formatShort(jstDate)}、UTC ${formatShort(utcDate)}`;
    copyArea.value = copyText;
}

// フォーマット関数: yyyy/m/d h:mm
function formatDate(date) {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const min = date.getMinutes().toString().padStart(2, '0');
    return `${y}/${m}/${d}\n${h}:${min}`;
}

// フォーマット関数: m/d h:mm (コピー用)
function formatShort(date) {
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const min = date.getMinutes().toString().padStart(2, '0');
    return `${m}/${d} ${h}:${min}`;
}

// クリップボードへコピー
function copyToClipboard() {
    const copyArea = document.getElementById('copyArea');
    copyArea.select();
    document.execCommand('copy');
    
    const btn = document.querySelector('.copy-btn');
    const originalText = btn.innerText;
    btn.innerText = 'コピーしました！';
    btn.style.background = '#10b981';
    
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = '#8b5cf6';
    }, 2000);
}

// 入力イベントリスナー
document.getElementById('jstInput').addEventListener('input', () => updateConversion('jstToUtc'));
document.getElementById('utcInput').addEventListener('input', () => updateConversion('utcToJst'));
