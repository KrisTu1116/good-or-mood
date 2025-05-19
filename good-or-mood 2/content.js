/**************************************
 * content.js (含心情日历功能)
 **************************************/

// ==============================
// 0. 国际化支持（语言设置）
// ==============================
let currentLanguage = "en"; // 默认语言为英文

// 多语言文本对象
const i18n = {
  en: {
    // 核心UI元素
    reset: "Reset",
    settings: "Settings",
    save: "Save",
    cancel: "Cancel",
    confirm: "OK",
    calendar: "Calendar",
    trend: "Trend",
    stats: "Stats",
    emotionCalendar: "Emotion Calendar",
    
    // 情绪记录相关
    recordHappy: "Record Happy Event",
    recordSad: "Record Sad Event",
    whatHappened: "What Happened?",
    nothingSpecial: "(Nothing Special)",
    
    // 设置界面
    resetTimeSettings: "Reset Time Settings",
    restoreDefaults: "Restore Defaults",
    saveSettings: "Save Settings",
    settingsSaved: "Settings saved!",
    interfaceSettings: "Interface Settings",
    iconOpacity: "Icon Opacity",
    rememberPosition: "Remember Position",
    rememberPositionHint: "Restore to the same position next time",
    thresholdSettings: "Emotion Threshold Settings",
    adaptiveThreshold: "Enable Adaptive Threshold",
    adaptiveThresholdHint: "Automatically adjust thresholds based on your emotion history",
    adaptiveSpeed: "Adaptation Speed",
    extremelySadThreshold: "Extremely Sad Threshold (👿)",
    sadThreshold: "Sad Threshold (😡)",
    neutralThreshold: "Neutral Threshold (😐)",
    happyThreshold: "Happy Threshold (😄)",
    resetThreshold: "Restore Defaults",
    resetThresholdConfirm: "Are you sure to restore default thresholds?",
    languageSettings: "Language Settings",
    language: "Language",
    
    // 通知设置
    notificationSettings: "Notification Settings",
    resetNotification: "Reset Notification",
    resetNotificationHint: "Show notification when score resets",
    dailyReminder: "Daily Reminder",
    dailyReminderHint: "Remind me to record my mood daily",
    reminderTime: "Reminder Time",
    
    // 数据管理
    dataManagement: "Data Management",
    exportData: "Export Data",
    importData: "Import Data",
    syncNow: "Sync Now",
    syncComplete: "Sync completed!",
    syncNowHint: "Save current emoji and check if reset is needed",
    
    // 趋势和统计
    timeRange: "Time Range",
    last7Days: "Last 7 Days",
    last30Days: "Last 30 Days",
    last90Days: "Last 90 Days",
    lastHalfYear: "Last 6 Months",
    lastYear: "Last Year",
    trendHint: "Emotion trend showing your daily mood changes.",
    emotionStats: "Emotion Statistics",
    extremelyHappy: "Extremely Happy",
    happy: "Happy",
    neutral: "Neutral",
    sad: "Sad",
    extremelySad: "Angry",
    totalDays: "Total Days",
    dateSpan: "Date Span",
    avgMoodScore: "Average Mood Score",
    noData: "No Data",
    
    // 导入导出
    importTitle: "Import Data",
    importHint: "Paste previously exported JSON data below, or select a file to upload:",
    importConfirm: "Import Data",
    importSuccess: "Data imported successfully!",
    importFailed: "Import failed: ",
    importConfirmation: "Are you sure to import data? This will merge with existing data.",
    
    // 记录列表
    eventList: "Events",
    clearRecords: "Clear Events",
    clearConfirm: "Clear Everything?",
    
    // 通知
    reminderTitle: "Mood Recording Reminder",
    reminderMessage: "Don't forget to record your mood today!",
    recordedHappy: "Recorded Happy Event",
    recordedSad: "Recorded Sad Event",
    scoreIncreased: "Your mood score increased by 1 point",
    scoreDecreased: "Your mood score decreased by 1 point"
  },
  zh: {
    // 核心UI元素
    reset: "重置",
    settings: "设置",
    save: "保存",
    cancel: "取消",
    confirm: "确定",
    calendar: "日历",
    trend: "趋势",
    stats: "统计",
    emotionCalendar: "心情日历",
    
    // 情绪记录相关
    recordHappy: "记录开心事件",
    recordSad: "记录不开心事件",
    whatHappened: "发生了什么?",
    nothingSpecial: "(没什么特别的)",
    
    // 设置界面
    resetTimeSettings: "重置时间设置",
    restoreDefaults: "恢复默认",
    saveSettings: "保存设置",
    settingsSaved: "设置已保存！",
    interfaceSettings: "界面设置",
    iconOpacity: "主图标透明度",
    rememberPosition: "记住位置",
    rememberPositionHint: "下次打开时恢复到同一位置",
    thresholdSettings: "情绪阈值设置",
    adaptiveThreshold: "启用自适应阈值",
    adaptiveThresholdHint: "根据您的情绪记录历史自动调整阈值，使情绪记录更加个性化",
    adaptiveSpeed: "适应速度",
    extremelySadThreshold: "极度不开心阈值 (👿)",
    sadThreshold: "不开心阈值 (😡)",
    neutralThreshold: "平静阈值 (😐)",
    happyThreshold: "开心阈值 (😄)",
    resetThreshold: "恢复默认值",
    resetThresholdConfirm: "确定要恢复默认阈值吗？",
    languageSettings: "语言设置",
    language: "语言",
    
    // 通知设置
    notificationSettings: "提醒设置",
    resetNotification: "重置提醒",
    resetNotificationHint: "分数重置时显示通知",
    dailyReminder: "每日提醒",
    dailyReminderHint: "每天提醒记录心情",
    reminderTime: "提醒时间",
    
    // 数据管理
    dataManagement: "数据管理",
    exportData: "导出数据",
    importData: "导入数据",
    syncNow: "立即同步",
    syncComplete: "同步完成！",
    syncNowHint: "立即保存当前表情并检查是否需要重置",
    
    // 趋势和统计
    timeRange: "时间范围",
    last7Days: "最近7天",
    last30Days: "最近30天",
    last90Days: "最近90天",
    lastHalfYear: "最近半年",
    lastYear: "最近一年",
    trendHint: "情绪变化趋势，显示您每天的情绪变化。",
    emotionStats: "情绪统计",
    extremelyHappy: "超级开心",
    happy: "开心",
    neutral: "平静",
    sad: "不开心",
    extremelySad: "生气",
    totalDays: "记录总天数",
    dateSpan: "记录时间跨度",
    avgMoodScore: "平均心情指数",
    noData: "暂无数据",
    
    // 导入导出
    importTitle: "导入数据",
    importHint: "将之前导出的JSON数据粘贴到下面，或者选择文件上传：",
    importConfirm: "导入数据",
    importSuccess: "数据导入成功！",
    importFailed: "导入失败：",
    importConfirmation: "确定要导入数据吗？这将合并现有数据。",
    
    // 记录列表
    eventList: "事件记录",
    clearRecords: "清空记录",
    clearConfirm: "确定清空所有记录？",
    
    // 通知
    reminderTitle: "心情记录提醒",
    reminderMessage: "别忘了今天记录你的心情！",
    recordedHappy: "记录了开心的事情",
    recordedSad: "记录了不开心的事情",
    scoreIncreased: "你的心情分数增加了1分",
    scoreDecreased: "你的心情分数减少了1分"
  }
};

// 获取文本函数
function getText(key) {
  if (i18n[currentLanguage] && i18n[currentLanguage][key]) {
    return i18n[currentLanguage][key];
  }
  // 如果没找到，返回英文版本，或者返回键名作为后备
  return (i18n.en && i18n.en[key]) || key;
}

// ==============================
// 1.1 创建并插入主体容器
// ==============================
const petContainer = document.createElement("div");
petContainer.id = "pet-container";
petContainer.style.position = "fixed";
petContainer.style.bottom = "20px";
petContainer.style.right = "20px";
petContainer.style.zIndex = "9999999";
petContainer.innerHTML = `
  <span id="emoji">😐</span>  <!-- 中心表情 -->
`;
document.body.appendChild(petContainer); // 保持在body中

let isModalOpen = false; // 表示是否有弹窗打开
let lastScore = 0;       // 用于比较当前分数和上一次分数
let lastResetDate = null; // 上一次重置的日期 (YYYY-MM-DD)

// [修改] 1.2 分数定义 - 新增 dailyEmojis
let petData = { 
  score: 0, 
  events: [], 
  dailyEmojis: {} // 【新增】用于记录每个日期的最终表情
};

// 使用全局变量定义情绪阈值
// 默认值
const DEFAULT_THRESHOLDS = {
  terrible: -9,   // 小于等于-9为👿
  negative: -3,   // 小于等于-3为😡 
  neutral: 3,     // 小于等于3为😐
  positive: 9     // 小于等于9为😄，大于9为🥰
};

// 用户自定义阈值
let customThresholds = {
  terrible: DEFAULT_THRESHOLDS.terrible,
  negative: DEFAULT_THRESHOLDS.negative,
  neutral: DEFAULT_THRESHOLDS.neutral,
  positive: DEFAULT_THRESHOLDS.positive
};

// 是否启用自适应阈值
let adaptiveThresholds = false;
// 适应速度 (0-1)，数值越大适应越快
let adaptiveSpeed = 0.05;

// 界面设置相关变量
let iconOpacity = 0.85;
let rememberPosition = true; 
let notifyOnReset = false;
let dailyReminder = false;
let reminderHour = 20;
let reminderMinute = 0;
let doubleClickAction = "open-calendar"; // 添加双击动作默认值

/**************************************
 * 1.3 内嵌式弹窗
 **************************************/
const modalContainer = document.createElement("div");
modalContainer.id = "modal-container";
modalContainer.style.position = "fixed";
modalContainer.style.overflow = "auto";
modalContainer.style.background = "#fff";
modalContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";
modalContainer.style.borderRadius = "8px";
modalContainer.style.padding = "10px";
modalContainer.style.display = "none"; // 默认隐藏
modalContainer.style.zIndex = "9999999";
modalContainer.style.maxHeight = "40vh"; // 限制最大高度为视口高度的 25%

// 添加标题区域
const modalTitle = document.createElement("h3");
modalTitle.id = "modal-title";
modalTitle.style.marginBottom = "10px";
modalContainer.appendChild(modalTitle);

// 添加内容区域
const modalContent = document.createElement("div");
modalContent.id = "modal-content";
modalContainer.appendChild(modalContent);

