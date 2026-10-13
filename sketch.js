// 已帶入你的真實 Google 試算表 CSV 網址
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRbr7IIF1a-AjS6ZT3JJnipKlWvqbG3__-3JQWJI8oq1vGqt2eg6bT45FHNwk9QzRTHYp7x7T5--5go/pub?output=csv";

let allQuestions = [];
let showAnswersState = false;

// 1. 讀取 Google 試算表 CSV
async function loadAndDrawQuestions() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = `<div class="text-center py-12 text-slate-500">正在從雲端更新題庫...</div>`;

    try {
        const response = await fetch(SHEET_CSV_URL);
        if (!response.ok) throw new Error('無法連線至 Google 試算表，請確認網址是否正確或試算表是否已發布。');
        
        const csvText = await response.text();
        allQuestions = parseCSV(csvText);

        if (allQuestions.length === 0) {
            throw new Error('試算表中沒有讀到任何題目，請檢查格式是否正確（第一列需為標題）。');
        }

        drawRandomQuestions();
    } catch (error) {
        container.innerHTML = `
            <div class="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl text-center shadow-sm">
                <p class="font-bold text-lg mb-1">⚠️ 讀取雲端題庫發生錯誤</p>
                <p class="text-sm mt-1">${error.message}</p>
            </div>
        `;
    }
}

// 2. 解析 CSV 資料格式
function parseCSV(text) {
    const lines = text.trim().split('\n');
    const result = [];
    
    for (let i = 1; i < lines.length; i++) {
        const row = lines[i].trim();
        if (!row) continue;
        
        const matches = [];
        let inQuotes = false;
        let current = '';
        
        for (let charIndex = 0; charIndex < row.length; charIndex++) {
            const char = row[charIndex];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                matches.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        matches.push(current.trim());
        
        if (matches.length >= 5) {
            const rawOptions = matches[2].replace(/^"|"$/g, '');
            const optionsArray = rawOptions.split('|').map(opt => opt.trim());

            result.push({
                id: matches[0],
                question: matches[1].replace(/^"|"$/g, ''),
                options: optionsArray,
                answer: matches[3].replace(/^"|"$/g, '').toUpperCase(),
                explanation: matches[4].replace(/^"|"$/g, '')
            });
        }
    }
    return result;
}

// 3. 隨機抽 5 題並渲染到畫面上
function drawRandomQuestions() {
    showAnswersState = false;
    document.getElementById('toggle-btn').innerText = '👁️ 顯示所有答案';

    const count = Math.min(5, allQuestions.length);
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    const container = document.getElementById('quiz-container');
    container.innerHTML = '';

    selected.forEach((q, index) => {
        const optionsHtml = q.options.map(opt => {
            const optLetter = opt.charAt(0);
            return `
                <button onclick="checkAnswer(this, '${optLetter}', '${q.answer}', 'q-${index}')" 
                    class="option-btn-${index} w-full text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 py-2.5 rounded-xl text-sm text-slate-700 transition