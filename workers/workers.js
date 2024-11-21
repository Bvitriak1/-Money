document.addEventListener("DOMContentLoaded", () => {
    // Элементы для формы работников
    const becomeWorkerBtn = document.getElementById("become-worker");
    const findWorkerBtn = document.getElementById("find-worker");
    const becomeWorkerForm = document.getElementById("become-worker-form");
    const findWorkerSection = document.getElementById("find-worker-section");
    const myWorkersSection = document.getElementById("my-workers-section");
    const workersList = document.getElementById("workers-list");
    const myWorkersList = document.getElementById("my-workers");
    const workerForm = document.getElementById("workerForm");
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");

    // Элементы для работы с поставщиками
    const findSupplierSection = document.getElementById("find-supplier-section");
    const supplierList = document.getElementById("supplier-list");
    const searchSupplierInput = document.getElementById('search-supplier-input');
    const searchSupplierBtn = document.getElementById('search-supplier-btn');
    const suppliersNotFoundMessage = document.getElementById('suppliers-not-found-message');

    // Данные
    const workers = [];
    const myWorkers = [];
    const suppliers = [
        { name: 'Поставщик 1', product: 'Продукт A' },
        { name: 'Поставщик 2', product: 'Продукт B' },
        { name: 'Поставщик 3', product: 'Продукт C' },
        { name: 'Поставщик 4', product: 'Продукт D' }
    ]; // Пример данных о поставщиках

    // Показать/скрыть формы для работников
    becomeWorkerBtn.addEventListener("click", () => {
        becomeWorkerForm.classList.toggle("hidden");
        findWorkerSection.classList.add("hidden");
        findSupplierSection.classList.add("hidden");
    });

    findWorkerBtn.addEventListener("click", () => {
        findWorkerSection.classList.toggle("hidden");
        becomeWorkerForm.classList.add("hidden");
        findSupplierSection.classList.add("hidden");
    });
    

    document.querySelector(".buttons").appendChild(findSupplierBtn);

    // Добавление работника
    workerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const contact = document.getElementById("contact").value.trim();
        const description = document.getElementById("description").value.trim();

        if (name && contact && description) {
            workers.push({ name, contact, description });
            alert("Работник успешно добавлен!");
            workerForm.reset();
            updateWorkerList();
        } else {
            alert("Пожалуйста, заполните все поля!");
        }
    });

    // Обновление списка работников
    function updateWorkerList() {
        workersList.innerHTML = "";
        workers.forEach((worker, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${worker.name} - ${worker.description}</span>
                <button onclick="addToMyWorkers(${index})">Добавить</button>
            `;
            workersList.appendChild(li);
        });
    }

    // Добавление работника в "Мои работники"
    window.addToMyWorkers = (index) => {
        const worker = workers[index];
        if (!myWorkers.includes(worker)) {
            myWorkers.push(worker);
            updateMyWorkersList();
        } else {
            alert("Этот работник уже добавлен!");
        }
    };

    // Обновление списка "Мои работники"
    function updateMyWorkersList() {
        myWorkersSection.classList.remove("hidden");
        myWorkersList.innerHTML = "";
        myWorkers.forEach((worker, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${worker.name} - ${worker.description}</span>
                <button onclick="messageWorker(${index})">Написать</button>
                <button onclick="removeWorker(${index})">Уволить</button>
            `;
            myWorkersList.appendChild(li);
        });
    }

    // Написать работнику (перенаправление или alert)
    window.messageWorker = (index) => {
        alert(`Написать сообщение: ${myWorkers[index].name}`);
    };

    // Удаление работника из "Мои работники"
    window.removeWorker = (index) => {
        myWorkers.splice(index, 1);
        updateMyWorkersList();
    };

    // Поиск работников
    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.trim().toLowerCase();
        workersList.innerHTML = ""; // Очистить список
        const filteredWorkers = workers.filter((worker) =>
            worker.name.toLowerCase().includes(query)
        );

        if (filteredWorkers.length === 0) {
            workersList.innerHTML = "<li>Человек не найден</li>";
        } else {
            filteredWorkers.forEach((worker, index) => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <span>${worker.name} - ${worker.description}</span>
                    <button onclick="addToMyWorkers(${workers.indexOf(worker)})">Добавить</button>
                `;
                workersList.appendChild(li);
            });
        }
    });

    // Реализация поиска при вводе текста (опционально, для динамического поиска)
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();
        workersList.innerHTML = ""; // Очистить список
        const filteredWorkers = workers.filter((worker) =>
            worker.name.toLowerCase().includes(query)
        );

        if (filteredWorkers.length === 0) {
            workersList.innerHTML = "<li>Человек не найден</li>";
        } else {
            filteredWorkers.forEach((worker, index) => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <span>${worker.name} - ${worker.description}</span>
                    <button onclick="addToMyWorkers(${workers.indexOf(worker)})">Добавить</button>
                `;
                workersList.appendChild(li);
            });
        }
    });

    // Поиск поставщиков
    searchSupplierBtn.addEventListener("click", () => {
        const query = searchSupplierInput.value.trim().toLowerCase();
        supplierList.innerHTML = ""; // Очистить список
        const filteredSuppliers = suppliers.filter((supplier) =>
            supplier.name.toLowerCase().includes(query)
        );

        if (filteredSuppliers.length === 0) {
            suppliersNotFoundMessage.classList.remove('hidden');
            setTimeout(() => {
                suppliersNotFoundMessage.classList.add('hidden');
            }, 3000); // Скрыть сообщение через 3 секунды
        } else {
            suppliersNotFoundMessage.classList.add('hidden');
            filteredSuppliers.forEach((supplier) => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <span>${supplier.name} — ${supplier.product}</span>
                `;
                supplierList.appendChild(li);
            });
        }
    });
});