// 添加关闭按钮
const closeModalBtn = document.createElement("button");
closeModalBtn.id = "close-modal-btn";
closeModalBtn.textContent = "❌";
closeModalBtn.style.marginTop = "10px";
closeModalBtn.style.cursor = "pointer";
closeModalBtn.addEventListener("click", closeModal);
modalContainer.appendChild(closeModalBtn);

// 将弹窗直接添加到document.body
document.body.appendChild(modalContainer);

// 阻止弹窗区域内的冒泡，避免触发父级拖拽
modalContainer.addEventListener("mousedown", (e) => {
  e.stopPropagation();
});

// ==============================
// 1.4.1 打开/关闭弹窗函数
// ==============================
function openModal(title, contentHTML, targetBtn) {
  const modalTitle = document.getElementById("modal-title");
  const modalContent = document.getElementById("modal-content");

  modalTitle.textContent = title;
  modalContent.innerHTML = contentHTML;
  modalContainer.style.display = "block";

  // 根据插件位置计算弹窗初始位置
  const rect = petContainer.getBoundingClientRect();
  const modalOffsetX = 60;  
  const modalOffsetY = -40; 
  modalContainer.style.left = `${Math.min(rect.right + modalOffsetX, window.innerWidth - modalContainer.offsetWidth - 20)}px`;
  modalContainer.style.top = `${Math.max(rect.top + modalOffsetY, 20)}px`;

  isModalOpen = true;
  isModalVisible = true; // 用于拖拽时位置同步
}

function closeModal() {
  modalContainer.style.display = "none";
  isModalOpen = false;
  isModalVisible = false;
}

// 1.4.2 动态调整高度和宽度（溢出处理）
function adjustModalSize() {
  modalContainer.style.maxWidth = `${window.innerWidth * 0.8}px`;
  modalContainer.style.maxHeight = `${window.innerHeight * 0.8}px`;
}
window.addEventListener("resize", adjustModalSize);

// 1.4.3 全局变量：存储当前展示的年、月（0-based month）
let currentCalendarYear = new Date().getFullYear();
let currentCalendarMonth = new Date().getMonth();


// 1.4.4 重置分数，并在心情日历中记录当天的表情。
function getLocalDateString(date) {
  // 确保处理的是日期对象
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  
  // 使用本地时区的年月日构建新日期
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  
  return `${year}-${month}-${day}`;
}
/**
 * 更新当日的 emoji 记录，使用本地日期作为 key
 * 如果传入日期，则使用该日期，否则使用当前本地日期
 */
function updateDailyEmoji(date) {
  const dateKey = date ? getLocalDateString(date) : getLocalDateString(new Date());
  const emoji = getEmojiByScore(petData.score);
  petData.dailyEmojis[dateKey] = emoji;
}


// 1.4.5.1 Timer 1: 12:59 saving score

function scheduleSaveFinalScore() {
  // 清除之前的定时器（如果存在）
  if (window.saveFinalScoreTimer) {
    clearTimeout(window.saveFinalScoreTimer);
  }
  
  const now = new Date();
  const saveTime = new Date(now);
  saveTime.setHours(23, 59, 30, 0); // 改为23:59:30保存
  
  if (saveTime - now < 0) {
    saveTime.setDate(saveTime.getDate() + 1);
  }
  
  const timeUntilSave = saveTime - now;
  console.log(`计划最终分数保存：将在 ${saveTime.toLocaleString()} 保存（${timeUntilSave / 1000}秒后）`);
  
  // 同样处理长时间定时器问题
  if (timeUntilSave > 2147483000) {
    window.saveFinalScoreTimer = setTimeout(() => {
      scheduleSaveFinalScore();
    }, 2147483000);
  } else {
    window.saveFinalScoreTimer = setTimeout(() => {
      saveFinalScore();
      scheduleSaveFinalScore(); // 递归安排下一个保存
    }, timeUntilSave);
  }
}

function saveFinalScore() {
  const now = new Date();
  const dayString = getLocalDateString(now); // 使用当前日期
  // 保存此时的最终得分（不归零）
  const finalScore = petData.score;
  petData.dailyEmojis[dayString] = getEmojiByScore(finalScore);
  console.log(`Saved final score for ${dayString}: ${getEmojiByScore(finalScore)}`);
  savePluginState();
}





// 添加可配置的重置时间
const DEFAULT_RESET_HOUR = 0;
const DEFAULT_RESET_MINUTE = 0;

// 从插件状态中获取重置时间，如果没有则使用默认值
let resetHour = DEFAULT_RESET_HOUR;
let resetMinute = DEFAULT_RESET_MINUTE;

// 1.4.5.2 Timer 2 : 每日定时重置（可配置时间）
function scheduleDailyReset() {
  // 清除之前的定时器（如果存在）
  if (window.resetScoreTimer) {
    clearTimeout(window.resetScoreTimer);
  }
  
  const now = new Date();
  const resetTime = new Date(now);
  resetTime.setHours(0, 0, 0, 0); // 固定为00:00
  
  if (resetTime - now < 0) {
    resetTime.setDate(resetTime.getDate() + 1);
  }
  
  const timeUntilReset = resetTime - now;
  console.log(`定时重置计划：将在 ${resetTime.toLocaleString()} 重置（${timeUntilReset / 1000}秒后）`);
  
  // 最大定时器延迟是2147483647毫秒（约24.8天）
  // 如果时间超过了这个限制，设置一个中间检查点
  if (timeUntilReset > 2147483000) {
    console.log("延迟时间过长，设置中间检查点");
    window.resetScoreTimer = setTimeout(() => {
      scheduleDailyReset(); // 重新计算
    }, 2147483000);
  } else {
    window.resetScoreTimer = setTimeout(() => {
      resetScore();
      scheduleDailyReset(); // 递归安排下一个重置
    }, timeUntilReset);
  }
}

// 重命名为更通用的名称，因为不一定是午夜重置
function resetScore() {
  const now = new Date();
  const todayString = getLocalDateString(now);
  
  // 不再在重置时保存当前表情状态，因为这会导致覆盖当天的记录
  // 表情状态应该只在每天结束时保存
  
  // 归零分数，并更新 lastResetDate 为今天
  petData.score = 0;
  lastResetDate = todayString;
  console.log(`分数已重置: ${todayString}, 时间: ${now.toLocaleTimeString()}`);
  savePluginState();
  updateUI();
}


// 1.4.6 在插件加载时（loadPluginState() 后）检查是否需要立即执行一次重置，以处理插件未运行的时间段：

/**
 * 检查是否需要重置：如果当前本地日期与 lastResetDate 不同，则执行重置操作
 * 增强版：处理插件多天未打开的情况
 */
function checkAndResetIfNeeded() {
  const todayString = getLocalDateString(new Date());
  
  // 如果未定义 lastResetDate，说明是首次加载，则初始化为今天，不重置
  if (!lastResetDate) {
    lastResetDate = todayString;
    savePluginState();
    return;
  }
  
  // 如果日期相同，不需要执行重置
  if (lastResetDate === todayString) {
    return;
  }
  
  // 如果日期不同，需要处理中间跳过的日期
  const lastResetDateObj = new Date(lastResetDate);
  const todayDateObj = new Date(todayString);
  
  // 计算日期差（天数）
  const daysDiff = Math.floor((todayDateObj - lastResetDateObj) / (1000 * 60 * 60 * 24));
  
  // 如果相差超过1天，需要处理中间跳过的日期
  if (daysDiff > 1) {
    console.log(`检测到插件 ${daysDiff} 天未打开，处理中间日期...`);
    
    // 首先保存上次打开时的表情状态（如果未保存）
    if (!petData.dailyEmojis[lastResetDate]) {
      petData.dailyEmojis[lastResetDate] = getEmojiByScore(petData.score);
    }
    
    // 处理中间跳过的日期
    for (let i = 1; i < daysDiff; i++) {
      const missedDate = new Date(lastResetDateObj);
      missedDate.setDate(lastResetDateObj.getDate() + i);
      const missedDateString = getLocalDateString(missedDate);
      
      // 对于跳过的日期，如果没有记录，则使用上次的表情状态
      if (!petData.dailyEmojis[missedDateString]) {
        petData.dailyEmojis[missedDateString] = getEmojiByScore(petData.score);
        console.log(`为跳过的日期 ${missedDateString} 设置表情: ${petData.dailyEmojis[missedDateString]}`);
      }
    }
  }
  
  // 计算昨天的日期
  const yesterday = new Date(todayDateObj);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = getLocalDateString(yesterday);
  
  // 保存昨天的状态（如果未保存）
  if (!petData.dailyEmojis[yesterdayString]) {
    petData.dailyEmojis[yesterdayString] = getEmojiByScore(petData.score);
    console.log(`为昨天 ${yesterdayString} 设置表情: ${petData.dailyEmojis[yesterdayString]}`);
  }
  
  // 执行重置操作
  console.log(`执行重置：将分数从 ${petData.score} 重置为 0`);
  petData.score = 0;
  lastResetDate = todayString;
  savePluginState();
  updateUI();
}



// ==============================
// 2. +1 和 -1 按钮
// ==============================
const plusBtn = document.createElement("div");
plusBtn.className = "mood-button plus-button";
plusBtn.textContent = "😀";
petContainer.appendChild(plusBtn);

const minusBtn = document.createElement("div");
minusBtn.className = "mood-button minus-button";
minusBtn.textContent = "😡";
petContainer.appendChild(minusBtn);

// 按钮绑定函数，阻止事件冒泡，避免触发拖拽
function handleButtonClick(eventHandler) {
  return function(event) {
    // 阻止事件冒泡，确保不会触发拖拽
    event.stopPropagation();
    
    // 重置拖动标志，确保不会在点击按钮后触发拖动
    isDragging = false;
    didMove = false;
    
    // 调用原始事件处理函数
    eventHandler.call(this);
  };
}

// 使用handleButtonClick包装按钮点击事件
plusBtn.addEventListener("click", handleButtonClick(function() {
  petData.score++;
  updateUI();

  // 动画
  plusBtn.classList.add("plus-anim");
  setTimeout(() => {
    plusBtn.classList.remove("plus-anim");
  }, 300);

  savePluginStateDebounced();
}));

minusBtn.addEventListener("click", handleButtonClick(function() {
  petData.score--;
  updateUI();

  // 动画
  minusBtn.classList.add("minus-anim");
  setTimeout(() => {
    minusBtn.classList.remove("minus-anim");
  }, 300);

  savePluginStateDebounced();
}));

// ==============================
// 3. 记录事件的按钮
// ==============================
const leftMidBtn = document.createElement("div");
leftMidBtn.className = "mood-button left-mid-button";
leftMidBtn.textContent = "✒️";
petContainer.appendChild(leftMidBtn);

