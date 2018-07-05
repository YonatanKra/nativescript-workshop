const observableModule = require("data/observable");

function questionViewModel(question) {
    let viewModel = new observableModule.fromObject(question);

    viewModel.initQuestion = function () {
        if (question.answers) {
            viewModel.answers = question.answers.map((answer, key) => {
                return new observableModule.fromObject({
                    answerText: answer,
                    isSelected: false,
                    showCorrect: false,
                    isCorrect: key === question.correctAnswerIndex
                });
            });
        }
    }

    viewModel.checkMultipleChoiceAnswer = function (chosenAnswer) {
        chosenAnswer.isSelected = true;
        let answers = viewModel.get("answers");
        let correctAnswer = answers[question.correctAnswerIndex];
        correctAnswer.showCorrect = true;
        return chosenAnswer.isCorrect;
    };

    return viewModel;

}
module.exports = questionViewModel;
