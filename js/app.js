
// Control general de la aplicación
window.currentLanguage = 'es';

function selectLanguage(langCode) {
  window.currentLanguage = langCode;
  
  // Ocultar pantalla de selección y mostrar el curso
  document.getElementById('screen-language').style.display = 'none';
  document.getElementById('screen-course').style.display = 'flex';

  // Aplicar traducciones
  applyTranslations(langCode);

  // Renderizar componentes interactivos
  renderExercises();
  renderTest();

  // Scroll arriba
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function changeLangScreen() {
  document.getElementById('screen-course').style.display = 'none';
  document.getElementById('screen-language').style.display = 'flex';
}

function switchTab(tabId) {
  // Manejo de botones activos
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-view').forEach(view => view.classList.remove('active'));

  if (tabId === 'theory') {
    document.getElementById('t-tab-theory').classList.add('active');
    document.getElementById('view-theory').classList.add('active');
  } else if (tabId === 'exercises') {
    document.getElementById('t-tab-exercises').classList.add('active');
    document.getElementById('view-exercises').classList.add('active');
  } else if (tabId === 'test') {
    document.getElementById('t-tab-test').classList.add('active');
    document.getElementById('view-test').classList.add('active');
  }
}

function applyTranslations(lang) {
  const data = I18N[lang] || I18N.es;

  // Header y botones
  document.getElementById('current-lang-code').textContent = data.code;
  document.getElementById('t-header-title').textContent = data.title;
  document.getElementById('t-tab-theory').textContent = data.tabs.theory;
  document.getElementById('t-tab-exercises').textContent = data.tabs.exercises;
  document.getElementById('t-tab-test').textContent = data.tabs.test;

  // Banner
  document.getElementById('t-hero-title').textContent = data.title;
  document.getElementById('t-hero-sub').textContent = data.heroSub;

  // Títulos de secciones
  document.getElementById('t-sec1-title').textContent = data.summaryTitle;
  document.getElementById('t-th-meaning').textContent = data.thMeaning;
  document.getElementById('t-th-example').textContent = data.thExample;
  document.getElementById('t-sec2-title').textContent = data.structuresTitle;
  document.getElementById('t-sec-errors-title').textContent = data.errorsTitle;
  document.getElementById('t-th-reason').textContent = data.thReason;

  // Vistas de ejercicios y tests
  document.getElementById('t-ex-title').textContent = data.exTitle;
  document.getElementById('t-ex-subtitle').textContent = data.exSubtitle;
  document.getElementById('t-btn-check-all').textContent = data.btnCheckAll;
  document.getElementById('t-btn-reset').textContent = data.btnReset;
  document.getElementById('t-test-title').textContent = data.testTitle;
  document.getElementById('t-test-sub').textContent = data.testSub;
  document.getElementById('t-btn-submit-test').textContent = data.btnSubmitTest;

  // Poblar tabla resumen
  const tableSummary = document.getElementById('table-summary-body');
  tableSummary.innerHTML = data.items.map(item => `
    <tr>
      <td><span class="en-chip">${item.exp}</span></td>
      <td>${item.asks}</td>
      <td><em>${item.eg}</em></td>
    </tr>
  `).join('');

  // Poblar tabla de errores
  const tableErrors = document.getElementById('table-errors-body');
  tableErrors.innerHTML = data.errors.map(err => `
    <tr>
      <td style="color: #f87171; font-weight:600;">${err.bad}</td>
      <td style="color: #34d399; font-weight:600;">${err.good}</td>
      <td style="color: #cbd5e1;">${err.why}</td>
    </tr>
  `).join('');

  // Generar tarjetas explicativas completas para cada How
  const lessonsContainer = document.getElementById('lessons-detail-container');
  lessonsContainer.innerHTML = data.items.map((item, i) => `
    <div class="card">
      <h2>${i + 3}. <span class="en-chip">${item.exp}</span> — ${item.asks}</h2>
      <p style="color: #cbd5e1; margin-bottom: 0.8rem;">
        Se utiliza primordialmente para indagar sobre <strong>${item.asks.toLowerCase()}</strong>.
      </p>
      <div class="structure-box">
        <h3>Ejemplo de uso práctico:</h3>
        <code>${item.eg}</code>
      </div>
    </div>
  `).join('');
}