const rightMidBtn = document.createElement("div");
rightMidBtn.className = "mood-button right-mid-button";
rightMidBtn.textContent = "✒️";
petContainer.appendChild(rightMidBtn);

const leftBottomBtn = document.createElement("div");
leftBottomBtn.className = "mood-button left-bottom-button";
leftBottomBtn.textContent = "📝";
petContainer.appendChild(leftBottomBtn);

const rightBottomBtn = document.createElement("div");
rightBottomBtn.className = "mood-button right-bottom-button";
rightBottomBtn.textContent = "📆";
petContainer.appendChild(rightBottomBtn);

/**
 * 记录事件的弹窗（开心事件/负面事件）
 */
function openEventModal(type, targetBtn) {
  console.log(`打开${type === "happy" ? "开心" : "不开心"}事件记录界面`);
  
  try {
    const isHappy = (type === "happy");
    const title = isHappy ? `✒️ ${getText('recordHappy')}` : `✒️ ${getText('recordSad')}`;

    const faceArrayHappy = ["😀","😀","😀","😀","😀"];
    const faceArrayNegative = ["😡","😡","😡","😡","😡"];

    let contentHTML = "";
    if (isHappy) {
      contentHTML = `
        <div class="rating-container">
          <div id="emoji-picker-happy">
            ${faceArrayHappy.map((face, idx) => {
              return `<span class="rating-emoji" data-value="${idx+1}">${face}</span>`;
            }).join("")}
          </div>
        </div>
        <p>${getText('whatHappened')}</p>
        <input type="text" id="happy-description" placeholder=". . ." style="width:100%;">
        <button id="confirm-happy-btn" style="margin-top:10px; cursor:pointer;">${getText('confirm')}</button>
      `;
    } else {
      contentHTML = `
        <div class="rating-container">
          <div id="emoji-picker-negative">
            ${faceArrayNegative.map((face, idx) => {
              return `<span class="rating-emoji negative" data-value="${idx+1}">${face}</span>`;
            }).join("")}
          </div>
        </div>
        <p>${getText('whatHappened')}</p>
        <input type="text" id="negative-description" placeholder=". . ." style="width:100%;">
        <button id="confirm-negative-btn" style="margin-top:10px; cursor:pointer;">${getText('confirm')}</button>
      `;
    }

    openModal(title, contentHTML, targetBtn);

    if (isHappy) {
      const ratingEmojis = document.querySelectorAll("#emoji-picker-happy .rating-emoji");
      let selectedCount = 0;
      
      if (ratingEmojis && ratingEmojis.length > 0) {
        ratingEmojis.forEach(emojiEl => {
          emojiEl.addEventListener("click", () => {
            if (!emojiEl.classList.contains("colored")) {
              emojiEl.classList.add("colored");
              selectedCount++;
              petData.score++;
            } else {
              emojiEl.classList.remove("colored");
              selectedCount--;
              petData.score--;
            }
            updateUI();
          });
        });
      } else {
        console.error("找不到开心表情选择器元素！");
      }

      const confirmHappyBtn = document.getElementById("confirm-happy-btn");
      if (confirmHappyBtn) {
        confirmHappyBtn.addEventListener("click", () => {
          const descriptionInput = document.getElementById("happy-description");
          const desc = descriptionInput ? descriptionInput.value.trim() : "";
          
          petData.events.push({
            type: "happy",
            description: desc || getText('nothingSpecial'),
            points: selectedCount,
            timestamp: Date.now()
          });
          updateUI();
          savePluginState();
          closeModal();
        });
      } else {
        console.error("找不到确认开心按钮元素！");
      }
    } else {
      const ratingEmojis = document.querySelectorAll("#emoji-picker-negative .rating-emoji");
      let selectedCount = 0;
      
      if (ratingEmojis && ratingEmojis.length > 0) {
        ratingEmojis.forEach(emojiEl => {
          emojiEl.addEventListener("click", () => {
            if (!emojiEl.classList.contains("colored")) {
              emojiEl.classList.add("colored");
              selectedCount++;
              petData.score--;
            } else {
              emojiEl.classList.remove("colored");
              selectedCount--;
              petData.score++;
            }
            updateUI();
          });
        });
      } else {
        console.error("找不到不开心表情选择器元素！");
      }

      const confirmNegativeBtn = document.getElementById("confirm-negative-btn");
      if (confirmNegativeBtn) {
        confirmNegativeBtn.addEventListener("click", () => {
          const descriptionInput = document.getElementById("negative-description");
          const desc = descriptionInput ? descriptionInput.value.trim() : "";
          
          petData.events.push({
            type: "negative",
            description: desc || getText('nothingSpecial'),
            points: -selectedCount,
            timestamp: Date.now()
          });
          updateUI();
          savePluginState();
          closeModal();
        });
      } else {
        console.error("找不到确认不开心按钮元素！");
      }
    }
  } catch (err) {
    console.error("打开事件模态窗口时出错:", err);
    alert("操作失败: " + err.message);
  }
}

// 使用handleButtonClick包装按钮点击事件
leftMidBtn.addEventListener("click", handleButtonClick(function() {
  openEventModal("happy", this);
}));

leftBottomBtn.addEventListener("click", handleButtonClick(function() {
  const eventHTML = petData.events.length === 0
    ? `<p>${getText('noData')}</p>`
    : petData.events
        .map((event) => {
          const date = new Date(event.timestamp);
          let hours = date.getHours();
          const minutes = date.getMinutes();
          const ampm = hours >= 12 ? "PM" : "AM";
          hours = hours % 12 || 12; 
          const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
          const timeFormatted = `${hours}:${formattedMinutes} ${ampm}`;

          const emoji = event.type === "happy" ? "😀" : "😡";
          const emojis = emoji.repeat(Math.abs(event.points));

          return `
            <div style="margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
              <p><strong>📅</strong>${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2,"0")}.${String(date.getDate()).padStart(2,"0")}</p>
              <p><strong>⌚</strong>${timeFormatted}</p>
              <p><strong>📝：</strong>${event.description || getText('nothingSpecial')}</p>
              <p>${emojis}</p>
            </div>
          `;
        })
        .join("");

  openModal(
    `📝 ${getText('eventList')}`,
    eventHTML +
      `<button id="clear-records-btn" style="margin-top: 10px; cursor: pointer;">${getText('clearRecords')}</button>`,
    this
  );

  const clearBtn = document.getElementById("clear-records-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm(getText('clearConfirm'))) {
        petData.events = [];
        savePluginState();
        modalContent.innerHTML = `<p>${getText('noData')}</p>`;
      }
    });
  }
}));

rightMidBtn.addEventListener("click", handleButtonClick(function() {
  openEventModal("negative", this);
}));

// [新增] 4. 心情日历：只显示每天最终表情
function changeMonth(delta) {
  currentCalendarMonth += delta;
  if (currentCalendarMonth < 0) {
    currentCalendarMonth = 11;
    currentCalendarYear--;
  } else if (currentCalendarMonth > 11) {
    currentCalendarMonth = 0;
    currentCalendarYear++;
  }
  const calendarBody = document.getElementById("calendar-body");
  calendarBody.style.opacity = 0;
  setTimeout(() => {
    renderMoodCalendar(currentCalendarYear, currentCalendarMonth);
    calendarBody.style.opacity = 1;
  }, 200);
}

