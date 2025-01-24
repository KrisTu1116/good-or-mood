/**************************************
 * content.js (含心情日历功能)
 **************************************/

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

// [修改] 1.2 分数定义 - 新增 dailyEmojis
let petData = { 
  score: 0, 
  events: [], 
  dailyEmojis: {} // 【新增】用于记录每个日期的最终表情
};

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

plusBtn.addEventListener("click", () => {
  petData.score++;
  updateUI();

  // 动画
  plusBtn.classList.add("plus-anim");
  setTimeout(() => {
    plusBtn.classList.remove("plus-anim");
  }, 300);

  savePluginStateDebounced();
});

minusBtn.addEventListener("click", () => {
  petData.score--;
  updateUI();

  // 动画
  minusBtn.classList.add("minus-anim");
  setTimeout(() => {
    minusBtn.classList.remove("minus-anim");
  }, 300);

  savePluginStateDebounced();
});

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
  const isHappy = (type === "happy");
  const title = isHappy ? "✒️Goody" : "✒️Moody";

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
      <p>Whaat Happended!!</p>
      <input type="text" id="happy-description" placeholder=". . ." style="width:100%;">
      <button id="confirm-happy-btn" style="margin-top:10px; cursor:pointer;">OK!</button>
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
      <p>Waaht Happended ;-;</p>
      <input type="text" id="negative-description" placeholder=". . ." style="width:100%;">
      <button id="confirm-negative-btn" style="margin-top:10px; cursor:pointer;">Okay</button>
    `;
  }

  openModal(title, contentHTML, targetBtn);

  if (isHappy) {
    const ratingEmojis = document.querySelectorAll("#emoji-picker-happy .rating-emoji");
    let selectedCount = 0;
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

    const confirmHappyBtn = document.getElementById("confirm-happy-btn");
    confirmHappyBtn.addEventListener("click", () => {
      const desc = document.getElementById("happy-description").value.trim();
      petData.events.push({
        type: "happy",
        description: desc || "(Nothing Special)",
        points: selectedCount,
        timestamp: Date.now()
      });
      updateUI();
      savePluginState();
      closeModal();
    });

  } else {
    const ratingEmojis = document.querySelectorAll("#emoji-picker-negative .rating-emoji");
    let selectedCount = 0;
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

    const confirmNegativeBtn = document.getElementById("confirm-negative-btn");
    confirmNegativeBtn.addEventListener("click", () => {
      const desc = document.getElementById("negative-description").value.trim();
      petData.events.push({
        type: "negative",
        description: desc || "(Nothing Special)",
        points: -selectedCount,
        timestamp: Date.now()
      });
      updateUI();
      savePluginState();
      closeModal();
    });
  }
}

// 按钮绑定
leftMidBtn.addEventListener("click", function () {
  openEventModal("happy", this);
});

leftBottomBtn.addEventListener("click", function () {
  const eventHTML = petData.events.length === 0
    ? `<p>Nothing Yet</p>`
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
              <p><strong>📝：</strong>${event.description || "(Nothing Special)"}</p>
              <p>${emojis}</p>
            </div>
          `;
        })
        .join("");

  openModal(
    "📝 Things",
    eventHTML +
      `<button id="clear-records-btn" style="margin-top: 10px; cursor: pointer;">Empty Things</button>`,
    this
  );

  const clearBtn = document.getElementById("clear-records-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Empty Everything?")) {
        petData.events = [];
        savePluginState();
        modalContent.innerHTML = `<p>Nothing Yet</p>`;
      }
    });
  }
});

