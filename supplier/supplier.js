const supplierForm = document.getElementById('supplierForm');
const supplierList = document.getElementById('supplierList');
const existingSuppliers = document.getElementById('existingSuppliers');
const newSupplierForm = document.getElementById('newSupplierForm');

// Показать форму для регистрации поставщика
function showForm() {
    supplierForm.classList.remove('hidden');
    supplierList.classList.add('hidden');
}

// Показать список поставщиков
function showSuppliers() {
    supplierList.classList.remove('hidden');
    supplierForm.classList.add('hidden');
    fetchSuppliers();
}

// Загрузить поставщиков из базы данных
// Загрузить поставщиков из базы данных
function fetchSuppliers() {
    fetch('/api/suppliers')
        .then(response => response.json())
        .then(data => {
            existingSuppliers.innerHTML = '';
            const noSuppliersMessage = document.getElementById('noSuppliersMessage');
            
            if (data.length === 0) {
                // Если нет поставщиков, показать сообщение
                noSuppliersMessage.classList.remove('hidden');
            } else {
                // Если поставщики есть, отобразить их
                noSuppliersMessage.classList.add('hidden');
                data.forEach((supplier) => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span>
                            <img src="${supplier.avatar || '/default-avatar.png'}" alt="Avatar" width="50" style="margin-right:10px;">
                            <strong>${supplier.name}</strong> — ${supplier.product}
                        </span>
                        <button class="button" onclick="addSupplier(${supplier.id})">+</button>
                    `;
                    existingSuppliers.appendChild(li);
                });
            }
        });
}



// Добавить нового поставщика
newSupplierForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(newSupplierForm);
    fetch('/api/suppliers', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(() => {
            alert('Поставщик добавлен!');
            newSupplierForm.reset();
        });
});

// Добавить поставщика в "своих поставщиков"
function addSupplier(supplierId) {
    alert(`Вы добавили поставщика с ID: ${supplierId}`);
}