function openCalendarModal() {
  const contentHTML = `
    <div style="margin-bottom: 15px;">
      <div style="display: flex; border-bottom: 1px solid #ddd; margin-bottom: 10px;">
        <div id="tab-calendar" class="calendar-tab active-tab" style="padding: 8px 15px; cursor: pointer;">📅 ${getText('calendar')}</div>
        <div id="tab-trend" class="calendar-tab" style="padding: 8px 15px; cursor: pointer;">📊 ${getText('trend')}</div>
        <div id="tab-stats" class="calendar-tab" style="padding: 8px 15px; cursor: pointer;">📈 ${getText('stats')}</div>
        <div id="tab-settings" class="calendar-tab" style="padding: 8px 15px; cursor: pointer;">⚙️ ${getText('settings')}</div>
      </div>
      
      <!-- 日历内容 -->
      <div id="calendar-content" class="tab-content" style="display: block;">
        <div id="calendar-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <button id="prev-month-btn" style="cursor: pointer;">←</button>
          <span id="calendar-title" style="font-weight: bold; font-size: 16px;"></span>
          <button id="next-month-btn" style="cursor: pointer;">→</button>
        </div>
        <div id="calendar-body" style="text-align:center; transition: opacity 0.3s;"></div>
      </div>
      
      <!-- 趋势图内容 -->
      <div id="trend-content" class="tab-content" style="display: none;">
        <div style="margin-bottom: 10px;">
          <label>${getText('timeRange')}：</label>
          <select id="trend-range">
            <option value="7" selected>${getText('last7Days')}</option>
            <option value="30">${getText('last30Days')}</option>
            <option value="90">${getText('last90Days')}</option>
            <option value="180">${getText('lastHalfYear')}</option>
            <option value="365">${getText('lastYear')}</option>
          </select>
        </div>
        <div id="trend-chart" style="height: 200px; background: #f9f9f9; padding: 10px; border-radius: 4px;"></div>
        <p style="font-size: 12px; color: #666; margin-top: 8px;">${getText('trendHint')}</p>
      </div>
      
      <!-- 统计分析内容 -->
      <div id="stats-content" class="tab-content" style="display: none;">
        <div style="margin-bottom: 15px;">
          <h4 style="margin-top: 0;">${getText('emotionStats')}</h4>
          <div id="mood-stats" style="display: flex; justify-content: space-around; margin: 15px 0; text-align: center;">
            <div class="stat-item">
              <div style="font-size: 32px;">🥰</div>
              <div id="stat-supergood" style="font-weight: bold; margin-top: 5px;">0</div>
              <div style="font-size: 12px; color: #666;">${getText('extremelyHappy')}</div>
            </div>
            <div class="stat-item">
              <div style="font-size: 32px;">😄</div>
              <div id="stat-good" style="font-weight: bold; margin-top: 5px;">0</div>
              <div style="font-size: 12px; color: #666;">${getText('happy')}</div>
            </div>
            <div class="stat-item">
              <div style="font-size: 32px;">😐</div>
              <div id="stat-neutral" style="font-weight: bold; margin-top: 5px;">0</div>
              <div style="font-size: 12px; color: #666;">${getText('neutral')}</div>
            </div>
            <div class="stat-item">
              <div style="font-size: 32px;">😡</div>
              <div id="stat-bad" style="font-weight: bold; margin-top: 5px;">0</div>
              <div style="font-size: 12px; color: #666;">${getText('sad')}</div>
            </div>
            <div class="stat-item">
              <div style="font-size: 32px;">👿</div>
              <div id="stat-terrible" style="font-weight: bold; margin-top: 5px;">0</div>
              <div style="font-size: 12px; color: #666;">${getText('extremelySad')}</div>
            </div>
          </div>
          
          <div style="margin-top: 15px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <div>${getText('totalDays')}：</div>
              <div id="total-days">0 ${currentLanguage === 'zh' ? '天' : ' days'}</div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <div>${getText('dateSpan')}：</div>
              <div id="date-span">-</div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <div>${getText('avgMoodScore')}：</div>
              <div id="avg-score">0</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 设置内容 -->
      <div id="settings-content" class="tab-content" style="display: none;">
        <div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px;">
          <button id="force-sync-btn">${getText('syncNow')}</button>
          <p style="font-size: 12px; color: #666;">${getText('syncNowHint')}</p>
        </div>
        
        <div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px;">
          <h4>${getText('dataManagement')}</h4>
          <div style="display: flex; gap: 10px;">
            <button id="export-data-btn">${getText('exportData')}</button>
            <button id="import-data-btn">${getText('importData')}</button>
          </div>
        </div>

        <div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px;">
          <h4>${getText('languageSettings')}</h4>
          <div style="margin: 10px 0;">
            <label>${getText('language')}：</label>
            <select id="language-select" style="width: 100px;">
              <option value="en" ${currentLanguage === 'en' ? 'selected' : ''}>English</option>
              <option value="zh" ${currentLanguage === 'zh' ? 'selected' : ''}>中文</option>
            </select>
          </div>
        </div>

        <!-- 隐藏测试按钮区域 -->
        <div style="display: none;">
          <button id="test-functions-btn">运行功能测试</button>
        </div>
      </div>
    </div>
  `;
  
  openModal(`📅 ${getText('emotionCalendar')}`, contentHTML);
  
  // 标签切换功能
  document.getElementById("tab-calendar").addEventListener("click", () => {
    switchTab("calendar");
  });
  
  document.getElementById("tab-trend").addEventListener("click", () => {
    switchTab("trend");
    renderTrendChart();
  });
  
  document.getElementById("tab-stats").addEventListener("click", () => {
    switchTab("stats");
    renderMoodStats();
  });
  
  document.getElementById("tab-settings").addEventListener("click", () => {
    switchTab("settings");
  });
  
  // 日历导航按钮
  document.getElementById("prev-month-btn").addEventListener("click", () => {
    changeMonth(-1);
  });
  
  document.getElementById("next-month-btn").addEventListener("click", () => {
    changeMonth(1);
  });
  
  document.getElementById("force-sync-btn").addEventListener("click", () => {
    forceSyncNow();
    alert(getText('syncComplete'));
  });
  
  // 导出导入数据按钮
  document.getElementById("export-data-btn").addEventListener("click", exportFullData);
  document.getElementById("import-data-btn").addEventListener("click", showImportDialog);
  
  // 添加测试按钮事件监听
  document.getElementById("test-functions-btn").addEventListener("click", testTimeBasedFunctions);
  
  // 语言设置
  const languageSelect = document.getElementById("language-select");
  if (languageSelect) {
    languageSelect.addEventListener("change", (e) => {
      currentLanguage = e.target.value;
      savePluginState();
      
      // 刷新界面以应用新语言
      alert(currentLanguage === 'zh' ? '语言已更改为中文，刷新后生效' : 'Language changed to English, will take effect after refresh');
      
      // 关闭当前模态框，重新打开以应用新语言
      closeModal();
      setTimeout(() => {
        openCalendarModal();
      }, 100);
    });
  }
  
  // 趋势图范围选择
  document.getElementById("trend-range").addEventListener("change", () => {
    renderTrendChart();
  });
  
  // 初始化日历视图
  renderMoodCalendar(currentCalendarYear, currentCalendarMonth);
}

// 切换标签
function switchTab(tabName) {
  // 隐藏所有内容
  document.querySelectorAll(".tab-content").forEach(el => {
    el.style.display = "none";
  });
  
  // 去除所有激活状态
  document.querySelectorAll(".calendar-tab").forEach(el => {
    el.classList.remove("active-tab");
  });
  
  // 显示选中的内容并激活标签
  document.getElementById(`${tabName}-content`).style.display = "block";
  document.getElementById(`tab-${tabName}`).classList.add("active-tab");
}

// 渲染趋势图
function renderTrendChart() {
  const rangeSelect = document.getElementById("trend-range");
  const days = parseInt(rangeSelect.value, 10);
  
  // 获取过去days天的日期
  const dates = [];
  const scores = [];
  const colors = [];
  const emojis = [];
  const today = new Date();
  
  // 生成日期范围
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = getLocalDateString(date);
    dates.push(dateString);
    
    // 查找表情
    const emoji = petData.dailyEmojis[dateString] || null;
    emojis.push(emoji);
    
    // 计算分数 - 使用阈值定义的分数而不是固定值
    let score = 0;
    let color = "rgba(200, 200, 200, 0.5)"; // 默认灰色
    
    if (emoji) {
      // 根据表情计算实际分数，使用阈值
      if (emoji === "🥰") { 
        score = customThresholds.positive + 1; // 大于positive阈值
        color = "rgba(255, 102, 204, 0.7)"; 
      }
      else if (emoji === "😄") { 
        score = customThresholds.neutral + 1; // 大于neutral阈值，小于等于positive阈值
        color = "rgba(0, 204, 153, 0.7)"; 
      }
      else if (emoji === "😐") { 
        score = 0; // 居中值
        color = "rgba(255, 204, 0, 0.7)"; 
      }
      else if (emoji === "😡") { 
        score = customThresholds.negative; // 小于等于negative阈值，大于terrible阈值
        color = "rgba(255, 153, 51, 0.7)"; 
      }
      else if (emoji === "👿") { 
        score = customThresholds.terrible; // 小于等于terrible阈值
        color = "rgba(255, 51, 51, 0.7)"; 
      }
    }
    
    scores.push(score);
    colors.push(color);
  }
  
  // 渲染图表
  const chartContainer = document.getElementById("trend-chart");
  chartContainer.innerHTML = "";
  
  // 检查是否有数据
  if (dates.length === 0) {
    chartContainer.innerHTML = "<p style='text-align:center; padding:20px;'>暂无数据</p>";
    return;
  }
  
  // 计算图表高度和宽度
  const chartHeight = 170;
  const chartWidth = chartContainer.offsetWidth;
  const barWidth = Math.max(6, Math.min(16, (chartWidth - 40) / days));
  const spacing = Math.max(2, Math.min(6, barWidth / 2));
  
  // 创建SVG
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", `0 0 ${chartWidth} ${chartHeight}`);
  svg.style.overflow = "visible";
  chartContainer.appendChild(svg);
  
  // 创建X轴和Y轴
  const axisG = document.createElementNS("http://www.w3.org/2000/svg", "g");
  
  // Y轴
  const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  yAxis.setAttribute("x1", 40);
  yAxis.setAttribute("y1", 10);
  yAxis.setAttribute("x2", 40);
  yAxis.setAttribute("y2", chartHeight - 30);
  yAxis.setAttribute("stroke", "#ccc");
  yAxis.setAttribute("stroke-width", "1");
  axisG.appendChild(yAxis);
  
  // X轴
  const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  xAxis.setAttribute("x1", 40);
  xAxis.setAttribute("y1", chartHeight / 2);
  xAxis.setAttribute("x2", chartWidth - 10);
  xAxis.setAttribute("y2", chartHeight / 2);
  xAxis.setAttribute("stroke", "#ccc");
  xAxis.setAttribute("stroke-width", "1");
  xAxis.setAttribute("stroke-dasharray", "4,4");
  axisG.appendChild(xAxis);
  
  // 添加标记
  const textPos = document.createElementNS("http://www.w3.org/2000/svg", "text");
  textPos.setAttribute("x", 30);
  textPos.setAttribute("y", 15);
  textPos.setAttribute("text-anchor", "end");
  textPos.setAttribute("fill", "#999");
  textPos.setAttribute("font-size", "10");
  textPos.textContent = "+10";
  axisG.appendChild(textPos);
  
  const textNeg = document.createElementNS("http://www.w3.org/2000/svg", "text");
  textNeg.setAttribute("x", 30);
  textNeg.setAttribute("y", chartHeight - 30);
  textNeg.setAttribute("text-anchor", "end");
  textNeg.setAttribute("fill", "#999");
  textNeg.setAttribute("font-size", "10");
  textNeg.textContent = "-10";
  axisG.appendChild(textNeg);
  
  svg.appendChild(axisG);
  
  // 绘制柱状图
  const barGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  barGroup.setAttribute("transform", `translate(${40 + spacing}, 0)`);
  
  scores.forEach((score, i) => {
    const barHeight = Math.abs(score) * 7; // 使用实际分数计算高度
    const x = i * (barWidth + spacing);
    let y;
    
    if (score >= 0) {
      y = chartHeight / 2 - barHeight;
    } else {
      y = chartHeight / 2;
    }
    
    // 柱子
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", barWidth);
    rect.setAttribute("height", barHeight > 0 ? barHeight : 1);
    rect.setAttribute("fill", colors[i]);
    rect.setAttribute("rx", 2);
    rect.setAttribute("ry", 2);
    rect.style.transition = "all 0.3s ease";
    
    // 动画效果
    setTimeout(() => {
      rect.style.height = `${barHeight > 0 ? barHeight : 1}px`;
    }, i * 20);
    
    // 添加交互效果 - 悬停显示日期和表情
    rect.addEventListener("mouseover", (event) => {
      tooltip.textContent = `${dates[i]}: ${emojis[i] || '无记录'}`;
      tooltip.style.display = "block";
      tooltip.style.left = `${event.pageX + 10}px`;
      tooltip.style.top = `${event.pageY - 20}px`;
    });
    
    rect.addEventListener("mouseout", () => {
      tooltip.style.display = "none";
    });
    
    barGroup.appendChild(rect);
    
    // 仅在空间足够时显示表情
    if (barWidth >= 12 && emojis[i]) {
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", x + barWidth / 2);
      text.setAttribute("y", score >= 0 ? y - 10 : y + barHeight + 12);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("font-size", "10");
      text.textContent = emojis[i] || "";
      barGroup.appendChild(text);
    }
    
    // 每5天显示一次日期（避免拥挤）
    if (days <= 14 || i % 5 === 0 || i === dates.length - 1) {
      const dateLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
      dateLabel.setAttribute("x", x + barWidth / 2);
      dateLabel.setAttribute("y", chartHeight - 15);
      dateLabel.setAttribute("text-anchor", "middle");
      dateLabel.setAttribute("font-size", "8");
      dateLabel.setAttribute("fill", "#999");
      
      // 格式化日期为月/日
      const dateParts = dates[i].split("-");
      dateLabel.textContent = `${dateParts[1]}/${dateParts[2]}`;
      
      barGroup.appendChild(dateLabel);
    }
  });
  
  svg.appendChild(barGroup);
  
  // 创建工具提示
  const tooltip = document.createElement("div");
  tooltip.style.position = "absolute";
  tooltip.style.backgroundColor = "rgba(0,0,0,0.7)";
  tooltip.style.color = "#fff";
  tooltip.style.padding = "5px 8px";
  tooltip.style.borderRadius = "4px";
  tooltip.style.fontSize = "12px";
  tooltip.style.pointerEvents = "none";
  tooltip.style.display = "none";
  tooltip.style.zIndex = "9999";
  document.body.appendChild(tooltip);
  
  // 清除工具提示的事件处理
  modalContainer.addEventListener("click", () => {
    if (tooltip) tooltip.style.display = "none";
  });
}

