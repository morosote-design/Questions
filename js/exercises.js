
// 20 Ejercicios prácticos con validación normalizada
const EXERCISE_DATA = [
  { id: 1, sentence: "_____ does this coffee cost?", answers: ["how much"], hint: "Price / Precio", why: "How much se usa para preguntar precios." },
  { id: 2, sentence: "_____ eggs do we need for the cake?", answers: ["how many"], hint: "Countable units / Unidades contables", why: "Eggs es un sustantivo plural contable." },
  { id: 3, sentence: "_____ is it from your house to the school?", answers: ["how far"], hint: "Distance / Distancia", why: "How far pregunta la distancia entre dos puntos." },
  { id: 4, sentence: "_____ does the movie last?", answers: ["how long"], hint: "Duration / Duración", why: "How long pregunta por duración de tiempo." },
  { id: 5, sentence: "_____ are you? (I am 1.80 meters)", answers: ["how tall"], hint: "Personal height / Estatura", why: "How tall se utiliza para la estatura de personas." },
  { id: 6, sentence: "_____ is Mount Everest?", answers: ["how high"], hint: "Mountain elevation / Altitud", why: "How high se usa para elevación geográfica o altitudes." },
  { id: 7, sentence: "_____ do you go to the gym per week?", answers: ["how often"], hint: "Frequency / Frecuencia", why: "How often pregunta con qué frecuencia se realiza una actividad." },
  { id: 8, sentence: "_____ is your sister? (She is 24)", answers: ["how old"], hint: "Age / Edad", why: "How old es la fórmula natural en inglés para la edad." },
  { id: 9, sentence: "_____ can a cheetah run?", answers: ["how fast"], hint: "Speed / Velocidad", why: "How fast indaga sobre la velocidad de desplazamiento." },
  { id: 10, sentence: "_____ is this river at its widest point?", answers: ["how wide"], hint: "Width / Anchura", why: "How wide indaga sobre el ancho de una superficie." },
  { id: 11, sentence: "_____ is the swimming pool in the deep end?", answers: ["how deep"], hint: "Depth / Profundidad", why: "How deep indaga sobre la profundidad." },
  { id: 12, sentence: "_____ is your backpack with the laptop inside?", answers: ["how heavy"], hint: "Weight / Peso", why: "How heavy pregunta por el peso en kg/libras." },
  { id: 13, sentence: "_____ water do you drink every day?", answers: ["how much"], hint: "Uncountable liquid / Líquido incontable", why: "El agua (water) es incontable: How much." },
  { id: 14, sentence: "_____ times a week do you study English?", answers: ["how many"], hint: "Countable times / Veces contables", why: "Las veces (times) se cuentan: How many times." },
  { id: 15, sentence: "_____ have you lived in this city?", answers: ["how long"], hint: "Time span / Periodo de tiempo", why: "Indica duración de una condición o residencia." },
  { id: 16, sentence: "_____ does the subway train arrive?", answers: ["how often"], hint: "Schedule frequency / Intervalo", why: "Pregunta el intervalo de tiempo entre trenes." },
  { id: 17, sentence: "_____ money did you save this month?", answers: ["how much"], hint: "Uncountable money", why: "Money nunca se pluraliza como sustantivo contable ordinario." },
  { id: 18, sentence: "_____ is that modern skyscraper?", answers: ["how tall", "how high"], hint: "Building height", why: "Para rascacielos se acepta tanto How tall (altura arquitectónica) como How high." },
  { id: 19, sentence: "_____ is the hole in the garden?", answers: ["how deep"], hint: "Vertical depth", why: "How deep es lo indicado para hoyos, pozos y zanjas." },
  { id: 20, sentence: "_____ people attended the conference yesterday?", answers: ["how many"], hint: "People plural", why: "People es el plural de person y se cuenta en unidades: How many." }
];

function renderExercises() {
  const container = document.getElementById('exercises-list');
  if (!container) return;

  const currentLang = window.currentLanguage || 'es';
  const langObj = I18N[currentLang] || I18N.es;

  container.innerHTML = EXERCISE_DATA.map((item, idx) => `
    <div class="ex-card" id="ex-card-${idx}">
      <label class="ex-question-label" for="ex-input-${idx}">
        ${idx + 1}. ${item.sentence} <span style="font-size:0.85rem; color:#94a3b8;">(${item.hint})</span>
      </label>
      <div class="ex-input-row">
        <input type="text" id="ex-input-${idx}" class="ex-input" placeholder="Type here (e.g. How much)..." autocomplete="off" />
        <button class="btn btn-secondary" onclick="checkSingleExercise(${idx})">${langObj.btnCheckSingle}</button>
      </div>
      <div class="ex-feedback" id="ex-feedback-${idx}"></div>
    </div>
  `).join('');
}

function normalizeStr(str) {
  return str.trim().toLowerCase().replace(/[?!.,]/g, '').replace(/\s+/g, ' ');
}

function checkSingleExercise(idx) {
  const inputEl = document.getElementById(`ex-input-${idx}`);
  const feedbackEl = document.getElementById(`ex-feedback-${idx}`);
  const data = EXERCISE_DATA[idx];
  const userVal = normalizeStr(inputEl.value);

  if (!userVal) {
    feedbackEl.className = 'ex-feedback incorrect';
    feedbackEl.textContent = '⚠️ Escribe una respuesta antes de comprobar.';
    return false;
  }

  const isOk = data.answers.includes(userVal);
  if (isOk) {
    feedbackEl.className = 'ex-feedback correct';
    feedbackEl.innerHTML = `✅ <strong>Correct!</strong> ${data.why}`;
    return true;
  } else {
    feedbackEl.className = 'ex-feedback incorrect';
    feedbackEl.innerHTML = `❌ <strong>Answer:</strong> ${data.answers[0]}. ${data.why}`;
    return false;
  }
}

function checkAllExercises() {
  let score = 0;
  EXERCISE_DATA.forEach((_, idx) => {
    if (checkSingleExercise(idx)) score++;
  });

  const scoreBox = document.getElementById('exercise-score-box');
  scoreBox.style.display = 'block';
  scoreBox.innerHTML = `🎯 <strong>Resultado:</strong> ${score} de ${EXERCISE_DATA.length} correctas (${Math.round(score/EXERCISE_DATA.length * 100)}%).`;
}

function resetExercises() {
  EXERCISE_DATA.forEach((_, idx) => {
    const input = document.getElementById(`ex-input-${idx}`);
    const feedback = document.getElementById(`ex-feedback-${idx}`);
    if (input) input.value = '';
    if (feedback) {
      feedback.textContent = '';
      feedback.className = 'ex-feedback';
      feedback.style.display = 'none';
    }
  });
  const scoreBox = document.getElementById('exercise-score-box');
  if (scoreBox) scoreBox.style.display = 'none';
}
