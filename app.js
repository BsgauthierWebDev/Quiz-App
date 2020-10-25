/**
 * Example store structure
 */
// This function conditionally replaces the contents of the <main> tag based on the state of the store

const store = {
  // 5 or more questions are required
  //This is the array of objects in the STORE containing the questions and answers for the quiz
  questions: [
    { // Question 1
      //Question
      question: 'What is the material used to freeze Han Solo in <i>The Empire Strikes Back</i>?',
      //The array of possible answers
      answers: [
        'Liquid Nitrogen',
        'Adamantium',
        'Coldaviton',
        'Carbonite'
      ],
      //The correct answer
      correctAnswer: 'Carbonite'
    },
    { // Question 2
      question: 'In which movie does Bucky Barnes, Steve Rogers’ childhood friend, return from his presumed death?',
      answers: [
        '<i>Captain America: The First Avenger</i>',
        '<i>Avengers: Age of Ultron</i>',
        '<i>Captain America: The Winter Soldier</i>',
        '<i>Avengers: Infinity War</i>'
      ],
      correctAnswer: '<i>Captain America: The Winter Soldier</i>'
    },
    { // Question 3
      question: 'What is “Indiana” Jones’ real first name?',
      answers: [
        'Henry',
        'Michael',
        'David',
        'Solomon'
      ],
      correctAnswer: 'Henry'
    },
    { // Question 4
      question: 'In the movie Blade Runner, what is Rick Deckard tracking?',
      answers: [
        'A Drug Dealer',
        'An Accountant',
        'A Dog',
        'A Replicant'
      ],
      correctAnswer: 'A Replicant'
    },
    { // Question 5
      question: 'In the Harry Potter universe, what is a horcrux?',
      answers: [
        'An object used to contain a piece of Voldemort’s soul',
        'A library of banned spellbooks',
        'A feast in celebration of a wizard graduating from school',
        'An object a hooker uses to get around after breaking her leg'
      ],
      correctAnswer: 'An object used to contain a piece of Voldemort’s soul'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  submittingAnswer: false,
  score: 0,

  currentQuestionState: {
    answerArray: []
  }
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

//This function creates the HTML for the start page with the Start Quiz button
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

//This generates the HTML interface with the user
function generateQuizInterfaceString(questionObject) {
    //The user sees the question number, the question itself, the array of possible answers
    //And the button to submit the user's answer
    //Once the answer is submitted, the score is compiled and added to the STORE
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

//This function displays the results of the user's answer
function generateAnswerResults(){
  let answerArray = store.currentQuestionState.answerArray;
  //These are the two buttons to be used for this page, based on whether the quiz is "started"
  const buttons = {
    next: ' <button type="submit" class="next-question" autofocus>Next Question</button>',
    results: '<button type="submit" class="see-results" autofocus>See Results</button>'
  };
  //The two possible responses for the answer results, based on whether the answer is correct
  let correctResponse = `"${answerArray[1]}" is correct`;
  let incorrectResponse = `Sorry, ${answerArray[2]} is not correct. The correct answer is<br><br>
  "${answerArray[1]}"`;
  //Determines if the final question has been answered
  let isLastQuestion = (store.questionNumber + 1) === (store.questions.length);
  //Returns the appropriate text, based on the factors above, and displays
  //If the answer was correct, the current score and the appropriate button
  //To move along in the quiz

  return `
    <div class="answer-response">
    <form>
    <p>${answerArray[0] === true ? correctResponse : incorrectResponse}</p>
    <p> Score: ${store.score}</p>
   ${isLastQuestion ? buttons.results : buttons.next}
    </form>
    </div>
  `;
}

//This takes the array of answers in the STORE
function generateQuizAnswers(answers){
  let answerArray = [];
  let indexArray = [];
  answers.forEach(answer => {
    answerArray.push(answer);
    indexArray.push(answers.indexOf(answer));
  });
  console.log(indexArray);
  //And pushes them to the stringify function below
  return answerArray.map(answer => stringifyAnswerArray(answer)).join('');
}

//This creates a string of the quiz answers
function stringifyAnswerArray(answer){
  let questionNumber = store.questionNumber;
  let name = store.questions[questionNumber].answers.indexOf(answer);
  console.log(name);
//And displays them on the page as selectable multiple choice options
  return `
    <li>
      <div class="answer-container">
      <input type="radio" name="answer" id="answer-${name}" data-answer="${answer}">
      <label for="answer-${name}"> ${answer}</label>
     
      </div>
    </li>
  `;
}

//This function generates and displays the final results of the quiz
function generateQuizResultsString() {
  return `
    <div class='quiz-results'>
      <p>
       Congratulations, you finished!
      </p>
      <p>
        You scored ${store.score} out of ${store.questions.length * 20}!
      </p>  
      <p>
        To try again, click the Restart Quiz button below.
      </p>          
      <button class="restart-quiz">Restart Quiz</button>      
    </div>   
`;
}



/********** RENDER FUNCTION(S) **********/
//This renders the quiz on the page based on which stage the user is in
function renderQuiz() {
  //This renders the results of the quiz if the user has completed
  if(store.quizStarted === false) {
    if(store.questionNumber === store.questions.length) {
    const quizResultsString = generateQuizResultsString();
    $("main").html(quizResultsString);
  }
  //This renders the start page
  else {
    const quizWelcomeInterfaceString = generateWelcomeString();
    $("main").html(quizWelcomeInterfaceString);
  }
}
//This renders the current question
  else if (store.quizStarted === true) {
    if(store.submittingAnswer === false) {
      const quizInterfaceString = generateQuizInterfaceString(currentQuestion());
      $("main").html(quizInterfaceString);
    }
    //This renders the current answer result
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

//Displays the current question object
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
  //If the last question has been answered, it changes the quiz to completed, or "started = false"
  else if (store.questionNumber === store.questions.length) {
    store.quizStarted = false;
  }
}

//First aligns the question item and answer array with the place in the quiz
function validateCorrectAnswer() {
  let radios = $('input:radio[name=answer]');
  let selectedAnswer = $('input[name="answer"]:checked').data('answer');
  let questionNumber = store.questionNumber;
  let correctAnswer = store.questions[questionNumber].correctAnswer;
//Then checks to make sure an answer has been selected prior to clicking "submit answer"
//If answer has been submitted, it is stored and evaluated against the "correct answer"
//Score is adjusted based on whether the answer is correct
  if (radios.filter(':checked').length === 0) {
    alert('Please select an answer.');
    return;
  } else {
    store.submittingAnswer = true;
    if(selectedAnswer === correctAnswer){
      store.score += 20;
      store.currentQuestionState.answerArray = [true, correctAnswer, selectedAnswer];
    } else {
      store.currentQuestionState.answerArray = [false, correctAnswer, selectedAnswer];
    }
  }
}

//Changes the Quiz Started to false and displays the results
function seeResults() {
  store.quizStarted = false;
  store.questionNumber ++;
}

//Clears all of the data and starts the quiz over
function restartQuiz() {
  store.quizStarted = false;
  store.questionNumber = 0;
  store.submittingAnswer = false;
  store.currentQuestionState.answerArray = [];
  store.score = 0;
}


/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
//This is where you start to flesh out what each event does

//This is the opening page, where you click the button to start the quiz
function handleBeginQuizSubmit(){
  $('main').on('click', '#startQuiz', (event) =>{
    event.preventDefault();
    startQuiz();
    renderQuiz();
  });
}

//This submits your answer for validation
function handleSubmitAnswer(){
  $('main').on('click', '.submit-answer', (event) =>{
    event.preventDefault();
    console.log('Submitting Your Answer');
    validateCorrectAnswer();
    renderQuiz();
  });
}

//After seeing whether your answer was correct, this takes you to the next question
function handleNextQuestionSubmit(){
  $('main').on('click', '.next-question', (event) =>{
    event.preventDefault();
    nextQuestion();
    renderQuiz();
  });
}

//After the last question is answered, this takes you to the total score - the results page
function handleSeeResultsSubmit(){
  $('main').on('click', '.see-results', (event) => {
    event.preventDefault();
    seeResults();
    renderQuiz();
  });
}

//This takes you back to the beginning and resets everything
function handleRestartQuizSubmit(){
  $('main').on('click', '.restart-quiz', (event) => {
    event.preventDefault();
    restartQuiz();
    renderQuiz();
  });
}


// This function will launch all other functions after the page is loaded
function handleQuiz (){
  //These are all of the individual functions of the page
  renderQuiz();
  handleBeginQuizSubmit();
  handleSubmitAnswer();
  handleNextQuestionSubmit();
  handleRestartQuizSubmit();
  handleSeeResultsSubmit();
}

$(handleQuiz);