// ==============================
// 4. 更新 UI
// ==============================
function getEmojiByScore(score) {
  if (score <= customThresholds.terrible) return "👿";
  if (score <= customThresholds.negative) return "😡";
  if (score <= customThresholds.neutral) return "😐";
  if (score <= customThresholds.positive) return "😄";
  return "🥰";
}

/**
 * 【新增】渲染当月心情表情日历
 * 只显示当前月，每天一个表情。
 */
function renderMoodCalendar(year, month) {
  const calendarBody = document.getElementById("calendar-body");
  if (!calendarBody) return;

  const calendarTitle = document.getElementById("calendar-title");
  const titleText = `${year}.${String(month+1).padStart(2,"0")}`;
  calendarTitle.textContent = titleText;

  const firstDay = new Date(year, month, 1);
  const startDayOfWeek = firstDay.getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();

  const daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  let html = `
    <table style="margin: 0 auto; border-collapse: collapse;">
      <thead>
        <tr>
          ${daysOfWeek.map(d => `<th style="width:40px; height:40px;">${d}</th>`).join("")}
        </tr>
      </thead>
      <tbody><tr>
  `;

  for (let i = 0; i < startDayOfWeek; i++) {
    html += `<td style="width:40px; height:40px;"></td>`;
  }

  let dayCounter = 1;
  while (dayCounter <= daysInMonth) {
    const currentDay = new Date(year, month, dayCounter);
    const dayOfWeek = currentDay.getDay();
    const dateKey = getLocalDateString(currentDay);
    const emoji = petData.dailyEmojis[dateKey] || "";

    html += `
      <td style="width:40px; height:40px; text-align:center; vertical-align: middle; font-size:28px;">
        ${emoji}
        <div style="font-size:10px; color:#888;">${dayCounter}</div>
      </td>
    `;
    if (dayOfWeek === 6 && dayCounter < daysInMonth) {
      html += `</tr><tr>`;
    }
    dayCounter++;
  }

  const lastDayOfWeek = new Date(year, month, daysInMonth).getDay();
  for (let i = lastDayOfWeek; i < 6; i++) {
    html += `<td style="width:40px; height:40px;"></td>`;
  }
  html += `</tr></tbody></table>`;
  calendarBody.innerHTML = html;
}

function exportEventsData() {
  const jsonData = JSON.stringify(petData.events, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mood_events_data.json";
  a.click();
  URL.revokeObjectURL(url);
}

// 如需迁移数据结构，可在此处理
function doMigration(oldState, oldVer, newVer) {
  return oldState;
}

// 增强的数据导出功能
function exportFullData() {
  try {
    // 直接从当前内存中的数据导出
    const exportData = {
      version: PLUGIN_CURRENT_VERSION,
      score: petData.score,
      events: petData.events,
      dailyEmojis: petData.dailyEmojis,
      position: {
        left: petContainer.getBoundingClientRect().left,
        top: petContainer.getBoundingClientRect().top
      },
      lastReset: lastResetDate,
      thresholdSettings: {
        customThresholds: customThresholds,
        adaptiveEnabled: adaptiveThresholds,
        adaptiveSpeed: adaptiveSpeed
      },
      languageSettings: {
        currentLanguage: currentLanguage
      },
      exportTime: new Date().toISOString(),
      stats: generateDataStats({dailyEmojis: petData.dailyEmojis})
    };
    
    const jsonData = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    
    // 文件名包含日期
    const datePart = new Date().toISOString().split('T')[0];
    a.download = `mood_data_${datePart}.json`;
    
    a.click();
    URL.revokeObjectURL(url);
    
    console.log("数据导出成功");
  } catch (err) {
    console.error("导出数据时出错:", err);
    alert("导出数据时出错: " + err.message);
  }
}

// 生成数据统计信息
function generateDataStats(data) {
  if (!data || !data.dailyEmojis) return {};
  
  const stats = {
    totalDays: Object.keys(data.dailyEmojis).length,
    emojiCounts: {},
    avgScore: 0,
    firstDate: null,
    lastDate: null
  };
  
  // 计算各表情数量
  let scoreSum = 0;
  const allDates = Object.keys(data.dailyEmojis).sort();
  
  if (allDates.length > 0) {
    stats.firstDate = allDates[0];
    stats.lastDate = allDates[allDates.length - 1];
    
    allDates.forEach(date => {
      const emoji = data.dailyEmojis[date];
      stats.emojiCounts[emoji] = (stats.emojiCounts[emoji] || 0) + 1;
      
      // 计算分数
      let score = 0;
      if (emoji === "🥰") score = 10;
      else if (emoji === "😄") score = 5;
      else if (emoji === "😐") score = 0;
      else if (emoji === "😡") score = -5;
      else if (emoji === "👿") score = -10;
      
      scoreSum += score;
    });
    
    stats.avgScore = scoreSum / allDates.length;
  }
  
  return stats;
}

// 数据导入功能
function importData(jsonData) {
  try {
    // 解析JSON
    const importedData = JSON.parse(jsonData);
    
    // 基本验证
    if (!importedData || !importedData.dailyEmojis) {
      alert("导入失败：数据格式无效");
      return false;
    }
    
    // 合并数据（保留已有数据，只覆盖导入的日期）
    const currentData = { ...petData };
    
    // 合并日历数据
    if (importedData.dailyEmojis) {
      currentData.dailyEmojis = { 
        ...currentData.dailyEmojis, 
        ...importedData.dailyEmojis
      };
    }
    
    // 合并事件数据（避免重复）
    if (Array.isArray(importedData.events)) {
      // 合并events数组，根据timestamp去重
      const existingTimestamps = new Set(currentData.events.map(e => e.timestamp));
      const newEvents = importedData.events.filter(e => !existingTimestamps.has(e.timestamp));
      currentData.events = [...currentData.events, ...newEvents];
    }
    
    // 更新数据
    petData = currentData;
    savePluginState();
    updateUI();
    
    return true;
  } catch (e) {
    console.error("导入数据时出错", e);
    alert("导入失败：" + e.message);
    return false;
  }
}

// 添加数据导入UI
function showImportDialog() {
  const contentHTML = `
    <div>
      <p>将之前导出的JSON数据粘贴到下面，或者选择文件上传：</p>
      <textarea id="import-data-text" style="width:100%; min-height:120px; margin-bottom:10px;"></textarea>
      <input type="file" id="import-data-file" accept=".json" style="margin-bottom:10px;">
      <div>
        <button id="import-confirm-btn">导入数据</button>
        <button id="import-cancel-btn">取消</button>
      </div>
    </div>
  `;
  
  openModal("📥 导入数据", contentHTML);
  
  // 文件选择处理
  document.getElementById("import-data-file").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById("import-data-text").value = e.target.result;
      };
      reader.readAsText(file);
    }
  });
  
  // 导入按钮
  document.getElementById("import-confirm-btn").addEventListener("click", () => {
    const data = document.getElementById("import-data-text").value.trim();
    if (!data) {
      alert("请输入或上传数据");
      return;
    }
    
    if (confirm("确定要导入数据吗？这将合并现有数据。")) {
      const success = importData(data);
      if (success) {
        alert("数据导入成功！");
        closeModal();
      }
    }
  });
  
  // 取消按钮
  document.getElementById("import-cancel-btn").addEventListener("click", closeModal);
}

function updateUI() {
  const emojiEl = document.querySelector("#emoji");
  const currentScore = petData.score;

  // 根据分数决定表情
  emojiEl.textContent = getEmojiByScore(currentScore);

  // 判断分数是上升还是下降
  let animClass = "";
  if (currentScore > lastScore) {
    animClass = "emoji-anim-up";
  } else if (currentScore < lastScore) {
    animClass = "emoji-anim-down";
  } else {
    animClass = ""; 
  }

  emojiEl.classList.remove("emoji-anim-up", "emoji-anim-down", "emoji-anim");
  if (animClass) {
    emojiEl.classList.add(animClass);
    setTimeout(() => {
      emojiEl.classList.remove(animClass);
    }, 300);
  }

  lastScore = currentScore;
  // updateDailyEmoji();
  // 不在此调用 updateDailyEmoji()，以免覆盖已记录的当天 emoji
}

// ==============================
// 5.1 拖拽功能（弹窗跟随容器移动）
// ==============================
let isDragging = false;
let offsetX = 0;
let offsetY = 0;
let isModalVisible = false;

let didMove = false;
let startX = 0, startY = 0;

// mousedown
petContainer.addEventListener("mousedown", (event) => {
  if (modalContainer.contains(event.target)) {
    return;
  }
  isDragging = true;
  didMove = false;
  startX = event.clientX;
  startY = event.clientY;

  const rect = petContainer.getBoundingClientRect();
  offsetX = event.clientX - rect.left;
  offsetY = event.clientY - rect.top;
  event.preventDefault();
});

// mousemove
document.addEventListener("mousemove", (event) => {
  if (!isDragging) return;

  if (!didMove) {
    const distX = event.clientX - startX;
    const distY = event.clientY - startY;
    if (Math.abs(distX) + Math.abs(distY) > 5) {
      didMove = true;
    }
  }

  let newX = event.clientX - offsetX;
  let newY = event.clientY - offsetY;
  const containerWidth = petContainer.offsetWidth;
  const containerHeight = petContainer.offsetHeight;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  newX = Math.max(0, Math.min(newX, windowWidth - containerWidth));
  newY = Math.max(0, Math.min(newY, windowHeight - containerHeight));
  petContainer.style.left = `${newX}px`;
  petContainer.style.top = `${newY}px`;

  // 更新模态窗口位置
  if (isModalVisible) {
    const modalOffsetX = 60;
    const modalOffsetY = -40;
    modalContainer.style.left = `${Math.min(newX + containerWidth + modalOffsetX, windowWidth - modalContainer.offsetWidth - 20)}px`;
    modalContainer.style.top = `${Math.max(newY + modalOffsetY, 20)}px`;
  }
});

