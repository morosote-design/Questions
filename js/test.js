
// Banco de 10 preguntas evaluativas tipo test
const TEST_QUESTIONS = [
  {
    q: "You are at a cafe in New York and want to know the cost of an espresso. What do you ask?",
    options: ["How many is the espresso?", "How much does the espresso cost?", "How long is the espresso?", "How far is the espresso?"],
    correct: 1,
    explain: "Price is always asked with 'How much'."
  },
  {
    q: "You want to find out a colleague's age politely. What is the standard phrase?",
    options: ["How many years do you have?", "How old are you?", "How long are you?", "How high are you?"],
    correct: 1,
    explain: "In English we use 'How old are you?' with the verb to be."
  },
  {
    q: "You are planning a road trip from Toronto to Montreal and need to know the kilometers. What do you ask?",
    options: ["How far is Montreal from Toronto?", "How long is the road distance?", "How wide is Montreal?", "How fast is Montreal?"],
    correct: 0,
    explain: "Distance between geographical places is asked with 'How far'."
  },
  {
    q: "A friend says they go swimming regularly. You want to know the routine (daily, weekly, etc.). What do you ask?",
    options: ["How much do you swim?", "How long do you swim?", "How often do you swim?", "How high do you swim?"],
    correct: 2,
    explain: "'How often' asks for frequency of an action."
  },
  {
    q: "You need to know if your suitcase exceeds the airline's 23 kg limit. What question fits best?",
    options: ["How heavy is this suitcase?", "How deep is this suitcase?", "How tall is the weight?", "How much suitcase is there?"],
    correct: 0,
    explain: "'How heavy' asks directly about weight."
  },
  {
    q: "You are at a swimming pool with your child and want to check safety in the water. What do you ask?",
    options: ["How long is the water?", "How deep is this pool?", "How wide does it swim?", "How high is the water floor?"],
    correct: 1,
    explain: "'How deep' is used to measure vertical water depth."
  },
  {
    q: "You are watching a sports car test on a track. You want to know its maximum speed capability. What do you ask?",
    options: ["How fast can this car go?", "How often can the car drive?", "How heavy does the car move?", "How far does the engine cost?"],
    correct: 0,
    explain: "'How fast' asks about velocity and speed."
  },
  {
    q: "You are baking cookies and need to check the recipe for the quantity of chocolate chips. What do you ask?",
    options: ["How much chocolate chips do we need?", "How many chocolate chips do we need?", "How far chocolate chips are there?", "How long chocolate chips?"],
    correct: 1,
    explain: "Chocolate chips are individual countable items in plural -> 'How many'."
  },
  {
    q: "You are buying a new sofa and need to know if it can pass through the front entrance door. What do you ask?",
    options: ["How deep is the door frame?", "How wide is the doorway?", "How far is the door?", "How heavy is the entry?"],
    correct: 1,
    explain: "'How wide' measures horizontal width."
  },
  {
    q: "You are attending an English lecture and want to know when it finishes. What do you ask?",
    options: ["How often is this lecture?", "How long is this lecture?", "How tall does the lecture last?", "How many does the class take?"],
    correct: 1,
    explain: "'How long' asks for duration in time."
  }
];

function renderTest() {
  const container = document.getElementById('test-questions-list');
  if (!container) return;

  container.innerHTML = TEST_QUESTIONS.map((item, qIdx) => `
    <div class="test-q-box" id="test-q-${qIdx}">
      <p style="font-weight:700; font-size:1.05rem; margin-bottom:0.75rem; color:#f8fafc;">
        ${qIdx + 1}. ${item.q}
      </p>
      <div class="test-options">
        ${item.options.map((opt, optIdx) => `
          <label class="test-opt-label">
            <input type="radio" name="test-choice-${qIdx}" value="${optIdx}">
            <span>${opt}</span>
          </label>
        `).join('')}
      </div>
      <div id="test-explain-${qIdx}" style="display:none; margin-top:0.6rem; font-size:0.9rem; padding:0.5rem 0.8rem; border-radius:6px;"></div>
    </div>
  `).join('');
}

function submitTest() {
  let score = 0;
  let answeredCount = 0;

  TEST_QUESTIONS.forEach((item, qIdx) => {
    const selected = document.querySelector(`input[name="test-choice-${qIdx}"]:checked`);
    const expBox = document.getElementById(`test-explain-${qIdx}`);
    expBox.style.display = 'block';

    if (selected) {
      answeredCount++;
      const val = parseInt(selected.value, 10);
      if (val === item.correct) {
        score++;
        expBox.style.background = 'rgba(16, 185, 129, 0.15)';
        expBox.style.color = '#34d399';
        expBox.innerHTML = `✅ <strong>Correct!</strong> ${item.explain}`;
      } else {
        expBox.style.background = 'rgba(239, 68, 68, 0.15)';
        expBox.style.color = '#f87171';
        expBox.innerHTML = `❌ <strong>Incorrect.</strong> Correct answer: "${item.options[item.correct]}". ${item.explain}`;
      }
    } else {
      expBox.style.background = 'rgba(239, 68, 68, 0.15)';
      expBox.style.color = '#f87171';
      expBox.innerHTML = `⚠️ Sin responder. Respuesta correcta: "${item.options[item.correct]}".`;
    }
  });

  const panel = document.getElementById('test-results-panel');
  panel.style.display = 'block';

  const percentage = Math.round((score / TEST_QUESTIONS.length) * 100);
  let badge = percentage >= 80 ? '🎉 ¡Excelente Dominio!' : percentage >= 60 ? '👍 Buen intento, puedes repasar un poco más' : '📖 Te recomendamos repasar la teoría';

  panel.innerHTML = `
    <h3 style="font-size: 1.6rem; margin-bottom: 0.5rem; color:#fff;">Puntuación: ${score} / ${TEST_QUESTIONS.length} (${percentage}%)</h3>
    <p style="font-size:1.1rem; color:#38bdf8; font-weight:600;">${badge}</p>
    <p style="color:#94a3b8; font-size:0.92rem; margin-top:0.5rem;">Has respondido ${answeredCount} de ${TEST_QUESTIONS.length} preguntas.</p>
  `;

  panel.scrollIntoView({ behavior: 'smooth' });
}
