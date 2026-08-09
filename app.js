let vocabsData = [];
let examsData = [];
let currentLang = 'ja';
let currentCardIndex = 0;
let currentExamQuestions = [];
let currentQuestionIndex = 0;

const speechLangMap = {
  ja: 'ja-JP', ko: 'ko-KR', en: 'en-US',
  fr: 'fr-FR', de: 'de-DE', es: 'es-ES'
};

async function init() {
  try {
    const vRes = await fetch('data/basic_vocabs.json');
    const vData = await vRes.json();
    vocabsData = vData.categories;

    const eRes = await fetch('data/exam_questions.json');
    const eData = await eRes.json();
    examsData = eData.exams;

    setupEvents();
    renderVocab();
  } catch (err) {
    console.error("資料載入失敗：", err);
  }
}

function setupEvents() {
  document.getElementById('lang-select').addEventListener('change', (e) => {
    currentLang = e.target.value;
    currentCardIndex = 0;
    currentQuestionIndex = 0;
    renderVocab();
    renderExam();
  });

  document.getElementById('tab-vocab').onclick = () => switchTab('vocab');
  document.getElementById('tab-exam').onclick = () => { switchTab('exam'); renderExam(); };

  document.getElementById('btn-toggle').onclick = () => {
    document.getElementById('card-translation').classList.toggle('hidden');
    document.getElementById('card-example').classList.toggle('hidden');
  };

  document.getElementById('btn-next-vocab').onclick = () => {
    const cards = getCardsByLang();
    if (cards.length > 0) {
      currentCardIndex = (currentCardIndex + 1) % cards.length;
      renderVocab();
    }
  };

  document.getElementById('btn-speak').onclick = () => {
    const cards = getCardsByLang();
    if (cards.length > 0) {
      speakText(cards[currentCardIndex].word, currentLang);
    }
  };
}

function switchTab(tab) {
  document.getElementById('tab-vocab').classList.toggle('active', tab === 'vocab');
  document.getElementById('tab-exam').classList.toggle('active', tab === 'exam');
  document.getElementById('vocab-section').classList.toggle('hidden', tab !== 'vocab');
  document.getElementById('exam-section').classList.toggle('hidden', tab !== 'exam');
}

function getCardsByLang() {
  const cat = vocabsData.find(item => item.lang_code === currentLang);
  return cat ? cat.cards : [];
}

function renderVocab() {
  const cards = getCardsByLang();
  if (!cards.length) return;
  const card = cards[currentCardIndex];
  document.getElementById('card-word').innerText = card.word;
  document.getElementById('card-phonetic').innerText = card.phonetic || '';
  document.getElementById('card-translation').innerText = card.translation;
  document.getElementById('card-translation').classList.add('hidden');
  document.getElementById('card-example').innerText = "例句：" + card.example;
  document.getElementById('card-example').classList.add('hidden');
}

function renderExam() {
  const exam = examsData.find(item => item.lang_code === currentLang);
  if (!exam || !exam.questions.length) return;

  currentExamQuestions = exam.questions;
  const q = currentExamQuestions[currentQuestionIndex];

  document.getElementById('exam-badge').innerText = `${exam.exam_name} (${exam.level})`;
  document.getElementById('quiz-question').innerText = `Q${currentQuestionIndex + 1}. ${q.question}`;
  document.getElementById('quiz-feedback').innerHTML = '';

  const optsContainer = document.getElementById('quiz-options');
  optsContainer.innerHTML = '';

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(idx, q.answer, q.explanation, btn);
    optsContainer.appendChild(btn);
  });
}

function checkAnswer(selected, correct, explanation, btn) {
  const allBtns = document.querySelectorAll('.option-btn');
  allBtns.forEach(b => b.disabled = true);

  if (selected === correct) {
    btn.classList.add('correct');
  } else {
    btn.classList.add('wrong');
    allBtns[correct].classList.add('correct');
  }

  const feedback = document.getElementById('quiz-feedback');
  feedback.innerHTML = `<strong>解析：</strong> ${explanation}<br><br><button id="btn-next-quiz" style="padding:8px 16px; background:#007bff; color:white; border:none; border-radius:4px; cursor:pointer;">下一題 ➡️</button>`;

  document.getElementById('btn-next-quiz').onclick = () => {
    currentQuestionIndex = (currentQuestionIndex + 1) % currentExamQuestions.length;
    renderExam();
  };
}

function speakText(text, langCode) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = speechLangMap[langCode] || 'en-US';
    window.speechSynthesis.speak(utterance);
  }
}

window.onload = init;