// mouseup
document.addEventListener("mouseup", (event) => {
  if (isDragging) {
    isDragging = false;
    
    // 只有在确实拖动了容器，且模态框可见时，才调整模态框位置
    // 这里添加了对事件目标的检查，确保不是在点击按钮时触发位移
    if (didMove && isModalVisible && !modalContainer.contains(event.target)) {
      // 修复位置偏移问题
      const rect = petContainer.getBoundingClientRect();
      const modalOffsetX = 60;
      const modalOffsetY = -40;
      modalContainer.style.left = `${Math.min(rect.right + modalOffsetX, window.innerWidth - modalContainer.offsetWidth - 20)}px`;
      modalContainer.style.top = `${Math.max(rect.top + modalOffsetY, 20)}px`;
    }
    
    didMove = false;
    savePluginStateDebounced();
  }
});

// ==============================
// 5. 2 窗口resize监听
// ==============================
window.addEventListener("resize", () => {
  const containerRect = petContainer.getBoundingClientRect();
  let left = containerRect.left;
  let top = containerRect.top;

  const containerWidth = petContainer.offsetWidth;
  const containerHeight = petContainer.offsetHeight;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (left + containerWidth > windowWidth) {
    left = windowWidth - containerWidth;
  }
  if (left < 0) {
    left = 0;
  }
  if (top + containerHeight > windowHeight) {
    top = windowHeight - containerHeight;
  }
  if (top < 0) {
    top = 0;
  }

  petContainer.style.left = `${left}px`;
  petContainer.style.top = `${top}px`;
  savePluginStateDebounced();
});

// ==============================
// 6. 状态保存与加载
// ==============================

const PLUGIN_CURRENT_VERSION = chrome.runtime.getManifest().version || "1.0";

function safeSetLocal(data, callback) {
  try {
    // 检查扩展上下文是否依旧有效
    if (!chrome || !chrome.runtime || !chrome.runtime.id) {
      console.warn("Extension context invalidated. Skip set.");
      return;
    }
    chrome.storage.local.set(data, () => {
      if (chrome.runtime.lastError) {
        console.error("Storage set error:", chrome.runtime.lastError);
      }
      if (callback) callback();
    });
  } catch (err) {
    console.error("Context possibly invalidated:", err);
  }
}

function safeGetLocal(keys, callback) {
  try {
    if (!chrome || !chrome.runtime || !chrome.runtime.id) {
      console.warn("Extension context invalidated. Skip get.");
      callback({});
      return;
    }
    chrome.storage.local.get(keys, (result) => {
      if (chrome.runtime.lastError) {
        console.error("Storage get error:", chrome.runtime.lastError);
      }
      callback(result);
    });
  } catch (err) {
    console.error("Context possibly invalidated:", err);
    callback({});
  }
}

function savePluginState() {
  try {
    const rect = petContainer.getBoundingClientRect();
    
    // 数据完整性检查
    if (typeof petData.score !== 'number') {
      console.warn("分数数据类型错误，重置为0");
      petData.score = 0;
    }
    
    if (!Array.isArray(petData.events)) {
      console.warn("事件数据类型错误，重置为空数组");
      petData.events = [];
    }
    
    if (!petData.dailyEmojis || typeof petData.dailyEmojis !== 'object') {
      console.warn("日历数据类型错误，重置为空对象");
      petData.dailyEmojis = {};
    }
    
    const state = {
      version: PLUGIN_CURRENT_VERSION,
      score: petData.score,
      events: petData.events,
      dailyEmojis: petData.dailyEmojis,
      position: {
        left: rect.left,
        top: rect.top
      },
      lastReset: lastResetDate,
      thresholdSettings: {
        customThresholds: customThresholds,
        adaptiveEnabled: adaptiveThresholds,
        adaptiveSpeed: adaptiveSpeed
      },
      languageSettings: {
        currentLanguage: currentLanguage
      },
      lastSaveTime: Date.now()
    };
    
    // 主存储
    safeSetLocal({ pluginState: state });
    
    // 备份存储 - 使用localStorage作为备份
    try {
      localStorage.setItem("pluginStateBackup", JSON.stringify(state));
    } catch (e) {
      console.warn("无法创建本地备份", e);
    }
  } catch (err) {
    console.error("保存状态时发生错误:", err);
    // 尝试从localStorage恢复
    try {
      const backup = localStorage.getItem("pluginStateBackup");
      if (backup) {
        console.log("尝试从本地备份恢复");
        safeSetLocal({ pluginState: JSON.parse(backup) });
      }
    } catch (e) {
      console.error("恢复备份失败", e);
    }
  }
}

function loadPluginState() {
  safeGetLocal("pluginState", (result) => {
    let stateLoaded = false;
    
    // 1. 尝试从chrome.storage加载
    if (result.pluginState) {
      try {
        processLoadedState(result.pluginState);
        stateLoaded = true;
      } catch (err) {
        console.error("处理加载的状态时出错:", err);
      }
    }
    
    // 2. 如果chrome.storage加载失败，尝试从localStorage恢复
    if (!stateLoaded) {
      try {
        const backup = localStorage.getItem("pluginStateBackup");
        if (backup) {
          console.log("从本地备份恢复数据");
          const backupState = JSON.parse(backup);
          processLoadedState(backupState);
          stateLoaded = true;
          
          // 将恢复的数据同步回主存储
          safeSetLocal({ pluginState: backupState });
        }
      } catch (e) {
        console.error("从备份恢复失败", e);
      }
    }
    
    // 3. 如果两种方式都失败，初始化新状态
    if (!stateLoaded) {
      console.log("无法加载保存的状态，初始化新状态");
      petData = { 
        score: 0, 
        events: [], 
        dailyEmojis: {}
      };
      lastResetDate = getLocalDateString(new Date());
      updateUI();
    }
    
    // 不管如何，都检查是否需要重置
    checkAndResetIfNeeded();
  });
}

// 辅助函数：处理加载的状态数据
function processLoadedState(loadedState) {
  const { version, score, events, dailyEmojis, position, resetSettings, thresholdSettings, languageSettings } = loadedState;
  const storedVersion = version || "1.0";

  if (storedVersion !== PLUGIN_CURRENT_VERSION) {
    console.log(`检测到版本升级: ${storedVersion} -> ${PLUGIN_CURRENT_VERSION}，正在迁移数据...`);
    const migratedState = doMigration(loadedState, storedVersion, PLUGIN_CURRENT_VERSION);
    migratedState.version = PLUGIN_CURRENT_VERSION;
    safeSetLocal({ pluginState: migratedState }, () => {
      console.log("数据迁移完成!");
    });
    lastResetDate = migratedState.lastReset || null;
    petData.score = migratedState.score || 0;
    petData.events = migratedState.events || [];
    petData.dailyEmojis = migratedState.dailyEmojis || {};
    
    // 加载阈值设置
    if (migratedState.thresholdSettings) {
      const { customThresholds: savedThresholds, adaptiveEnabled, adaptiveSpeed: savedSpeed } = migratedState.thresholdSettings;
      if (savedThresholds) {
        customThresholds = savedThresholds;
      }
      adaptiveThresholds = adaptiveEnabled || false;
      adaptiveSpeed = savedSpeed || 0.05;
    }
    
    // 加载语言设置
    if (migratedState.languageSettings && migratedState.languageSettings.currentLanguage) {
      currentLanguage = migratedState.languageSettings.currentLanguage;
      console.log(`已加载语言设置: ${currentLanguage}`);
    }
    
    if (migratedState.position) {
      petContainer.style.left = `${migratedState.position.left}px`;
      petContainer.style.top = `${migratedState.position.top}px`;
    }
  } else {
    petData.score = score || 0;
    petData.events = events || [];
    petData.dailyEmojis = dailyEmojis || {};
    lastResetDate = loadedState.lastReset || null;
    
    // 加载阈值设置
    if (thresholdSettings) {
      if (thresholdSettings.customThresholds) {
        customThresholds = thresholdSettings.customThresholds;
        console.log("已加载自定义情绪阈值:", customThresholds);
      }
      adaptiveThresholds = thresholdSettings.adaptiveEnabled || false;
      adaptiveSpeed = thresholdSettings.adaptiveSpeed || 0.05;
      
      if (adaptiveThresholds) {
        console.log(`已启用自适应阈值，适应速度: ${adaptiveSpeed}`);
      }
    }
    
    // 加载语言设置
    if (languageSettings && languageSettings.currentLanguage) {
      currentLanguage = languageSettings.currentLanguage;
      console.log(`已加载语言设置: ${currentLanguage}`);
    }
    
    if (position) {
      petContainer.style.left = `${position.left}px`;
      petContainer.style.top = `${position.top}px`;
    }
  }
  
  updateUI();
}

// ==============================
// 7.1 防抖保存
// ==============================
function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}
const savePluginStateDebounced = debounce(savePluginState, 300);

// 7.2 多标签同步

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.pluginState) {
    loadPluginState();
  }
});
// 7.3 退出保存
window.onbeforeunload = () => {
  savePluginState();
};

// ==============================
// 8. 初始化
// ==============================
loadPluginState();
updateUI();
scheduleSaveFinalScore();
scheduleDailyReset();

/**
 * 立即同步功能
 * 保存当前日期的表情并检查是否需要重置
 */
function forceSyncNow() {
  console.log("执行立即同步");
  
  // 强制更新当前表情状态
  const todayString = getLocalDateString(new Date());
  petData.dailyEmojis[todayString] = getEmojiByScore(petData.score);
  console.log(`已更新今天(${todayString})的表情: ${petData.dailyEmojis[todayString]}`);
  
  // 检查是否需要重置
  checkAndResetIfNeeded();
  
  // 重新安排定时器
  scheduleDailyReset();
  scheduleSaveFinalScore();
  
  // 保存状态
  savePluginState();
  updateUI();
}

