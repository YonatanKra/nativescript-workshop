const observableModule = require("data/observable");
const QuizListViewModel = require('../../shared/view-models/quiz-list-view-model');

let vm = new QuizListViewModel();

let quizListData = new observableModule.fromObject({
    quizList: vm
})

exports.onQuizListPageLoaded = function (args) {
    quizListData.set("isLoading", true);
    page = args.object;
    page.bindingContext = quizListData;
    vm.loadQuizzes().then(function () {
        quizListData.set("isLoading", false)
    });
};

exports.onSelectQuiz = function (args) {
    const selectedQuizData = args.view.bindingContext;
    console.log('selected quiz name: ' + selectedQuizData.name);
}
