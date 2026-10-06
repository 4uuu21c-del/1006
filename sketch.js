// 定義測驗題目的陣列資料庫
let quizData = [
  {
    question: "1. 下列分子中，何者是極性分子？", // 題目敘述文字
    options: ["(A) CH4", "(B) CH2Cl2", "(C) CH6（苯）", "(D) CO2"], // 四個選項
    answer: 1 // 正確答案的索引值 (B)
  },
  {
    question: "2. 下列哪個分子為有極性共價鍵的非極性分子？", // 題目敘述文字
    options: ["(A) P4", "(B) H2S", "(C) SO3", "(D) NF3"], // 四個選項
    answer: 2 // 正確答案的索引值 (C)
  },
  {
    question: "3. 下列分子性質的比較，何者正確？", // 題目敘述文字
    options: ["(A) 分子極性：HCl＞HF", "(B) 鍵角：H2O＞CH4", "(C) 沸點：NH3＞CH4", "(D) C－O 鍵能：CO2＞CO"], // 四個選項
    answer: 2 // 正確答案的索引值 (C)
  },
  {
    question: "4. (a)SiC (b)CCl4 (c)NaCl (d)Cl2 (e)HCl 之熔點高低順序，下列何者正確？", // 題目敘述文字
    options: ["(A) a>b>c>d>e", "(B) c>a>b>d>e", "(C) a>c>b>e>d", "(D) a>c>b>d>e"], // 四個選項
    answer: 3 // 正確答案的索引值 (D)
  },
  {
    question: "5. CH3F 之主要分子間作用力為何？", // 題目敘述文字
    options: ["(A) 分子間分散力", "(B) 偶極－誘導偶極作用力", "(C) 偶極－偶極作用力", "(D) 氫鍵"], // 四個選項
    answer: 2 // 正確答案的索引值 (C)
  }
];

let currentIdx = 0;      // 記錄目前進行到第幾題的索引變數
let score = 0;           // 記錄累積總分的變數
let answered = false;    // 記錄當前題目是否已經作答完畢的布林值
let selectedIdx = -1;    // 記錄玩家點選的選項索引變數
let bounceOffset = 0;    // 正確選項上下跳動動畫的位移量變數
let isBouncing = false;  // 記錄是否正在播放跳動動畫的布林值
let bounceTimer = 0;     // 記錄跳動動畫時間長度的計數器變數

// p5.js 初始化設定函數
function setup() {
  createCanvas(windowWidth, windowHeight); // 建立剛好等於目前螢幕寬高的全螢幕畫布
  textAlign(LEFT, CENTER);                 // 設定文字對齊方式為靠左、垂直置中
}

// p5.js 畫面重複繪製循環函數
function draw() {
  background(15, 23, 42);                  // 繪製深藍色背景清除畫面
  
  drawResponsiveHeader();                  // 呼叫自訂函數來繪製上方響應式導覽列與總分

  if (currentIdx < quizData.length) {      // 判斷是否還有未回答的題目
    drawResponsiveQuizCard();              // 若還有題目，呼叫函數繪製題目與選項卡片
  } else {
    drawResponsiveResultScreen();          // 若題目已全部答完，呼叫函數繪製最終結算畫面
  }
}

// 自訂函數：繪製上方響應式導覽列與總分
function drawResponsiveHeader() {
  let headerHeight = 55;                   // 設定導覽列的高度固定為 55 像素
  fill(30, 41, 59);                        // 設定導覽列的背景填色為深灰藍色
  noStroke();                              // 取消導覽列的邊框繪製
  rect(0, 0, width, headerHeight);         // 繪製滿版寬度的頂端矩形區塊

  let titleSize = constrain(width * 0.035, 14, 20); // 根據螢幕寬度動態計算標題字體大小
  textSize(titleSize);                     // 套用計算後的標題字體大小
  textStyle(BOLD);                         // 設定標題字體樣式為粗體
  fill(110, 231, 183);                     // 設定標題文字顏色為明亮翠綠色
  text("化學分子與性質測驗", 20, headerHeight / 2); // 在導覽列左側繪製網站標題文字

  textSize(titleSize);                     // 套用總分文字的字體大小
  textAlign(RIGHT, CENTER);                // 將總分文字對齊方式改為靠右、垂直置中
  fill(255);                               // 設定總分文字顏色為純白色
  text(`總分：${score} 分`, width - 20, headerHeight / 2); // 在導覽列右側繪製即時總分
  textAlign(LEFT, CENTER);                 // 恢復預設的文字靠左對齊方式
}