// 渲染心情统计
function renderMoodStats() {
  // 获取数据
  const stats = generateDataStats({dailyEmojis: petData.dailyEmojis});
  
  // 更新统计数据
  if (stats.emojiCounts) {
    document.getElementById("stat-supergood").textContent = stats.emojiCounts["🥰"] || 0;
    document.getElementById("stat-good").textContent = stats.emojiCounts["😄"] || 0;
    document.getElementById("stat-neutral").textContent = stats.emojiCounts["😐"] || 0;
    document.getElementById("stat-bad").textContent = stats.emojiCounts["😡"] || 0;
    document.getElementById("stat-terrible").textContent = stats.emojiCounts["👿"] || 0;
  }
  
  // 更新总天数
  document.getElementById("total-days").textContent = `${stats.totalDays || 0} ${currentLanguage === 'zh' ? '天' : 'days'}`;
  
  // 更新时间跨度
  if (stats.firstDate && stats.lastDate) {
    document.getElementById("date-span").textContent = `${stats.firstDate} → ${stats.lastDate}`;
  } else {
    document.getElementById("date-span").textContent = "-";
  }
  
  // 更新平均分数
  document.getElementById("avg-score").textContent = stats.avgScore ? stats.avgScore.toFixed(1) : "0";
}

// 使用handleButtonClick包装按钮点击事件
rightBottomBtn.addEventListener("click", handleButtonClick(function() {
  openCalendarModal();
}));

// 给设置页面添加更多选项
function enhanceSettingsTab() {
  console.log("开始增强设置选项卡...");
  
  // 创建高级设置区域
  const settingsContent = document.getElementById("settings-content");
  if (!settingsContent) {
    console.error("找不到设置内容区域元素(settings-content)！");
    return;
  }
  
  // 检查是否已经添加过设置（避免重复添加）
  if (settingsContent.querySelector("#threshold-section")) {
    console.log("设置已存在，不重复添加");
    return;
  }
  
  try {
    // 添加情绪阈值设置
    const thresholdSection = document.createElement("div");
    thresholdSection.id = "threshold-section";
    thresholdSection.style.marginTop = "20px";
    thresholdSection.style.borderTop = "1px solid #eee";
    thresholdSection.style.paddingTop = "10px";
    thresholdSection.innerHTML = `
      <h4>${getText('thresholdSettings')}</h4>
      <div style="margin: 10px 0;">
        <div style="margin-bottom: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
            <label>${getText('extremelySadThreshold')}:</label>
            <input type="number" id="threshold-terrible" value="${customThresholds.terrible}" style="width: 60px;" max="0">
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
            <label>${getText('sadThreshold')}:</label>
            <input type="number" id="threshold-negative" value="${customThresholds.negative}" style="width: 60px;" max="0">
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
            <label>${getText('neutralThreshold')}:</label>
            <input type="number" id="threshold-neutral" value="${customThresholds.neutral}" style="width: 60px;">
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
            <label>${getText('happyThreshold')}:</label>
            <input type="number" id="threshold-positive" value="${customThresholds.positive}" style="width: 60px;" min="0">
          </div>
        </div>
        <div style="margin-top: 10px; display: flex; align-items: center;">
          <button id="reset-thresholds-btn" style="margin-right: 10px;">${getText('resetThreshold')}</button>
          <span style="font-size: 12px; color: #666;">${currentLanguage === 'zh' ? '设置每个表情的分数阈值' : 'Set the score threshold for each emoji'}</span>
        </div>
      </div>
      <div style="margin: 15px 0; padding-top: 10px; border-top: 1px dashed #eee;">
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
          <input type="checkbox" id="adaptive-thresholds" ${adaptiveThresholds ? 'checked' : ''}>
          <label for="adaptive-thresholds" style="margin-left: 5px;">${getText('adaptiveThreshold')}</label>
        </div>
        <div id="adaptive-settings" style="margin-left: 20px; ${adaptiveThresholds ? '' : 'display: none;'}">
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <label style="margin-right: 10px;">${getText('adaptiveSpeed')}:</label>
            <input type="range" id="adaptive-speed" min="0.01" max="0.2" step="0.01" value="${adaptiveSpeed}">
            <span id="adaptive-speed-value">${adaptiveSpeed}</span>
          </div>
          <p style="font-size: 12px; color: #666;">${getText('adaptiveThresholdHint')}</p>
        </div>
      </div>
    `;
    settingsContent.appendChild(thresholdSection);
  } catch (e) {
    console.error("添加情绪阈值设置时出错:", e);
  }
  
  // 添加界面透明度设置
  try {
    const opacitySection = document.createElement("div");
    opacitySection.id = "opacity-section";
    opacitySection.style.marginTop = "20px";
    opacitySection.style.borderTop = "1px solid #eee";
    opacitySection.style.paddingTop = "10px";
    opacitySection.innerHTML = `
      <h4>${getText('interfaceSettings')}</h4>
      <div style="margin: 10px 0;">
        <label>${getText('iconOpacity')}：</label>
        <input type="range" id="icon-opacity" min="0.3" max="1.0" step="0.05" value="${iconOpacity || 0.85}">
        <span id="opacity-value">${iconOpacity || 0.85}</span>
      </div>
      <div style="margin: 10px 0;">
        <label>${getText('rememberPosition')}：</label>
        <input type="checkbox" id="remember-position" ${rememberPosition ? 'checked' : ''}>
        <span>${getText('rememberPositionHint')}</span>
      </div>
    `;
    settingsContent.appendChild(opacitySection);
  } catch (e) {
    console.error("添加界面透明度设置时出错:", e);
  }
  
  // 通知设置
  try {
    const notificationSection = document.createElement("div");
    notificationSection.id = "notification-section";
    notificationSection.style.marginTop = "20px";
    notificationSection.style.borderTop = "1px solid #eee";
    notificationSection.style.paddingTop = "10px";
    notificationSection.innerHTML = `
      <h4>${getText('notificationSettings')}</h4>
      <div style="margin: 10px 0;">
        <label>${getText('resetNotification')}：</label>
        <input type="checkbox" id="notify-reset" ${notifyOnReset ? 'checked' : ''}>
        <span>${getText('resetNotificationHint')}</span>
      </div>
      <div style="margin: 10px 0;">
        <label>${getText('dailyReminder')}：</label>
        <input type="checkbox" id="daily-reminder" ${dailyReminder ? 'checked' : ''}>
        <span>${getText('dailyReminderHint')}</span>
      </div>
      <div style="margin: 10px 0;">
        <label>${getText('reminderTime')}：</label>
        <select id="reminder-hour">
          ${Array.from({ length: 24 }, (_, i) => 
            `<option value="${i}" ${i === reminderHour ? 'selected' : ''}>${i.toString().padStart(2, '0')}</option>`
          ).join('')}
        </select>
        :
        <select id="reminder-minute">
          ${[0, 15, 30, 45].map(i => 
            `<option value="${i}" ${i === reminderMinute ? 'selected' : ''}>${i.toString().padStart(2, '0')}</option>`
          ).join('')}
        </select>
      </div>
    `;
    settingsContent.appendChild(notificationSection);
  } catch (e) {
    console.error("添加通知设置时出错:", e);
  }
  
  // 添加事件处理
  try {
    // 透明度设置
    const iconOpacityInput = document.getElementById("icon-opacity");
    if (iconOpacityInput) {
      iconOpacityInput.addEventListener("input", (e) => {
        const value = parseFloat(e.target.value);
        const displayElement = document.getElementById("opacity-value");
        if (displayElement) {
          displayElement.textContent = value.toFixed(2);
        }
        updateIconOpacity(value);
      });
    }
  
    // 自适应阈值控制
    const adaptiveCheckbox = document.getElementById("adaptive-thresholds");
    const adaptiveSettings = document.getElementById("adaptive-settings");
    
    if (adaptiveCheckbox && adaptiveSettings) {
      adaptiveCheckbox.addEventListener("change", (e) => {
        adaptiveSettings.style.display = e.target.checked ? "block" : "none";
      });
    }
  
    const adaptiveSpeedInput = document.getElementById("adaptive-speed");
    if (adaptiveSpeedInput) {
      adaptiveSpeedInput.addEventListener("input", (e) => {
        const value = parseFloat(e.target.value);
        const displayElement = document.getElementById("adaptive-speed-value");
        if (displayElement) {
          displayElement.textContent = value.toFixed(2);
        }
      });
    }
  
    // 阈值重置
    const resetThresholdsBtn = document.getElementById("reset-thresholds-btn");
    if (resetThresholdsBtn) {
      resetThresholdsBtn.addEventListener("click", () => {
        const terribleInput = document.getElementById("threshold-terrible");
        const negativeInput = document.getElementById("threshold-negative");
        const neutralInput = document.getElementById("threshold-neutral");
        const positiveInput = document.getElementById("threshold-positive");
        
        if (terribleInput) terribleInput.value = DEFAULT_THRESHOLDS.terrible;
        if (negativeInput) negativeInput.value = DEFAULT_THRESHOLDS.negative;
        if (neutralInput) neutralInput.value = DEFAULT_THRESHOLDS.neutral;
        if (positiveInput) positiveInput.value = DEFAULT_THRESHOLDS.positive;
        
        if (confirm(getText('resetThresholdConfirm'))) {
          customThresholds = {...DEFAULT_THRESHOLDS};
          updateUI();
        }
      });
    }
  } catch (e) {
    console.error("添加事件处理器时出错:", e);
  }
  
  // 保存设置按钮事件增强
  try {
    const saveBtn = document.getElementById("save-settings-btn");
    if (saveBtn) {
      // 移除之前的事件处理
      const newSaveBtn = saveBtn.cloneNode(true);
      saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);
      
      // 添加新的事件处理
      newSaveBtn.addEventListener("click", () => {
        try {
          // 阈值设置
          const terribleInput = document.getElementById("threshold-terrible");
          const negativeInput = document.getElementById("threshold-negative");
          const neutralInput = document.getElementById("threshold-neutral");
          const positiveInput = document.getElementById("threshold-positive");
          
          if (terribleInput) customThresholds.terrible = parseFloat(terribleInput.value);
          if (negativeInput) customThresholds.negative = parseFloat(negativeInput.value);
          if (neutralInput) customThresholds.neutral = parseFloat(neutralInput.value);
          if (positiveInput) customThresholds.positive = parseFloat(positiveInput.value);
          
          // 自适应设置
          const adaptiveCheckbox = document.getElementById("adaptive-thresholds");
          const adaptiveSpeedInput = document.getElementById("adaptive-speed");
          
          if (adaptiveCheckbox) adaptiveThresholds = adaptiveCheckbox.checked;
          if (adaptiveSpeedInput) adaptiveSpeed = parseFloat(adaptiveSpeedInput.value);
          
          // 透明度设置
          const opacityInput = document.getElementById("icon-opacity");
          if (opacityInput) iconOpacity = parseFloat(opacityInput.value);
          
          // 记住位置设置
          const rememberPositionCheckbox = document.getElementById("remember-position");
          if (rememberPositionCheckbox) rememberPosition = rememberPositionCheckbox.checked;
          
          // 双击动作设置
          const doubleClickSelect = document.getElementById("double-click-action");
          if (doubleClickSelect) doubleClickAction = doubleClickSelect.value;
          
          // 通知设置
          const notifyResetCheckbox = document.getElementById("notify-reset");
          const dailyReminderCheckbox = document.getElementById("daily-reminder");
          const reminderHourSelect = document.getElementById("reminder-hour");
          const reminderMinuteSelect = document.getElementById("reminder-minute");
          
          if (notifyResetCheckbox) notifyOnReset = notifyResetCheckbox.checked;
          if (dailyReminderCheckbox) dailyReminder = dailyReminderCheckbox.checked;
          if (reminderHourSelect) reminderHour = parseInt(reminderHourSelect.value, 10);
          if (reminderMinuteSelect) reminderMinute = parseInt(reminderMinuteSelect.value, 10);
          
          // 语言设置
          const languageSelect = document.getElementById("language-select");
          if (languageSelect) currentLanguage = languageSelect.value;
          
          console.log(`设置已更新:
            - 情绪阈值: ${JSON.stringify(customThresholds)}
            - 自适应阈值: ${adaptiveThresholds ? "启用" : "禁用"}, 速度: ${adaptiveSpeed}
            - 图标透明度: ${iconOpacity}
            - 记住位置: ${rememberPosition}
            - 双击动作: ${doubleClickAction}
            - 重置通知: ${notifyOnReset}
            - 每日提醒: ${dailyReminder}
            - 提醒时间: ${reminderHour}:${reminderMinute.toString().padStart(2, '0')}
            - 语言: ${currentLanguage}
          `);
          
          // 更新UI
          updateIconOpacity(iconOpacity);
          
          // 重新安排提醒
          if (dailyReminder) {
            scheduleReminder();
          }
          
          // 应用自适应阈值（如果启用）
          if (adaptiveThresholds) {
            updateAdaptiveThresholds();
          }
          
          // 保存设置
          savePluginState();
          updateUI();
          alert(getText('settingsSaved'));
        } catch (err) {
          console.error("保存设置时出错:", err);
          alert("保存设置时出错: " + err.message);
        }
      });
    } else {
      console.error("找不到保存设置按钮！");
    }
  } catch (e) {
    console.error("设置保存按钮事件处理时出错:", e);
  }
}

