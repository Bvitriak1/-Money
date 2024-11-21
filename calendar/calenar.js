const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");
const monthYearDisplay = document.getElementById("monthYear");
const calendarBody = document.getElementById("calendarBody");
const dayModal = document.getElementById("dayModal");
const backToCalendarBtn = document.getElementById("backToCalendarBtn");
const selectedDateDisplay = document.getElementById("selectedDate");
const plansList = document.getElementById("plans");
const noPlansMessage = document.getElementById("noPlansMessage");

let currentDate = new Date(); 
let today = new Date(); 
let selectedDay = null;

// Пример задач
const tasks = {
    "2024-11-21": ["Собрание с командой", "Проверка почты"],
    "2024-11-22": ["Покупка продуктов"]
};

function formatDate(date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

function renderCalendar() {
    calendarBody.innerHTML = "";
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const totalDaysInMonth = lastDayOfMonth.getDate();
    const startDay = (firstDayOfMonth.getDay() + 6) % 7;

    const daysInPrevMonth = new Date(year, month, 0).getDate();

    monthYearDisplay.textContent = `${year} / ${month + 1}`;

    let dayNumber = 1;

    for (let i = 0; i < 6; i++) { 
        for (let j = 0; j < 7; j++) { 
            const dayCell = document.createElement("div");
            dayCell.classList.add("calendar-day");

            if (i === 0 && j < startDay) {
                const prevMonthDay = daysInPrevMonth - (startDay - j - 1);
                dayCell.classList.add("other-month");
                dayCell.textContent = prevMonthDay;
            } else if (dayNumber > totalDaysInMonth) {
                const nextMonthDay = dayNumber - totalDaysInMonth;
                dayCell.classList.add("other-month");
                dayCell.textContent = nextMonthDay;
                dayNumber++;
            } else {
                const dayDate = new Date(year, month, dayNumber);
                dayCell.dataset.date = formatDate(dayDate);
                dayCell.textContent = dayNumber;

                if (dayDate.toDateString() === today.toDateString()) {
                    dayCell.classList.add("active");
                }

                dayCell.addEventListener("click", () => openDayModal(dayDate));

                dayNumber++;
            }

            calendarBody.appendChild(dayCell);
        }
    }
}

function openDayModal(date) {
    selectedDay = date;
    selectedDateDisplay.textContent = `Вы выбрали: ${date.toLocaleDateString()}`;

    const dateString = formatDate(date);
    const tasksForDay = tasks[dateString] || [];

    plansList.innerHTML = "";
    if (tasksForDay.length === 0) {
        noPlansMessage.classList.remove("hidden");
    } else {
        noPlansMessage.classList.add("hidden");
        tasksForDay.forEach(task => {
            const taskItem = document.createElement("li");
            taskItem.textContent = task;
            plansList.appendChild(taskItem);
        });
    }

    dayModal.classList.remove("hidden");
}

function closeDayModal() {
    dayModal.classList.add("hidden");
}

backToCalendarBtn.addEventListener("click", closeDayModal);
prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();
