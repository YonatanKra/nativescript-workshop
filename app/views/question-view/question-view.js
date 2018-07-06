const QuestionViewModel = require('../../shared/view-models/question-view-model');
const observableModule = require("data/observable");
const NavigationModule = require("../../shared/navigation");

let vm;
let quiz
let questionIndex;
let quizLength;
let answerSelected = false;

let questionData = new observableModule.Observable();

setBackgroundColor = function () {
    let colors = ['#58406D', '#314D70', '#E54B04', '#007461', '#655672', '#6B0758', '#513EE1', '#E00481', '#4D989E', '#3F7F47'];
    let backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    questionData.backgroundColor = backgroundColor;
}

navigateToNextPage = function () {
    if (quizLength > questionIndex + 1) {
        NavigationModule.goToQuestionView(quiz, questionIndex + 1);
    }
    else {
        quiz.finalizeScore();
        NavigationModule.goToQuizSummaryView(quiz);
    };
}

exports.onQuestionPageLoaded = function (args) {
    let page = args.object;
    page.bindingContext = questionData;
}

exports.questionPageNavigatingTo = function (args) {
    let page = args.object;
    let context = page.navigationContext;
    answerSelected = false;
    quiz = context.quiz;
    questionIndex = context.currentQuestionIndex;
    quizLength = quiz.questions.length;
    vm = new QuestionViewModel(quiz.questions[questionIndex]);
    vm.initQuestion();
    questionData.question = vm;
    questionData.progress = `${questionIndex + 1} / ${quizLength}`;
    setBackgroundColor();
}

exports.onSelectMultipleChoiceAnswer = function (args) {
    if (!answerSelected) {
        answerSelected = true;
        let chosenAnswer = args.view.bindingContext;
        let answeredCorrectly = vm.checkMultipleChoiceAnswer(chosenAnswer);
        if (answeredCorrectly) {
            quiz.incrementScore();
        }
        setTimeout(navigateToNextPage, 1000);
    }
}