// 显示通知
function showNotification(title, message) {
  if (chrome.notifications) {
    chrome.notifications.create({
      type: 'basic',
      title: title,
      message: message
    });
  }
}

// 更新图标透明度
function updateIconOpacity(value) {
  iconOpacity = value;
  petContainer.style.opacity = iconOpacity;
}

// 安排每日提醒
function scheduleReminder() {
  // 清除之前的提醒定时器
  if (window.reminderTimer) {
    clearTimeout(window.reminderTimer);
  }
  
  // 如果未启用提醒，直接返回
  if (!dailyReminder) return;
  
  const now = new Date();
  const reminderTime = new Date(now);
  reminderTime.setHours(reminderHour, reminderMinute, 0, 0);
  
  if (reminderTime - now < 0) {
    reminderTime.setDate(reminderTime.getDate() + 1);
  }
  
  const timeUntilReminder = reminderTime - now;
  console.log(`设置每日提醒：将在 ${reminderTime.toLocaleString()} 提醒（${timeUntilReminder / 1000}秒后）`);
  
  if (timeUntilReminder > 2147483000) {
    window.reminderTimer = setTimeout(() => {
      scheduleReminder();
    }, 2147483000);
  } else {
    window.reminderTimer = setTimeout(() => {
      showNotification(getText('reminderTitle'), getText('reminderMessage'));
      scheduleReminder(); // 递归安排下一个提醒
    }, timeUntilReminder);
  }
}

// 初始化插件
function initPlugin() {
  console.log(`初始化插件 v${PLUGIN_CURRENT_VERSION}`);
  
  // 防抖动保存功能
  savePluginStateDebounced = debounce(savePluginState, 500);
  
  // 加载状态
  loadPluginState();
  
  // 确保customThresholds已正确初始化
  if (!customThresholds || !customThresholds.terrible) {
    console.warn("阈值未正确初始化，重置为默认值");
    customThresholds = {...DEFAULT_THRESHOLDS};
  }
  
  // 初始化UI
  updateUI();
  
  // 设置定时器
  scheduleDailyReset();
  scheduleSaveFinalScore();
  
  // 如果启用了每日提醒，设置提醒
  if (dailyReminder) {
    scheduleReminder();
  }
  
  // 如果启用了自适应阈值，每周进行一次更新
  if (adaptiveThresholds) {
    updateAdaptiveThresholds();
    setInterval(updateAdaptiveThresholds, 7 * 24 * 60 * 60 * 1000); // 每周更新一次
  }
  
  // 每30分钟检查一次是否需要重置
  setInterval(checkAndResetIfNeeded, 30 * 60 * 1000);
  
  console.log("插件初始化完成");
}

// 设置双击处理器
function setupDoubleClickHandler() {
  let lastClickTime = 0;
  const doubleClickDelay = 300; // 双击间隔毫秒数
  
  petContainer.addEventListener("click", (event) => {
    const now = Date.now();
    if (now - lastClickTime < doubleClickDelay) {
      // 双击操作
      handleDoubleClick();
      lastClickTime = 0; // 重置，避免三击触发
    } else {
      lastClickTime = now;
    }
  });
}

// 处理双击操作
function handleDoubleClick() {
  console.log(`执行双击操作: ${doubleClickAction}`);
  
  switch(doubleClickAction) {
    case "open-calendar":
      openCalendarModal();
      break;
    case "quick-good":
      quickAddMood(1);
      break;
    case "quick-bad":
      quickAddMood(-1);
      break;
    default:
      // 无动作
      break;
  }
}

// 快速添加心情
function quickAddMood(type) {
  let eventType = type > 0 ? "happy" : "negative";
  let score = type > 0 ? 1 : -1;
  
  petData.score += score;
  
  const event = {
    type: eventType,
    timestamp: Date.now(),
    score: score
  };
  
  petData.events.push(event);
  updateUI();
  savePluginState();
  
  if (chrome.notifications) {
    showNotification(
      type > 0 ? getText('recordedHappy') : getText('recordedSad'), 
      type > 0 ? getText('scoreIncreased') : getText('scoreDecreased')
    );
  }
}

// 调用初始化
document.addEventListener("DOMContentLoaded", initPlugin);

// 情绪阈值自适应算法
function updateAdaptiveThresholds() {
  if (!adaptiveThresholds) return;
  
  // 收集过去30天的情绪分数
  const today = new Date();
  const pastScores = [];
  
  // 收集数据
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = getLocalDateString(date);
    const emoji = petData.dailyEmojis[dateStr];
    
    if (emoji) {
      // 将表情转换为大致的分数值
      let score = 0;
      if (emoji === "🥰") score = 12;
      else if (emoji === "😄") score = 6;
      else if (emoji === "😐") score = 0;
      else if (emoji === "😡") score = -6;
      else if (emoji === "👿") score = -12;
      
      pastScores.push(score);
    }
  }
  
  // 如果数据不足，不进行适应
  if (pastScores.length < 7) return;
  
  // 计算统计数据
  const stats = calculateScoreStats(pastScores);
  
  // 根据统计数据调整阈值
  // 只有当有足够多的数据点且波动较大时才调整
  if (stats.stdDev > 3) {
    // 渐进调整各阈值，使用adaptiveSpeed控制调整速度
    customThresholds.terrible = customThresholds.terrible * (1 - adaptiveSpeed) + 
                              (stats.min + stats.stdDev * 0.2) * adaptiveSpeed;
    
    customThresholds.negative = customThresholds.negative * (1 - adaptiveSpeed) + 
                              (stats.mean - stats.stdDev * 0.5) * adaptiveSpeed;
    
    customThresholds.neutral = customThresholds.neutral * (1 - adaptiveSpeed) + 
                             (stats.mean + stats.stdDev * 0.2) * adaptiveSpeed;
    
    customThresholds.positive = customThresholds.positive * (1 - adaptiveSpeed) + 
                              (stats.max - stats.stdDev * 0.5) * adaptiveSpeed;
    
    console.log("自适应阈值已更新", customThresholds);
  }
}

// 计算分数统计信息
function calculateScoreStats(scores) {
  if (!scores || scores.length === 0) {
    return { min: 0, max: 0, mean: 0, stdDev: 0 };
  }
  
  const min = Math.min(...scores);
  const max = Math.max(...scores);
  const sum = scores.reduce((a, b) => a + b, 0);
  const mean = sum / scores.length;
  
  // 计算标准差
  const squaredDiffs = scores.map(score => {
    const diff = score - mean;
    return diff * diff;
  });
  const variance = squaredDiffs.reduce((a, b) => a + b, 0) / scores.length;
  const stdDev = Math.sqrt(variance);
  
  return { min, max, mean, stdDev };
}

// 测试函数
function testTimeBasedFunctions() {
  console.log("开始测试时间相关功能...");
  
  // 测试重置功能
  console.log("\n1. 测试重置功能 (00:00)");
  const resetTestTime = new Date();
  resetTestTime.setHours(0, 0, 0, 0);
  console.log("模拟重置时间：", resetTestTime.toLocaleString());
  resetScore();
  console.log("重置后分数：", petData.score);
  console.log("重置后lastResetDate：", lastResetDate);
  
  // 测试分数保存功能
  console.log("\n2. 测试分数保存功能 (23:59:30)");
  const saveTestTime = new Date();
  saveTestTime.setHours(23, 59, 30, 0);
  console.log("模拟保存时间：", saveTestTime.toLocaleString());
  saveFinalScore();
  const todayString = getLocalDateString(new Date());
  console.log("保存的表情：", petData.dailyEmojis[todayString]);
  
  // 测试同步功能
  console.log("\n3. 测试同步功能");
  console.log("同步前状态：", {
    score: petData.score,
    todayEmoji: petData.dailyEmojis[todayString]
  });
  forceSyncNow();
  console.log("同步后状态：", {
    score: petData.score,
    todayEmoji: petData.dailyEmojis[todayString]
  });
}

// 添加测试按钮到设置页面
function addTestButton() {
  const settingsContent = document.getElementById("settings-content");
  if (settingsContent) {
    const testButton = document.createElement("button");
    testButton.textContent = "运行功能测试";
    testButton.style.marginTop = "20px";
    testButton.addEventListener("click", testTimeBasedFunctions);
    settingsContent.appendChild(testButton);
  }
}

// 在初始化时添加测试按钮
document.addEventListener("DOMContentLoaded", () => {
  initPlugin();
  addTestButton();
});
