// Получение элементов
const calculatorSelect = document.getElementById('calculatorSelect');
const calculatorContainer = document.getElementById('calculatorContainer');

// Слушатель выбора калькулятора
calculatorSelect.addEventListener('change', (e) => {
    const selectedCalculator = e.target.value;

    if (selectedCalculator === 'profit') {
        loadProfitCalculator();
    } else if (selectedCalculator === 'tax') {
        loadTaxCalculator();
    }
});

// Функция загрузки калькулятора прибыли
function loadProfitCalculator() {
    calculatorContainer.innerHTML = `
        <h2>Калькулятор прибыли магазина</h2>
        <div class="form-group">
            <label for="revenue">Выручка (руб):</label>
            <input type="number" id="revenue" placeholder="Введите выручку">
        </div>
        <div class="form-group">
            <label for="expenses">Расходы (руб):</label>
            <input type="number" id="expenses" placeholder="Введите расходы">
        </div>
        <div class="form-group">
            <label for="cost-of-goods">Себестоимость товаров (руб):</label>
            <input type="number" id="cost-of-goods" placeholder="Введите себестоимость">
        </div>
        <div class="form-group">
            <button id="calculateProfitBtn">Рассчитать прибыль</button>
        </div>
        <div class="result" id="profitResult"></div>
    `;

    // Добавляем обработчик событий для кнопки расчета
    document.getElementById('calculateProfitBtn').addEventListener('click', () => {
        const revenue = parseFloat(document.getElementById('revenue').value) || 0;
        const expenses = parseFloat(document.getElementById('expenses').value) || 0;
        const costOfGoods = parseFloat(document.getElementById('cost-of-goods').value) || 0;

        const grossProfit = revenue - costOfGoods;
        const operatingProfit = grossProfit - expenses;

        const profitResult = document.getElementById('profitResult');
        profitResult.innerHTML = `
            <p>Валовая прибыль: <strong>${grossProfit.toFixed(2)} руб</strong></p>
            <p>Операционная прибыль: <strong>${operatingProfit.toFixed(2)} руб</strong></p>
        `;
    });

    calculatorContainer.classList.add('active');
}

// Функция загрузки налогового калькулятора
function loadTaxCalculator() {
    calculatorContainer.innerHTML = `
        <h2>Налоговый калькулятор</h2>
        <div class="form-group">
            <label for="income">Доход (руб):</label>
            <input type="number" id="income" placeholder="Введите доход">
        </div>
        <div class="form-group">
            <label for="tax-rate">Ставка налога (%):</label>
            <input type="number" id="tax-rate" placeholder="Введите ставку налога">
        </div>
        <div class="form-group">
            <button id="calculateTaxBtn">Рассчитать налог</button>
        </div>
        <div class="result" id="taxResult"></div>
    `;

    // Добавляем обработчик событий для кнопки расчета
    document.getElementById('calculateTaxBtn').addEventListener('click', () => {
        const income = parseFloat(document.getElementById('income').value) || 0;
        const taxRate = parseFloat(document.getElementById('tax-rate').value) || 0;

        const tax = (income * taxRate) / 100;

        const taxResult = document.getElementById('taxResult');
        taxResult.innerHTML = `
            <p>Налог: <strong>${tax.toFixed(2)} руб</strong></p>
        `;
    });

    calculatorContainer.classList.add('active');
}
