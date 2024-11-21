document.addEventListener('DOMContentLoaded', () => {
  const createAdBtn = document.getElementById('createAdBtn');
  const analyzeAdBtn = document.getElementById('analyzeAdBtn');
  const viewAdsBtn = document.getElementById('viewAdsBtn');
  const formContainer = document.getElementById('formContainer');
  const analyticsContainer = document.getElementById('analyticsContainer');
  const adsContainer = document.getElementById('adsContainer');
  const adsList = document.getElementById('adsList');
  const noAdsMessage = document.getElementById('noAdsMessage');
  const adSelect = document.getElementById('adSelect');
  const analyticsData = document.getElementById('analyticsData');
  const popularity = document.getElementById('popularity');
  const interested = document.getElementById('interested');
  const profit = document.getElementById('profit');

  let ads = []; // Массив для хранения созданных реклам

  // Переключение между секциями
  createAdBtn.addEventListener('click', () => {
    formContainer.classList.remove('hidden');
    analyticsContainer.classList.add('hidden');
    adsContainer.classList.add('hidden');
  });

  analyzeAdBtn.addEventListener('click', () => {
    analyticsContainer.classList.remove('hidden');
    formContainer.classList.add('hidden');
    adsContainer.classList.add('hidden');
    analyticsData.classList.add('hidden');
  });

  viewAdsBtn.addEventListener('click', () => {
    adsContainer.classList.remove('hidden');
    formContainer.classList.add('hidden');
    analyticsContainer.classList.add('hidden');
    renderAds();
  });

  // Форма создания рекламы
  const adForm = document.getElementById('adForm');
  adForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const adData = {
      title: document.getElementById('adTitle').value,
      location: document.getElementById('adLocation').value,
      budget: document.getElementById('adBudget').value,
      duration: document.getElementById('adDuration').value,
      description: document.getElementById('adDescription').value,
    };
    ads.push(adData);
    alert('Реклама успешно создана!');
    adForm.reset();
    formContainer.classList.add('hidden');
  });

  // Отображение списка реклам
  function renderAds() {
    adsList.innerHTML = '';
    if (ads.length === 0) {
      noAdsMessage.classList.remove('hidden');
    } else {
      noAdsMessage.classList.add('hidden');
      ads.forEach((ad, index) => {
        const li = document.createElement('li');
        li.textContent = `Реклама ${index + 1}: ${ad.title} (Место: ${ad.location}, Бюджет: ${ad.budget}₽, Длительность: ${ad.duration} дней)`;
        adsList.appendChild(li);
      });
    }
  }

  // Обновление аналитики
  adSelect.addEventListener('change', () => {
    const selectedAd = adSelect.value;
    if (selectedAd) {
      const analytics = {
        ad1: { popularity: 85, interested: 1200, profit: 15000 },
        ad2: { popularity: 65, interested: 800, profit: 9000 },
        ad3: { popularity: 95, interested: 1500, profit: 20000 },
      };
      const data = analytics[selectedAd];
      popularity.textContent = data.popularity;
      interested.textContent = data.interested;
      profit.textContent = data.profit;
      analyticsData.classList.remove('hidden');
    } else {
      analyticsData.classList.add('hidden');
    }
  });
});
