// 現在のモード管理
let currentMode = 'jst-to-utc';

// ページ読み込み時の初期化
window.onload = () => {
    const now = new Date();
    // datetime-local形式 (YYYY-MM-DDTHH:mm) に変換
    const localIso = now.getFullYear() + '-' + 
        String(now.getMonth() + 1).padStart(2, '0') + '-' + 
        String(now.getDate()).padStart(2, '0') + 'T' + 
        String(now.getHours()).padStart(2, '0') + ':' + 
        String(now.getMinutes()).padStart(2, '0');

    document.getElementById('jst-input').value = localIso;
    document.getElementById('utc-input').value = localIso;
    
    // 初回計算
    convert();
};

// タブ切り替え機能
function showSection(mode) {
    currentMode = mode;
    const jstSec = document.getElementById('section-jst-to-utc');
    const utcSec = document.getElementById('section-utc-to-jst');
    const jstBtn = document.getElementById('btn-jst-to-utc');
    const utcBtn = document.getElementById('btn-utc-to-jst');

    if (mode === 'jst-to-utc') {
        jstSec.style.display = 'block';
        utcSec.style.display = 'none';
        jstBtn.classList.add('active');
        utcBtn.classList.remove('active');
    } else {
        jstSec.style.display = 'none';
        utcSec.style.display = 'block';
        utcBtn.classList.add('active');
        jstBtn.classList.remove('active');
    }
    convert();
}

// 変換メインロジック
function convert() {
    const jstIn = document.getElementById('jst-input').value;
    const utcIn = document.getElementById('utc-input').value;
    const jstRes = document.getElementById('jst-result');
    const utcRes = document.getElementById('utc-result');
    const copyArea = document.getElementById('copy-area');

    if (!jstIn || !utcIn) return;

    let dJST, dUTC;

    if (currentMode === 'jst-to-utc') {
        dJST = new Date(jstIn);
        // JSTから9時間戻すとUTC
        dUTC = new Date(dJST.getTime() - (9 * 60 * 60 * 1000));
        utcRes.innerText = formatFull(dUTC);
    } else {
        dUTC = new Date(utcIn);
        // UTCから9時間進めるとJST
        dJST = new Date(dUTC.getTime() + (9 * 60 * 60 * 1000));
        jstRes.innerText = formatFull(dJST);
    }

    // コピーエリア用：日本時間 4/14 22:44、UTC 4/14 13:44 形式
    copyArea.value = `日本時間 ${formatShort(dJST)}、UTC ${formatShort(dUTC)}`;
}

// フォーマット: yyyy/m/d h:mm (秒なし、改行あり)
function formatFull(date) {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${y}/${m}/${d}\n${h}:${min}`;
}

// フォーマット: m/d h:mm (コピー用)
function formatShort(date) {
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${m}/${d} ${h}:${min}`;
}

// コピー機能
function copyResult() {
    const area = document.getElementById('copy-area');
    const btn = document.getElementById('copy-btn');
    
    area.select();
    area.setSelectionRange(0, 99999); // スマホ対応
    
    navigator.clipboard.writeText(area.value).then(() => {
        const originalText = btn.innerText;
        btn.innerText = "コピーしました！";
        btn.style.backgroundColor = "#dcd6f7";
        btn.style.color = "#424874";
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = "#a6b1e1";
            btn.style.color = "white";
        }, 2000);
    });
}

// 入力イベントリスナー
document.getElementById('jst-input').addEventListener('input', convert);
document.getElementById('utc-input').addEventListener('input', convert);