rightMidBtn.addEventListener("click", function () {
  openEventModal("negative", this);
});

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
    <div id="calendar-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
      <button id="prev-month-btn" style="cursor: pointer;">←</button>
      <span id="calendar-title" style="font-weight: bold; font-size: 16px;"></span>
      <button id="next-month-btn" style="cursor: pointer;">→</button>
    </div>
    <div id="calendar-body" style="text-align:center; transition: opacity 0.3s;"></div>
    <button id="export-btn" style="margin-top: 10px; cursor: pointer;">Export</button>
  `;
  openModal("📅Calendar", contentHTML);
  document.getElementById("prev-month-btn").addEventListener("click", () => {
    changeMonth(-1);
  });
  document.getElementById("next-month-btn").addEventListener("click", () => {
    changeMonth(1);
  });
  document.getElementById("export-btn").addEventListener("click", exportFullData);
  renderMoodCalendar(currentCalendarYear, currentCalendarMonth);
}

rightBottomBtn.addEventListener("click", function () {
  openCalendarModal();
});

// ==============================
// 4. 更新 UI
// ==============================
function getEmojiByScore(score) {
  if (score <= -9) return "👿";
  if (score <= -3) return "😡";
  if (score <= 3) return "😐";
  if (score <= 9) return "😄";
  return "🥰";
}

/**
 * 【新增】updateDailyEmoji()
 * 在每次分数变化后，将当日表情记录到 petData.dailyEmojis 中
 */
function updateDailyEmoji() {
  const todayString = new Date().toISOString().split("T")[0];
  const todayEmoji = getEmojiByScore(petData.score);
  petData.dailyEmojis[todayString] = todayEmoji;
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
    const dateKey = currentDay.toISOString().split("T")[0];
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

function exportFullData() {
  safeGetLocal("pluginState", (data) => {
    if (data.pluginState) {
      const jsonData = JSON.stringify(data.pluginState, null, 2);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mood_full_data.json";
      a.click();
      URL.revokeObjectURL(url);
    }
  });
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
  updateDailyEmoji();
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

  if (isModalVisible) {
    const modalOffsetX = 60;
    const modalOffsetY = -40;
    modalContainer.style.left = `${newX + containerWidth + modalOffsetX - 80}px`;
    modalContainer.style.top = `${newY + modalOffsetY}px`;
  }
});

// mouseup
document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    if (didMove) {
      const currentLeft = parseInt(modalContainer.style.left || "0", 10);
      modalContainer.style.left = `${currentLeft + 80}px`;
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
  const rect = petContainer.getBoundingClientRect();
  const state = {
    version: PLUGIN_CURRENT_VERSION,
    score: petData.score,
    events: petData.events,
    dailyEmojis: petData.dailyEmojis,
    position: {
      left: rect.left,
      top: rect.top
    }
  };
  safeSetLocal({ pluginState: state });
}

function loadPluginState() {
  safeGetLocal("pluginState", (result) => {
    if (result.pluginState) {
      const { version, score, events, dailyEmojis, position } = result.pluginState;
      const storedVersion = version || "1.0";

      if (storedVersion !== PLUGIN_CURRENT_VERSION) {
        console.log(`Detected old version: ${storedVersion}, migrating to ${PLUGIN_CURRENT_VERSION}...`);
        const migratedState = doMigration(result.pluginState, storedVersion, PLUGIN_CURRENT_VERSION);
        migratedState.version = PLUGIN_CURRENT_VERSION;
        safeSetLocal({ pluginState: migratedState }, () => {
          console.log("Migration done!");
        });
        petData.score = migratedState.score || 0;
        petData.events = migratedState.events || [];
        petData.dailyEmojis = migratedState.dailyEmojis || {};
        if (migratedState.position) {
          petContainer.style.left = `${migratedState.position.left}px`;
          petContainer.style.top = `${migratedState.position.top}px`;
        }
      } else {
        petData.score = score || 0;
        petData.events = events || [];
        petData.dailyEmojis = dailyEmojis || {};
        if (position) {
          petContainer.style.left = `${position.left}px`;
          petContainer.style.top = `${position.top}px`;
        }
      }
      updateUI();
    }
  });
}

// 如需迁移数据结构，可在此处理
function doMigration(oldState, oldVer, newVer) {
  return oldState;
}

// ==============================
// 7. 防抖保存
// ==============================
function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}
const savePluginStateDebounced = debounce(savePluginState, 300);

// ==============================
// 8. 初始化
// ==============================
loadPluginState();
updateUI();