// 自訂函數：繪製響應式測驗卡片與選項
function drawResponsiveQuizCard() {
  let q = quizData[currentIdx];            // 取得目前索引對應的題目資料物件

  let cardWidth = min(width * 0.92, 650);  // 計算響應式卡片寬度（最大 650 像素或螢幕的 92%）
  let cardHeight = min(height * 0.78, 520); // 計算響應式卡片高度（最大 520 像素或螢幕高度的 78%）
  let cardX = (width - cardWidth) / 2;     // 計算卡片水平置中的 X 座標
  let cardY = ((height - 55) - cardHeight) / 2 + 55; // 計算卡片垂直置中的 Y 座標（避開導覽列）

  fill(30, 41, 59, 220);                   // 設定卡片背景填色為半透明深灰藍色
  stroke(51, 65, 85);                      // 設定卡片邊框線條顏色
  strokeWeight(2);                         // 設定卡片邊框線條粗細為 2 像素
  rect(cardX, cardY, cardWidth, cardHeight, 14); // 繪製帶有圓角的測驗主卡片

  noStroke();                              // 取消後續文字繪製的邊框
  fill(148, 163, 184);                     // 設定進度文字顏色為淺灰色
  let infoSize = constrain(width * 0.03, 12, 15); // 動態計算進度文字大小
  textSize(infoSize);                      // 套用進度文字大小
  text(`第 ${currentIdx + 1} 題 / 共 ${quizData.length} 題`, cardX + 24, cardY + 30); // 繪製目前題數進度

  fill(255);                               // 設定題目文字顏色為純白色
  let qSize = constrain(width * 0.038, 15, 20); // 動態計算題目文字大小
  textSize(qSize);                         // 套用題目文字大小
  textStyle(BOLD);                         // 設定題目字體為粗體
  text(q.question, cardX + 24, cardY + 70, cardWidth - 48); // 繪製題目敘述並限制寬度自動換行

  let optStartY = cardY + 130;             // 設定選項按鈕群組起始的 Y 座標
  let optHeight = constrain(cardHeight * 0.11, 42, 52); // 根據卡片高度動態計算選項按鈕高度
  let optGap = 12;                         // 設定各個選項按鈕之間的垂直間距

  for (let i = 0; i < 4; i++) {            // 透過迴圈依序繪製四個選項按鈕
    let currentOptY = optStartY + i * (optHeight + optGap); // 計算當前選項按鈕的 Y 座標
    
    let yOffset = 0;                       // 初始化選項的上下位移量變數
    if (isBouncing && i === q.answer) {    // 判斷是否正在跳動且當前選項為正確解答
      yOffset = bounceOffset;              // 套用跳動的動態位移量
    }

    let btnBg = color(51, 65, 85);         // 設定選項按鈕預設背景顏色為深灰色
    let strokeColor = color(71, 85, 105);  // 設定選項按鈕預設邊框顏色

    if (answered) {                        // 判斷當前題目是否已經作答完畢
      if (i === q.answer) {                // 判斷當前選項是否為正確答案
        btnBg = color(106, 153, 78);       // 答對或正確選項即時用指定顏色 #6a994e 標示
        strokeColor = color(106, 153, 78); // 邊框同步使用 #6a994e 標示
      } else if (i === selectedIdx && i !== q.answer) { // 判斷是否為玩家點選的錯誤選項
        btnBg = color(188, 71, 73);        // 答錯時玩家點選的選項即時用指定顏色 #bc4749 標示
        strokeColor = color(188, 71, 73);  // 邊框同步使用 #bc4749 標示
      }
    }

    fill(btnBg);                           // 套用選項按鈕的背景填色
    stroke(strokeColor);                   // 套用選項按鈕的邊框線條顏色
    strokeWeight(1);                       // 設定選項邊框粗細為 1 像素
    rect(cardX + 24, currentOptY + yOffset, cardWidth - 48, optHeight, 8); // 繪製帶有圓角的選項按鈕矩形

    noStroke();                            // 取消選項文字的邊框
    fill(255);                             // 設定選項文字顏色為純白色
    let optTextSize = constrain(width * 0.032, 13, 16); // 動態計算選項文字大小
    textSize(optTextSize);                 // 套用選項文字大小
    textStyle(NORMAL);                     // 設定選項文字為一般字體
    text(q.options[i], cardX + 44, currentOptY + optHeight / 2 + yOffset); // 繪製選項內容文字
  }

  if (answered) {                          // 判斷如果已經作答完畢
    let nextBtnW = 140;                    // 設定「下一題」按鈕寬度
    let nextBtnH = 45;                     // 設定「下一題」按鈕高度
    let nextBtnX = cardX + cardWidth - nextBtnW - 24; // 計算按鈕靠右對齊的 X 座標
    let nextBtnY = cardY + cardHeight - nextBtnH - 20; // 計算按鈕靠底對齊的 Y 座標

    fill(106, 153, 78);                    // 設定按鈕背景填色為指定的 #6a994e 綠色
    noStroke();                            // 取消按鈕邊框
    rect(nextBtnX, nextBtnY, nextBtnW, nextBtnH, 8); // 繪製圓角的下一題按鈕矩形

    fill(255);                             // 設定按鈕文字顏色為純白色
    textSize(15);                          // 設定按鈕文字大小
    textStyle(BOLD);                       // 設定按鈕文字為粗體
    textAlign(CENTER, CENTER);             // 設定按鈕文字水平與垂直皆置中對齊
    let btnLabel = (currentIdx < quizData.length - 1) ? "下一題 ➔" : "查看結果 🏆"; // 判斷按鈕文字內容
    text(btnLabel, nextBtnX + nextBtnW / 2, nextBtnY + nextBtnH / 2); // 繪製按鈕上的文字
    textAlign(LEFT, CENTER);               // 恢復預設的文字靠左對齊方式
  }

  if (isBouncing) {                        // 判斷是否正在觸發跳動動畫
    bounceTimer++;                         // 將跳動計時器數值累加
    bounceOffset = sin(bounceTimer * 0.25) * -10; // 利用正弦函數計算平滑的上下彈跳位移量
    if (bounceTimer > 14) {                // 判斷跳動動畫是否達到結束次數
      isBouncing = false;                  // 關閉跳動動畫狀態
      bounceOffset = 0;                    // 歸零位移量
      bounceTimer = 0;                     // 歸零計時器
    }
  }
}

