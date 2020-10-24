/**
 * Example store structure
 */
// This function conditionally replaces the contents of the <main> tag based on the state of the store

const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What is the material used to freeze Han Solo in <i>The Empire Strikes Back</i>?',
      answers: [
        'Liquid Nitrogen',
        'Adamantium',
        'Coldaviton',
        'Carbonite'
      ],
      correctAnswer: 'Carbonite'
    },
    {
      question: 'In which movie does Bucky Barnes, Steve Rogers’ childhood friend, return from his presumed death?',
      answers: [
        'Captain America: The First Avenger',
        'Avengers: Age of Ultron',
        'Captain America: The Winter Soldier',
        'Avengers: Infinity War'
      ],
      correctAnswer: 'Captain America: The Winter Soldier'
    },
    {
      question: 'What is “Indiana” Jones’ real first name?',
      answers: [
        'Henry',
        'Michael',
        'David',
        'Solomon'
      ],
      correctAnswer: 'Henry'
    },
    {
      question: 'In the movie Blade Runner, what is Rick Deckard tracking?',
      answers: [
        'A Dog',
        'An Accountant',
        'A Replicant',
        'A Drug Dealer'
      ],
      correctAnswer: 'A Replicant'
    },
    {
      question: 'In the Harry Potter universe, what is a horcrux?',
      answers: [
        'An object used to contain a piece of Voldemort’s soul',
        'A library of banned spellbooks',
        'A feast in celebration of a wizard graduating from school',
        'An object a hooker uses to get around if she breaks her leg'
      ],
      correctAnswer: 'An object used to contain a piece of Voldemort’s soul'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

//HTML for the start page with the Start Quiz button
function generateWelcomeString() {
  return `
  <div class="welcome">
    <form>
      <p>Hi there! Thanks for participating! Please click the Start button below to begin the quiz.</p>

      <button type="submit"id="startQuiz" autofocus>Start Quiz</button>
    </form>
  </div>
  `;
}

function generateQuizInterfaceString(questionObject) {
  //console.log(questionObject);
  //console.log(questionObject.questionAnswers);
  return `
    <div class="quiz-interface">
    <p>Question ${questionObject.index} out of ${store.questions.length}</p>
    <p>
      ${questionObject.question.question}
    </p>

    <form>
    <ol type="A">
      ${generateQuizAnswers(questionObject.question.answers)}
    </ol>
    <button type="submit" class="submit-answer">Submit Answer</button>
    </form>
    <p>Score: ${store.score}</p>
  </div>
  `;
}

function generateAnswerResults() {
  let answerArray = store.currentQuestionState.answerArray;

  const buttons = {
    next: ' <button type="submit" class="next-question" autofocus>Next Question</button>',
    results: '<button type="submit" class="see-results" autofocus>See Results</button>'
  };

let correctResponse = '"${answerArray[1]}" is correct!';
let incorrectResponse = '"${answerArray[2]}" is incorrect. The correct answer is <br><br>"${answerArray[1]}"';

let isLastQuestion = (store.questionNumber + 1) === (store.questions.length);

return `
    <div>
    <form>
    <p>${answerArray[0] === true ? correctResponse : incorrectResponse}</p>
    <p> Score: ${store.score}</p>
   ${isLastQuestion ? buttons.results : buttons.next}
    </form>
    </div>
  `;
}

function generateQuizAnswers(answers) {
  let answerArray = [];
  let indexArray = [];
  answers.forEach(answer => {
    answerArray.push(answer);
    indexArray.push(answers.indexOf(answer));
  });
  console.log(indexArray);
  return answerArray.map(answer => stringifyAnswerArray(answer)).join(" ");
}

function stringifyAnswerArray(answer) {
  let questionNumber = store.questionNumber;
  let name = store.questions[questionNumber].answers.indexOf(answer);
  console.log(name);

  return `
  <li>
    <div>
    <input type="radio" name="answer" id="answer-${name}" data-answer="${answer}"></input>
    <label for="answer-${name}"> ${answer}</label>
    </div>
  </li>
    `;
}

function generateQuizResultsString() {
  return `
  <div>
    <p>The end. Thank you for playing.</p>
    <p>You scored ${store.score} out of ${store.questions.length}</p>
  <button class="startOver">Try Again!</button>
  </div>
    `;
}

/********** RENDER FUNCTION(S) **********/

function renderQuiz() {
  if(store.quizStarted === false) {
    if(store.questionNumber === store.questionNumber.length) {
    const quizResultsString = generateQuizResultsString();
    const finalImage = generateImage();
    $("main").html(quizResultsString);
  }
  else {
    const quizWelcomeInterfaceString = generateWelcomeString();
    $("main").html(quizWelcomeInterfaceString);
  }
}
  else if (store.quizStarted === true) {
    if(store.submittingAnswer === false) {
      const quizInterfaceString = generateQuizInterfaceString(currentQuestion());
      $("main").html(quizInterfaceString);
    }
    else if(store.submittingAnswer === true) {
      const quizAnswerResponseString = generateAnswerResults();
      $("main").html(quizAnswerResponseString);
    }
  }
}

//Changes state of quiz to quizStarted === true
function startQuiz() {
  console.log("Here we go!");
  store.quizStarted = true;
}

//Current question
function currentQuestion() {
  let index = store.questionNumber;
  let questionObject = store.questions[index];
  return {
    index: index +1,
    question: questionObject
  };
}

//Move to the next question
function nextQuestion() {
  if (store.questionNumber < store.questions.length) {
    store.questionNumber++;
    store.submittingAnswer = false;
    console.log(store.questionNumber);
  }
  else if (store.questionNumber === store.questions.length) {
    store.quizStarted = false;
  }
}

function validateCorrectAnswer() {
  let radios = $("input:radio[name=answer]");
  let selectedAnswer = $('input[name="answer"]:checked').data("answer");
  let questionNumber = store.questionNumber;
  let questionAnswer = store.questions[questionNumber].correctAnswer;

  if (radios.filter(':checked').length === 0) {
    alert('Please choose an answer');
    return;
    }
    else {
      store.submittingAnswer = true;
      if(selectedAnswer === correctAnswer) {   
        store.score += 20;
        store.currentQuestionState.answerArray = [true, correctAnswer, selectedAnswer];
    }
    else {
      store.currentQuestionState.answerArray = [false, correctAnswer, selectedAnswer];
    }
  }
}

function seeResults() {
  store.quizStarted = false;
  store.questionNumber ++;
}

function restartQuiz() {
  store.quizStarted = false;
  store.questionNumber = 0;
  store.submittingAnswer = false;
  store.currentQuestionState.answerArray = [];
}


/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
//This is where you start to flesh out what each event does
function handleQuizBeginSubmit() {
  $('main').on('click', '#startQuiz', (event) =>{
    event.preventDefault();
    startQuiz();
    renderQuiz();
  });
}

function handleSubmitAnswer() {
  $('main').on('click', '.submit-answer', (event) =>{
    event.preventDefault();
    console.log('Submitting Your Answer');
    validateCorrectAnswer();
    renderQuiz();
  });
}

function handleNextQuestionSubmit() {
  $('main').on('click', '.next-question', (event) =>{
    event.preventDefault();
    nextQuestion();
    renderQuiz();
  });
}

function handleSeeResultsSubmit() {
  $('main').on('click', '.see-results', (event) =>{
    event.preventDefault();
    seeResults();
    renderQuiz();
  });
}

function handleRestartQuizSubmit() {
  $('main').on('click', '.restart-quiz', (event) =>{
    event.preventDefault();
    restartQuiz();
    renderQuiz();
  });
}

//This handles loading everything at the beginning of the page load
//This is where you begin mapping you plan for the page
function handleQuiz() {
  renderQuiz();
  handleQuizBeginSubmit();
  handleNextQuestionSubmit();
  handleRestartQuizSubmit();
  handleSeeResultsSubmit();
}

$(handleQuiz);