// 自訂函數：繪製響應式結算畫面
function drawResponsiveResultScreen() {
  let cardWidth = min(width * 0.92, 650);  // 計算結算卡片寬度
  let cardHeight = min(height * 0.78, 520); // 計算結算卡片高度
  let cardX = (width - cardWidth) / 2;     // 計算卡片水平置中的 X 座標
  let cardY = ((height - 55) - cardHeight) / 2 + 55; // 計算卡片垂直置中的 Y 座標

  fill(30, 41, 59, 220);                   // 設定結算卡片背景填色為半透明深灰藍色
  stroke(51, 65, 85);                      // 設定結算卡片邊框顏色
  strokeWeight(2);                         // 設定邊框粗細為 2 像素
  rect(cardX, cardY, cardWidth, cardHeight, 14); // 繪製結算圓角卡片矩形

  noStroke();                              // 取消結算標題文字的邊框
  fill(110, 231, 183);                     // 設定結算標題文字顏色為明亮翠綠色
  textSize(26);                            // 設定結算標題文字大小
  textStyle(BOLD);                         // 設定結算標題文字為粗體
  textAlign(CENTER, CENTER);               // 設定文字水平與垂直皆置中對齊
  text("測驗完成！", width / 2, cardY + 80); // 繪製測驗完成標題文字

  fill(255);                               // 設定說明文字顏色為純白色
  textSize(16);                            // 設定說明文字大小
  text("你已完成所有化學分子測驗。", width / 2, cardY + 140); // 繪製結算說明文字

  fill(15, 23, 42);                        // 設定得分顯示區塊背景填色為深色
  stroke(71, 85, 105);                     // 設定得分顯示區塊邊框顏色
  rect(cardX + 30, cardY + 180, cardWidth - 60, 70, 10); // 繪製得分顯示外框矩形

  noStroke();                              // 取消得分文字的邊框
  fill(255);                               // 設定得分文字顏色為純白色
  textSize(20);                            // 設定得分文字大小
  text(`最終得分：${score} / 100 分`, width / 2, cardY + 215); // 繪製最終得分數值文字

  let btnW = 180;                          // 設定重新測驗按鈕寬度
  let btnH = 48;                           // 設定重新測驗按鈕高度
  let btnX = (width - btnW) / 2;           // 計算重新測驗按鈕水平置中的 X 座標
  let btnY = cardY + 300;                  // 計算重新測驗按鈕的 Y 座標

  fill(106, 153, 78);                      // 設定按鈕背景填色為指定的 #6a994e 綠色
  rect(btnX, btnY, btnW, btnH, 8);         // 繪製重新測驗按鈕圓角矩形

  fill(255);                               // 設定按鈕文字顏色為純白色
  textSize(16);                            // 設定按鈕文字大小
  text("重新測驗 🔄", width / 2, btnY + btnH / 2); // 繪製重新測驗按鈕文字

  textAlign(CENTER, CENTER);               // 保持文字置中對齊
}

// p5.js 滑鼠或手機觸控點擊互動事件函數
function mousePressed() {
  if (currentIdx >= quizData.length) {     // 判斷目前是否處於測驗結算畫面狀態
    let cardWidth = min(width * 0.92, 650); // 取得結算卡片寬度
    let cardHeight = min(height * 0.78, 520); // 取得結算卡片高度
    let cardX = (width - cardWidth) / 2;    // 取得結算卡片 X 座標
    let cardY = ((height - 55) - cardHeight) / 2 + 55; // 取得結算卡片 Y 座標
    
    let btnW = 180;                        // 取得重新測驗按鈕寬度
    let btnH = 48;                         // 取得重新測驗按鈕高度
    let btnX = (width - btnW) / 2;         // 取得重新測驗按鈕 X 座標
    let btnY = cardY + 300;                // 取得重新測驗按鈕 Y 座標

    if (mouseX >= btnX && mouseX <= btnX + btnW && mouseY >= btnY && mouseY <= btnY + btnH) { // 判斷滑鼠是否點擊在重新測驗按鈕範圍內
      currentIdx = 0;                      // 將題目索引歸零重設為第一道題
      score = 0;                           // 將累積總分歸零重設
      answered = false;                    // 將作答狀態重設為未作答
    }
    return;                                // 結束此函數執行
  }

  let q = quizData[currentIdx];            // 取得目前題目的資料物件
  let cardWidth = min(width * 0.92, 650);  // 取得測驗卡片寬度
  let cardHeight = min(height * 0.78, 520); // 取得測驗卡片高度
  let cardX = (width - cardWidth) / 2;     // 取得測驗卡片 X 座標
  let cardY = ((height - 55) - cardHeight) / 2 + 55; // 取得測驗卡片 Y 座標

  let optStartY = cardY + 130;             // 取得選項群組起始 Y 座標
  let optHeight = constrain(cardHeight * 0.11, 42, 52); // 取得選項高度
  let optGap = 12;                         // 取得選項間距

  if (!answered) {                         // 判斷如果當前題目尚未作答
    for (let i = 0; i < 4; i++) {          // 透過迴圈檢查四個選項按鈕
      let currentOptY = optStartY + i * (optHeight + optGap); // 取得當前選項 Y 座標
      if (mouseX >= cardX + 24 && mouseX <= cardX + cardWidth - 24 && // 檢查滑鼠 X 座標是否落在選項範圍內
          mouseY >= currentOptY && mouseY <= currentOptY + optHeight) { // 檢查滑鼠 Y 座標是否落在選項範圍內
        
        selectedIdx = i;                   // 記錄玩家點選的選項索引
        answered = true;                   // 將作答狀態設為已作答以鎖定選項
        isBouncing = true;                 // 啟動正確選項的跳動動畫狀態
        bounceTimer = 0;                   // 歸零跳動動畫計時器

        if (selectedIdx === q.answer) {    // 判斷玩家點選的選項是否等於正確答案
          score += 20;                     // 若答對則累積總分加上 20 分
        }
      }
    }
  } else {                                 // 如果當前題目已經作答完畢
    let nextBtnW = 140;                    // 取得下一題按鈕寬度
    let nextBtnH = 45;                     // 取得下一題按鈕高度
    let nextBtnX = cardX + cardWidth - nextBtnW - 24; // 取得下一題按鈕 X 座標
    let nextBtnY = cardY + cardHeight - nextBtnH - 20; // 取得下一題按鈕 Y 座標

    if (mouseX >= nextBtnX && mouseX <= nextBtnX + nextBtnW && // 檢查滑鼠 X 座標是否落在下一題按鈕範圍內
        mouseY >= nextBtnY && mouseY <= nextBtnY + nextBtnH) { // 檢查滑鼠 Y 座標是否落在下一題按鈕範圍內
          currentIdx++;                        // 將題目索引加一，前往下一題
          answered = false;                    // 將作答狀態重設為未作答
          selectedIdx = -1;                    // 將選取索引重設為無
    }
  }
}

// p5.js 視窗大小改變或手機旋轉時自動觸發調整畫布大小函數
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);   // 自動將畫布大小調整為最新的視窗寬度與高度
}